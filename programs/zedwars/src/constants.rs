use anchor_lang::prelude::*;

/// The public key of the operator.
pub const OPERATOR_PUBKEY: Pubkey = solana_program::pubkey!("B33JJ3ZHcMKPXNcAhHBEXjvPMnEsxpwUJkmc2UVTRhvj");
pub const ZOMBIE_START_WEAPON: u32 = 500;

/// Action success probabilities
/// 10000 means 100%
/// 1234 means 12.34%
pub const SUCCESS_RATE_DENOMINATOR: u32 = 10000;

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct PlayerVerifyArgs {
    pub root: [u8; 32],
    pub data_hash: [u8; 32],
    pub creator_hash: [u8; 32],
    pub nonce: u64,
    pub index: u32,
    pub merkle: Pubkey
}