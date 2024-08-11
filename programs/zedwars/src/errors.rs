use anchor_lang::prelude::*;

#[error_code]
pub enum ZedWarsError {
    #[msg("UnknownError")]
    UnknownError,
    #[msg("The signer is not authorized")]
    NoAuthority,
    #[msg("The session account is invalid")]
    InvalidSession,
    #[msg("Insufficient funds in the session account")]
    InsufficientFunds,
    #[msg("The mint is not initialized")]
    MintNotInitialized,
    #[msg("The mint is not a collection NFT mint")]
    NotCollectionNFT,
    #[msg("This NFT is not a valid character NFT")]
    InvalidCharacterNFT,
    #[msg("The tile provided is not valid, are you moving too fast?")]
    InvalidTile,
    #[msg("Invalid character state")]
    InvalidCharacterState,
    #[msg("The item provided is not valid")]
    InvalidItem,
    #[msg("The search result is invalid")]
    InvalidSearchResult,
    #[msg("The character cannot attack yet")]
    AttackCoolingDown,
    #[msg("Street Tiles cannot be barricaded")]
    CannotBarricadeTile,
    #[msg("Cannot attack yourself")]
    CannotAttackYourself,
    #[msg("Tile is heavily barricaded and cannot be entered")]
    TileHeavilyBarricaded,
    #[msg("Character cannot do any other actions while searching")]
    CharacterIsSearching,
    #[msg("You cannot do any actions while dead")]
    CharacterIsDead,
    #[msg("You do not have enough stamina to complete the action")]
    CharacterOutOfEnergy,
    #[msg("You are not on the same tile as the target")]
    CharacterNotOnSameTile,
    #[msg("Character is not cooled down yet")]
    CharacterOnAttackCoolDown,
    #[msg("Character is a zombie")]
    CharacterIsAZombie,
    #[msg("Tile is not barricaded")]
    TileNotBarricaded,
    #[msg("Inventory is full")]
    InventoryFull,
    #[msg("Not enough skill points")]
    NotEnoughSkillPoints,
    #[msg("The item is not in your inventory")]
    MissingItem,
    #[msg("The skill is already unlocked")]
    SkillAlreadyUnlocked,
    #[msg("You can only do one action per block")]
    CharacterActionOnCooldown,
    #[msg("Missing the build barricade skill")]
    MissingBarricadeBuilderSkill,
    #[msg("Target is dead")]
    TargetIsDead,
    #[msg("You do not have the item you are trying to use")]
    MissingItemInInventory,
    #[msg("You have recently found an item or have been attacked. Please try again later")]
    MintOnCooldown,
    #[msg("You are trying to add the wrong item to your inventory")]
    WrongItem,
    #[msg("Zombies cannot use items")]
    NoItemZombie,
    #[msg("Zombies cannot equip items")]
    EquipItemZombie,
    #[msg("Target is not dead")]
    TargetIsNotDead,
    #[msg("You cannot loot this character yet, killer privilege has not expired")]
    LootPrivilegeNotExpired,
    #[msg("Target does not have the item")]
    TargetDoesNotHaveItem,
    #[msg("Tile does not have a generator installed")]
    NoGeneratorInstaller,
    #[msg("Trying to resize to a smaller size, please try again")]
    InvalidSize,
    #[msg("Missing the barricade destroyer skill")]
    MissingBarricadeDestroyerSkill,
    #[msg("Zombies cannot redeem items")]
    NoRedeemZombie,
    #[msg("Missing the drag skill")]
    MissingDragSkill,
    #[msg("You cannot attack another human")]
    CannotAttackAnotherHuman,
    #[msg("This tile is not eligible for a ranged attack")]
    InvalidRangedTile,
    #[msg("You cannot complete this action as a human")]
    CannotBeHuman,
    #[msg("You cannot complete this action as a zombie")]
    CannotBeZombie,
    #[msg("The target cannot be a zombie")]
    TargetCannotBeZombie,
    #[msg("Target's health is too high to be dragged")]
    InvalidDragHealth,
    #[msg("The destination tile is invalid")]
    DestinationInvalid,
    #[msg("You are not on the tile you are trying to search")]
    SearchingWrongTile,
    #[msg("The tile is not a valid tile for crafting")]
    WrongTileForCrafting,
    #[msg("The tile does not have a generator installed")]
    MissingGenerator,
    #[msg("The tile does not have a generator with fuel")]
    TileNotPowered,
    #[msg("Trying to unequip an empty slot")]
    UnequipEmptySlot,
    #[msg("Name must be no longer than 12 characters")]
    NameTooLong,
    #[msg("Name change is unavailable, please unlock it")]
    NoNameChangeAvailable,
    #[msg("Missions can only be generated once every 7 days")]
    MissionsRecently,
    #[msg("You have too many active missions, please complete some before getting more")]
    TooManyActiveMissions,
    #[msg("The character already has premium applied to it.")]
    AlreadyHasPremium,
    #[msg("The character is already on a courier mission, please cancel or complete the currently active one")]
    AlreadyOnCourierMission,
    #[msg("Invalid item for a courier mission")]
    InvalidItemForMission,
    #[msg("You are not on a courier mission")]
    NotOnCourierMission,
    #[msg("You cannot do this action while having an active courier mission")]
    NoActionCourier,
    #[msg("You do not have enough blueprints to craft the item")]
    InsufficientBlueprints,
    #[msg("This item cannot be crafted")]
    InvalidCraftingItem,
    #[msg("There is no legendary items available for that item kind, please try again later")]
    NoLegendaryAvailable,
    #[msg("You need premium in order to turn an item into an NFT")]
    PremiumMint,
    #[msg("Invalid layer combination provided, please check and try again")]
    InvalidLayers,
    #[msg("Mismatching asset id")]
    MismatchAsset,
    #[msg("Invalid merkle tree size")]
    UnsupportedTreeAccountSize,
    #[msg("Not enough tickets")]
    NotEnoughTickets,
    #[msg("Name must be 3 or more characters in length")]
    NameTooShort,
    #[msg("Starting tile must not have any barricades on it")]
    InvalidStartingTile,
    #[msg("The tile has no lootable items on it, please wait a while before trying again.")]
    TileExhausted,
    #[msg("This action can only be completed by a zombie")]
    ZombieAction,
    #[msg("You are not able to complete any actions while a revive is pending")]
    RevivePending,
    #[msg("Game is paused, please try again later")]
    GamePaused,
    #[msg("No revive pending")]
    NoPendingRevive,
    #[msg("This zombie already has a revive pending")]
    AlreadyReviving,
}
