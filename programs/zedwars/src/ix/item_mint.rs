use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    state::{Character, Config, ConfigVar, Event, Item, ItemMint, MapTile}, constants::PlayerVerifyArgs, ix::{VerifyPlayerArgs, verify_player},
};
use anchor_lang::prelude::*;
use bubblegum_cpi::{TreeConfig, get_asset_id};
use mpl_bubblegum::{
    instructions::MintToCollectionV1CpiBuilder,
    types::{Collection, Creator, MetadataArgs, TokenProgramVersion, TokenStandard},
};
use solana_program::{program::invoke, system_instruction};

use super::{Noop, SplAccountCompression, MplTokenMetadata, MplBubblegum};

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ItemMintArgs {
    pub asset_id: Pubkey,
    pub player_verify: PlayerVerifyArgs
}

#[derive(Accounts)]
#[instruction(args: ItemMintArgs)]
pub struct ItemMintAccounts<'info> {
    // signer
    #[account(mut)]
    pub player: Signer<'info>,

    #[account(
        mut,
        seeds=[Config::SEED_PREFIX],
        bump
    )]
    pub config: Box<Account<'info, Config>>,
    #[account(mut)]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub authority: AccountInfo<'info>,

    /// The item account
    #[account(seeds=[Item::SEED_PREFIX,item.id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    /// The character account
    #[account(mut,seeds=[Character::SEED_PREFIX,character.mint.as_ref()],bump)]
    pub character: Box<Account<'info, Character>>,
    /// The tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,tile.x.to_le_bytes().as_slice(),tile.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,
    #[account(init,payer=player,space=ItemMint::INIT_SPACE,seeds=[ItemMint::MINT_SEED_PREFIX,args.asset_id.as_ref()],bump)]
    pub item_mint: Account<'info, ItemMint>,

    #[account(
        mut,
        seeds = [merkle_tree.key().as_ref()],
        seeds::program = bubblegum_program.key(),
        bump,
    )]
    pub tree_config: Box<Account<'info, TreeConfig>>,

    #[account(mut)]
    /// CHECK: unsafe
    pub merkle_tree: UncheckedAccount<'info>,

    #[account(mut)]
    /// CHECK: unsafe
    pub player_merkle_tree: UncheckedAccount<'info>,

    /// The items collection mint
    /// CHECK: Only the address needs to be checked
    #[account(address=config.items_collection_mint)]
    pub items_collection_mint: UncheckedAccount<'info>,
    /// The items collection metadata
    /// CHECK: Only the address needs to be checked
    #[account(mut,address=mpl_token_metadata::pda::find_metadata_account(&items_collection_mint.key()).0)]
    pub items_collection_metadata: UncheckedAccount<'info>,
    /// The items collection master edition
    /// CHECK: Only the address needs to be checked
    #[account(address=mpl_token_metadata::pda::find_master_edition_account(&items_collection_mint.key()).0)]
    pub items_collection_master_edition: UncheckedAccount<'info>,
    /// CHECK: Only the address needs to be checked
    #[account(address=mpl_token_metadata::pda::find_collection_authority_account(&items_collection_mint.key(),&config.key()).0)]
    pub items_collection_authority_record: UncheckedAccount<'info>,

    // Programs
    /// CHECK: This is just used as a signing PDA.
    pub bubblegum_signer: UncheckedAccount<'info>,
    pub log_wrapper: Program<'info, Noop>,
    pub compression_program: Program<'info, SplAccountCompression>,
    pub token_metadata_program: Program<'info, MplTokenMetadata>,
    pub bubblegum_program: Program<'info, MplBubblegum>,
    pub system_program: Program<'info, System>,
}

pub fn handle_item_mint<'info>(ctx: Context<'_, '_, '_, 'info, ItemMintAccounts<'info>>, args: ItemMintArgs) -> Result<()> {
    let asset_id = get_asset_id(ctx.accounts.player_merkle_tree.key, args.player_verify.index.into());

    //check if the proof matches the player
    require_eq!(asset_id, ctx.accounts.character.mint, ZedWarsError::NoAuthority);
    
    //check if the signer owns the player
    msg!("Checking if signer owns the nft");    
    let res = verify_player(VerifyPlayerArgs{
        data_hash: args.player_verify.data_hash,
        creator_hash: args.player_verify.creator_hash,
        root: args.player_verify.root,
        index: args.player_verify.index,
        compression_program: ctx.accounts.compression_program.to_account_info(),
        merkle_tree: ctx.accounts.player_merkle_tree.to_account_info(),
        owner: ctx.accounts.player.key(),
        delegate: ctx.accounts.player.key(),
        proof_accounts: ctx.remaining_accounts.to_vec()
    });
    require!(res.is_ok(), ZedWarsError::NoAuthority);

    // The character must be on the tile
   msg!("Checking if the character is on the tile");
   require!(
       ctx.accounts.character.x == ctx.accounts.tile.x && ctx.accounts.character.y == ctx.accounts.tile.y,
       ZedWarsError::InvalidTile
   );

    msg!("Checking that they are not on a courier mission");
    require!(
        ctx.accounts.character.courier_mission.is_none(),
        ZedWarsError::NoActionCourier
    );

   //msg!("Checking that they have premium");
   require!(ctx.accounts.character.has_premium, ZedWarsError::PremiumMint);

    // Check that the character has the item
   let item_index = ctx
      .accounts
      .character
      .inventory
      .iter()
      .position(|x| x == &ctx.accounts.item.id);
   require!(item_index.is_some(), ZedWarsError::MissingItem);

    // Charater must not have been attacked in the last 24 hours
    msg!("Checking if the character has been attacked in the last 24 hours");
    let now = Clock::get()?.unix_timestamp;
    require!(
       ctx.accounts.character.last_attacked_at
           + (ctx.accounts.config.get_config_variable(ConfigVar::MintAttackCoolDown) as i64)
           < now,
       ZedWarsError::MintOnCooldown
    );

    // use energy
    let now = Clock::get()?.unix_timestamp;
    let slot = Clock::get()?.slot;
    ctx.accounts.character.use_energy(
       ctx.accounts.config.get_config_variable(ConfigVar::MintItemEnergyCost) as u8,
       now,
       slot,
       &ctx.accounts.config,
       &mut ctx.accounts.tile,
    )?;

    // remove item from inventory
    ctx.accounts.character.inventory.remove(item_index.unwrap());


    let bump_seed = *ctx.bumps.get("config").unwrap();
    let signer_seeds: &[&[&[u8]]] = &[&[Config::SEED_PREFIX, &[bump_seed]]];

    let mut creators: Vec<Creator> = vec![Creator {
       address: ctx.accounts.config.key(),
       verified: true,
       share: 0,
    }];

    // add the creators that will receive royalties from secondary sales
    for c in &ctx.accounts.config.creators {
       creators.push(Creator {
           address: c.address,
           verified: false,
           share: c.share,
       });
    }

    MintToCollectionV1CpiBuilder::new(&ctx.accounts.bubblegum_program.to_account_info())
        .tree_config(&ctx.accounts.tree_config.to_account_info())
        .leaf_owner(&ctx.accounts.player.to_account_info())
        .leaf_delegate(&ctx.accounts.player.to_account_info())
        .merkle_tree(&ctx.accounts.merkle_tree.to_account_info())
        .payer(&ctx.accounts.player.to_account_info())
        .tree_creator_or_delegate(&ctx.accounts.config.to_account_info())
        .collection_authority(&ctx.accounts.config.to_account_info())
        .collection_authority_record_pda(Some(&ctx.accounts.items_collection_authority_record.to_account_info()))
        .collection_mint(&ctx.accounts.items_collection_mint.to_account_info())
        .collection_metadata(&ctx.accounts.items_collection_metadata.to_account_info())
        .collection_edition(&ctx.accounts.items_collection_master_edition.to_account_info())
        .bubblegum_signer(&ctx.accounts.bubblegum_signer.to_account_info())
        .log_wrapper(&ctx.accounts.log_wrapper.to_account_info())
        .compression_program(&ctx.accounts.compression_program.to_account_info())
        .token_metadata_program(&ctx.accounts.token_metadata_program.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .metadata(MetadataArgs {
            name: ctx.accounts.item.name.clone(),
            symbol: "ZWITEM".to_owned(),
            uri: format!("https://cdn.zedwars.com/items/metadata/{}.json", ctx.accounts.item.id),
            creators,
            seller_fee_basis_points: 750,
            primary_sale_happened: true,
            is_mutable: false,
            edition_nonce: Some(0),
            uses: None,
            collection: Some(Collection {
                verified: true,
                key: ctx.accounts.items_collection_mint.key(),
            }),
            token_program_version: TokenProgramVersion::Original,
            token_standard: Some(TokenStandard::NonFungible),
        })
        .invoke_signed(signer_seeds)?;

    msg!("Calculating asset_id to ensure we did it right");
    let a_id = get_asset_id(&ctx.accounts.merkle_tree.key(), ctx.accounts.tree_config.num_minted);
    require_eq!(args.asset_id, a_id, ZedWarsError::MismatchAsset);
    
    ctx.accounts.item_mint.set_inner(ItemMint {
       mint: a_id,
       id: ctx.accounts.item.id,
    });

    ctx.accounts.character.add_event(Event {
       message: format!(
           "Minted {} NFT, it has been added to your wallet.",
           ctx.accounts.item.name
       ),
       timestamp: Clock::get()?.unix_timestamp,
       block: Clock::get()?.slot,
       severity: 4,
    });

    ctx.accounts.config.merkle_tree_items_minted += 1;

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, player, character);


    let max_lamports: u64 = 100_000; // 0.0001 SOL
    let min_rent = Rent::get()?.minimum_balance(ItemMint::INIT_SPACE);
    let lamports = max_lamports.saturating_sub(min_rent);
    if lamports > 0 {
        // Create the transfer instruction
        let transfer_instruction = system_instruction::transfer(
            ctx.accounts.player.key,
            ctx.accounts.config.to_account_info().key,
            lamports,
        );

        msg!("Transferring {} lamports", lamports);
        // Invoke the transfer instruction
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                ctx.accounts.player.to_account_info(),
                ctx.accounts.config.to_account_info().clone(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;
    }

    Ok(())
}
