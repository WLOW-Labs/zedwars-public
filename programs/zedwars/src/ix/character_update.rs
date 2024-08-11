use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{Character, EquippedItems, Event, Skill},
};
use anchor_lang::prelude::*;
use solana_program::{program::invoke, system_instruction};

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct CharacterUpdateArgs {
    /// The x coordinate of the character.
    pub x: i32,
    /// The y coordinate of the character.
    pub y: i32,
    /// The HP of the character.
    pub hp: u8,
    /// The flag to determine if the character is a zombie.
    pub is_zombie: bool,
    /// The XP of the character.
    pub xp: u32,
    /// Bonus xp
    pub bonus_xp: u32,
    /// The level of the character.
    pub level: u16,
    /// The skill points of the character.
    pub skill_points: u16,
    /// The time when the character last attacked.
    pub last_attacked_at: i64,
    /// The time when the character last acted.
    pub last_acted_at: i64,
    /// The flag to determine if the character is infected and should take damage when doing actions that expend energy
    pub is_infected: bool,
    /// The energy of the character.
    pub energy: u8,
    /// The time when the energy value was last updated.
    /// Used to calculate the real energy value.
    pub energy_updated_at: i64,
    /// Addtional backpack space
    pub backpack_space: u8,
    /// How many items the character has.
    pub inventory: Vec<u32>,
    /// The equipped items of the character.
    pub equipped_items: EquippedItems,
    // Skills
    pub skills: Vec<bool>,
    // Killer
    pub killed_by: Option<Pubkey>,
    // Time they were killed at
    pub killed_at: Option<i64>,
    // New name
    pub name: String,
    // Premium status
    pub has_premium: bool,
}
#[derive(Accounts)]
pub struct CharacterUpdateAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The character account
    #[account(mut,seeds=[Character::SEED_PREFIX,character.mint.as_ref()],bump)]
    pub character: Account<'info, Character>,
    pub system_program: Program<'info, System>,
}

pub fn handle_character_update(ctx: Context<CharacterUpdateAccounts>, args: CharacterUpdateArgs) -> Result<()> {
    ctx.accounts.character.x = args.x;
    ctx.accounts.character.y = args.y;
    ctx.accounts.character.hp = args.hp;
    ctx.accounts.character.is_zombie = args.is_zombie;
    ctx.accounts.character.xp = args.xp;
    ctx.accounts.character.bonus_xp = args.bonus_xp;
    ctx.accounts.character.level = args.level;
    ctx.accounts.character.skill_points = args.skill_points;
    ctx.accounts.character.last_attacked_at = args.last_attacked_at;
    ctx.accounts.character.last_acted_at = args.last_acted_at;
    ctx.accounts.character.is_infected = args.is_infected;
    ctx.accounts.character.energy = args.energy;
    ctx.accounts.character.energy_updated_at = args.energy_updated_at;
    ctx.accounts.character.backpack_space = args.backpack_space;
    ctx.accounts.character.inventory = args.inventory;
    ctx.accounts.character.equipped_items = args.equipped_items;
    ctx.accounts.character.skills = args.skills;
    ctx.accounts.character.killed_by = args.killed_by;
    ctx.accounts.character.killed_at = args.killed_at;
    ctx.accounts.character.name = args.name;
    ctx.accounts.character.has_premium = args.has_premium;
    ctx.accounts.character.add_event(Event {
        message: "Character Updated".to_string(),
        timestamp: Clock::get()?.unix_timestamp,
        severity: 3,
        block: Clock::get()?.slot,
    });

    // if skills is not long enough, fill it with false
    if ctx.accounts.character.skills.len() < Skill::NUM_SKILLS {
        ctx.accounts.character.skills.resize(Skill::NUM_SKILLS, false);
    }

    account_realloc!(ctx, character, ctx.accounts.character.size());
    ensure_rent_exempt!(ctx, operator, character);

    Ok(())
}
