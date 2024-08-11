use crate::{
    errors::ZedWarsError,
    state::{Config, Item, ItemMint}, constants::OPERATOR_PUBKEY
};
use anchor_lang::prelude::*;
use bubblegum_cpi::{TreeConfig, get_asset_id};
use mpl_bubblegum::{
    instructions::MintToCollectionV1CpiBuilder,
    types::{Collection, Creator, MetadataArgs, TokenProgramVersion, TokenStandard},
};

use super::{Noop, SplAccountCompression, MplTokenMetadata, MplBubblegum};

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ItemAirdropArgs {
    pub asset_id: Pubkey,
}

#[derive(Accounts)]
#[instruction(args: ItemAirdropArgs)]
pub struct ItemAirdropAccounts<'info> {
    // signer
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,

    #[account()]
    /// CHECK: This is not dangerous because we don't read or write from this account
    pub destination: AccountInfo<'info>,

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
    #[account(init,payer=operator,space=ItemMint::INIT_SPACE,seeds=[ItemMint::MINT_SEED_PREFIX,args.asset_id.as_ref()],bump)]
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

pub fn handle_item_airdrop<'info>(ctx: Context<'_, '_, '_, 'info, ItemAirdropAccounts<'info>>, args: ItemAirdropArgs) -> Result<()> {

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
        .leaf_owner(&ctx.accounts.destination.to_account_info())
        .leaf_delegate(&ctx.accounts.destination.to_account_info())
        .merkle_tree(&ctx.accounts.merkle_tree.to_account_info())
        .payer(&ctx.accounts.operator.to_account_info())
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

    ctx.accounts.config.merkle_tree_items_minted += 1;

    Ok(())
}
