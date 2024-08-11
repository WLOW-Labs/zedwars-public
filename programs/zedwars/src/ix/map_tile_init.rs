use anchor_lang::prelude::*;

use crate::{
    account_realloc,
    constants::OPERATOR_PUBKEY,
    ensure_rent_exempt,
    state::{MapTile, TileType},
};

use solana_program::{program::invoke, system_instruction};

/// The arguments for the `map_tile_init` instruction.
#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct MapTileInitArgs {
    /// The x coordinate of the map tile.
    pub x: i32,
    /// The y coordinate of the map tile.
    pub y: i32,
    /// The type of tile
    pub tile_type: TileType,
    pub can_be_barricaded: bool,
    pub can_be_searched: bool,
}

/// The accounts for the `map_tile_init` instruction.
#[derive(Accounts)]
#[instruction(args: MapTileInitArgs)]
pub struct MapTileInitAccounts<'info> {
    /// The operator of the program.
    #[account(mut,address=OPERATOR_PUBKEY)]
    pub operator: Signer<'info>,
    /// The map tile account
    #[account(init,payer=operator,space=MapTile::INIT_SPACE,seeds=[MapTile::SEED_PREFIX,args.x.to_le_bytes().as_slice(),args.y.to_le_bytes().as_slice()],bump)]
    pub map_tile: Account<'info, MapTile>,
    /// The system program.
    pub system_program: Program<'info, System>,
}

/// The handler for the `map_tile_init` instruction.
/// It must be called by the operator of the program.
///
/// # Arguments
/// * `ctx` - The instruction context.
/// * `args` - The instruction arguments.
///
/// # Returns
/// * `Result<()>` - The result of the instruction.
pub fn handle_map_tile_init(ctx: Context<MapTileInitAccounts>, args: MapTileInitArgs) -> Result<()> {
    let clock = Clock::get()?;
    // init the map tile
    ctx.accounts.map_tile.set_inner(MapTile {
        x: args.x,
        y: args.y,
        num_zombies: 0,
        num_survivors: 0,
        num_barricades: 0,
        has_generator: false,
        has_power_until: 0,
        tile_type: args.tile_type,
        can_be_barricaded: args.can_be_barricaded,
        can_be_searched: args.can_be_searched,
        last_searched_at: clock.unix_timestamp,
        lootable_items: 25,
        resupply_at: 0,
    });

    account_realloc!(ctx, map_tile, ctx.accounts.map_tile.size());
    ensure_rent_exempt!(ctx, operator, map_tile);

    Ok(())
}
