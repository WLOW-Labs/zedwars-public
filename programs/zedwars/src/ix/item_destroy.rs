use crate::{
    account_realloc, ensure_rent_exempt,
    errors::ZedWarsError,
    is_authenticated,
    state::{Character, Config, Event, Item, Session}, constants::PlayerVerifyArgs, ix::verify_player, session_reimburse,
};
use anchor_lang::prelude::*;
use bubblegum_cpi::get_asset_id;
use solana_program::{program::invoke, system_instruction};
use verify_player::VerifyPlayerArgs;

use super::SplAccountCompression;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct ItemDestroyArgs {
    pub item_id: u32,
    pub player_verify: PlayerVerifyArgs,
}


/// The accounts for the item destroy instruction
#[derive(Accounts)]
#[instruction(args: ItemDestroyArgs)]
pub struct ItemDestroyAccounts<'info> {
    /// The signer
    /// It could be the delegate or the player.
    #[account(mut)]
    pub signer: Signer<'info>,
    /// The optional session account
    /// It is only present if the signer is the delegate.
    #[account(mut,seeds=[Session::SEED_PREFIX,player.key().as_ref()],bump)]
    pub session: Option<Account<'info, Session>>,
    /// The player wallet account
    /// CHECK: Checked in the handler.
    #[account(mut)]
    pub player: UncheckedAccount<'info>,
    /// CHECK: unsafe
    #[account(mut)]
    pub player_merkle_tree: UncheckedAccount<'info>,
    /// The character account
    #[account(mut,seeds=[Character::SEED_PREFIX,character.mint.as_ref()],bump)]
    pub character: Account<'info, Character>,
    /// The item account
    #[account(seeds=[Item::SEED_PREFIX,args.item_id.to_le_bytes().as_slice()],bump)]
    pub item: Account<'info, Item>,
    /// The config account
    #[account(seeds=[Config::SEED_PREFIX],bump)]
    pub config: Box<Account<'info, Config>>,
    /// The system program.
    pub system_program: Program<'info, System>,
    pub compression_program: Program<'info, SplAccountCompression>,
}

pub fn handle_item_destroy<'info>(ctx: Context<'_, '_, '_, 'info, ItemDestroyAccounts<'info>>, args: ItemDestroyArgs) -> Result<()> {
    is_authenticated!(ctx);

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

    // check if the character is alive
    msg!("Checking if the character is alive");
    require_gt!(ctx.accounts.character.hp, 0, ZedWarsError::CharacterIsDead);

    let now = Clock::get()?.unix_timestamp;

    // Check that the character has the item
    let item_index = ctx.accounts.character.inventory.iter().position(|x| x == &args.item_id);
    require!(item_index.is_some(), ZedWarsError::MissingItem);

    // set last action time
    ctx.accounts.character.last_acted_at = now;

    // remove the item from the inventory
    ctx.accounts.character.inventory.remove(item_index.unwrap());

    ctx.accounts.character.add_event(Event {
        message: format!("{} successfully destroyed.", ctx.accounts.item.name),
        timestamp: now,
        severity: 3,
        block: Clock::get()?.slot,
    });

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, signer, character);
    session_reimburse!(ctx, session, signer);

    Ok(())
}
