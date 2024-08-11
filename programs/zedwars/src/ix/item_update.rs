use anchor_lang::prelude::*;

use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{Item, ItemType, ItemRarity, ItemKind},
};

/// The arguments for the `config_register_sft` instruction.
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct UpdateItemArgs {
    pub item_id: u32,
    pub item_type: ItemType,
    pub name: String,
    pub rarity: ItemRarity,
    pub kind: ItemKind,
    pub converts_to: u32,
}

/// The accounts for the `config_register_sft` instruction.
#[derive(Accounts)]
#[instruction(args: UpdateItemArgs)]
pub struct UpdateItemAccounts<'info> {
    /// The program's authority.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The item account
    #[account(mut,seeds=[Item::SEED_PREFIX,args.item_id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    pub system_program: Program<'info, System>,
}

pub fn handle_item_update(ctx: Context<UpdateItemAccounts>, args: UpdateItemArgs) -> Result<()> {
    ctx.accounts.item.item_type = args.item_type;
    ctx.accounts.item.rarity = args.rarity;
    ctx.accounts.item.kind = args.kind;
    ctx.accounts.item.converts_to = args.converts_to;
    ctx.accounts.item.name = args.name;

    account_realloc!(ctx, item, Item::size(args.item_type, &ctx.accounts.item.name));
    ensure_rent_exempt!(ctx, operator, item);

    Ok(())
}
