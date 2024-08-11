use anchor_lang::prelude::*;
use bubblegum_cpi::{get_asset_id, TreeConfig};
use mpl_bubblegum::{
    instructions::MintToCollectionV1CpiBuilder,
    types::{Collection, Creator, MetadataArgs, TokenProgramVersion, TokenStandard},
};
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    errors::ZedWarsError,
    state::{Character, Config, Event, MapTile},
};

use super::{MplBubblegum, MplTokenMetadata, Noop, SplAccountCompression};

fn is_valid_format(s: &str) -> bool {
    if s.len() != 23 {
        return false;
    }
    for (i, c) in s.chars().enumerate() {
        if i % 4 == 3 {
            if c != '_' {
                return false;
            }
        } else if !c.is_digit(10) {
            return false;
        }
    }
    true
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CharacterInitArgs {
    pub is_zombie: bool,
    pub layers: String,
    pub name: String,
    pub asset_id: Pubkey,
}

/// The accounts for the `character_init` instruction.
#[derive(Accounts)]
#[instruction(args: CharacterInitArgs)]
pub struct CharacterInitAccounts<'info> {
    /// The player account. It's a regular wallet account that owns the character.
    /// mut because this account will fund the creation of the character account.
    #[account(mut)]
    pub player: Signer<'info>,
    /// The character account.
    /// It's the account that holds the character's state.
    #[account(
        init,
        payer = player,
        space = Character::INIT_SPACE,
        seeds = [Character::SEED_PREFIX,args.asset_id.as_ref()],
        bump,
    )]
    pub character: Account<'info, Character>,

    /// The map tile account
    /// The character will be placed on this tile.
    #[account(mut,seeds=[MapTile::SEED_PREFIX,map_tile.x.to_le_bytes().as_slice(),map_tile.y.to_le_bytes().as_slice()],bump)]
    pub map_tile: Account<'info, MapTile>,

    /// The program's config account.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,

    /// The tree config account
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
    pub referrer: Option<AccountInfo<'info>>,

    /// The items collection mint
    /// CHECK: Only the address needs to be checked
    #[account(address=config.characters_collection_mint)]
    pub collection_mint: UncheckedAccount<'info>,
    /// The items collection metadata
    /// CHECK: Only the address needs to be checked
    #[account(mut,address=mpl_token_metadata::pda::find_metadata_account(&collection_mint.key()).0)]
    pub collection_metadata: UncheckedAccount<'info>,
    /// The items collection master edition
    /// CHECK: Only the address needs to be checked
    #[account(address=mpl_token_metadata::pda::find_master_edition_account(&collection_mint.key()).0)]
    pub collection_master_edition: UncheckedAccount<'info>,
    /// CHECK: Only the address needs to be checked
    #[account(address=mpl_token_metadata::pda::find_collection_authority_account(&collection_mint.key(),&config.key()).0)]
    pub collection_authority_record: UncheckedAccount<'info>,

    // Programs
    /// CHECK: This is just used as a signing PDA.
    pub bubblegum_signer: UncheckedAccount<'info>,
    pub log_wrapper: Program<'info, Noop>,
    pub compression_program: Program<'info, SplAccountCompression>,
    pub token_metadata_program: Program<'info, MplTokenMetadata>,
    pub bubblegum_program: Program<'info, MplBubblegum>,
    pub system_program: Program<'info, System>,
}

/// The handler for the `character_init` instruction.
/// The character NFT must belong to the characters collection.
/// The character will be placed on the map tile.
/// The map tile will be updated to reflect the new character.
///
/// # Arguments
/// * `ctx` - The program context.
/// * `is_zombie` - Whether the character is a zombie or a survivor.
///
/// # Returns
/// * `Result<()>` - The result of the instruction.
pub fn handle_character_init(ctx: Context<CharacterInitAccounts>, args: CharacterInitArgs) -> Result<()> {
    msg!("Checking if the layers are valid");
    require!(
        is_valid_format(&args.layers) || ctx.accounts.player.key() == OPERATOR_PUBKEY,
        ZedWarsError::InvalidLayers
    );

    msg!("Validating name");
    require!(args.name.len() <= 12, ZedWarsError::NameTooLong);
    require!(args.name.len() >= 3, ZedWarsError::NameTooShort);

    msg!("Checking if starting tile is valid");
    require_eq!(
        ctx.accounts.map_tile.num_barricades,
        0,
        ZedWarsError::InvalidStartingTile
    );

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
        .collection_authority_record_pda(Some(&ctx.accounts.collection_authority_record.to_account_info()))
        .collection_mint(&ctx.accounts.collection_mint.to_account_info())
        .collection_metadata(&ctx.accounts.collection_metadata.to_account_info())
        .collection_edition(&ctx.accounts.collection_master_edition.to_account_info())
        .bubblegum_signer(&ctx.accounts.bubblegum_signer.to_account_info())
        .log_wrapper(&ctx.accounts.log_wrapper.to_account_info())
        .compression_program(&ctx.accounts.compression_program.to_account_info())
        .token_metadata_program(&ctx.accounts.token_metadata_program.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .metadata(MetadataArgs {
            name: format!("Player #{}", ctx.accounts.config.number_of_characters),
            symbol: "ZWPLAYER".to_owned(),
            uri: format!("https://cdn.zedwars.com/metadata/{}.json", args.layers),
            creators,
            seller_fee_basis_points: 500,
            primary_sale_happened: true,
            is_mutable: false,
            edition_nonce: Some(0),
            uses: None,
            collection: Some(Collection {
                verified: true,
                key: ctx.accounts.collection_mint.key(),
            }),
            token_program_version: TokenProgramVersion::Original,
            token_standard: Some(TokenStandard::NonFungible),
        })
        .invoke_signed(signer_seeds)?;

    ctx.accounts.config.merkle_tree_items_minted += 1;

    msg!("Calculating asset_id to ensure we did it right");
    let a_id = get_asset_id(&ctx.accounts.merkle_tree.key(), ctx.accounts.tree_config.num_minted);
    require_eq!(args.asset_id, a_id, ZedWarsError::MismatchAsset);

    // init the character
    ctx.accounts.character.set_inner(Character::new(
        args.asset_id,
        ctx.accounts.referrer.as_ref().map(|acc| acc.key()),
        ctx.accounts.map_tile.x,
        ctx.accounts.map_tile.y,
        args.is_zombie,
        &ctx.accounts.config,
        args.name,
        args.layers,
    ));

    ctx.accounts.config.number_of_characters += 1;

    // update the map tile
    if args.is_zombie {
        ctx.accounts.map_tile.num_zombies += 1;
    } else {
        ctx.accounts.map_tile.num_survivors += 1;
    }

    if ctx.accounts.character.referred_by.is_some() {
        // Give 1000 xp to new players that are referred by someone
        ctx.accounts.character.gain_xp(1000, &ctx.accounts.config)
    }

    ctx.accounts.character.add_event(Event {
        message: "Character created!".to_string(),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 4,
        block: Clock::get()?.slot,
    });

    msg!("size(): {}", ctx.accounts.character.size());
    let fully_spaced = 2000;
    if fully_spaced < ctx.accounts.character.size() {
        msg!("reallocating to character size");
        account_realloc!(ctx, character, ctx.accounts.character.size());
    } else {
        msg!("reallocating to theoretical max filled size");
        account_realloc!(ctx, character, fully_spaced);
    }

    ensure_rent_exempt!(ctx, player, character);

    let max_lamports: u64 = 50_000_000; // 0.05 SOL
    let min_rent = Rent::get()?.minimum_balance(std::cmp::max(fully_spaced, ctx.accounts.character.size()));
    let lamports = max_lamports.saturating_sub(min_rent);

    let referrer_lamports = (lamports * 20) / 100;
    let config_lamports = lamports - referrer_lamports;

    // Create the transfer instruction
    let transfer_instruction = system_instruction::transfer(
        ctx.accounts.player.key,
        ctx.accounts.config.to_account_info().key,
        if ctx.accounts.referrer.is_some() {
            config_lamports
        } else {
            lamports
        },
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

    if ctx.accounts.referrer.is_some() {
        let transfer_instruction = system_instruction::transfer(
            ctx.accounts.player.key,
            ctx.accounts.referrer.as_ref().unwrap().to_account_info().key,
            referrer_lamports,
        );

        msg!("Transferring {} lamports", referrer_lamports);
        // Invoke the transfer instruction
        anchor_lang::solana_program::program::invoke_signed(
            &transfer_instruction,
            &[
                ctx.accounts.player.to_account_info().clone(),
                ctx.accounts.referrer.as_ref().unwrap().to_account_info(),
                ctx.accounts.system_program.to_account_info(),
            ],
            &[],
        )?;
    }

    // Make sure we didn't accidentally nuke the config account by transferring too much out
    ensure_rent_exempt!(ctx, player, config);

    Ok(())
}
