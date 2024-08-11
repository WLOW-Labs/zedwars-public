mod constants;
mod errors;
mod events;
mod ix;
mod state;

use anchor_lang::prelude::*;
use ix::*;
use state::*;
use crate::constants::PlayerVerifyArgs;

declare_id!("zwars5DyyarECuXn4rUCrGbrf1BV598tCRbSSHDjJKA");

#[program]
pub mod zedwars {

    use super::*;

    pub fn character_attack<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterAttackAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_attack(ctx, args)
    }
    pub fn character_barricade<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterBarricadeAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_barricade(ctx, args)
    }
    pub fn character_bury<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterBuryAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_bury(ctx, args)
    }
    pub fn character_destroy_barricade<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterDestroyBarricadeAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_destroy_barricade(ctx, args)
    }
    pub fn character_destroy_generator<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterDestroyGeneratorAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_destroy_generator(ctx, args)
    }
    pub fn character_drag<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterDragAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_drag(ctx, args)
    }
    pub fn character_generate_missions<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterGenerateMissionsAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_generate_missions(ctx, args)
    }
    pub fn character_init(ctx: Context<CharacterInitAccounts>, args: CharacterInitArgs) -> Result<()> {
        ix::handle_character_init(ctx, args)
    }
    pub fn character_loot<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterLootAccounts<'info>>, 
        args: CharacterLootArgs
    ) -> Result<()> {
        ix::handle_character_loot(ctx, args)
    }
    pub fn character_move<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterMoveAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_move(ctx, args)
    }
    pub fn character_resize(ctx: Context<ResizeCharacterAccounts>, size: u32) -> Result<()> {
        ix::handle_resize_character(ctx, size)
    }
    pub fn character_rename<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterRenameAccounts<'info>>, 
        args: CharacterRenameArgs
    ) -> Result<()> {
        ix::handle_character_rename(ctx, args)
    }
    pub fn character_revive<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterReviveAccounts<'info>>, 
        args: CharacterReviveArgs
    ) -> Result<()> {
        ix::handle_character_revive(ctx, args)
    }
    pub fn character_search<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterSearchAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_search(ctx, args)
    }
    pub fn character_stand_back_up<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterStandBackUpAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_stand_back_up(ctx, args)
    }
    pub fn character_unlock_skill<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterUnlockSkillAccounts<'info>>, 
        args: CharacterUnlockSkillArgs
    ) -> Result<()> {
        ix::handle_character_skill_unlock(ctx, args)
    }
    pub fn character_update(ctx: Context<CharacterUpdateAccounts>, args: CharacterUpdateArgs) -> Result<()> {
        ix::handle_character_update(ctx, args)
    }
    pub fn character_upgrade<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterUpgradeAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_character_upgrade(ctx, args)
    }
    pub fn character_use_item<'info>(
        ctx: Context<'_, '_, '_, 'info, CharacterUseItemAccounts<'info>>, 
        args: CharacterUseItemArgs
    ) -> Result<()> {
        ix::handle_character_use_item(ctx, args)
    }
    pub fn config_add_legendary_item(ctx: Context<ConfigAddLegendaryItemAccounts>, item_kind: ItemKind, item_id: u32) -> Result<()> {
        ix::handle_config_add_legendary_item(ctx, item_kind, item_id)
    }
    pub fn config_add_rare_drop_table_item(ctx: Context<ConfigAddRareDropTableItemAccounts>, item_id: u32) -> Result<()> {
        ix::handle_config_add_rare_drop_table_item(ctx, item_id)
    }
    pub fn config_init(ctx: Context<ConfigInitAccounts>) -> Result<()> {
        ix::handle_config_init(ctx)
    }
    pub fn config_register_item(ctx: Context<ConfigRegisterItemAccounts>, args: ConfigRegisterItemArgs) -> Result<()> {
        ix::handle_config_register_item(ctx, args)
    }
    pub fn config_resize(ctx: Context<ResizeConfigAccounts>, size: u32) -> Result<()> {
        ix::handle_resize_config(ctx, size)
    }
    pub fn config_set_item_random_weights(
        ctx: Context<ConfigSetItemRandomWeightsAccounts>,
        tile_type: TileType,
        weights: Vec<ItemRandomWeight>,
    ) -> Result<()> {
        ix::handle_config_set_item_random_weights(ctx, tile_type, weights)
    }
    pub fn config_set_merkle_tree(ctx: Context<ConfigSetMerkleTreeAccounts>, args: ConfigSetMerkleTreeArgs) -> Result<()> {
        ix::handle_config_set_merkle_tree(ctx, args)
    }
    pub fn config_set_search_success_rate(
        ctx: Context<ConfigSetSearchSuccessRateAccounts>,
        tile_type: TileType,
        value: u32,
    ) -> Result<()> {
        ix::handle_config_set_search_success_rate(ctx, tile_type, value)
    }
    pub fn config_set_skill_points_required(
        ctx: Context<ConfigSetSkillPointsRequiredAccounts>,
        skill: Skill,
        value: u8,
    ) -> Result<()> {
        ix::handle_config_set_skill_points_required(ctx, skill, value)
    }
    pub fn config_set_loot_regen_rate(
        ctx: Context<ConfigSetLootRegenRateAccounts>,
        tile_type: TileType,
        value: u32,
    ) -> Result<()> {
        ix::handle_config_set_loot_regen_rate(ctx, tile_type, value)
    }
    pub fn config_set_variables(ctx: Context<ConfigSetVariablesAccounts>, key: ConfigVar, value: u32) -> Result<()> {
        ix::handle_config_set_variables(ctx, key, value)
    }
    pub fn courier_mission_end<'info>(
        ctx: Context<'_, '_, '_, 'info, CourierMissionEndAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_courier_mission_end(ctx, args)
    }
    pub fn courier_mission_start<'info>(
        ctx: Context<'_, '_, '_, 'info, CourierMissionStartAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_courier_mission_start(ctx, args)
    }
    pub fn item_airdrop<'info>(ctx: Context<'_, '_, '_, 'info, ItemAirdropAccounts<'info>>, args: ItemAirdropArgs) -> Result<()> {
        ix::handle_item_airdrop(ctx, args)
    }
    pub fn item_craft<'info>(
        ctx: Context<'_, '_, '_, 'info, ItemCraftAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_item_craft(ctx, args)
    }
    pub fn item_destroy<'info>(
        ctx: Context<'_, '_, '_, 'info, ItemDestroyAccounts<'info>>, 
        args: ItemDestroyArgs
    ) -> Result<()> {
        ix::handle_item_destroy(ctx, args)
    }
    pub fn item_equip<'info>(
        ctx: Context<'_, '_, '_, 'info, ItemEquipAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_item_equip(ctx, args)
    }
    pub fn item_mint<'info>(ctx: Context<'_, '_, '_, 'info, ItemMintAccounts<'info>>, args: ItemMintArgs) -> Result<()> {
        ix::handle_item_mint(ctx, args)
    }
    pub fn item_redeem<'info>(
        ctx: Context<'_, '_, '_, 'info, ItemRedeemAccounts<'info>>,     
        args: ItemRedeemArgs
    ) -> Result<()> {
        ix::handle_item_redeem(ctx, args)
    }
    pub fn item_unequip<'info>(
        ctx: Context<'_, '_, '_, 'info, ItemUnequipAccounts<'info>>, 
        args: ItemUnequipArgs
    ) -> Result<()> {
        ix::handle_item_unequip(ctx, args)
    }
    pub fn item_update(ctx: Context<UpdateItemAccounts>, args: UpdateItemArgs) -> Result<()> {
        ix::handle_item_update(ctx, args)
    }
    pub fn enter_raffle<'info>(
        ctx: Context<'_, '_, '_, 'info, EnterRaffleAccounts<'info>>, 
        args: EnterRaffleArgs
    ) -> Result<()> {
        ix::handle_enter_raffle(ctx, args)
    }
    pub fn map_tile_init(ctx: Context<MapTileInitAccounts>, args: MapTileInitArgs) -> Result<()> {
        ix::handle_map_tile_init(ctx, args)
    }
    pub fn map_tile_update(ctx: Context<MapTileUpdateAccounts>, args: MapTileUpdateArgs) -> Result<()> {
        ix::handle_map_tile_update(ctx, args)
    }
    pub fn ransack_tile<'info>(
        ctx: Context<'_, '_, '_, 'info, RansackTileAccounts<'info>>, 
        args: PlayerVerifyArgs
    ) -> Result<()> {
        ix::handle_ransack_tile(ctx, args)
    }
    pub fn session_close(ctx: Context<SessionCloseAccounts>) -> Result<()> {
        ix::handle_session_close(ctx)
    }
    pub fn session_init(ctx: Context<SessionInitAccounts>, args: SessionInitArgs) -> Result<()> {
        ix::handle_session_init(ctx, args)
    }
    pub fn item_resize(ctx: Context<ResizeItemAccounts>, size: u32) -> Result<()> {
        ix::handle_resize_item(ctx, size)
    }
    pub fn resize_tile(ctx: Context<ResizeTileAccounts>, size: u32) -> Result<()> {
        ix::handle_resize_tile(ctx, size)
    }
    pub fn withdraw_treasury(ctx: Context<WithdrawTreasuryAccounts>) -> Result<()> {
        ix::handle_withdraw_treasury(ctx)
    }
}
