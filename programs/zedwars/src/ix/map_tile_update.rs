use anchor_lang::prelude::*;

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{MapTile, TileType},
};

use solana_program::{program::invoke, system_instruction};

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct MapTileUpdateArgs {
    /// The number of zombies on the map tile.
    pub num_zombies: u32,
    /// The number of survivors on the map tile.
    pub num_survivors: u32,
    /// The number of barricades on the map tile.
    pub num_barricades: u8,
    /// Whether the map tile has a generator.
    pub has_generator: bool,
    /// The time until the generator has power.
    pub has_power_until: i64,
    /// The type of tile
    pub tile_type: TileType,
    /// Number of lootable items to reset it to
    pub lootable_items: u8,
    /// Whether or not a tile can be searched
    pub can_be_searched: bool,
    /// Whether or not a tile can be barricaded
    pub can_be_barricaded: bool,

}
#[derive(Accounts)]
pub struct MapTileUpdateAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The map tile account
    #[account(mut,seeds=[MapTile::SEED_PREFIX,map_tile.x.to_le_bytes().as_slice(),map_tile.y.to_le_bytes().as_slice()],bump)]
    pub map_tile: Account<'info, MapTile>,
    pub system_program: Program<'info, System>,
}

pub fn handle_map_tile_update(ctx: Context<MapTileUpdateAccounts>, args: MapTileUpdateArgs) -> Result<()> {
    let clock = Clock::get()?;

    ctx.accounts.map_tile.num_zombies = args.num_zombies;
    ctx.accounts.map_tile.num_survivors = args.num_survivors;
    ctx.accounts.map_tile.num_barricades = args.num_barricades;
    ctx.accounts.map_tile.has_generator = args.has_generator;
    ctx.accounts.map_tile.has_power_until = args.has_power_until;
    ctx.accounts.map_tile.tile_type = args.tile_type;
    ctx.accounts.map_tile.last_searched_at = clock.unix_timestamp;
    ctx.accounts.map_tile.lootable_items = args.lootable_items;
    ctx.accounts.map_tile.can_be_barricaded = args.can_be_barricaded;
    ctx.accounts.map_tile.can_be_searched = args.can_be_searched;

    account_realloc!(ctx, map_tile, ctx.accounts.map_tile.size());
    ensure_rent_exempt!(ctx, operator, map_tile);

    Ok(())
}
