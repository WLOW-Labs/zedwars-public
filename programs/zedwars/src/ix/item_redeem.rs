use anchor_lang::prelude::*;
use anchor_spl::token::Token;
use bubblegum_cpi::get_asset_id;
use mpl_bubblegum::instructions::BurnCpiBuilder;

use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    state::{Character, Config, ConfigVar, Event, Item, ItemMint}, MapTile,
};
use solana_program::{program::invoke, system_instruction};

use super::{MplBubblegum, Noop, SplAccountCompression};

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ItemRedeemArgs {
    root: [u8; 32],
    data_hash: [u8; 32],
    creator_hash: [u8; 32],
    nonce: u64,
    index: u32,
}

#[derive(Accounts)]
#[instruction(args: ItemRedeemArgs)]
pub struct ItemRedeemAccounts<'info> {
    /// The player wallet account
    #[account(mut)]
    pub player: Signer<'info>,
    /// The character account
    #[account(mut,seeds=[Character::SEED_PREFIX,character.mint.as_ref()],bump)]
    pub character: Box<Account<'info, Character>>,
    /// The item account
    #[account(seeds=[Item::SEED_PREFIX,item.id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    #[account(mut,close=player,seeds=[ItemMint::MINT_SEED_PREFIX,get_asset_id(&merkle_tree.key(), args.nonce).as_ref()],bump)]
    pub item_mint: Account<'info, ItemMint>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    /// The original tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,character.x.to_le_bytes().as_slice(),character.y.to_le_bytes().as_slice()],bump)]
    pub tile: Account<'info, MapTile>,

    #[account(mut)]
    /// CHECK: This account is modified in the downstream program
    pub merkle_tree: UncheckedAccount<'info>,

    /// CHECK: This account is checked in the instruction
    pub tree_config: UncheckedAccount<'info>,
    pub log_wrapper: Program<'info, Noop>,
    pub compression_program: Program<'info, SplAccountCompression>,
    pub bubblegum_program: Program<'info, MplBubblegum>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
}

pub fn handle_item_redeem<'info>(
    ctx: Context<'_, '_, '_, 'info, ItemRedeemAccounts<'info>>,
    args: ItemRedeemArgs,
) -> Result<()> {
    msg!("Checking if the character is not a zombie");
    require!(
        !ctx.accounts.character.is_zombie || ctx.accounts.item.id == 1003,
        ZedWarsError::NoRedeemZombie
    );

    // The character should have enough space in the inventory
    msg!("Checking if the character has enough space in the inventory");
    require!(
        ctx.accounts.character.inventory.len()
            < ctx.accounts.config.get_config_variable(ConfigVar::BaseInventorySize) as usize
                + ctx.accounts.character.backpack_space as usize,
        ZedWarsError::InventoryFull
    );

    msg!("Checking if they are providing the right item");
    require!(
        ctx.accounts.item_mint.id == ctx.accounts.item.id,
        ZedWarsError::WrongItem
    );

    if ctx.accounts.character.is_zombie && ctx.accounts.item.id == 1003 {
        ctx.accounts.character.revive(&mut ctx.accounts.tile);
    } else {
        // put the item in the character's inventory
        msg!("Putting the item in the character's inventory");
        ctx.accounts.character.inventory.push(ctx.accounts.item.id);

        ctx.accounts.character.add_event(Event {
            message: format!(
                "Successfully redeemed NFT, {} has been added to your inventory.",
                ctx.accounts.item.name
            ),
            timestamp: Clock::get()?.unix_timestamp,
            severity: 4,
            block: Clock::get()?.slot,
        });
    }

    let remaining_accounts: Vec<(&AccountInfo, bool, bool)> = ctx
        .remaining_accounts
        .iter()
        .map(|account| (account, account.is_signer, account.is_writable))
        .collect();

    BurnCpiBuilder::new(&ctx.accounts.bubblegum_program.to_account_info())
        .tree_config(&ctx.accounts.tree_config.to_account_info())
        .leaf_owner(&ctx.accounts.player.to_account_info(), true)
        .leaf_delegate(&ctx.accounts.player.to_account_info(), true)
        .merkle_tree(&ctx.accounts.merkle_tree.to_account_info())
        .log_wrapper(&ctx.accounts.log_wrapper.to_account_info())
        .compression_program(&ctx.accounts.compression_program.to_account_info())
        .system_program(&ctx.accounts.system_program.to_account_info())
        .add_remaining_accounts(&remaining_accounts)
        .root(args.root)
        .data_hash(args.data_hash)
        .creator_hash(args.creator_hash)
        .nonce(args.nonce)
        .index(args.index)
        .invoke()?;

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, player, character);

    Ok(())
}
