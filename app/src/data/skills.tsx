export interface SkillInfo {
    skill: string
    skillName: string
    description: string
    skillPoints: number
    position: number
}
export const skillList = {
    "civilian": [
        {
            skill: "parkour",
            skillName: "Parkour",
            description: "Allows for the player to enter buildings that are heavily barricaded that would not normally be accessible. Player must be in a building for it to work, cannot enter from the street.",
            skillPoints: 1,
            position: 0
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
            description: "Increases damage dealt with no weapon equipped by 1",
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
            description: "Increases damage dealt with no weapon equipped by 2",
            skillPoints: 8,
            position: 4
        },
        {
            skill: "looter",
            skillName: "Looter",
            description: "Improves the loot luck rate by 5%",
            skillPoints: 8,
            position: 5
        },
        {
            skill: "advancedLooter",
            skillName: "Advanced Looter",
            description: "Improves the loot luck rate by 10%. Gives access to the rare drop table if you have premium.",
            skillPoints: 15,
            position: 6
        },
    ],
    "military": [
        {
            skill: "firearmsTraining",
            skillName: "Firearms Training",
            description: "Increases accuracy when using ranged weapons by 25%",
            skillPoints: 3,
            position: 26
        },
        {
            skill: "advancedMelee",
            skillName: "Melee Specialist",
            description: "Increases accuracy when using melee weapons by 25%",
            skillPoints: 3,
            position: 8
        },
        {
            skill: "thickSkin",
            skillName: "Thick Skin",
            description: "Reduces damage when being attacked by 1",
            skillPoints: 5,
            position: 7
        },
        {
            skill: "advancedFirearmsTraining",
            skillName: "Advanced Firearms Training",
            description: "Improves accuracy when using ranged weapons by 15%",
            skillPoints: 7,
            position: 27
        },
        {
            skill: "weaponMaintenance",
            skillName: "Weapon Care",
            description: "Your weapon no longer has a chance of breaking when attacking",
            skillPoints: 10,
            position: 28
        },
    ],
    "scientist": [
        {
            skill: "advancedHealing",
            skillName: "Advanced Healing",
            description: "Increases the healing amount done by any first aid kits used (either on yourself or on other players) by 5",
            skillPoints: 2,
            position: 12
        },
        {
            skill: "techLooter",
            skillName: "Tech Looter",
            description: "Improves loot chance in ZedCorp buildings by 10%",
            skillPoints: 5,
            position: 13
        },
        {
            skill: "revivalSyringeCrafter",
            skillName: "Revival Syringe Crafter",
            description: "Allows for the ability to manufacture revival syringes in a powered ZedCorp building",
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
    ],
    "zombie": [
        {
            skill: "speedWalking",
            skillName: "Speed Walker",
            description: "Reduces energy to move a tile from 2 to 1",
            skillPoints: 1,
            position: 24
        },
        {
            skill: "barricadeDestroyer",
            skillName: "Barricade Destroyer",
            description: "Allows you to attack and destroy barricades",
            skillPoints: 1,
            position: 17
        },
        {
            skill: "infectedBite",
            skillName: "Infected Bite",
            description: "Gives bite weapon a chance of infecting the target (if they are a survivor) that causes one damage every time they use stamina",
            skillPoints: 2,
            position: 18
        },
        {
            skill: "zombieAccuracy",
            skillName: "Zombie Accuracy",
            description: "Improve accuracy of zombie weapons by 25%",
            skillPoints: 3,
            position: 29
        },
        {
            skill: "tankyFlesh",
            skillName: "Tanky Flesh",
            description: "Reduces damage taken by 1",
            skillPoints: 5,
            position: 23
        },
        {
            skill: "drag",
            skillName: "Drag",
            description: "Allows you to drag a survivor from an adjacent tile into yours if they are under 25 hp",
            skillPoints: 5,
            position: 22
        },
        {
            skill: "healingAttack",
            skillName: "Healing Bite",
            description: "Gain health equal to damage dealt",
            skillPoints: 5,
            position: 21
        },
        {
            skill: "advancedZombieAccuracy",
            skillName: "Advanced Zombie Accuracy",
            description: "Improve accuracy of zombie weapons by 15%",
            skillPoints: 7,
            position: 30
        },
        {
            skill: "enhancedBite",
            skillName: "Super Bite",
            description: "Increases damage dealt when biting by 3",
            skillPoints: 10,
            position: 19
        },
        {
            skill: "enhancedClaws",
            skillName: "Super Claws",
            description: "Increases damage dealt when using claws by 5",
            skillPoints: 10,
            position: 20
        },
        {
            skill: "mutatedZombie",
            skillName: "Mutated Zombie",
            description: "Doubles xp gain, damage dealt and max health while a zombie",
            skillPoints: 25,
            position: 25
        },
    ]
}