use anchor_lang::prelude::*;

#[account]
pub struct Raffle {
    /// Pubkey of the player
    pub player: Pubkey,
    /// Number of entries in this weeks raffle
    pub entries: u16,
    /// Last time this pda was updated
    pub last_updated: i64,
}

impl Raffle {
    /// The seed prefix for the config account.
    pub const SEED_PREFIX: &'static [u8; 6] = b"Raffle";
    /// Init space for the config account.
    pub const INIT_SPACE: usize = 8 // seed
    + 32 // player
    + 2 // entries
    + 8; // last_updated
}

#[cfg(test)]
mod test {

    use super::*;

    #[test]
    fn test_config_account_size() {
        let raffle = Raffle {
            player: Pubkey::new_unique(),
            entries: 3000,
            last_updated: 0,
        };
        let mut data = Vec::new();
        raffle.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), Raffle::INIT_SPACE);
    }
}
