use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{Config, Skill},
};

#[derive(Accounts)]
pub struct ConfigSetSkillPointsRequiredAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The config account.
    #[account(mut,seeds=[Config::SEED_PREFIX],bump)]
    pub config: Account<'info, Config>,
    /// The system program account
    pub system_program: Program<'info, System>,
}

pub fn handle_config_set_skill_points_required(
    ctx: Context<ConfigSetSkillPointsRequiredAccounts>,
    skill: Skill,
    value: u8,
) -> Result<()> {
    // ensure the config variables vec is long enough
    if ctx.accounts.config.skill_points_required.len() < Skill::NUM_SKILLS {
        ctx.accounts.config.skill_points_required.resize(Skill::NUM_SKILLS, 0);
    }

    // set the variables
    msg!("Set the variable");
    ctx.accounts.config.skill_points_required[skill as usize] = value;

    // realloc
    account_realloc!(ctx, config, ctx.accounts.config.size());

    // ensure rent exempt
    ensure_rent_exempt!(ctx, operator, config);

    Ok(())
}
