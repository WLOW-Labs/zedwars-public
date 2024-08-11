use anchor_lang::prelude::*;

use crate::errors::ZedWarsError;

#[account]
pub struct Session {
    pub player: Pubkey,
    pub delegate: Pubkey,
    pub valid_until: i64,
}

impl Session {
    pub const SEED_PREFIX: &'static [u8; 7] = b"Session";
    pub const INIT_SPACE: usize = 8 + 32 + 32 + 8;

    pub fn check_is_valid(&self, player: &Pubkey, delegate: &Pubkey) -> Result<()> {
        msg!("Checking session validity");
        require_keys_eq!(self.player, *player, ZedWarsError::InvalidSession);
        require_keys_eq!(self.delegate, *delegate, ZedWarsError::InvalidSession);
        require!(
            self.valid_until > Clock::get()?.unix_timestamp,
            ZedWarsError::InvalidSession
        );
        Ok(())
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_session_size() {
        let session = Session {
            player: Pubkey::new_unique(),
            delegate: Pubkey::new_unique(),
            valid_until: 0,
        };
        let mut data = Vec::new();
        session.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), Session::INIT_SPACE);
    }
}
