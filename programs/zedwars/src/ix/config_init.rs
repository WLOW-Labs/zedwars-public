use anchor_lang::prelude::*;
use anchor_spl::{
    metadata::{MasterEditionAccount, MetadataAccount},
    token::Mint,
};
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    errors::ZedWarsError,
    state::{Config, ConfigVar, Creator, Skill, TileType},
};

/// The accounts for the `config_init` instruction.
#[derive(Accounts)]
pub struct ConfigInitAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account for the program.
    #[account(init,payer=operator,space=Config::INIT_SPACE,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// Items collection NFT mint.
    pub items_collection_mint: Account<'info, Mint>,
    /// Items collection NFT metadata.
    #[account(address=mpl_token_metadata::pda::find_metadata_account(&items_collection_mint.key()).0)]
    pub items_collection_metadata: Box<Account<'info, MetadataAccount>>,
    /// Items collection NFT master edition.
    #[account(address=mpl_token_metadata::pda::find_master_edition_account(&items_collection_mint.key()).0)]
    pub items_collection_master_edition: Account<'info, MasterEditionAccount>,
    /// Items collection NFT authority record.
    /// CHECK: Only the address needs to be checked
    #[account(address=mpl_token_metadata::pda::find_collection_authority_account(&items_collection_mint.key(),&config.key()).0)]
    pub items_collection_authority_record: UncheckedAccount<'info>,
    /// Characters collection NFT mint.
    pub characters_collection_mint: Account<'info, Mint>,
    /// Characters collection NFT metadata.
    #[account(address=mpl_token_metadata::pda::find_metadata_account(&characters_collection_mint.key()).0)]
    pub characters_collection_metadata: Box<Account<'info, MetadataAccount>>,
    /// Characters collection NFT master edition.
    #[account(address=mpl_token_metadata::pda::find_master_edition_account(&characters_collection_mint.key()).0)]
    pub characters_collection_master_edition: Account<'info, MasterEditionAccount>,
    /// Characters collection NFT authority record.
    /// CHECK: Only the address needs to be checked
    #[account(address=mpl_token_metadata::pda::find_collection_authority_account(&characters_collection_mint.key(),&config.key()).0)]
    pub characters_collection_authority_record: UncheckedAccount<'info>,
    /// The system program.
    pub system_program: Program<'info, System>,
}

/// The handler for the `config_init` instruction.
/// It initializes the config account for the program.
/// It must be called by the operator.
/// It stores the collection NFT mints for characters and items.
/// It also ensures that the collection update authority is delegated to the config account.
/// These collection NFTs are used to verify the regular SFTs and NFTs.
/// Only the operator account and the config account can verify that a certain SFT or NFT belongs to a collection.
/// A malicious user can't just create a fake SFT or NFT and try to pass it off as a real one.
///
/// # Arguments
/// * `ctx` - The instruction context.
///
/// # Returns
/// * `Result<()>` - The result of the instruction.
pub fn handle_config_init(ctx: Context<ConfigInitAccounts>) -> Result<()> {
    // the mints must be initialized
    msg!("Checking if the items collection NFT mint is initialized");
    require!(
        ctx.accounts.items_collection_mint.is_initialized,
        ZedWarsError::MintNotInitialized
    );
    msg!("Checking if the characters collection NFT mint is initialized");
    require!(
        ctx.accounts.characters_collection_mint.is_initialized,
        ZedWarsError::MintNotInitialized
    );
    // the NFTs must be collection NFTs
    msg!("Checking if the items collection NFT is a collection NFT");
    require!(
        ctx.accounts.items_collection_metadata.collection_details.is_some(),
        ZedWarsError::NotCollectionNFT
    );
    msg!("Checking if the characters collection NFT is a collection NFT");
    require!(
        ctx.accounts.characters_collection_metadata.collection_details.is_some(),
        ZedWarsError::NotCollectionNFT
    );

    // init config
    msg!("Initializing the config PDA account");
    ctx.accounts.config.items_collection_mint = ctx.accounts.items_collection_mint.key();
    ctx.accounts.config.characters_collection_mint = ctx.accounts.characters_collection_mint.key();
    ctx.accounts.config.number_of_items = 0;
    ctx.accounts.config.number_of_characters = 1000;
    ctx.accounts.config.config_variables = vec![0; ConfigVar::NUM_VARS];
    ctx.accounts.config.item_random_weights = vec![vec![]; TileType::NUM_TILE_TYPES];
    ctx.accounts.config.skill_points_required = vec![0; Skill::NUM_SKILLS];
    ctx.accounts.config.search_success_rates = vec![0; TileType::NUM_TILE_TYPES];
    let creator = Creator {
        address: ctx.accounts.operator.key(),
        verified: false,
        share: 100,
    };
    ctx.accounts.config.creators = vec![creator];
    ctx.accounts.config.maintenance_mode = false;
    ctx.accounts.config.legendary_items = vec![vec![]];
    ctx.accounts.config.rare_drop_table = vec![];
    ctx.accounts.config.merkle_tree = None;
    ctx.accounts.config.merkle_tree_items_minted = 0;
    ctx.accounts.config.loot_regen_rates = vec![0; TileType::NUM_TILE_TYPES];

    // realoc
    account_realloc!(ctx, config, ctx.accounts.config.size());

    // ensure rent exempt
    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
