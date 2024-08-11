use anchor_lang::prelude::*;

use crate::state::Skill;

#[event]
pub struct Attack {
    pub attacker: Pubkey,
    pub defender: Pubkey,
    pub damage: u8,
}

#[event]
pub struct TileBarricadeUpdated {
    pub character: Pubkey,
    pub x: i32,
    pub y: i32,
    pub barricade: u8,
}

#[event]
pub struct CharacterMoved {
    pub character: Pubkey,
    pub x: i32,
    pub y: i32,
}

#[event]
pub struct ItemFound {
    pub character: Pubkey,
    pub item_id: u32,
}

#[event]
pub struct CharacterItemRemoved {
    pub character: Pubkey,
    pub item_id: u32,
}

#[event]
pub struct CharacterSkillUnlocked {
    pub character: Pubkey,
    pub skill: Skill,
}

#[event]
pub struct ActionUnsuccessful {
    pub character: Pubkey,
    pub action: String,
}

#[event]
pub struct ActionSuccessful {
    pub character: Pubkey,
    pub action: String,
}

#[event]
pub struct EnterRaffle {
    pub wallet: Pubkey,
    pub quantity: u16,
}

#[event]
pub struct CharacterKilled {
    pub killer: Pubkey,
    pub victim: Pubkey, 
    pub victim_inventory: String,
}