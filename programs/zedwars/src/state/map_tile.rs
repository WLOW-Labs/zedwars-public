use anchor_lang::prelude::*;

use super::{Config, ConfigVar};

/// MapTile is a struct that represents a tile on the map.
/// It contains the number of zombies, survivors, barricades on the tile.
/// It also contains the name of the tile.
/// It also contains the item weights for the tile which is used to determine what items could be found on the tile.
/// PDA: [MapTile::SEED_PREFIX,x.to_le_bytes().as_slice(),y.to_le_bytes().as_slice()]
#[account]
pub struct MapTile {
    /// The x coordinate of the map tile.
    pub x: i32,
    /// The y coordinate of the map tile.
    pub y: i32,
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
    /// whether or not the tile can be barricaded
    pub can_be_barricaded: bool,
    /// whether or not the tile can be searched
    pub can_be_searched: bool,
    /// The time when the tile was last searched
    pub last_searched_at: i64,
    /// How many items there are that can be lootable
    pub lootable_items: u8,
    /// When the tile will be resupplied
    pub resupply_at: i64,
}

impl MapTile {
    /// The seed prefix for the PDA.
    pub const SEED_PREFIX: &'static [u8; 7] = b"MapTile";
    /// Init space for map tile account
    pub const INIT_SPACE: usize = 8 + 4 + 4 + 4 + 4 + 1 + 1 + 8 + 1 + 1 + 1 + 8 + 1 + 8;

    /// Create a new map tile.
    ///
    /// # Arguments
    /// * `x` - The x coordinate of the map tile.
    /// * `y` - The y coordinate of the map tile.
    /// * `items` - The item weights for the map tile.
    ///
    /// # Returns
    /// * `MapTile` - The new map tile.
    pub fn new(x: i32, y: i32, tile_type: TileType) -> Self {
        Self {
            x,
            y,
            num_zombies: 0,
            num_survivors: 0,
            num_barricades: 0,
            has_generator: false,
            has_power_until: 0,
            tile_type,
            can_be_barricaded: false,
            can_be_searched: false,
            last_searched_at: 0,
            lootable_items: 0,
            resupply_at: 0,
        }
    }

    /// Whether the map tile is adjacent to another map tile.
    /// Only cardinal directions are considered adjacent.
    ///
    /// # Arguments
    /// * `other` - The other map tile.
    ///
    /// # Returns
    /// * `bool` - Whether the map tile is adjacent to the other map tile.
    pub fn is_adjacent(&self, other_x: &i32, other_y: &i32) -> bool {
        let x_diff = (self.x - other_x).abs();
        let y_diff = (self.y - other_y).abs();
        (x_diff == 1 && y_diff == 0) || (x_diff == 0 && y_diff == 1)
    }

    /// Pick a random item from the map tile.
    /// The item is picked based on the item weights.
    /// If the item weights are empty, then None is returned.
    /// If the item weights are not empty, then a random item is picked.
    ///
    /// # Arguments
    /// * `random_number` - The random number to use to pick the item.
    ///
    /// # Returns
    /// * `Option<u64>` - The item id of the item that was picked. None if no item was picked.
    pub fn search_tile(&self, random_number: u32, config: &Config, has_rdt_access: bool) -> Option<u32> {
        msg!("Has RDT Access: {}", has_rdt_access);
        // calculate total weights
        let mut random_weights = config.get_item_random_weight(self.tile_type.clone()).clone();
        // only add rdt access if there is actual rewards
        if has_rdt_access && !config.rare_drop_table.is_empty() {
            msg!("Adding RDT access to drop");
            random_weights.push(super::ItemRandomWeight { item_id: 0, weight: 1 });
        }
        let total_weights = random_weights.iter().fold(0, |acc, item| acc + item.weight);
        if total_weights == 0 {
            None
        } else {
            let mut random_number = random_number % total_weights;
            for item in random_weights.iter() {
                if random_number < item.weight {
                    return Some(item.item_id);
                } else {
                    random_number -= item.weight;
                }
            }
            None
        }
    }

    pub fn update_tile_loot(&mut self, config: &Config) {
        let clock = Clock::get();
        let current_timestamp = clock.unwrap_or_default().unix_timestamp;
        msg!(
            "Checking at {}, last searched at {}",
            current_timestamp,
            self.last_searched_at
        );
        let regen_rate = config.loot_regen_rates[self.tile_type.to_usize()] as i64;
        msg!("Regen Rate: {}", regen_rate);
        let calculated_loot = (current_timestamp - self.last_searched_at) / regen_rate;
        let new_loot = std::cmp::min(calculated_loot, u8::MAX as i64);
        msg!("{} new loot", new_loot);
        self.lootable_items = self.lootable_items.saturating_add(new_loot as u8);

        if current_timestamp > self.resupply_at && self.resupply_at != 0 {
            self.resupply_at = 0;
            self.lootable_items = self
                .lootable_items
                .saturating_add(config.get_config_variable(ConfigVar::MaxTileLoot) as u8);
        }

        let leftover_time = (current_timestamp - self.last_searched_at) % regen_rate;

        self.last_searched_at = current_timestamp - leftover_time;
    }

    pub fn barricade_success_rate(&self) -> u32 {
        let slope = (0 - 9500) as f32 / (250 - 0) as f32;
        let intercept = 9500 as f32;
        let rate = slope * (self.num_barricades as f32) + intercept;
        if rate < 0.0 {
            0
        } else {
            rate as u32
        }
    }

    pub fn size(&self) -> usize {
        let mut size = MapTile::INIT_SPACE;
        size += self.tile_type.size();
        size
    }
}

#[derive(Clone, Debug, PartialEq, Eq, AnchorSerialize, AnchorDeserialize)]
pub enum TileType {
    Street,
    Hospital,
    Apartment,
    PoliceStation,
    Warehouse,
    FireStation,
    ZedCorp,
    Factory,
    SecretLocation,
    Afk,
    Courier {
        rare: Vec<Point>,
        epic: Vec<Point>,
        legendary: Vec<Point>,
    },
    Arcade,
}
impl TileType {
    // Number of tile types
    pub const NUM_TILE_TYPES: usize = 12;

    pub fn size(&self) -> usize {
        match self {
            TileType::Courier {
                rare,
                epic,
                legendary,
            } => {
                let mut size = 0;
                size += 4 + (rare.len() * 8);
                size += 4 + (epic.len() * 8);
                size += 4 + (legendary.len() * 8);
                size
            }
            _ => 1,
        }
    }

    pub fn to_usize(&self) -> usize {
        match *self {
            TileType::Street => 0,
            TileType::Hospital => 1,
            TileType::Apartment => 2,
            TileType::PoliceStation => 3,
            TileType::Warehouse => 4,
            TileType::FireStation => 5,
            TileType::ZedCorp => 6,
            TileType::Factory => 7,
            TileType::SecretLocation => 8,
            TileType::Afk => 9,
            TileType::Courier { .. } => 10,
            TileType::Arcade => 11,
        }
    }
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, AnchorSerialize, AnchorDeserialize)]
pub struct Point {
    pub x: i32,
    pub y: i32,
}
#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_map_tile_size() {
        let map_tile = MapTile {
            x: 0,
            y: 0,
            num_zombies: 0,
            num_survivors: 0,
            num_barricades: 0,
            has_generator: false,
            tile_type: TileType::Street,
            has_power_until: 0,
            can_be_barricaded: false,
            can_be_searched: false,
            last_searched_at: 0,
            lootable_items: 0,
            resupply_at: 0,
        };
        let mut data = Vec::new();
        map_tile.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), MapTile::INIT_SPACE);
    }

    #[test]
    fn test_courier_tile_size() {
        let map_tile = MapTile {
            x: 0,
            y: 0,
            num_zombies: 0,
            num_survivors: 0,
            num_barricades: 0,
            has_generator: false,
            tile_type: TileType::Courier {
                rare: vec![Point { x: 1, y: 1 }, Point { x: 1, y: 1 }, Point { x: 1, y: 1 }],
                epic: vec![Point { x: 1, y: 1 }],
                legendary: vec![Point { x: 1, y: 1 }],
            },
            has_power_until: 0,
            can_be_barricaded: false,
            can_be_searched: false,
            last_searched_at: 0,
            lootable_items: 0,
            resupply_at: 0,
        };
        let mut data = Vec::new();
        map_tile.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), map_tile.size());
    }

    #[test]
    fn test_is_adjacent() {
        let tile_center = MapTile::new(0, 0, TileType::Apartment);
        let tile_left = MapTile::new(-1, 0, TileType::Apartment);
        let tile_right = MapTile::new(1, 0, TileType::Apartment);
        let tile_up = MapTile::new(0, 1, TileType::Apartment);
        let tile_down = MapTile::new(0, -1, TileType::Apartment);
        let tile_up_left = MapTile::new(-1, 1, TileType::Apartment);
        let tile_up_right = MapTile::new(1, 1, TileType::Apartment);
        let tile_down_left = MapTile::new(-1, -1, TileType::Apartment);
        let tile_down_right = MapTile::new(1, -1, TileType::Apartment);
        assert!(tile_center.is_adjacent(&tile_left.x, &tile_left.y));
        assert!(tile_center.is_adjacent(&tile_right.x, &tile_right.y));
        assert!(tile_center.is_adjacent(&tile_up.x, &tile_up.y));
        assert!(tile_center.is_adjacent(&tile_down.x, &tile_down.y));
        assert!(!tile_center.is_adjacent(&tile_up_left.x, &tile_up_left.y));
        assert!(!tile_center.is_adjacent(&tile_up_right.x, &tile_up_right.y));
        assert!(!tile_center.is_adjacent(&tile_down_left.x, &tile_down_left.y));
        assert!(!tile_center.is_adjacent(&tile_down_right.x, &tile_down_right.y));
    }
    //#[test]
    //fn test_weighted_random_item_pick() {
    //    let mut map_tile = MapTile::new(0, 0, "".to_string(), vec![]);
    //    assert_eq!(map_tile.weighted_random_item_pick(0), None);
    //    map_tile.item_weights.push(ItemRandomWeight { item_id: 0, weight: 1 });
    //    assert_eq!(map_tile.weighted_random_item_pick(0), Some(0));
    //    assert_eq!(map_tile.weighted_random_item_pick(1), Some(0));
    //    map_tile.item_weights.push(ItemRandomWeight { item_id: 1, weight: 1 });
    //    assert_eq!(map_tile.weighted_random_item_pick(0), Some(0));
    //    assert_eq!(map_tile.weighted_random_item_pick(1), Some(1));
    //    assert_eq!(map_tile.weighted_random_item_pick(2), Some(0));
    //    assert_eq!(map_tile.weighted_random_item_pick(3), Some(1));
    //    map_tile.item_weights.push(ItemRandomWeight { item_id: 2, weight: 1 });
    //    assert_eq!(map_tile.weighted_random_item_pick(0), Some(0));
    //    assert_eq!(map_tile.weighted_random_item_pick(1), Some(1));
    //    assert_eq!(map_tile.weighted_random_item_pick(2), Some(2));
    //    assert_eq!(map_tile.weighted_random_item_pick(3), Some(0));
    //    assert_eq!(map_tile.weighted_random_item_pick(4), Some(1));
    //    assert_eq!(map_tile.weighted_random_item_pick(5), Some(2));
    //}
}
