export interface SkillInfo {
    skill: string
    skillName: string
    description: string
    skillPoints: number
    position: number
}
export const SkillList: SkillInfo[] = [
    {
        skill: "parkour",
        skillName: "Parkour",
        description: "Allows for the player to enter buildings that are heavily barricaded that would not normally be accessible. Player must be in a building for it to work, cannot enter from the street.",
        skillPoints: 1,
        position: 0,
    },
    {
        skill: "barricadeBuilder",
        skillName: "Barricade Builder",
        description: "Allows the player to build barricades on non street tiles",
        skillPoints: 1,
        position: 1
    },
    {
        skill: "unarmedCombat",
        skillName: "Unarmed Combat",
        description: "Increases damage dealt with no weapon equipped by 2",
        skillPoints: 3,
        position: 2
    },
    {
        skill: "bodyBuilder",
        skillName: "Body Builder",
        description: "Increases max health by 10",
        skillPoints: 3,
        position: 3
    },
    {
        skill: "advancedUnarmedCombat",
        skillName: "Advanced Unarmed Combat",
        description: "Increases damage dealt with no weapon equipped by 3",
        skillPoints: 8,
        position: 4
    },
    {
        skill: "looter",
        skillName: "Looter",
        description: "Improves the loot luck rate by 5",
        skillPoints: 8,
        position: 5
    },
    {
        skill: "advancedLooter",
        skillName: "Advanced Looter",
        description: "Improves the loot luck rate by 10",
        skillPoints: 15,
        position: 6
    },
    {
        skill: "thickSkin",
        skillName: "Thick Skin",
        description: "Reduces damage when being attacked by 1",
        skillPoints: 1,
        position: 7
    },
    {
        skill: "advancedMelee",
        skillName: "Advanced Melee",
        description: "Increases damage when using melee weapons by 3",
        skillPoints: 3,
        position: 8
    },
    {
        skill: "pistolProficiency",
        skillName: "Pistol Proficiency",
        description: "Increases damage when using pistols by 3",
        skillPoints: 5,
        position: 9
    },
    {
        skill: "longGunProficiency",
        skillName: "Long Gun Proficiency",
        description: "Increases damage when using long guns by 5",
        skillPoints: 5,
        position: 10
    },
    {
        skill: "rangedAccuracy",
        skillName: "Ranged Accuracy",
        description: "Improves accuracy when using pistols and long guns by 15",
        skillPoints: 10,
        position: 11
    },
    {
        skill: "advancedHealing",
        skillName: "Advanced Healing",
        description: "Increases the healing amount done by any first aid kits used (either on yourself or on other players) by 10",
        skillPoints: 2,
        position: 12
    },
    {
        skill: "techLooter",
        skillName: "Tech Looter",
        description: "Improves loot chance in ZedCorp buildings by 10",
        skillPoints: 5,
        position: 13
    },
    {
        skill: "revivalSyringeCrafter",
        skillName: "Revival Syringe Crafter",
        description: "Allows for the ability to manufacture convert zombie syringes in a powered ZedCorp building",
        skillPoints: 10,
        position: 14
    },
    {
        skill: "adrenalineSyringeCrafter",
        skillName: "Adrenaline Syringe Crafter",
        description: "Allows for the ability to manufacture adrenaline syringes in a powered ZedCorp building",
        skillPoints: 25,
        position: 15
    },
    {
        skill: "experienceSyringeCrafter",
        skillName: "Experience Syringe Crafter",
        description: "Allows for the ability to manufacture xp syringes in a powered ZedCorp building",
        skillPoints: 25,
        position: 16
    },
    {
        skill: "barricadeDestroyer",
        skillName: "Barricade Destroyer",
        description: "Destroy up to 2 barricades at once.",
        skillPoints: 1,
        position: 17
    },
    {
        skill: "infectedBite",
        skillName: "Infected Bite",
        description: "Gives bite weapon a chance of infecting the target (if they are a survivor) that causes one damage every time they try and take an action ",
        skillPoints: 2,
        position: 18
    },
    {
        skill: "enhancedBite",
        skillName: "Empowered Bite",
        description: "Increases damage dealt when biting by 3",
        skillPoints: 10,
        position: 19
    },
    {
        skill: "enhancedClaws",
        skillName: "Empowered Claws",
        description: "Increases damage dealt when using claws by 5",
        skillPoints: 10,
        position: 20
    },
    {
        skill: "healingAttack",
        skillName: "Healing Bite",
        description: "Gain health equal to damage dealt",
        skillPoints: 5,
        position: 21
    },
    {
        skill: "drag",
        skillName: "Drag",
        description: "Allows you to drag a survivor from an adjacent tile into yours if they are under 25 hp",
        skillPoints: 5,
        position: 22
    },
    {
        skill: "tankyFlesh",
        skillName: "Tanky Flesh",
        description: "Reduces damage taken by 1 ",
        skillPoints: 5,
        position: 23
    },
    {
        skill: "speedWalking",
        skillName: "Speed Walker",
        description: "Reduces energy to move a tile from 2 to 1",
        skillPoints: 1,
        position: 24
    },
    {
        skill: "mutatedZombie",
        skillName: "Mutated Zombie",
        description: "Doubles xp gain, damage dealt and max health while a zombie",
        skillPoints: 25,
        position: 25
    },
    {
        skill: "firearmsTraining",
        skillName: "Firearms Training",
        description: "Doubles xp gain, damage dealt and max health while a zombie",
        skillPoints: 3,
        position: 26
    },
    {
        skill: "advancedFirearmsTraining",
        skillName: "Advanced Firearms Training",
        description: "Doubles xp gain, damage dealt and max health while a zombie",
        skillPoints: 7,
        position: 27
    },{
        skill: "weaponMaintenance",
        skillName: "Weapon Maintenance",
        description: "Doubles xp gain, damage dealt and max health while a zombie",
        skillPoints: 10,
        position: 28
    },
    {
        skill: "zombieAccuracy",
        skillName: "Zombie Accuracy",
        description: "Improves accuracy when using zombie weapons",
        skillPoints: 3,
        position: 29
    },
    {
        skill: "advancedZombieAccuracy",
        skillName: "Advanced Zombie Accuracy",
        description: "Further improves accuracy when using zombie weapons",
        skillPoints: 7,
        position: 30
    },
]