use crate::{
    constants::OPERATOR_PUBKEY,
    state::{Config, Item, ItemType, ItemRarity, ItemKind},
};
use anchor_lang::prelude::*;

/// The arguments for the `config_register_sft` instruction.
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ConfigRegisterItemArgs {
    /// The ID of the item
    pub item_id: u32,
    /// The name of the item SFT.
    pub name: String,
    /// Item type
    pub item_type: ItemType,
    pub rarity: ItemRarity,
    pub kind: ItemKind,
    pub converts_to: u32,
}

/// The accounts for the `config_register_sft` instruction.
#[derive(Accounts)]
#[instruction(args: ConfigRegisterItemArgs)]
pub struct ConfigRegisterItemAccounts<'info> {
    /// The program's authority.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account for the program.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The item account
    #[account(init,payer=operator,space=Item::size(args.item_type, &args.name)+10,seeds=[Item::SEED_PREFIX,args.item_id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    /// The system program.
    pub system_program: Program<'info, System>,
    /// The rent sysvar.
    pub rent: Sysvar<'info, Rent>,
}

/// The handler for the `config_register_item` instruction.
/// This instruction creates a new item account.
///
/// # Arguments
/// * `ctx` - The instruction context.
/// * `args` - The arguments for the instruction.
///
/// # Returns
/// * `Result<()>` - The result of the instruction.
pub fn handle_config_register_item(
    ctx: Context<ConfigRegisterItemAccounts>,
    args: ConfigRegisterItemArgs,
) -> Result<()> {
    // initialize the item account
    ctx.accounts.item.set_inner(Item {
        id: args.item_id,
        item_type: args.item_type,
        name: args.name,
        rarity: args.rarity,
        kind: args.kind,
        converts_to: args.converts_to,
    });

    // update the config account
    ctx.accounts.config.number_of_items += 1;

    Ok(())
}
