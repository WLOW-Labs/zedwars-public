use anchor_lang::prelude::*;

/// Item is an account that holds the information of an item.
/// It corresponds to an NFT.
/// PDA: [Item::SEED_PREFIX, mint.key().as_ref()]
/// Mint Address: [Item::MINT_SEED_PREFIX, item_id]
#[account]
pub struct Item {
    /// The mint of the item
    /// The id of the item.
    /// The mint of the corresponding NFT can be derived from this id.
    pub id: u32,
    /// Item type
    pub item_type: ItemType,
    pub name: String,
    pub rarity: ItemRarity,
    pub kind: ItemKind,
    // The item ID that this item converts to when doing a courier mission or crafting
    pub converts_to: u32,
}

#[account]
pub struct ItemMint {
    // The mint of the NFT
    pub mint: Pubkey,
    // The ID of the item
    pub id: u32,
}

impl ItemMint {
    /// The seed prefix for the mint of the item.
    pub const MINT_SEED_PREFIX: &'static [u8; 8] = b"ItemMint";

    /// The space for the account.
    pub const INIT_SPACE: usize = 8 + 32 + 4;
}

impl Item {
    /// The seed prefix for the PDA of the item.
    pub const SEED_PREFIX: &'static [u8; 4] = b"Item";
    /// The seed prefix for the mint of the item.
    pub const MINT_SEED_PREFIX: &'static [u8; 8] = b"ItemMint";

    /// The space for the account.
    pub fn size(item_type: ItemType, name: &str) -> usize {
        8 
        + 4 // id
        + 4 // idk
        + 4 // converts_to
        + 1 //rarity
        + 1  //kind
        + item_type.size() //item_type
        + name.len() //name
    }
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Eq, PartialEq)]
pub enum ItemRarity {
    Special,
    Untradeable,
    Common,
    Uncommon,
    Rare,
    Epic,
    Legendary,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Eq, PartialEq)]
pub enum ItemKind {
    None,
    Consumable,
    Armor,
    Axe,
    Backpack,
    BaseballBat,
    Crowbar,
    HeavyArmor,
    Knife,
    Machete,
    Pistol,
    Rifle,
    Shotgun,
}

impl ItemKind {
    pub const NUM_ITEM_KIND: usize = 13;
}

/// The type of the item.
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Eq, PartialEq)]
pub enum ItemType {
    Weapon {
        weapon_type: WeaponType,
        damage: u8,
        accuracy: u32,
        break_chance: u32,
    },
    Armor {
        armor_type: ArmorType,
        defense: u8,
        break_chance: u32,
    },
    Backpack {
        size: u8,
    },
    Consumable {
        consumable_type: ConsumableType,
        effect_value: u8,
    },
}
impl ItemType {
    /// The size of the item type.
    pub fn size(&self) -> usize {
        let mut size = 1; // variant
        match self {
            ItemType::Weapon { .. } => size += 1 + 1 + 4 + 4, // weapon_type, damage, break_chance, is_zombie_weapon
            ItemType::Armor { .. } => size += 1 + 1 + 4,      // armor_type, defense, break_chance
            ItemType::Backpack { .. } => size += 1,           // size
            ItemType::Consumable { .. } => size += 1 + 1,     // consumable_type, effect_value
        }
        size
    }
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Eq, PartialEq)]
pub enum WeaponType {
    Melee,
    Pistol,
    LongGun,
    ZombieClaw,
    ZombieBite,
    Firearm,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Eq, PartialEq)]
pub enum ArmorType {
    Heavy,
    Light,
}
#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Eq, PartialEq)]
pub enum ConsumableType {
    Health,
    Energy,
    Fuel,
    Revive,
    Generator,
    Xp,
    Premium,
    Raffle,
    Part,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone, Copy, Eq, PartialEq)]
pub enum EquipSlot {
    Weapon,
    Armor,
    Backpack,
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_item_type_size() {
        let item_type = ItemType::Weapon {
            weapon_type: WeaponType::Melee,
            damage: 1,
            accuracy: 1,
            break_chance: 1,
        };
        let data = item_type.try_to_vec().unwrap();
        assert_eq!(data.len(), item_type.size());
    }
    #[test]
    fn test_item_size() {
        let item_type = ItemType::Weapon {
            weapon_type: WeaponType::Melee,
            damage: 1,
            accuracy: 1,
            break_chance: 1,
        };
        let item = Item {
            id: 0,
            item_type,
            name: "test".to_string(),
            rarity: ItemRarity::Common,
            kind: ItemKind::Armor,
            converts_to: 0,
        };
        let mut data = Vec::new();
        item.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), Item::size(item_type, "test"));

        let item_type = ItemType::Armor {
            armor_type: ArmorType::Heavy,
            defense: 1,
            break_chance: 1,
        };
        let item = Item {
            id: 0,
            item_type,
            name: "test".to_string(),
            rarity: ItemRarity::Common,
            kind: ItemKind::Armor,
            converts_to: 0,
        };
        let mut data = Vec::new();
        item.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), Item::size(item_type, "test"));

        let item_type = ItemType::Consumable {
            consumable_type: ConsumableType::Health,
            effect_value: 1,
        };
        let item = Item {
            id: 0,
            item_type,
            name: "test".to_string(),
            rarity: ItemRarity::Common,
            kind: ItemKind::Armor,
            converts_to: 0,
        };
        let mut data = Vec::new();
        item.try_serialize(&mut data).unwrap();
        assert_eq!(data.len(), Item::size(item_type, "test"));
    }
}
