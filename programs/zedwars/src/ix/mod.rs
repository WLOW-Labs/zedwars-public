mod character_attack;
mod character_barricade;
mod character_destroy_barricade;
mod character_bury;
mod character_destroy_generator;
mod character_drag;
mod character_generate_missions;
mod character_init;
mod character_loot;
mod character_move;
mod character_rename;
mod character_revive;
mod character_search;
mod character_stand_back_up;
mod character_unlock_skill;
mod character_update;
mod character_upgrade;
mod character_use_item;
mod config_add_legendary_item;
mod config_add_rare_drop_table_item;
mod config_init;
mod config_register_item;
mod config_set_item_random_weights;
mod config_set_loot_regen_rate;
mod config_set_merkle_tree;
mod config_set_search_success_rate;
mod config_set_skill_points_required;
mod config_set_variables;
mod courier_mission_end;
mod courier_mission_start;
mod enter_raffle;
mod item_airdrop;
mod item_craft;
mod item_destroy;
mod item_equip;
mod item_mint;
mod item_redeem;
mod item_unequip;
mod item_update;
mod map_tile_init;
mod map_tile_update;
mod ransack_tile;
mod resize_character;
mod resize_config;
mod resize_item;
mod resize_tile;
mod session_close;
mod session_init;
mod verify_player;
mod withdraw_treasury;

use std::str::FromStr;

use anchor_lang::Id;
pub use character_attack::*;
pub use character_barricade::*;
pub use character_bury::*;
pub use character_destroy_barricade::*;
pub use character_destroy_generator::*;
pub use character_drag::*;
pub use character_generate_missions::*;
pub use character_init::*;
pub use character_loot::*;
pub use character_move::*;
pub use character_rename::*;
pub use character_revive::*;
pub use character_search::*;
pub use character_stand_back_up::*;
pub use character_unlock_skill::*;
pub use character_update::*;
pub use character_upgrade::*;
pub use character_use_item::*;
pub use config_add_legendary_item::*;
pub use config_add_rare_drop_table_item::*;
pub use config_init::*;
pub use config_register_item::*;
pub use config_set_item_random_weights::*;
pub use config_set_loot_regen_rate::*;
pub use config_set_merkle_tree::*;
pub use config_set_search_success_rate::*;
pub use config_set_skill_points_required::*;
pub use config_set_variables::*;
pub use courier_mission_end::*;
pub use courier_mission_start::*;
pub use enter_raffle::*;
pub use item_airdrop::*;
pub use item_craft::*;
pub use item_destroy::*;
pub use item_equip::*;
pub use item_mint::*;
pub use item_redeem::*;
pub use item_unequip::*;
pub use item_update::*;
pub use map_tile_init::*;
pub use map_tile_update::*;
pub use ransack_tile::*;
pub use resize_character::*;
pub use resize_config::*;
pub use resize_item::*;
pub use resize_tile::*;
pub use session_close::*;
pub use session_init::*;
use solana_program::pubkey::Pubkey;
pub use verify_player::*;
pub use withdraw_treasury::*;

#[macro_export]
macro_rules! is_authenticated {
    ($ctx:ident) => {
        if $ctx.accounts.config.maintenance_mode {
            return Err(ZedWarsError::GamePaused.into());
        }
        if $ctx.accounts.session.is_none() {
            // The player signed the transaction
            // Check if the signer is the player
            if $ctx.accounts.player.key() != $ctx.accounts.signer.key() {
                return Err(ZedWarsError::NoAuthority.into());
            }
        } else {
            // The player used the degelate keypair to sign the transaction
            // Check if the signer is the degelate keypair
            if $ctx.accounts.session.as_ref().unwrap().delegate != $ctx.accounts.signer.key() {
                return Err(ZedWarsError::NoAuthority.into());
            }
            // Check if the player is the owner of the session
            if $ctx.accounts.session.as_ref().unwrap().player != $ctx.accounts.player.key() {
                msg!("Player is not the owner of the session");
                msg!("Player: {}", $ctx.accounts.player.key());
                msg!("Session owner: {}", $ctx.accounts.session.as_ref().unwrap().player);
                return Err(ZedWarsError::InvalidSession.into());
            }
            // Check if the session is still valid
            if Clock::get()?.unix_timestamp > $ctx.accounts.session.as_ref().unwrap().valid_until {
                msg!("Session is expired");
                msg!("Current time: {}", Clock::get()?.unix_timestamp);
                msg!(
                    "Session valid until: {}",
                    $ctx.accounts.session.as_ref().unwrap().valid_until
                );
                return Err(ZedWarsError::InvalidSession.into());
            }
        }
    };
}

#[macro_export]
macro_rules! account_realloc {
    ($ctx:ident, $account:ident, $size:expr) => {
        if $ctx.accounts.$account.to_account_info().data_len() != $size {
            msg!(
                "Reallocating account from {} to {}",
                $ctx.accounts.$account.to_account_info().data_len(),
                $size
            );
            $ctx.accounts.$account.to_account_info().realloc($size, false)?;
        }
    };
}

#[macro_export]
macro_rules! ensure_rent_exempt {
    ($ctx:ident, $payer:ident, $target:ident) => {
        let payer_account_info = $ctx.accounts.$payer.to_account_info();
        let target_account_info = $ctx.accounts.$target.to_account_info();
        let min_rent = Rent::get()?.minimum_balance(target_account_info.data_len());
        if target_account_info.lamports() < min_rent {
            let amount = min_rent - target_account_info.lamports();
            msg!("Paying {} lamports worth of rent", amount);
            let ix = system_instruction::transfer(payer_account_info.key, target_account_info.key, amount);
            invoke(&ix, &[payer_account_info.clone(), target_account_info.clone()])?;
        } 
    };
}

#[macro_export]
macro_rules! session_reimburse {
    ($ctx:ident, $payer:ident, $target:ident) => {
        if $ctx.accounts.$payer.as_ref().is_none() {
            msg!("No session found, exiting.");
            return Ok(());
        }
        let payer_account_info = $ctx.accounts.$payer.as_ref().unwrap().to_account_info();
        let target_account_info = $ctx.accounts.$target.to_account_info();

        let min_rent = Rent::get()?.minimum_balance(target_account_info.data_len()) * 2;
        if target_account_info.lamports() < min_rent {
            let amount = min_rent - target_account_info.lamports();
            msg!("Paying {} lamports worth of rent", amount);
            let payer_lamports = payer_account_info.lamports();
            let target_lamports = target_account_info.lamports();

            **payer_account_info.lamports.borrow_mut() = payer_lamports.checked_sub(amount).unwrap();
            **target_account_info.lamports.borrow_mut() = target_lamports.checked_add(amount).unwrap();            
        } else {
            msg!(
                "Session has enough rent, {} in wallet but only {} needed for rent",
                payer_account_info.lamports(),
                min_rent
            )
        }
    };
}

#[derive(Clone)]
pub struct MplBubblegum;

impl Id for MplBubblegum {
    fn id() -> Pubkey {
        mpl_bubblegum::ID
    }
}

#[derive(Clone)]
pub struct MplTokenMetadata;

impl Id for MplTokenMetadata {
    fn id() -> Pubkey {
        mpl_token_metadata::ID
    }
}

#[derive(Clone)]
pub struct Noop;

impl Id for Noop {
    fn id() -> Pubkey {
        Pubkey::from_str("noopb9bkMVfRPU8AsbpTUg8AQkHtKwMYZiFUjNRtMmV").unwrap()
    }
}

#[derive(Clone)]
pub struct SplAccountCompression;

impl Id for SplAccountCompression {
    fn id() -> Pubkey {
        Pubkey::from_str("cmtDvXumGCrqC1Age74AVPhSRVXJMd8PJS91L8KbNCK").unwrap()
    }
}
