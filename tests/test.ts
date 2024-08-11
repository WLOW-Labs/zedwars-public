// import * as anchor from '@coral-xyz/anchor'
// import { Zedwars } from '../target/types/zedwars'
// import { BN, Program } from '@coral-xyz/anchor'
// import * as SPL from '@solana/spl-token'
// import { Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js'
// import { readFileSync } from 'fs'
// import path from 'path'
// import { OperatorClient, PlayerClient, pdas } from '../sdk'
// import { Metaplex, keypairIdentity } from '@metaplex-foundation/js'
// import { expect } from 'chai'
// import { getTokenWallet } from '../sdk/player_client'

// describe('ZedWars', () => {
//   let numUniqueCoords = 0
//   const uniqueCoordsSeed = 4000
//   const getUniqueCoords = () => {
//     const tileX = uniqueCoordsSeed + numUniqueCoords++ * 10
//     return {
//       tileX,
//       tileY: tileX,
//     }
//   }
//   let numItems = 0
//   const getUniqueItemId = async () => {
//     return (await program.account.config.fetch(pdas.config())).numberOfItems
//   }
//   // Configure the client to use the local cluster.
//   anchor.setProvider(anchor.AnchorProvider.env())
//   const program = anchor.workspace.Zedwars as Program<Zedwars>
//   const operatorKeypair = Keypair.fromSecretKey(
//     Buffer.from(JSON.parse(readFileSync(path.join(__dirname, './test_operator_key.json'), 'utf8')))
//   )
//   const operatorClient = new OperatorClient(anchor.getProvider().connection, operatorKeypair)

//   const playerKeypair = Keypair.generate()
//   const playerClient = new PlayerClient(anchor.getProvider().connection, playerKeypair.publicKey)

//   const metaplex = Metaplex.make(anchor.getProvider().connection).use(keypairIdentity(operatorKeypair))
//   let itemsCollectionNFTMint: PublicKey
//   let charactersCollectionNFTMint: PublicKey
//   before(async () => {
//     // create the collection NFTs
//     itemsCollectionNFTMint = await operatorClient.createCollectionNFT('Items', 'ITEMS', 'https://example.com/items')
//     charactersCollectionNFTMint = await operatorClient.createCollectionNFT(
//       'Characters',
//       'CHARACTERS',
//       'https://example.com/characters'
//     )
//     // airdrop to the player
//     let sig = await anchor.getProvider().connection.requestAirdrop(playerKeypair.publicKey, 10000000000)
//     const latestBlockHash = await anchor.getProvider().connection.getLatestBlockhash()

//     await anchor.getProvider().connection.confirmTransaction({
//       blockhash: latestBlockHash.blockhash,
//       lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
//       signature: sig,
//     })
//   })

//   describe('System', () => {
//     it('should be able to init the config PDA account', async () => {
//       const tx = await operatorClient.configInit(itemsCollectionNFTMint, charactersCollectionNFTMint)
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', maxRetries: 5 })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       // check the config PDA account
//       const configAccount = await program.account.config.fetchNullable(pdas.config())
//       expect(configAccount).to.exist
//       expect(configAccount.itemsCollectionMint.toBase58()).to.eq(itemsCollectionNFTMint.toBase58())
//       expect(configAccount.charactersCollectionMint.toBase58()).to.eq(charactersCollectionNFTMint.toBase58())
//       expect(configAccount.numberOfItems).to.eq(0)
//       expect(configAccount.configVariables).to.have.lengthOf(72)
//       expect(configAccount.itemRandomWeights).to.have.lengthOf(10)
//       expect(configAccount.searchSuccessRates).to.have.lengthOf(10)
//     })
//     it('should be able to set the config variables', async () => {
//       let tx = new Transaction()
//       tx.add(await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000))
//       tx.add(await operatorClient.configSetVariable({ attackEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ attackCoolDown: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ attackBaseXpGain: {} }, 10))
//       tx.add(await operatorClient.configSetVariable({ baseUnarmedDamage: {} }, 5))
//       tx.add(await operatorClient.configSetVariable({ barricadeEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ barricadeXpGain: {} }, 10))
//       tx.add(await operatorClient.configSetVariable({ destroyBarricadeEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ destroyBarricadeXpGain: {} }, 25))
//       tx.add(await operatorClient.configSetVariable({ destroyGeneratorEnergyCost: {} }, 10))
//       tx.add(await operatorClient.configSetVariable({ destroyGeneratorXpGain: {} }, 125))
//       tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 5000))
//       tx.add(await operatorClient.configSetVariable({ moveEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ zombieMoveExtraEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ humanMoveBarricadeLimit: {} }, 10))
//       tx.add(await operatorClient.configSetVariable({ zombieMoveBarricadeLimit: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ lootPrivilegeDuration: {} }, 30 * 60))
//       tx.add(await operatorClient.configSetVariable({ lootEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ searchEnergyCost: {} }, 1))
//       // tx.add(await operatorClient.configSetVariable({ searchSuccessRate: {} }, 5000))
//       tx.add(await operatorClient.configSetVariable({ searchSuccessXpGain: {} }, 15))
//       tx.add(await operatorClient.configSetVariable({ searchXpGain: {} }, 5))
//       tx.add(await operatorClient.configSetVariable({ equipItemEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ mintItemEnergyCost: {} }, 5))
//       tx.add(await operatorClient.configSetVariable({ mintAttackCoolDown: {} }, 24 * 60 * 60))
//       tx.add(await operatorClient.configSetVariable({ useItemEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ useItemFirstAidXpGain: {} }, 20))
//       tx.add(await operatorClient.configSetVariable({ useItemGeneratorXpGain: {} }, 100))
//       tx.add(await operatorClient.configSetVariable({ useItemEnergyXpGain: {} }, 0))
//       tx.add(await operatorClient.configSetVariable({ useItemRevivalSyringeXpGain: {} }, 50))
//       tx.add(await operatorClient.configSetVariable({ useItemFuelCanXpGain: {} }, 50))
//       tx.add(await operatorClient.configSetVariable({ fuelCanPowerDuration: {} }, 24 * 60 * 60))
//       tx.add(await operatorClient.configSetVariable({ zombieReviveHealth: {} }, 50))
//       tx.add(await operatorClient.configSetVariable({ destroyItemEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ energyRegenRate: {} }, 10))
//       tx.add(await operatorClient.configSetVariable({ actionCoolDown: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ standingBackUpEnergyCost: {} }, 10))
//       tx.add(await operatorClient.configSetVariable({ standingBackUpHealth: {} }, 50))
//       tx.add(await operatorClient.configSetVariable({ dragCharacterEnergyCost: {} }, 2))
//       tx.add(await operatorClient.configSetVariable({ zombieDragMaxTargetHp: {} }, 25))
//       tx.add(await operatorClient.configSetVariable({ maxHp: {} }, 100))
//       tx.add(await operatorClient.configSetVariable({ maxEnergy: {} }, 100))
//       tx.add(await operatorClient.configSetVariable({ baseInventorySize: {} }, 5))
//       tx.add(await operatorClient.configSetVariable({ infectedDamageAmount: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ xpPerLevel: {} }, 100))
//       tx.add(await operatorClient.configSetVariable({ skillPointsGainedPerLevel: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ unarmedCombatSkillAttackBonus: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ advancedUnarmedCombatSkillAttackBonus: {} }, 2))
//       tx.add(await operatorClient.configSetVariable({ advancedHealingHpBonus: {} }, 10))
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       tx = new Transaction()
//       tx.add(await operatorClient.configSetVariable({ techLooterSearchSuccessRateBonus: {} }, 100))
//       tx.add(await operatorClient.configSetVariable({ craftEnergyCost: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ thickSkinDamageReduction: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ advancedMeleeAttackBonus: {} }, 3))
//       tx.add(await operatorClient.configSetVariable({ pistolProficiencyAttackBonus: {} }, 3))
//       tx.add(await operatorClient.configSetVariable({ longGunProficiencyAttackBonus: {} }, 5))
//       tx.add(await operatorClient.configSetVariable({ rangedAccuracyBonus: {} }, 15))
//       tx.add(await operatorClient.configSetVariable({ bodyBuilderMaxHpBonus: {} }, 10))
//       tx.add(await operatorClient.configSetVariable({ looterSearchSuccessRateBonus: {} }, 5))
//       tx.add(await operatorClient.configSetVariable({ advancedLooterSearchSuccessRateBonus: {} }, 10))
//       tx.add(await operatorClient.configSetVariable({ infectedBiteInfectionRate: {} }, 5000))
//       tx.add(await operatorClient.configSetVariable({ tankyFleshDamageReduction: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ enhancedBiteAttackBonus: {} }, 3))
//       tx.add(await operatorClient.configSetVariable({ enhancedClawAttackBonus: {} }, 5))
//       tx.add(await operatorClient.configSetVariable({ lootBodySuccessRate: {} }, 10000))
//       tx.add(await operatorClient.configSetVariable({ firearmsTrainingAccuracyBonus: {} }, 10000))
//       tx.add(await operatorClient.configSetVariable({ advancedFirearmsTrainingAccuracyBonus: {} }, 10000))
//       tx.add(await operatorClient.configSetVariable({ zombieAccuracyBonus: {} }, 2500))
//       tx.add(await operatorClient.configSetVariable({ advancedZombieAccuracyBonus: {} }, 1500))
//       tx.add(await operatorClient.configSetVariable({ premiumCost: {} }, 2000000000))
//       tx.add(await operatorClient.configSetVariable({ nameChangeCost: {} }, 250000000))
//       tx.add(await operatorClient.configSetVariable({ ticketsPerMission: {} }, 1))
//       tx.add(await operatorClient.configSetVariable({ premiumRegenReduction: {} }, 300))
//       tx.add(await operatorClient.configSetVariable({ missionCooldown: {} }, 604800))
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       tx = new Transaction()
//       tx.add(await operatorClient.registerOrUpdateItem({
//         itemId: 500,
//         name: 'Zombie Bite',
//         itemType: {
//           weapon: {
//             weaponType: { zombieBite: {} },
//             damage: 5,
//             breakChance: 0,
//             accuracy: 10000
//           },
//         },
//         rarity: {
//           common: {},
//         },
//         kind: {
//           none: {}
//         },
//       }))
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       // check the config PDA account
//       const configAccount = await program.account.config.fetchNullable(pdas.config())
//       expect(configAccount).to.exist
//       expect(configAccount.configVariables[0]).to.eq(10000)
//     })
//     it('should be able to set the item random weights', async () => {
//       const tx = await operatorClient.configSetItemRandomWeights('street', [0, 1], [100, 200])
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       // check the config PDA account
//       const configAccount = await program.account.config.fetchNullable(pdas.config())
//       expect(configAccount).to.exist
//       expect(configAccount.itemRandomWeights[0]).to.have.lengthOf(2)
//       expect(configAccount.itemRandomWeights[0][0]['itemId']).to.eq(0)
//       expect(configAccount.itemRandomWeights[0][0]['weight']).to.eq(100)
//       expect(configAccount.itemRandomWeights[0][1]['itemId']).to.eq(1)
//       expect(configAccount.itemRandomWeights[0][1]['weight']).to.eq(200)
//     })
//     it('should be able to set the search success rate for a tile type', async () => {
//       const tx = await operatorClient.configSetSearchSuccessRate({ street: {} }, 10000)
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       // check the config PDA account
//       const configAccount = await program.account.config.fetchNullable(pdas.config())
//       expect(configAccount).to.exist
//       expect(configAccount.searchSuccessRates[0]).to.eq(10000)
//     })
//     it('should be able to create the tile PDA accounts', async () => {
//       const tx = await operatorClient.mapTileInit({
//         canBeBarricaded: true,
//         canBeSearched: true,
//         x: 0,
//         y: 0,
//         tileType: { street: {} },
//       })
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//     })
//     it('should be able to control multiple characters with the same keypair', async () => {
//       let tx = await operatorClient.mapTileInit({
//         canBeBarricaded: true,
//         canBeSearched: true,
//         x: 0,
//         y: 1,
//         tileType: { street: {} },
//       })
//       try {
//         await anchor
//           .getProvider()
//           .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }

//       let character1 = await operatorClient.createCharacterNFT(
//         playerKeypair.publicKey,
//         'https://example.com/character1',
//         'character1',
//         'character1',
//         500
//       )
//       let character2 = await operatorClient.createCharacterNFT(
//         playerKeypair.publicKey,
//         'https://example.com/character2',
//         'character2',
//         'character2',
//         500
//       )
//       tx = await playerClient.characterInit(0, 0, false, character1)
//       tx.add(await playerClient.characterInit(0, 0, false, character2))
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }

//       // control the first character
//       tx = await playerClient.characterMove(0, 1, character1)
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       // control the second character
//       tx = await playerClient.characterMove(0, 1, character2)
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }

//       // check results
//       const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//       expect(character1Account).to.exist
//       expect(character1Account.x).to.eq(0)
//       expect(character1Account.y).to.eq(1)
//       const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//       expect(character2Account).to.exist
//       expect(character2Account.x).to.eq(0)
//       expect(character2Account.y).to.eq(1)
//     })
//     it('should not be able to control a character if the keypair is not the owner', async () => {
//       let keypair = anchor.web3.Keypair.generate()
//       let client = new PlayerClient(anchor.getProvider().connection, keypair.publicKey)
//       let sig = await anchor.getProvider().connection.requestAirdrop(keypair.publicKey, LAMPORTS_PER_SOL)
//       await anchor.getProvider().connection.confirmTransaction(sig)
//       let character1 = await operatorClient.createCharacterNFT(
//         playerKeypair.publicKey,
//         'https://example.com/character1',
//         'character1',
//         'character1',
//         500
//       )
//       let tx = await playerClient.characterInit(0, 0, false, character1)
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       // try to control the character
//       await SPL.createAssociatedTokenAccountIdempotent(
//         anchor.getProvider().connection,
//         keypair,
//         character1,
//         keypair.publicKey,
//         { commitment: 'confirmed' }
//       )
//       tx = await client.characterMove(0, 1, character1)
//       let err: any = null
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [keypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         err = e
//       }

//       // check results
//       expect(err).to.exist
//       expect(JSON.stringify(err)).to.contain('6001')
//       let character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//       expect(character1Account).to.exist
//       expect(character1Account.x).to.eq(0)
//       expect(character1Account.y).to.eq(0)
//     })
//     it('should be able to modify the state of a character with the operator keypair', async () => {
//       let character1 = await operatorClient.createCharacterNFT(
//         playerKeypair.publicKey,
//         'https://example.com/character1',
//         'character1',
//         'character1',
//         500
//       )
//       let tx = await playerClient.characterInit(0, 0, false, character1)
//       try {
//         await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       tx = await operatorClient.characterUpdate(character1, {
//         x: 1,
//         y: 1,
//         hp: 1,
//         isZombie: true,
//         xp: 100,
//         level: 20,
//         skillPoints: 20,
//         lastAttackedAt: new anchor.BN(1),
//         isInfected: true,
//         energy: 20,
//         energyUpdatedAt: new anchor.BN(1),
//         inventory: [1, 2, 3],
//         equippedItems: {
//           weapon: 1,
//           armor: 2,
//         },
//         skills: [true, true, false],
//         killedBy: null,
//         killedAt: null,
//       })
//       try {
//         await anchor
//           .getProvider()
//           .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       // check results
//       const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//       expect(character1Account).to.exist
//       expect(character1Account.x).to.eq(1)
//       expect(character1Account.y).to.eq(1)
//       expect(character1Account.hp).to.eq(1)
//       expect(character1Account.isZombie).to.be.true
//       expect(character1Account.xp).to.eq(100)
//       expect(character1Account.level).to.eq(20)
//       expect(character1Account.skillPoints).to.eq(20)
//       expect(character1Account.lastAttackedAt.toNumber()).to.eq(1)
//       expect(character1Account.isInfected).to.be.true
//       expect(character1Account.energy).to.eq(20)
//       expect(character1Account.energyUpdatedAt.toNumber()).to.eq(1)
//       expect(character1Account.inventory).to.deep.eq([1, 2, 3])
//       expect(character1Account.equippedItems.weapon).to.eq(1)
//       expect(character1Account.equippedItems.armor).to.eq(2)
//       expect(character1Account.skills).to.deep.eq([true, true, false, ...Array(28).fill(false)])
//     })
//     it('should be able to modify the state of a tile with the operator keypair', async () => {
//       let tx = await operatorClient.mapTileInit({
//         canBeBarricaded: true,
//         canBeSearched: true,
//         x: 2,
//         y: 2,
//         tileType: { street: {} },
//       })
//       try {
//         await anchor
//           .getProvider()
//           .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       tx = await operatorClient.mapTileUpdate(2, 2, {
//         numZombies: 1,
//         numSurvivors: 2,
//         numBarricades: 3,
//         hasGenerator: true,
//         hasPowerUntil: new anchor.BN(1),
//         tileType: { hospital: {} },
//       })
//       try {
//         await anchor
//           .getProvider()
//           .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//       } catch (e) {
//         console.log(e)
//         throw e
//       }
//       // check results
//       const tile = await program.account.mapTile.fetchNullable(pdas.mapTile(2, 2))
//       expect(tile).to.exist
//       expect(tile.numZombies).to.eq(1)
//       expect(tile.numSurvivors).to.eq(2)
//       expect(tile.numBarricades).to.eq(3)
//       expect(tile.hasGenerator).to.be.true
//       expect(tile.hasPowerUntil.toNumber()).to.eq(1)
//       expect(tile.tileType).to.deep.eq({ hospital: {} })
//     })
    
//       it('should be able to control a character with a session account', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const tileX2 = tileX + 1
//         const tileY2 = tileY

//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { street: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX2,
//             y: tileY2,
//             tileType: { street: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // move with session account
//         const playerAccountInfoBefore = await anchor.getProvider().connection.getAccountInfo(playerKeypair.publicKey)
//         tx = await playerClient.characterMove(tileX2, tileY2, character1)
//         try {
//           await anchor.getProvider().sendAndConfirm(tx, [delegate], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log("characterMove", e);
//           throw e
//         }
//         // check results
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.x).to.eq(tileX2)
//         expect(character1Account.y).to.eq(tileY2)
//         //const playerAccountInfoAfter = await anchor.getProvider().connection.getAccountInfo(playerKeypair.publicKey)
//         //expect(playerAccountInfoAfter.lamports).to.eq(playerAccountInfoBefore.lamports)
//       })
//       it('should be able to close a session account', async () => {
//         const playerAccountInfo = await anchor.getProvider().connection.getAccountInfo(playerKeypair.publicKey)
//         const playerBalanceBefore = playerAccountInfo.lamports
//         let tx = await playerClient.closeSession()
//         try {
//           await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           playerClient.delegatePubkey = null
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         const sessionAccount = await program.account.session.fetchNullable(pdas.session(playerKeypair.publicKey))
//         expect(sessionAccount).to.not.exist
//         const playerAccountInfoAfter = await anchor.getProvider().connection.getAccountInfo(playerKeypair.publicKey)
//         expect(playerAccountInfoAfter.lamports).to.be.approximately(
//           playerBalanceBefore + 1500000,
//           10000000
//         )
//       })
//     })
//   })
//   describe('Characters', () => {
//     describe('Common', () => {
//       describe('Unlocking Skills', () => {
//         it('should not be able to unlock a skill a second time', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           tx = await operatorClient.characterUpdate(character1, {
//             skillPoints: 100,
//             skills: [true],
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           tx = await playerClient.characterUnlockSkill(character1, { parkour: {} })
//           let err: any = undefined
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           expect(err).to.exist
//           expect(err.logs.join()).to.contain('SkillAlreadyUnlocked')
//         })
//         it('should unlock any skill if skill points are enough', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           tx = await operatorClient.characterUpdate(character1, {
//             skillPoints: 10000,
//             skills: [],
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           tx = await playerClient.characterUnlockSkill(character1, { parkour: {} })

//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           // check results
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.skills).to.deep.eq([true, ...Array(30).fill(false)])
//         })
//         it('should not unlock any skill if skill points are not enough', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           tx.add(await operatorClient.configSetSkillPointsRequired({ parkour: {} }, 255))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair, operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           tx = await playerClient.characterUnlockSkill(character1, { parkour: {} })
//           let err: any = undefined
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           expect(err).to.exist
//           expect(err.logs.join()).to.contain('NotEnoughSkillPoints')
//         })
//         it('should decrease the skill points when unlocking a skill', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           tx = new Transaction()
//           tx.add(await operatorClient.configSetSkillPointsRequired({ parkour: {} }, 1))
//           tx.add(
//             await operatorClient.characterUpdate(character1, {
//               skillPoints: 100,
//               skills: [],
//             })
//           )
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           tx = await playerClient.characterUnlockSkill(character1, { parkour: {} })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.skillPoints).to.eq(99)
//         })
//       })
//       describe('Death', () => {
//         it('should be able to have your items stolen by the killer if the hp is 0', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           // init characters
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           tx.add(await playerClient.characterInit(0, 0, false, character2))
//           await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           // update character state
//           tx = await operatorClient.characterUpdate(character1, {
//             x: 0,
//             y: 0,
//             hp: 0,
//             isZombie: false,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 20,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: pdas.character(character2),
//             killedAt: new BN(Math.floor(Date.now() / 1000)), // killed just now
//           })
//           await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })

//           // init item
//           tx = await operatorClient.registerOrUpdateItem({
//             itemId: 1,
//             name: 'generator',
//             itemType: {
//               consumable: {
//                 consumableType: { generator: {} },
//                 effectValue: 0,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // loot
//           tx = await playerClient.characterLoot(character2, character1, 1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           const characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1).to.exist
//           expect(characterAccount1.inventory).to.deep.eq([2, 3, 4])
//           const characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.inventory).to.deep.eq([1])
//         })
//         it('should not be able to have your items stolen by the killer if hp is not 0', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           // init characters
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           tx.add(await playerClient.characterInit(0, 0, false, character2))
//           await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           // update character state
//           tx = await operatorClient.characterUpdate(character1, {
//             x: 0,
//             y: 0,
//             hp: 1,
//             isZombie: false,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 20,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: pdas.character(character2),
//             killedAt: new BN(Math.floor(Date.now() / 1000)), // killed just now
//           })
//           await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })

//           // init item
//           tx = await operatorClient.registerOrUpdateItem({
//             itemId: 1,
//             name: 'generator',
//             itemType: {
//               consumable: {
//                 consumableType: { generator: {} },
//                 effectValue: 0,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }


//           // loot
//           tx = await playerClient.characterLoot(character2, character1, 1)
//           let err: any = null
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.exist
//           expect(err.logs.join()).to.contain('TargetIsNotDead')
//           const characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1).to.exist
//           expect(characterAccount1.inventory).to.deep.eq([1, 2, 3, 4])
//           const characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.inventory).to.deep.eq([])
//         })
//         it('should be able to have your items stolen by anyone if you are dead for more than 30 minutes', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           // init characters
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           tx.add(await playerClient.characterInit(0, 0, false, character2))
//           await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           // update character state
//           tx = await operatorClient.characterUpdate(character1, {
//             x: 0,
//             y: 0,
//             hp: 0,
//             isZombie: false,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 20,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: pdas.character(character1),
//             killedAt: new BN(Math.floor(Date.now() / 1000) - 30 * 60 - 1),
//           })
//           await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           // init item
//           tx = await operatorClient.registerOrUpdateItem({
//             itemId: 1,
//             name: 'generator',
//             itemType: {
//               consumable: {
//                 consumableType: { generator: {} },
//                 effectValue: 0,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // loot
//           tx = await playerClient.characterLoot(character2, character1, 1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           const characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1).to.exist
//           expect(characterAccount1.inventory).to.deep.eq([2, 3, 4])
//           const characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.inventory).to.deep.eq([1])
//         })
//         it('should reset energy to 0 when killed', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           // init characters
//           let tx = await playerClient.characterInit(0, 0, true, character1)
//           tx.add(await playerClient.characterInit(0, 0, false, character2))
//           await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           // update character state
//           tx = await operatorClient.characterUpdate(character1, {
//             x: 0,
//             y: 0,
//             hp: 1,
//             isZombie: true,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           const characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1).to.exist
//           expect(characterAccount1.energy).to.eq(0)
//           expect(characterAccount1.hp).to.eq(0)
//         })
//         it('should lose any items in the inventory and equip slots when standing back up again', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character state
//           tx = await operatorClient.characterUpdate(character1, {
//             x: 0,
//             y: 0,
//             hp: 0,
//             isZombie: true,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // stand back up
//           tx = await playerClient.characterStandBackUp(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           const characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1).to.exist
//           expect(characterAccount1.inventory).to.deep.eq([])
//         })
//         it('should be able to use 10 energy points to stand back up again', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character state
//           tx = await operatorClient.characterUpdate(character1, {
//             x: 0,
//             y: 0,
//             hp: 0,
//             isZombie: true,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // stand back up
//           tx = await playerClient.characterStandBackUp(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           const characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1).to.exist
//           expect(characterAccount1.energy).to.eq(90)
//         })
//         it('should have half of their max hp when standing back up again', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character state
//           tx = await operatorClient.characterUpdate(character1, {
//             x: 0,
//             y: 0,
//             hp: 0,
//             isZombie: true,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // stand back up
//           tx = await playerClient.characterStandBackUp(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           const characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1).to.exist
//           expect(characterAccount1.hp).to.eq(50)
//         })
//         it('should not be able to stand back up again if they do not have 10 energy', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character state
//           tx = await operatorClient.characterUpdate(character1, {
//             x: 0,
//             y: 0,
//             hp: 0,
//             isZombie: true,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 9,
//             energyUpdatedAt: new BN(Math.floor(Date.now() / 1000)),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // stand back up
//           tx = await playerClient.characterStandBackUp(character1)
//           let err: any = null
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.exist
//           expect(err.logs.join()).to.contain('OutOfEnergy')
//         })
//       })
//       describe('XP', () => {
//         it('should gain 1 level when xp reaches level * 100', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           let character3 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character3',
//             'character3',
//             'character3',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, true, character1)
//           tx.add(await playerClient.characterInit(0, 0, false, character2))
//           tx.add(await playerClient.characterInit(0, 0, true, character3))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character state
//           tx = await operatorClient.characterUpdate(character2, {
//             x: 0,
//             y: 0,
//             hp: 100,
//             isZombie: false,
//             xp: 99,
//             level: 1,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack to gain xp
//           tx = await playerClient.characterAttack(character2, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           let characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.level).to.eq(2)
//           // try again with another level
//           tx = await operatorClient.characterUpdate(character2, {
//             x: 0,
//             y: 0,
//             hp: 100,
//             isZombie: false,
//             xp: 499,
//             level: 5,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             lastActedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           tx = await playerClient.characterAttack(character2, character3)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.level).to.eq(6)
//         })
//         it('should decrease xp by level * 100 when leveling up', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           let character3 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character3',
//             'character3',
//             'character3',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, true, character1)
//           tx.add(await playerClient.characterInit(0, 0, false, character2))
//           tx.add(await playerClient.characterInit(0, 0, true, character3))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character state
//           tx = await operatorClient.characterUpdate(character2, {
//             x: 0,
//             y: 0,
//             hp: 100,
//             isZombie: false,
//             xp: 99,
//             level: 1,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             lastActedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack to gain xp
//           tx = await playerClient.characterAttack(character2, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           let characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.xp).to.eq(14)
//           // try again with another level
//           tx = await operatorClient.characterUpdate(character2, {
//             x: 0,
//             y: 0,
//             hp: 100,
//             isZombie: false,
//             xp: 499,
//             level: 5,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             lastActedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           tx = await playerClient.characterAttack(character2, character3)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.xp).to.eq(14)
//         })
//         it('should increase skill points by 1 when leveling up', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           let character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           let character3 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character3',
//             'character3',
//             'character3',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, true, character1)
//           tx.add(await playerClient.characterInit(0, 0, false, character2))
//           tx.add(await playerClient.characterInit(0, 0, true, character3))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character state
//           tx = await operatorClient.characterUpdate(character2, {
//             x: 0,
//             y: 0,
//             hp: 100,
//             isZombie: false,
//             xp: 99,
//             level: 1,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             lastActedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack to gain xp
//           tx = await playerClient.characterAttack(character2, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           let characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.skillPoints).to.eq(1)
//           // try again with another level
//           tx = await operatorClient.characterUpdate(character2, {
//             x: 0,
//             y: 0,
//             hp: 100,
//             isZombie: false,
//             xp: 499,
//             level: 5,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             lastActedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5],
//             equippedItems: { weapon: null, armor: null },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           tx = await playerClient.characterAttack(character2, character3)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check results
//           characterAccount2 = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(characterAccount2).to.exist
//           expect(characterAccount2.skillPoints).to.eq(1)
//         })
//         it('should double the xp gain if there is enough bonus xp', async () => {
//           const { tileX, tileY } = getUniqueCoords()
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [1], [100]))
//           tx.add(await operatorClient.configSetSearchSuccessRate({ fireStation: {} }, 0))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             bonusXp: 100,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.xp).to.eq(10)
//         })
//         it('should gain the remaining bonus xp if there is not enough bonus xp', async () => {
//           const { tileX, tileY } = getUniqueCoords()
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [1], [100]))
//           tx.add(await operatorClient.configSetSearchSuccessRate({ fireStation: {} }, 0))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             bonusXp: 2,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.xp).to.eq(7)
//         })
//       })
//     })
//     describe('Humans', () => {
//       describe('General', () => {
//         it('should be able to join the game as a human', async () => {
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           // check results
//           let characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1).to.exist
//         })
//       })
//       describe('Missions', () => {
//         it('should be able to create weekly missions if it has been over 7 days', async () => {
//           let survivor = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           let tx = await playerClient.characterInit(0, 0, false, survivor)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           tx = await playerClient.generateMissions(survivor);

//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           // check results
//           let survivorAccount = await program.account.character.fetchNullable(pdas.character(survivor))
//           expect(survivorAccount).to.exist
//           expect(survivorAccount.weeklyMissions.length).eq(3)
//         })
//       })
//       describe('Searching', () => {
//         const searchableTiles = [
//           'hospital',
//           'apartment',
//           'policeStation',
//           'warehouse',
//           'fireStation',
//           'zedCorp',
//           'factory',
//           'secretLocation',
//         ]
//         for (let i = 0; i < searchableTiles.length; i++) {
//           it(`should be able to search ${searchableTiles[i]} tile`, async () => {
//             let tileX = 1127 + i
//             let tileY = 1127 + i
//             let tileType = {}
//             tileType[searchableTiles[i]] = {}
//             let tx = await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX,
//               y: tileY,
//               tileType,
//             })
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             let character1 = await operatorClient.createCharacterNFT(
//               playerKeypair.publicKey,
//               'https://example.com/character1',
//               'character1',
//               'character1',
//               500
//             )
//             // init character
//             tx = await playerClient.characterInit(tileX, tileY, false, character1)
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // search
//             tx = await playerClient.characterSearch(character1)
//             let err: any = null
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               err = e
//             }
//             expect(err).to.not.exist
//           })
//         }
//         it('should not be able to search street tiles', async () => {
//           let tileX = 1157
//           let tileY = 1157
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search street
//           let err: any = null
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           expect(err).to.exist
//           expect(err.logs.join()).to.contain('InvalidTile')
//         })
//         it('should cost 1 energy point to search', async () => {
//           let tileX = 1199
//           let tileY = 1199
//           let tileType = {}
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           let characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount1.energy).to.equal(99)
//         })
//         it('should not be able to search if energy is not enough', async () => {
//           let tileX = 1235
//           let tileY = 1235
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update energy to 0
//           tx = await operatorClient.characterUpdate(character1, {
//             x: tileX,
//             y: tileY,
//             hp: 100,
//             isZombie: false,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 0,
//             energyUpdatedAt: new BN(Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7),
//             inventory: [],
//             equippedItems: { weapon: undefined, armor: undefined },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search street
//           let err: any = null
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           expect(err).to.exist
//           // console.log(err)
//           expect(JSON.stringify(err)).to.contain('6017')
//         })
//         it('should be able to search if energy is enough', async () => {
//           let tileX = 1298
//           let tileY = 1298
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           let err: any = null
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           expect(err).to.not.exist
//         })
//         it('should be able to search if inventory is not full', async () => {
//           let tileX = 1335
//           let tileY = 1335

//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           let err: any = null
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           expect(err).to.not.exist
//         })
//         it('should not be able to search if inventory is full', async () => {
//           let tileX = 1370
//           let tileY = 1370

//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character inventory
//           tx = await operatorClient.characterUpdate(character1, {
//             x: tileX,
//             y: tileY,
//             hp: 100,
//             isZombie: false,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 100,
//             energyUpdatedAt: new BN(1),
//             inventory: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//             equippedItems: { weapon: undefined, armor: undefined },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           let err: any = null
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           expect(err).to.exist
//           expect(err.logs.join()).to.contain('InventoryFull')
//         })
//         it('should reset the last_attacked_at field to now when an item is found', async () => {
//           let tileX = 1430
//           let tileY = 1430

//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [1], [100]))
//           tx.add(await operatorClient.configSetSearchSuccessRate({ fireStation: {} }, 10000))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount!.lastAttackedAt.toNumber()).to.be.approximately(Math.floor(Date.now() / 1000), 2)
//         })
//         it('should gain 5 xp when searching', async () => {
//           let tileX = 1470
//           let tileY = 1470

//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [1], [100]))
//           tx.add(await operatorClient.configSetSearchSuccessRate({ fireStation: {} }, 0))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.xp).to.eq(5)
//         })
//         it('should gain 15 xp when succesfully finding an item', async () => {
//           let tileX = 1511
//           let tileY = 1511

//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [1], [100]))
//           tx.add(await operatorClient.configSetSearchSuccessRate({ fireStation: {} }, 10000))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.xp).to.eq(20)
//         })
//         it('should take 1 damage when infected', async () => {
//           let tileX = 1554
//           let tileY = 1554

//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [1], [100]))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             x: tileX,
//             y: tileY,
//             hp: 100,
//             isZombie: false,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: true,
//             energy: 0,
//             energyUpdatedAt: new BN(1),
//             inventory: [],
//             equippedItems: { weapon: undefined, armor: undefined },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.hp).to.eq(99)
//         })
//         it('should not take damage when not infected', async () => {
//           let tileX = 1612
//           let tileY = 1612

//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [1], [100]))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             x: tileX,
//             y: tileY,
//             hp: 100,
//             isZombie: false,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             isInfected: false,
//             energy: 0,
//             energyUpdatedAt: new BN(1),
//             inventory: [],
//             equippedItems: { weapon: undefined, armor: undefined },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.hp).to.eq(100)
//         })
//         it('should set the last_acted_slot field to the current slot when searching', async () => {
//           let tileX = 1670
//           let tileY = 1670

//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [1], [100]))
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             x: tileX,
//             y: tileY,
//             hp: 100,
//             isZombie: false,
//             xp: 0,
//             level: 0,
//             skillPoints: 0,
//             lastAttackedAt: new BN(1),
//             lastActedAt: new BN(1),
//             isInfected: false,
//             energy: 0,
//             energyUpdatedAt: new BN(1),
//             inventory: [],
//             equippedItems: { weapon: undefined, armor: undefined },
//             skills: [],
//             killedBy: null,
//             killedAt: null,
//           })
//           // search
//           tx = await playerClient.characterSearch(character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.lastActedAt.toNumber()).to.be.approximately(Math.floor(Date.now() / 1000), 2)
//         })
//       })
//       describe('Movement', () => {
//         it('should cost 1 energy point to move', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileX = 1760
//           const tileY = 1760
//           const tileX2 = 1761
//           const tileY2 = 1760
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX2,
//               y: tileY2,
//               tileType: { street: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX2, tileY2, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check energy
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.energy).to.eq(99)
//         })
//         it('should not be able to move if energy is not enough', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileX = 1806
//           const tileY = 1806
//           const tileX2 = 1806
//           const tileY2 = 1807
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX2,
//               y: tileY2,
//               tileType: { street: {} },
//             })
//           )
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character energy
//           tx = await operatorClient.characterUpdate(character1, {
//             energy: 0,
//             energyUpdatedAt: new BN(Math.floor(Date.now() / 1000) + 1000),
//           })
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX2, tileY2, character1)
//           let err: any = null
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             err = e
//           }
//           // check energy
//           expect(err).to.exist
//           expect(err.logs.join()).to.contain('CharacterOutOfEnergy')
//         })
//         it('should be able to move if energy is enough', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileX = 1850
//           const tileY = 1850
//           const tileX2 = 1850
//           const tileY2 = 1851
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX2,
//               y: tileY2,
//               tileType: { street: {} },
//             })
//           )
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX2, tileY2, character1)
//           try {
//             await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check energy
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.energy).to.eq(99)
//         })
//         const tileTypes = [
//           'street',
//           'hospital',
//           'apartment',
//           'policeStation',
//           'warehouse',
//           'fireStation',
//           'zedCorp',
//           'factory',
//           'secretLocation',
//         ]
//         // it('should be able to move to any tile that has less than 10 barricades')
//         for (let i = 0; i < tileTypes.length; i++) {
//           const tileType = tileTypes[i]
//           it(`should be able to move to a ${tileType} tile that has fewer than 10 barricades`, async () => {
//             const character1 = await operatorClient.createCharacterNFT(
//               playerKeypair.publicKey,
//               'https://example.com/character1',
//               'character1',
//               'character1',
//               500
//             )
//             const tileX = 1910 + i
//             const tileY = 1910 + i
//             const tileX2 = 1910 + i
//             const tileY2 = 1910 + i + 1
//             // init tiles
//             let tx = await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX,
//               y: tileY,
//               tileType: { [tileType]: {} },
//             })
//             tx.add(
//               await operatorClient.mapTileInit({
//                 canBeBarricaded: true,
//                 canBeSearched: true,
//                 x: tileX2,
//                 y: tileY2,
//                 tileType: { [tileType]: {} },
//               })
//             )
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // init character
//             tx = await playerClient.characterInit(tileX, tileY, false, character1)
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // move
//             tx = await playerClient.characterMove(tileX2, tileY2, character1)
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // check results
//             const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//             expect(characterAccount).to.exist
//             expect(characterAccount.x).to.eq(tileX2)
//             expect(characterAccount.y).to.eq(tileY2)
//           })
//         }
//         // it('should not be able to move to any tile that has 10 or more barricades without the parkour skill')
//         for (let i = 0; i < tileTypes.length; i++) {
//           const tileType = tileTypes[i]
//           it(`should not be able to move to a ${tileType} tile that has more than 10 barricades without the parkour skill`, async () => {
//             const character1 = await operatorClient.createCharacterNFT(
//               playerKeypair.publicKey,
//               'https://example.com/character1',
//               'character1',
//               'character1',
//               500
//             )
//             const tileX = 1970 + i
//             const tileY = 1970 + i
//             const tileX2 = 1970 + i
//             const tileY2 = 1970 + i + 1
//             // init tiles
//             let tx = await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX,
//               y: tileY,
//               tileType: { [tileType]: {} },
//             })
//             tx.add(
//               await operatorClient.mapTileInit({
//                 canBeBarricaded: true,
//                 canBeSearched: true,
//                 x: tileX2,
//                 y: tileY2,
//                 tileType: { [tileType]: {} },
//               })
//             )
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // update tile
//             tx = await operatorClient.mapTileUpdate(tileX2, tileY2, {
//               numZombies: 0,
//               numSurvivors: 0,
//               numBarricades: 11,
//               hasGenerator: false,
//               hasPowerUntil: new BN(1),
//               tileType: { [tileType]: {} },
//             })
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // init character
//             tx = await playerClient.characterInit(tileX, tileY, false, character1)
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // move
//             tx = await playerClient.characterMove(tileX2, tileY2, character1)
//             let err: any = undefined
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               err = e
//             }
//             // check results
//             expect(err).to.exist
//             if (err.logs) {
//               expect(err.logs.join()).to.contain('HeavilyBarricaded')
//             } else {
//               expect(JSON.stringify(err)).to.contain('6014')
//             }
//           })
//         }
//         // it('should be able to move to any tile that has 10 or more barricades with the parkour skill if in a non-street tile')
//         for (let i = 0; i < tileTypes.length; i++) {
//           const tileType = tileTypes[i]
//           if (tileType === 'street') continue
//           it(`should be able to move to a ${tileType} tile that has more than 10 barricades with the parkour skill if in a non-street tile`, async () => {
//             const character1 = await operatorClient.createCharacterNFT(
//               playerKeypair.publicKey,
//               'https://example.com/character1',
//               'character1',
//               'character1',
//               500
//             )
//             const tileX = 2030 + i
//             const tileY = 2030 + i
//             const tileX2 = 2030 + i
//             const tileY2 = 2030 + i + 1
//             // init tiles
//             let tx = await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX,
//               y: tileY,
//               tileType: { [tileType]: {} },
//             })
//             tx.add(
//               await operatorClient.mapTileInit({
//                 canBeBarricaded: true,
//                 canBeSearched: true,
//                 x: tileX2,
//                 y: tileY2,
//                 tileType: { [tileType]: {} },
//               })
//             )
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // update tile
//             tx = await operatorClient.mapTileUpdate(tileX2, tileY2, {
//               numZombies: 0,
//               numSurvivors: 0,
//               numBarricades: 11,
//               hasGenerator: false,
//               hasPowerUntil: new BN(1),
//               tileType: { [tileType]: {} },
//             })
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // init character
//             tx = await playerClient.characterInit(tileX, tileY, false, character1)
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // update character to have parkour skill
//             tx = await operatorClient.characterUpdate(character1, {
//               skills: [true],
//             })
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // move
//             tx = await playerClient.characterMove(tileX2, tileY2, character1)
//             let err: any = undefined
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               err = e
//             }
//             // check results
//             expect(err).to.not.exist
//           })
//         }
//         // it('should not be able to move to any tile that has 10 or more barricades with the parkour skill if in a street tile')
//         for (let i = 0; i < tileTypes.length; i++) {
//           const tileType = tileTypes[i]
//           if (tileType === 'street') continue
//           it(`should not be able to move to a ${tileType} tile that has more than 10 barricades with the parkour skill if in a street tile`, async () => {
//             const character1 = await operatorClient.createCharacterNFT(
//               playerKeypair.publicKey,
//               'https://example.com/character1',
//               'character1',
//               'character1',
//               500
//             )
//             const tileX = 2102 + i
//             const tileY = 2102 + i
//             const tileX2 = 2102 + i
//             const tileY2 = 2102 + i + 1
//             // init tiles
//             let tx = await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX,
//               y: tileY,
//               tileType: { street: {} },
//             })
//             tx.add(
//               await operatorClient.mapTileInit({
//                 canBeBarricaded: true,
//                 canBeSearched: true,
//                 x: tileX2,
//                 y: tileY2,
//                 tileType: { [tileType]: {} },
//               })
//             )
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // update tile
//             tx = await operatorClient.mapTileUpdate(tileX2, tileY2, {
//               numZombies: 0,
//               numSurvivors: 0,
//               numBarricades: 11,
//               hasGenerator: false,
//               hasPowerUntil: new BN(1),
//               tileType: { [tileType]: {} },
//             })
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // init character
//             tx = await playerClient.characterInit(tileX, tileY, false, character1)
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // update character to have parkour skill
//             tx = await operatorClient.characterUpdate(character1, {
//               skills: [true],
//             })
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               console.log(e)
//               throw e
//             }
//             // move
//             tx = await playerClient.characterMove(tileX2, tileY2, character1)
//             let err: any = undefined
//             try {
//               await anchor
//                 .getProvider()
//                 .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//             } catch (e) {
//               err = e
//             }
//             // check results
//             expect(err).to.exist
//             if (!err.logs) {
//               expect(JSON.stringify(err)).to.contain('6014')
//             } else expect(err.logs.join()).to.contain('TileHeavilyBarricaded')
//           })
//         }
//         it('should take 1 damage when infected', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileX = 2178
//           const tileY = 2178
//           const tileX2 = 2178
//           const tileY2 = 2179
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX2,
//               y: tileY2,
//               tileType: { street: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character to be infected
//           tx = await operatorClient.characterUpdate(character1, {
//             isInfected: true,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX2, tileY2, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check energy
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.hp).to.eq(99)
//         })
//         it('should not take damage when not infected', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileX = 2232
//           const tileY = 2232
//           const tileX2 = 2232
//           const tileY2 = 2233
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX2,
//               y: tileY2,
//               tileType: { street: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character to be infected
//           tx = await operatorClient.characterUpdate(character1, {
//             isInfected: false,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX2, tileY2, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check energy
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.hp).to.eq(100)
//         })
//         it('should set the last_acted_at field to the current timestamp when moving', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileX = 2286
//           const tileY = 2286
//           const tileX2 = 2286
//           const tileY2 = 2287
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX2,
//               y: tileY2,
//               tileType: { street: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX2, tileY2, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // check energy
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//         })
//       })
//       describe('Barricades', () => {
//         it('should not be able to attack barricades', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileX = 2385
//           const tileY = 2385
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           // update tile
//           tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//             numZombies: 0,
//             numSurvivors: 0,
//             numBarricades: 10,
//             hasGenerator: false,
//             hasPowerUntil: new BN(1),
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack barricade
//           tx = await playerClient.characterDestroyBarricade(character1, tileX, tileY)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }

//           // check results
//           expect(err).to.exist
//           expect(JSON.stringify(err)).to.contain('6044')
//         })
//         it('should be able to build barricades on non-street tiles if the barricade builder skill is unlocked', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2437
//           const tileX = 2437
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e);
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//         })
//         it('should not be able to build barricades on non-street tiles if the barricade builder skill is not unlocked', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2482
//           const tileX = 2482
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.exist
//           if (err.logs) expect(err.logs.join()).to.contain('MissingBarricadeBuilderSkill')
//           else console.log(err)
//         })
//         it('should not be able to build barricades on street tiles even if the barricade builder skill is unlocked', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2519
//           const tileX = 2519
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.exist
//           expect(err.logs.join()).to.contain('CannotBarricadeTile')
//         })
//         it('should cost 1 energy point to build barricades', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2565
//           const tileX = 2565
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//             energyUpdatedAt: new anchor.BN(Date.now() / 1000 + 1000),
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount?.energy).to.equal(99)
//         })
//         it('should gain 10 xp when successfully building barricades', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2614
//           const tileX = 2614
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount?.xp).to.equal(10)
//         })
//         it('should not gain xp when unsuccessfully building barricades', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2662
//           const tileX = 2662
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update tile
//           tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//             numZombies: 0,
//             numSurvivors: 0,
//             numBarricades: 251,
//             hasGenerator: false,
//             hasPowerUntil: new BN(1),
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount?.xp).to.equal(0)
//         })
//         it('should take 1 damage when infected', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2725
//           const tileX = 2725
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//             isInfected: true,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount?.hp).to.equal(99)
//         })
//         it('should not take damage when not infected', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2774
//           const tileX = 2774
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount?.hp).to.equal(100)
//         })
//         it('should set the last_acted_at field to the current time when building barricades', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const tileY = 2822
//           const tileX = 2822
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const characterAccount = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(characterAccount).to.exist
//           expect(characterAccount?.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//         })
//       })
//     })
//     describe('Attacking', () => {
//       it('should not be able to attack if energy is not enough', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const tileY = 2923
//         const tileX = 2923
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character2, {
//           energy: 0,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 1),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6017')
//       })
//       it('should not be able to attack an adjacent tile if carrying a melee weapon', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY + 1,
//           tileType: { hospital: {} },
//         }))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY + 1, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6018')
//       })
//       it('should be able to attack an adjacent tile if carrying ranged weapon', async () => {
//         const zombie = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const survivor = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY + 1,
//           tileType: { fireStation: {} },
//         }))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let itemId = await getUniqueItemId()
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: itemId,
//           name: 'ranged weapon',
//           itemType: {
//             weapon: {
//               weaponType: { firearm: {} },
//               damage: 5,
//               accuracy: 10000,
//               breakChance: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, zombie)
//         tx.add(await playerClient.characterInit(tileX, tileY + 1, false, survivor))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(survivor, { equippedItems: { weapon: itemId, armor: null } })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(survivor, zombie)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e);
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//       })
//       it('should cost 1 energy point to attack', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const tileY = 2973
//         const tileX = 2973
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character2, {
//           energyUpdatedAt: new BN(Date.now() / 1000 + 1),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character2Account.energy).to.equal(99)
//       })
//       it('should not be able to attack if hp is 0', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const tileY = 3022
//         const tileX = 3022
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character2, {
//           hp: 0,
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6016')
//       })
//       it('should not be able to attack another human', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const tileY = 3070
//         const tileX = 3070
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6042')
//       })
//       it('should be able to attack a zombie on the same tile', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const tileY = 3109
//         const tileX = 3109
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//       })
//       it('should not be able to attack a zombie on another tile', async () => {
//         const zombie = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const survivor = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const tileY = 3146
//         const tileX = 3146
//         const tileY2 = 3146 + 1
//         const tileX2 = 3146

//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX2,
//             y: tileY2,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, zombie)
//         tx.add(await playerClient.characterInit(tileX2, tileY2, false, survivor))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(survivor, zombie)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6018')
//       })
//       it('should take 1 damage when infected', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character 2
//         tx = await operatorClient.characterUpdate(character2, { isInfected: true })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character2Account).to.exist
//         expect(character2Account?.hp).to.equal(99)
//       })
//       it('should not take damage when not infected', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character2Account).to.exist
//         expect(character2Account?.hp).to.equal(100)
//       })
//       it('should gain 10 xp when failing an attack', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update attack success rate
//         tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 0)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character2Account).to.exist
//         expect(character2Account?.xp).to.equal(10)
//       })
//       it('should gain 10 + damage dealt xp when successfully attacking', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update attack success rate
//         tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character1Account).to.exist
//         expect(character2Account).to.exist
//         expect(character2Account?.xp).to.equal(10 + (100 - character1Account?.hp))
//       })
//       it('should set the last_acted_at field to the current time when attacking', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character2Account).to.exist
//         expect(character2Account?.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//       })
//     })
//     describe('Using Items', () => {
//       it('should be able to install a generator on a non-street tile if a generator is not present', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'generator',
//           itemType: {
//             consumable: {
//               consumableType: { generator: {} },
//               effectValue: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // install generator
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const tileAccount = await program.account.mapTile.fetchNullable(pdas.mapTile(tileX, tileY))
//         expect(tileAccount.hasGenerator).to.be.true
//       })
//       it('should not be able to install a generator on a non-street tile if a generator is present', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 0,
//           hasGenerator: true,
//           hasPowerUntil: new BN(0),
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'Power Generator',
//           itemType: {
//             consumable: {
//               consumableType: { generator: {} },
//               effectValue: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // install generator
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6007')
//       })
//       it('should not be able to install a generator on a street tile', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { street: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'generator',
//           itemType: {
//             consumable: {
//               consumableType: { generator: {} },
//               effectValue: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // install generator
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6007')
//       })
//       it('should gain 100 xp when successfully installing a generator', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'generator',
//           itemType: {
//             consumable: {
//               consumableType: { generator: {} },
//               effectValue: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // install generator
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetchNullable(pdas.character(character1), 'single')
//         expect(character1Account).to.exist
//         expect(character1Account!.xp).to.equal(0)
//         expect(character1Account!.level).to.equal(2)
//       })
//       it('should be able to use a first aid kit on another human', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'first aid',
//           itemType: {
//             consumable: {
//               consumableType: { health: {} },
//               effectValue: 20,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use first aid kit
//         tx = await playerClient.characterUseItem(character1, character2, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//       })
//       it('should not be able to use a first aid kit on a zombie', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'first aid',
//           itemType: {
//             consumable: {
//               consumableType: { health: {} },
//               effectValue: 20,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use first aid kit
//         tx = await playerClient.characterUseItem(character1, character2, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6046')
//       })
//       it('should gain 20 xp when using a first aid kit', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'first aid',
//           itemType: {
//             consumable: {
//               consumableType: { health: {} },
//               effectValue: 20,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use first aid kit
//         tx = await playerClient.characterUseItem(character1, character2, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//         expect(character1Account.xp).to.equal(20)
//       })
//       it('should be able to use a zombie revival syringe on a zombie', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'syringe',
//           itemType: {
//             consumable: {
//               consumableType: { revive: {} },
//               effectValue: 20,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use syringe
//         tx = await playerClient.characterUseItem(character1, character2, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character2Account.isZombie).to.be.false
//       })
//       it('should not be able to use a zombie revival syringe on a human', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'syringe',
//           itemType: {
//             consumable: {
//               consumableType: { revive: {} },
//               effectValue: 20,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use first aid kit
//         tx = await playerClient.characterUseItem(character1, character2, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6044')
//       })
//       it('should turn a zombie into a human when using a zombie revival syringe, retaining their current hp and energy', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'syringe',
//           itemType: {
//             consumable: {
//               consumableType: { revive: {} },
//               effectValue: 20,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         tx.add(
//           await operatorClient.characterUpdate(character2, {
//             hp: 50,
//             energy: 50,
//             energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use first aid kit
//         tx = await playerClient.characterUseItem(character1, character2, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         console.log(err);
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character2Account.isZombie).to.be.false
//         expect(character2Account.hp).to.eq(50)
//         expect(character2Account.energy).to.eq(50)
//       })
//       it('should gain 50 xp when using a zombie revival syringe', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'syringe',
//           itemType: {
//             consumable: {
//               consumableType: { revive: {} },
//               effectValue: 20,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use first aid kit
//         tx = await playerClient.characterUseItem(character1, character2, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//         expect(character1Account.xp).to.eq(50)
//       })
//       it('should be able to use a fuel can on a tile that has a generator', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               consumable: {
//                 consumableType: { fuel: {} },
//                 effectValue: 20,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 0,
//           hasGenerator: true,
//           hasPowerUntil: new BN(0),
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use fuel
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//       })
//       it('should not be able to use a fuel can on a tile that does not have a generator', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               consumable: {
//                 consumableType: { fuel: {} },
//                 effectValue: 20,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use fuel
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6007')
//       })
//       it('should add 24 hours of power to a tile when using a fuel can', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               consumable: {
//                 consumableType: { fuel: {} },
//                 effectValue: 24,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 0,
//           hasGenerator: true,
//           hasPowerUntil: new BN(0),
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use fuel
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const tile = await program.account.mapTile.fetch(pdas.mapTile(tileX, tileY))
//         expect(tile.hasPowerUntil.toNumber()).to.be.approximately(Date.now() / 1000 + 24 * 60 * 60, 20)
//       })
//       it('should gain 50 xp when using a fuel can', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               consumable: {
//                 consumableType: { fuel: {} },
//                 effectValue: 20,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 0,
//           hasGenerator: true,
//           hasPowerUntil: new BN(0),
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use fuel
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.xp).to.equal(50)
//       })
//       it('should be able to use a experience syringe to gain bonus xp', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'first aid',
//           itemType: {
//             consumable: {
//               consumableType: { xp: {} },
//               effectValue: 20,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use first aid kit
//         tx = await playerClient.characterUseItem(character1, character2, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetch(pdas.character(character2))
//         expect(character2Account.bonusXp).to.equal(20)
//       })
//       it('should be able to destroy an item in their inventory if it is not equipped', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               consumable: {
//                 consumableType: { fuel: {} },
//                 effectValue: 20,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy item
//         tx = await playerClient.characterDestroyItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//       })
//       it('should not be able to destroy an item in their inventory if it is equipped', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               weapon: {
//                 weaponType: { melee: {} },
//                 damage: 10,
//                 accuracy: 10,
//                 breakChance: 10,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           equippedItems: {
//             weapon: itemId,
//             armor: null,
//           },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy item
//         tx = await playerClient.characterDestroyItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6024')
//       })
//       it('should not cost any energy to destroy an item in their inventory', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               consumable: {
//                 consumableType: { fuel: {} },
//                 effectValue: 20,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy item
//         tx = await playerClient.characterDestroyItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.energy).to.equal(100)
//       })
//       it('should set the last_acted_at field to the current time when using an item', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               consumable: {
//                 consumableType: { fuel: {} },
//                 effectValue: 20,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 0,
//           hasGenerator: true,
//           hasPowerUntil: new BN(0),
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // use fuel
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//       })
//       it('should set the last_acted_at field to the current time when destroying an item', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'fuel',
//             itemType: {
//               consumable: {
//                 consumableType: { fuel: {} },
//                 effectValue: 20,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy item
//         tx = await playerClient.characterDestroyItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character = await program.account.character.fetch(pdas.character(character1))
//         expect(character.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//       })
//     })
//     describe('Equipping Items', () => {
//       it('should be able to equip an equippable item in their inventory', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.equippedItems.armor).to.equal(itemId)
//       })
//       it('should not be able to equip an item that is not in their inventory', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6024')
//       })
//       it('should not be able to equip an item that is not equippable', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'not armor',
//             itemType: { consumable: { consumableType: { health: {} }, effectValue: 20 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6009')
//       })
//       it('should remove the item from their inventory when equipping it', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.inventory).to.not.contain(itemId)
//       })
//       it('should cost 1 energy point to equip an item', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           energyUpdatedAt: new BN(Date.now() / 1000 + 1),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.energy).to.equal(99)
//       })
//       it('should take 1 damage when infected', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId], isInfected: true })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.hp).to.eq(99)
//       })
//       it('should not take damage when not infected', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.hp).to.eq(100)
//       })
//       it('should not be able to equip an item if energy is not enough', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           energy: 0,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 1),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6017')
//       })
//       it('should be able to unequip an item if there is space in their inventory', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [],
//           equippedItems: { armor: itemId, weapon: null },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterUnequipItem(character1, { armor: {} })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.equippedItems.armor).to.not.exist
//         expect(character1Account.inventory).to.deep.eq([itemId])
//       })
//       it('should not be able to unequip an item if there i no space in their inventory', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//           equippedItems: { armor: itemId, weapon: null },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterUnequipItem(character1, { armor: {} })
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6022')
//       })
//     })
//     describe('Minting', () => {
//       it('shoulde be able to mint an item in their inventory if they have not been attacked for 24 hours', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId], hasPremium: true })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e);
//           err = e
//         }
//         console.log(err);
//         // check results
//         expect(err).to.not.exist
//         const ataItem = await getTokenWallet(playerKeypair.publicKey, mint.publicKey)
//         const ataItemAccount = await SPL.getAccount(anchor.getProvider().connection, ataItem, 'confirmed')
//         expect(ataItemAccount.amount).to.eq(BigInt(1))
//       })
//       it('should not be able to mint an item in their inventory if they have been attacked in the last 24 hours', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           lastAttackedAt: new BN(Date.now() / 1000),
//           hasPremium: true,
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // mint item
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6030')
//       })
//       it('should cost 5 energy points to mint an item', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//           hasPremium: true,
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e);
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.energy).to.eq(95)
//       })
//       it('should not be able to mint an item if energy is not enough', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//           energy: 1,
//           hasPremium: true,
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6017')
//       })
//       it('should take 1 damage when infected', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',
//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId], hasPremium: true, isInfected: true })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e);
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.hp).to.eq(99)
//       })
//       it('should not take damage when not infected', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',

//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId], isInfected: false, hasPremium: true })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e);
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.hp).to.eq(100)
//       })
//     })
//     describe('Redeem', () => {
//       it('should be able to redeem an item with an NFT', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',

//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId], hasPremium: true })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e);
//           err = e
//         }

//         expect(err).to.not.exist
//         const ataItem = await getTokenWallet(playerKeypair.publicKey, mint.publicKey)
//         const ataItemAccount = await SPL.getAccount(anchor.getProvider().connection, ataItem, 'confirmed')
//         expect(ataItemAccount.amount).to.eq(BigInt(1))
//         // before redeem
//         // player ata for the item should have 1 token
//         let playerATA = await SPL.getAccount(
//           anchor.getProvider().connection,
//           ataItem,
//           'confirmed'
//         )
//         expect(playerATA.amount).to.eq(BigInt(1))
//         // character inventory should have 0 items
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.inventory).to.have.lengthOf(0)
//         // redeem item
//         tx = await playerClient.characterRedeemItem(character1, 'asdfaasdf')
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         // character should get the item
//         character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.inventory).to.deep.eq([itemId])
//         // player ata for the item should have 0 tokens
//         playerATA = await SPL.getAccount(
//           anchor.getProvider().connection,
//           ataItem,
//           'confirmed'
//         )
//         expect(playerATA.amount).to.eq(BigInt(0))
//       })
//     })
//     describe('Death', () => {
//       it('should reset the is_infected flag to false when killed', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { isInfected: true, hp: 1 })
//         // update attack success rate
//         tx.add(await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack to kill character 1
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.isInfected).to.be.false
//       })
//       it('should set the is_zombie flag to true when killed', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { isInfected: true, hp: 1 })
//         // update attack success rate
//         tx.add(await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack to kill character 1
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.isZombie).to.be.true
//       })
//       it('should be able to move a dead player on the same tile to an adjacent non-barricaded tile', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { hp: 0 })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // character 2 drags character 1
//         tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.x).to.equal(tileX + 1)
//         expect(character1Account.y).to.equal(tileY)
//         const character2Account = await program.account.character.fetch(pdas.character(character2))
//         expect(character2Account.x).to.equal(tileX)
//         expect(character2Account.y).to.equal(tileY)
//       })
//       it('should not be able to move a dead player on the same tile to a non-adjacent tile', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 2,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { hp: 0 })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // character 2 drags character 1
//         tx = await playerClient.characterDrag(character2, character1, tileX + 2, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6007')
//       })
//       it('should not be able to move a dead player on the same tile to a barricaded tile', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update target tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { hp: 0 })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // character 2 drags character 1
//         tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6007')
//       })
//       it('should not be able to move a dead player that is not on the same tile', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX + 1, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { hp: 0 })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // character 2 drags character 1
//         tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6018')
//       })
//       it('should cost 2 energy points to move a dead player', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { hp: 0 })
//         tx.add(
//           await operatorClient.characterUpdate(character2, {
//             energy: 100,
//             energyUpdatedAt: new BN(Date.now() / 1000 + 20),
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // character 2 drags character 1
//         tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetch(pdas.character(character2))
//         expect(character2Account.energy).to.equal(98)
//       })
//     })
//   })
//   describe('Zombies', () => {
//     describe('General', () => {
//       it('should be able to join the game as a zombie', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init character
//         let tx = await playerClient.characterInit(0, 0, true, character1)
//         try {
//           await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed' })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }

//         // check results
//         let characterAccount1 = await program.account.character.fetchNullable(pdas.character(character1))
//         expect(characterAccount1).to.exist
//       })
//     })
//     describe('Searching', () => {
//       const searchableTiles = [
//         'hospital',
//         'apartment',
//         'policeStation',
//         'warehouse',
//         'fireStation',
//         'zedCorp',
//         'factory',
//         'secretLocation',
//       ]
//       for (let i = 0; i < searchableTiles.length; i++) {
//         it(`shoul not be able to search ${searchableTiles[i]} tile`, async () => {
//           const { tileX, tileY } = getUniqueCoords()
//           let tileType = {}
//           tileType[searchableTiles[i]] = {}
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           let character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           expect(err).to.exist
//           expect(JSON.stringify(err)).to.contain('6008')
//         })
//       }
//     })
//     describe('Movement', () => {
//       it('should be able to move to any tile that is not barricaded', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // move
//         tx = await playerClient.characterMove(tileX + 1, tileY, character1)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const characterAccount = await program.account.character.fetch(pdas.character(character1))
//         expect(characterAccount.x).to.equal(tileX + 1)
//         expect(characterAccount.y).to.equal(tileY)
//       })
//       it('should not be able to move to any tile that is barricaded', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // move
//         tx = await playerClient.characterMove(tileX + 1, tileY, character1)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6014')
//       })
//       it('should cost 2 energy points to move without the speed walking skill', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { energyUpdatedAt: new BN(Date.now() + 10000) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // move
//         tx = await playerClient.characterMove(tileX + 1, tileY, character1)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const characterAccount = await program.account.character.fetch(pdas.character(character1))
//         expect(characterAccount.energy).to.equal(98)
//       })
//       it('should cost 1 energy point to move with the speed walking skill', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           energyUpdatedAt: new BN(Date.now() + 10000),
//           skills: Array(24).fill(false).concat(true),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // move
//         tx = await playerClient.characterMove(tileX + 1, tileY, character1)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const characterAccount = await program.account.character.fetch(pdas.character(character1))
//         expect(characterAccount.energy).to.equal(99)
//       })
//       it('should set the last_acted_at field to the current time when moving', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { energyUpdatedAt: new BN(Date.now() / 1000 + 10000) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // move
//         tx = await playerClient.characterMove(tileX + 1, tileY, character1)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const characterAccount = await program.account.character.fetch(pdas.character(character1))
//         expect(characterAccount.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//       })
//     })
//     describe('Barricades', () => {
//       it('should be able to attack barricades in adjacent tiles if the barricade destroyer skill is unlocked', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const tileAccount = await program.account.mapTile.fetch(pdas.mapTile(tileX + 1, tileY))
//         expect(tileAccount.numBarricades).to.equal(0)
//       })
//       it('should be able to attack barricades in the current tile if the barricade destroyer skill is unlocked', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterDestroyBarricade(character1, tileX, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const tileAccount = await program.account.mapTile.fetch(pdas.mapTile(tileX, tileY))
//         expect(tileAccount.numBarricades).to.equal(0)
//       })
//       it('should be able to destroy a generator if one is installed on the current tile', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: true,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy
//         tx = await playerClient.characterDestroyGenerator(character1, tileX, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const tileAccount = await program.account.mapTile.fetch(pdas.mapTile(tileX, tileY))
//         expect(tileAccount.hasGenerator).to.equal(false)
//       })
//       it('should cost 1 energy point to attack barricades', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           skills: Array(17).fill(false).concat(true),
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.energy).to.equal(99)
//       })
//       it('should descrease the barricade count by 1 when successfully attacking barricades', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const tileAccount = await program.account.mapTile.fetch(pdas.mapTile(tileX + 1, tileY))
//         expect(tileAccount.numBarricades).to.equal(0)
//       })
//       it('should not descrease the barricade count when unsuccessfully attacking barricades', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 0))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const tileAccount = await program.account.mapTile.fetch(pdas.mapTile(tileX + 1, tileY))
//         expect(tileAccount.numBarricades).to.equal(1)
//       })
//       it('should gain 25 xp when successfully attacking barricades', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const characterAccount = await program.account.character.fetch(pdas.character(character1))
//         expect(characterAccount.xp).to.equal(25)
//       })
//       it('should not gain xp when unsuccessfully attacking barricades', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 0))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const characterAccount = await program.account.character.fetch(pdas.character(character1))
//         expect(characterAccount.xp).to.equal(0)
//       })
//       it('should not be able to build barricades', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // try build barricade
//         tx = await playerClient.characterBarricade(character1)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6020')
//       })
//       it('should set the last_acted_at field to the current time when attacking barricades', async () => {
//         let { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update tile
//         tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//           numZombies: 0,
//           numSurvivors: 0,
//           numBarricades: 1,
//           hasGenerator: false,
//           hasPowerUntil: new BN(0),
//           tileType: { hospital: {} },
//         })
//         // update success rate
//         tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//       })
//     })
//     describe('Attacking', () => {
//       it('should not be able to attack if energy is not enough', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           energy: 0,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6017')
//       })
//       it('should cost 1 energy point to attack', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           energy: 100,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.energy).to.eq(99)
//       })
//       it('should not be able to attack if hp is 0', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           hp: 0,
//           energy: 0,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6016')
//       })
//       it('should be able to attack another zombie on the same tile', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           energy: 100,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//       })
//       it('should be not able to attack another zombie on another tile', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX + 1, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           energy: 100,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6018')
//       })
//       it('should be able to attack a human on the same tile', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           energy: 100,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//       })
//       it('should be not able to attack a human on another tile', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX + 1, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           energy: 100,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6018')
//       })
//       it('should gain 10 xp when failing an attack', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         tx = await operatorClient.characterUpdate(character2, { equippedItems: { weapon: null, armor: null } })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update attack success rate
//         tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 0)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character2Account).to.exist
//         expect(character2Account?.xp).to.equal(10)
//       })
//       it('should gain 10 + damage dealt xp when successfully attacking', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update attack success rate
//         tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character2, character1)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character1Account).to.exist
//         expect(character2Account).to.exist
//         expect(character2Account?.xp).to.equal(10 + (100 - character1Account?.hp))
//       })
//       it('should be able to drag a human from an adjacent tile to the current tile if their hp is below 25 and they have the drag skill unlocked', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX + 1, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update characters
//         tx = await operatorClient.characterUpdate(character1, { hp: 24 })
//         tx.add(await operatorClient.characterUpdate(character2, { skills: Array(22).fill(false).concat(true) }))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // drag
//         tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//         const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//         expect(character1Account.x).to.equal(tileX)
//         expect(character1Account.y).to.equal(tileY)
//       })
//       it('should not be able to drag a human from an adjacent tile to the current tile if their hp is below 25 and they do not have the drag skill unlocked', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX + 1, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update characters
//         tx = await operatorClient.characterUpdate(character1, { hp: 24 })
//         tx.add(await operatorClient.characterUpdate(character2, { skills: Array(22).fill(false).concat(false) }))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // drag
//         tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6041')
//       })
//       it('should not be able to drag a human from an adjacent tile to the current tile if their hp is eq to 25', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX + 1, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update characters
//         tx = await operatorClient.characterUpdate(character1, { hp: 25 })
//         tx.add(await operatorClient.characterUpdate(character2, { skills: Array(22).fill(false).concat(true) }))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // drag
//         tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6047')
//       })
//       it('should not be able to drag a human from an adjacent tile to the current tile if their hp is above 25', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 1,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX + 1, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update characters
//         tx = await operatorClient.characterUpdate(character1, { hp: 26 })
//         tx.add(await operatorClient.characterUpdate(character2, { skills: Array(22).fill(false).concat(true) }))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // drag
//         tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }

//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6047')
//       })
//       it('should not be able to drag a human from an non-adjacent tile to the current tile', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         tx.add(
//           await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX + 2,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX + 2, tileY, false, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update characters
//         tx = await operatorClient.characterUpdate(character1, { hp: 24 })
//         tx.add(await operatorClient.characterUpdate(character2, { skills: Array(22).fill(false).concat(true) }))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // drag
//         tx = await playerClient.characterDrag(character2, character1, tileX + 2, tileY)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6007')
//       })
//       it('should set the last_acted_at field to the current time when attacking', async () => {
//         const { tileX, tileY } = getUniqueCoords()
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const character2 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character2',
//           'character2',
//           'character2',
//           500
//         )
//         // init tile
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { hospital: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         tx = await operatorClient.characterUpdate(character1, {
//           energy: 100,
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // attack
//         tx = await playerClient.characterAttack(character1, character2)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//       })
//     })
//     describe('Using Items', () => {
//       it('should not be able to use items in the inventory', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'generator',

//           itemType: {
//             consumable: {
//               consumableType: { generator: {} },
//               effectValue: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // install generator
//         tx = await playerClient.characterUseItem(character1, character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6045')
//       })
//       it('should be able to destroy an item in their inventory if it is not equipped', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'generator',

//           itemType: {
//             consumable: {
//               consumableType: { generator: {} },
//               effectValue: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy generator
//         tx = await playerClient.characterDestroyItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.inventory).to.be.empty
//       })
//       it('should not be able to destroy an item in their inventory if it is equipped', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'weapon',

//           itemType: {
//             weapon: {
//               weaponType: { melee: {} },
//               damage: 10,
//               accuracy: 10,
//               breakChance: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { equippedItems: { weapon: itemId, armor: null } })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy generator
//         tx = await playerClient.characterDestroyItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6024')
//       })
//       it('should not cost any energy to destroy an item in their inventory', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'generator',

//           itemType: {
//             consumable: {
//               consumableType: { generator: {} },
//               effectValue: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy generator
//         tx = await playerClient.characterDestroyItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.energy).to.eq(100)
//       })
//       it('should set the last_acted_at field to the current time when destroying an item', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init item
//         tx = await operatorClient.registerOrUpdateItem({
//           itemId: await getUniqueItemId(),
//           name: 'generator',

//           itemType: {
//             consumable: {
//               consumableType: { generator: {} },
//               effectValue: 0,
//             },
//           },
//           rarity: {
//             common: {},
//           },
//           kind: {
//             none: {}
//           }
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // destroy generator
//         tx = await playerClient.characterDestroyItem(character1, itemId)
//         let err: any = null
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.lastActedAt.toNumber()).to.be.approximately(Date.now() / 1000, 2)
//       })
//     })
//     describe('Equipping Items', () => {
//       it('should be able to equip a "Claw"', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'claw',

//             itemType: { weapon: { damage: 5, weaponType: { zombieClaw: {} }, breakChance: 0, accuracy: 10 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.equippedItems.weapon).to.equal(itemId)
//       })
//       it('should not have the "claw" in the inventory', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'claw',

//             itemType: {
//               weapon: {
//                 damage: 5,
//                 weaponType: { zombieClaw: {} },
//                 breakChance: 0,
//                 accuracy: 10,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.equippedItems.weapon).to.equal(itemId)
//       })
//       it('should be able to equip a "Bite"', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'bite',

//             itemType: {
//               weapon: {
//                 damage: 5,
//                 weaponType: { zombieBite: {} },
//                 breakChance: 0,
//                 accuracy: 10,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.equippedItems.weapon).to.equal(itemId)
//       })
//       it('should not have the "bite" in the inventory', async () => {
//         let character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'bite',

//             itemType: {
//               weapon: {
//                 damage: 5,
//                 weaponType: { zombieBite: {} },
//                 breakChance: 0,
//                 accuracy: 10,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [] })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // equip item
//         tx = await playerClient.characterEquipItem(character1, itemId)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // check results
//         let character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.equippedItems.weapon).to.equal(itemId)
//       })
//     })
//     describe('Minting', () => {
//       it('should be able to mint an item in their inventory if they have not been attacked for 24 hours', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',

//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, { inventory: [itemId], hasPremium: true })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e);
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const ataItem = await getTokenWallet(playerKeypair.publicKey, mint.publicKey)
//         const ataItemAccount = await SPL.getAccount(anchor.getProvider().connection, ataItem, 'confirmed')
//         expect(ataItemAccount.amount).to.eq(BigInt(1))
//       })
//       it('should not be able to mint an item in their inventory if they have been attacked in the last 24 hours', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',

//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, true, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           lastAttackedAt: new BN(Date.now() / 1000),
//           hasPremium: true,
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6030')
//       })
//       it('should cost 5 energy points to mint an item', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',

//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//           hasPremium: true,
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e);
//           err = e
//         }
//         // check results
//         expect(err).to.not.exist
//         const character1Account = await program.account.character.fetch(pdas.character(character1))
//         expect(character1Account.energy).to.eq(95)
//       })
//       it('should not be able to mint an item if energy is not enough', async () => {
//         const character1 = await operatorClient.createCharacterNFT(
//           playerKeypair.publicKey,
//           'https://example.com/character1',
//           'character1',
//           'character1',
//           500
//         )
//         const { tileX, tileY } = getUniqueCoords()
//         // init tiles
//         let tx = await operatorClient.mapTileInit({
//           canBeBarricaded: true,
//           canBeSearched: true,
//           x: tileX,
//           y: tileY,
//           tileType: { fireStation: {} },
//         })
//         // init item
//         tx.add(
//           await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'armor',

//             itemType: { armor: { armorType: { heavy: {} }, defense: 20, breakChance: 1 } },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//         )
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // init character
//         tx = await playerClient.characterInit(tileX, tileY, false, character1)
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         // update character
//         const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//         tx = await operatorClient.characterUpdate(character1, {
//           inventory: [itemId],
//           energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//           energy: 1,
//           hasPremium: true,
//         })
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           console.log(e)
//           throw e
//         }
//         let mint = Keypair.generate();
//         // mint item
//         tx = await playerClient.itemMint(mint, character1, itemId)
//         let err: any = undefined
//         try {
//           await anchor
//             .getProvider()
//             .sendAndConfirm(tx, [mint, playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//         } catch (e) {
//           err = e
//         }
//         // check results
//         expect(err).to.exist
//         expect(JSON.stringify(err)).to.contain('6017')
//       })
//     })
//   })
//   describe('Items', () => {
//     describe('General', () => {
//       // TODO: New test case needed?
//       // Item struct has been changed
//       // it('should have damage, armor, and durability attributes')
//       // it('As a developer, I should be able to create Items that are not registered as an sft (item id < 1000). An item_id of 0 is considered a null item and is purely used as tracking')
//     })
//     describe('Atrributes', () => {
//       describe('Damage', () => {
//         it('should use the damage value of the equipped item when attacking', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'weapon',

//               itemType: {
//                 weapon: {
//                   weaponType: { melee: {} },
//                   damage: 50,
//                   breakChance: 1,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2, to equip the weapon
//           tx.add(await operatorClient.characterUpdate(character2, { equippedItems: { weapon: itemID, armor: null } }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(50)
//         })
//         it('should use the default base damage if no item is equipped when attacking', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'weapon',

//               itemType: {
//                 weapon: {
//                   weaponType: { melee: {} },
//                   damage: 50,
//                   breakChance: 1,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2, to equip the weapon
//           tx.add(await operatorClient.characterUpdate(character2, { equippedItems: { weapon: null, armor: null } }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(95)
//         })
//         it('should have 8 damage if it is a "Claw"', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'claw',

//               itemType: {
//                 weapon: {
//                   weaponType: { zombieClaw: {} },
//                   damage: 8,
//                   breakChance: 0,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2, to equip the weapon
//           tx.add(await operatorClient.characterUpdate(character2, { equippedItems: { weapon: itemID, armor: null } }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(92)
//         })
//         it('should have 10 damage if it is a "Bite"', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'bite',

//               itemType: {
//                 weapon: {
//                   weaponType: { zombieBite: {} },
//                   damage: 10,
//                   breakChance: 0,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2, to equip the weapon
//           tx.add(await operatorClient.characterUpdate(character2, { equippedItems: { weapon: itemID, armor: null } }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(90)
//         })
//         // TODO: possible conflit with InfectedBite skill?
//         // it('should have a 50% chance to infect a human if it is a "Bite"')
//       })
//       describe('Armor', () => {
//         it('should decrease the damage dealt by the armor value if equipped when attacked', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'armor',

//               itemType: {
//                 armor: {
//                   armorType: { light: {} },
//                   defense: 10,
//                   breakChance: 0,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 1, to equip the armor
//           tx.add(await operatorClient.characterUpdate(character1, { equippedItems: { weapon: null, armor: itemID } }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(100)
//         })
//         it('should not decrease the damage dealt by the armor value if not equipped when attacked', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'armor',

//               itemType: {
//                 armor: {
//                   armorType: { light: {} },
//                   defense: 10,
//                   breakChance: 0,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 1, to equip the armor
//           tx.add(await operatorClient.characterUpdate(character1, { inventory: [itemID] }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(95)
//         })
//       })
//       describe('Break probability', () => {
//         it('should have a chance to be destroyed based on break chance if equipped as a weapon when attacking', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'weapon',

//               itemType: {
//                 weapon: {
//                   weaponType: { melee: {} },
//                   damage: 50,
//                   breakChance: 10000,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2, to equip the weapon
//           tx.add(await operatorClient.characterUpdate(character2, { equippedItems: { weapon: itemID, armor: null } }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(character2Account).to.exist
//           expect(character2Account.equippedItems.weapon).to.not.exist
//         })
//         it('should have a chance to be destroyed based on break chance if equipped as armor when attacked', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'armor',

//               itemType: {
//                 armor: {
//                   armorType: { light: {} },
//                   defense: 10,
//                   breakChance: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 1, to equip the armor
//           tx.add(await operatorClient.characterUpdate(character1, { equippedItems: { weapon: null, armor: itemID } }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.equippedItems.armor).to.not.exist
//         })
//         // TODO: Having a probability of break is mathematically the same as having a durability value
//         // And naming it durability is a little misleading, in my opinion.
//         // Because even 99 durability has a chance to break on the first use.
//         // durability roll is 100, durability is a value between 0-100. 0 never breaks, 100 always breaks on use
//         // it('should break if durability roll is less than durability value')
//       })
//     })
//   })
//   describe('Skills', () => {
//     describe('Scientist', () => {
//       describe('Advanced Healing', () => {
//         it('should cost 2 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 20 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ advancedHealing: {} }, 2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { advancedHealing: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(18)
//         })
//         it('should increase the healing amount by 10', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'item1',

//               itemType: {
//                 consumable: {
//                   consumableType: { health: {} },
//                   effectValue: 10,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have advanced healing, the item, and low hp
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: Array(12).fill(false).concat(true),
//             inventory: [itemId],
//             hp: 1,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // use item
//           tx = await playerClient.characterUseItem(character1, character1, itemId)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.hp).to.equal(1 + 10 + 10)
//         })
//       })
//       describe('Tech Looter', () => {
//         it('should cost 5 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { zedCorp: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 20 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ techLooter: {} }, 5))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { techLooter: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(15)
//         })
//         it('should improve loot chance in ZedCorp buildings by LooterSearchSuccessRateBonus', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { zedCorp: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'item1',

//               itemType: {
//                 consumable: {
//                   consumableType: { health: {} },
//                   effectValue: 10,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have tech looter
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: Array(13).fill(false).concat(true),
//             inventory: [],
//             hp: 1,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update tech looter bonus to 100% for testing
//           tx = await operatorClient.configSetVariable({ looterSearchSuccessRateBonus: {} }, 10000)
//           // set item random weight for zedcorp buildings
//           tx.add(await operatorClient.configSetItemRandomWeights('zedCorp', [itemId], [10000]))
//           // set base search success rate to 0
//           tx.add(await operatorClient.configSetSearchSuccessRate({ zedCorp: {} }, 0))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.inventory).to.deep.equal([itemId])
//         })
//       })
//       describe('Revival Syringe Crafter', () => {
//         it('should cost 10 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 20 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ revivalSyringeCrafter: {} }, 10))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { revivalSyringeCrafter: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(10)
//         })
//         it('should allow for the ability to manufacture convert zombie syringes in a powered ZedCorp building', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { zedCorp: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'item1',

//               itemType: {
//                 consumable: {
//                   consumableType: { revive: {} },
//                   effectValue: 10,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           // update tile
//           tx.add(
//             await operatorClient.mapTileUpdate(tileX, tileY, {
//               numZombies: 0,
//               numSurvivors: 0,
//               numBarricades: 0,
//               hasGenerator: true,
//               hasPowerUntil: new BN(Date.now() / 1000 + 1000000),
//               tileType: { zedCorp: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, { skills: Array(14).fill(false).concat(true) })

//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // craft
//           tx = await playerClient.characterCraftItem(character1, itemId)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.inventory).to.deep.equal([itemId])
//         })
//       })
//       describe('Adrenaline Syringe Crafter', () => {
//         it('should cost 25 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ adrenalineSyringeCrafter: {} }, 25))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { adrenalineSyringeCrafter: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(75)
//         })
//         it('should allow for the ability to manufacture adrenaline syringes in a powered ZedCorp building', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { zedCorp: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'item1',

//               itemType: {
//                 consumable: {
//                   consumableType: { energy: {} },
//                   effectValue: 10,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           // update tile
//           tx.add(
//             await operatorClient.mapTileUpdate(tileX, tileY, {
//               numZombies: 0,
//               numSurvivors: 0,
//               numBarricades: 0,
//               hasGenerator: true,
//               hasPowerUntil: new BN(Date.now() / 1000 + 1000000),
//               tileType: { zedCorp: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, { skills: Array(15).fill(false).concat(true) })

//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // craft
//           tx = await playerClient.characterCraftItem(character1, itemId)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.inventory).to.deep.equal([itemId])
//         })
//       })
//       describe('Experience Syringe Crafter', () => {
//         it('should cost 25 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ experienceSyringeCrafter: {} }, 25))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { experienceSyringeCrafter: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(75)
//         })
//         it('should allow for the ability to manufacture xp syringes in a powered ZedCorp building', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { zedCorp: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'item1',

//               itemType: {
//                 consumable: {
//                   consumableType: { xp: {} },
//                   effectValue: 10,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           // update tile
//           tx.add(
//             await operatorClient.mapTileUpdate(tileX, tileY, {
//               numZombies: 0,
//               numSurvivors: 0,
//               numBarricades: 0,
//               hasGenerator: true,
//               hasPowerUntil: new BN(Date.now() / 1000 + 1000000),
//               tileType: { zedCorp: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, { skills: Array(16).fill(false).concat(true) })

//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // craft
//           tx = await playerClient.characterCraftItem(character1, itemId)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.inventory).to.deep.equal([itemId])
//         })
//       })
//     })
//     describe('Military', () => {
//       describe('Thick Skin', () => {
//         it('should cost 1 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ thickSkin: {} }, 1))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { thickSkin: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(99)
//         })
//         it('should reduce the damage taken by 1', async () => {
//           const { tileX, tileY } = getUniqueCoords()
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           // init tile
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             energy: 100,
//             energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//           })
//           tx.add(await operatorClient.characterUpdate(character2, { skills: Array(7).fill(false).concat(true) }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character1, character2)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(character2Account).to.exist
//           expect(character2Account.hp).to.equal(96)
//         })
//       })
//       describe('Advanced Melee', () => {
//         it('should cost 3 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ advancedMelee: {} }, 3))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { advancedMelee: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(97)
//         })
//       })
//       describe('Firearms Training', () => {
//         it('should cost 3 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ firearmsTraining: {} }, 3))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { firearmsTraining: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(97)
//         })
//         it('should increase the accuracy when using a firearm', async () => {
//           const { tileX, tileY } = getUniqueCoords()
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           // init tile
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'melee weapon',

//               itemType: {
//                 weapon: {
//                   weaponType: { firearm: {} },
//                   damage: 10,
//                   breakChance: 0,
//                   accuracy: 0,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, {
//             equippedItems: { weapon: itemId, armor: null },
//             skills: Array(26).fill(false).concat(true),
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character1, character2)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(character2Account).to.exist
//           expect(character2Account.hp).to.equal(90)
//         })
//       })
//       describe('Long Gun Proficiency', () => {
//         it('should cost 5 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ longGunProficiency: {} }, 5))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { longGunProficiency: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(95)
//         })
//       })
//       describe('Ranged Proficiency', () => {
//         it('should cost 10 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ rangedAccuracy: {} }, 10))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { rangedAccuracy: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(90)
//         })
//       })
//     })
//     describe('Civilian', () => {
//       describe('Parkour', () => {
//         it('should cost 1 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ parkour: {} }, 1))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { parkour: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(99)
//         })
//         it('should allow for the player to enter buildings that have more than 10 barricades on them if they are coming from a non street tile', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           const tileX2 = tileX
//           const tileY2 = tileY + 1
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX2,
//               y: tileY2,
//               tileType: { fireStation: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update tile
//           tx = await operatorClient.mapTileUpdate(tileX2, tileY2, {
//             numZombies: 0,
//             numSurvivors: 0,
//             numBarricades: 11,
//             hasGenerator: false,
//             hasPowerUntil: new BN(1),
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character to have parkour skill
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX2, tileY2, character1)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//         })
//         it('should not allow for the player to enter buildings that have more than 10 barricades on them if coming from a street tile', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           const tileX2 = tileX
//           const tileY2 = tileY + 1
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { street: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX2,
//               y: tileY2,
//               tileType: { fireStation: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update tile
//           tx = await operatorClient.mapTileUpdate(tileX2, tileY2, {
//             numZombies: 0,
//             numSurvivors: 0,
//             numBarricades: 11,
//             hasGenerator: false,
//             hasPowerUntil: new BN(1),
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character to have parkour skill
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX2, tileY2, character1)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.exist
//           expect(JSON.stringify(err)).to.contain('6014')
//         })
//       })
//       describe('Barricade Builder', () => {
//         it('should cost 1 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ barricadeBuilder: {} }, 1))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { barricadeBuilder: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(99)
//         })
//         it('should allow for the player to barricade a tile on a non-street tile', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: [false, true],
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // build barricade
//           tx = await playerClient.characterBarricade(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//         })
//       })
//       describe('Unarmed Combat', () => {
//         it('should cost 3 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ unarmedCombat: {} }, 3))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { unarmedCombat: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(97)
//         })
//         it('should increase the damage dealt by 1 when attacking without a weapon', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character2, {
//             skills: Array(2).fill(false).concat([true]),
//           })
//           // update attack success rate
//           tx.add(await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.hp).to.equal(94)
//         })
//       })
//       describe('Body Builder', () => {
//         it('should cost 3 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ bodyBuilder: {} }, 3))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { bodyBuilder: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(97)
//         })
//         it('should increase max hp by 10', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init item
//           tx = await operatorClient.registerOrUpdateItem({
//             itemId: await getUniqueItemId(),
//             name: 'first aid',

//             itemType: {
//               consumable: {
//                 consumableType: { health: {} },
//                 effectValue: 50,
//               },
//             },
//             rarity: {
//               common: {},
//             },
//             kind: {
//               none: {}
//             }
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, { inventory: [itemId] })
//           tx.add(
//             await operatorClient.characterUpdate(character2, {
//               skills: Array(3).fill(false).concat(true),
//               hp: 90,
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // use first aid kit
//           tx = await playerClient.characterUseItem(character1, character2, itemId)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           console.log(err);
//           expect(err).to.not.exist
//           const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(character2Account).to.exist
//           expect(character2Account.hp).to.equal(110)
//         })
//       })
//       describe('Advanced Unarmed Combat', () => {
//         it('should cost 8 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ advancedUnarmedCombat: {} }, 8))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { advancedUnarmedCombat: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(92)
//         })
//         it('should increase the damage dealt by 2 when attacking without a weapon', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character2, {
//             skills: Array(4).fill(false).concat([true]),
//           })
//           // upate attack success rate
//           tx.add(await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.hp).to.equal(93)
//         })
//       })
//       describe('Loot', () => {
//         it('should cost 8 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ looter: {} }, 8))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { looter: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(92)
//         })
//         it('should increase the loot chance by LooterSearchSuccessRateBonus', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'item1',

//               itemType: {
//                 consumable: {
//                   consumableType: { health: {} },
//                   effectValue: 10,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: Array(5).fill(false).concat(true),
//             inventory: [],
//             hp: 1,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }

//           // update looter bonus to 100% for testing
//           tx = await operatorClient.configSetVariable({ looterSearchSuccessRateBonus: {} }, 10000)
//           // set item random weight for zedcorp buildings
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [itemId], [10000]))
//           // set base search success rate to 0
//           tx.add(await operatorClient.configSetSearchSuccessRate({ fireStation: {} }, 0))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.inventory).to.deep.equal([itemId])
//         })
//       })
//       describe('Advanced Looter', () => {
//         it('should cost 15 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ advancedLooter: {} }, 15))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { advancedLooter: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(85)
//         })
//         it('should increase the loot chance by advancedLooterSearchSuccessRateBonus', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'item1',

//               itemType: {
//                 consumable: {
//                   consumableType: { health: {} },
//                   effectValue: 10,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: Array(6).fill(false).concat(true),
//             inventory: [],
//             hp: 1,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update looter bonus to 100% for testing
//           tx = await operatorClient.configSetVariable({ advancedLooterSearchSuccessRateBonus: {} }, 10000)
//           // set item random weight for zedcorp buildings
//           tx.add(await operatorClient.configSetItemRandomWeights('fireStation', [itemId], [10000]))
//           // set base search success rate to 0
//           tx.add(await operatorClient.configSetSearchSuccessRate({ fireStation: {} }, 0))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // search
//           tx = await playerClient.characterSearch(character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.inventory).to.deep.equal([itemId])
//         })
//       })
//     })
//     describe('Zombie', () => {
//       describe('Speed Walker', () => {
//         it('should cost 1 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ speedWalking: {} }, 1))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { speedWalking: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(99)
//         })
//         it('should reduce the energy cost of moving to 1 as a zombie', async () => {
//           const { tileX, tileY } = getUniqueCoords()
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init tile
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX + 1,
//               y: tileY,
//               tileType: { hospital: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             energyUpdatedAt: new BN(Date.now() + 10000),
//             skills: Array(24).fill(false).concat(true),
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // move
//           tx = await playerClient.characterMove(tileX + 1, tileY, character1)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const characterAccount = await program.account.character.fetch(pdas.character(character1))
//           expect(characterAccount.energy).to.equal(99)
//         })
//       })
//       describe('Barricade Killer', () => {
//         it('should cost 1 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ barricadeDestroyer: {} }, 1))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { barricadeDestroyer: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(99)
//         })
//         it('should allow for a zombie to destroy a barricade on an adjacent tile', async () => {
//           let { tileX, tileY } = getUniqueCoords()
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init tile
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX + 1,
//               y: tileY,
//               tileType: { hospital: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update tile
//           tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//             numZombies: 0,
//             numSurvivors: 0,
//             numBarricades: 1,
//             hasGenerator: false,
//             hasPowerUntil: new BN(0),
//             tileType: { hospital: {} },
//           })
//           // update success rate
//           tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, { skills: Array(17).fill(false).concat(true) })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const tileAccount = await program.account.mapTile.fetch(pdas.mapTile(tileX + 1, tileY))
//           expect(tileAccount.numBarricades).to.equal(0)
//         })
//       })
//       describe('Infected Bite', () => {
//         it('should cost 2 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ infectedBite: {} }, 2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { infectedBite: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(98)
//         })
//         it('should give a 50% infect chance when a zombie attacks using the bite attack', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init item
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'item1',
//               itemType: {
//                 weapon: {
//                   weaponType: { zombieBite: {} },
//                   damage: 10,
//                   breakChance: 0,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           const itemId = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.characterUpdate(character2, {
//             skills: Array(18).fill(false).concat(true),
//             equippedItems: { weapon: itemId, armor: null },
//           })
//           // set infection rate to 100%
//           tx.add(await operatorClient.configSetVariable({ infectedBiteInfectionRate: {} }, 10000))
//           // update
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.isInfected).to.be.true
//         })
//       })
//       describe('Tanky Flesh', () => {
//         it('should cost 5 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ tankyFlesh: {} }, 5))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { tankyFlesh: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(95)
//         })
//         it('should reduce the damage taken by 1', async () => {
//           const { tileX, tileY } = getUniqueCoords()
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           // init tile
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             energy: 100,
//             energyUpdatedAt: new BN(Date.now() / 1000 + 2),
//           })
//           tx.add(await operatorClient.characterUpdate(character2, { skills: Array(23).fill(false).concat(true) }))
//           // update attack success rate to 100%
//           tx.add(await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character1, character2)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(character2Account).to.exist
//           expect(character2Account.hp).to.equal(96)
//         })
//       })
//       describe('Drag', () => {
//         it('should cost 5 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ drag: {} }, 5))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { drag: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(95)
//         })
//         it('should allow for the player to drag a human from an adjacent tile to their current tile if the human has less than 25 hp', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX + 1,
//               y: tileY,
//               tileType: { fireStation: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX + 1, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update characters
//           tx = await operatorClient.characterUpdate(character1, { hp: 24 })
//           tx.add(await operatorClient.characterUpdate(character2, { skills: Array(22).fill(false).concat(true) }))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // drag
//           tx = await playerClient.characterDrag(character2, character1, tileX + 1, tileY)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(character1Account.x).to.equal(tileX)
//           expect(character1Account.y).to.equal(tileY)
//         })
//       })
//       describe('Healing Bite', () => {
//         it('should cost 5 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ healingAttack: {} }, 5))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { healingAttack: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(95)
//         })
//         it('should allow for the player to heal by the amount of damage dealt when attacking', async () => {
//           const { tileX, tileY } = getUniqueCoords()
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           // init tile
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, false, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: Array(21).fill(false).concat(true),
//             hp: 10,
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character1, character2)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetch(pdas.character(character1))
//           const character2Account = await program.account.character.fetch(pdas.character(character2))
//           expect(character1Account.hp).to.equal(10 + (100 - character2Account.hp))
//         })
//       })
//       describe('Empowered Bite', () => {
//         it('should cost 10 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ enhancedBite: {} }, 10))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { enhancedBite: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(90)
//         })
//         it('should increase the damage dealt by 3 when attacking with a bite', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'bite',

//               itemType: {
//                 weapon: {
//                   weaponType: { zombieBite: {} },
//                   damage: 10,
//                   breakChance: 0,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2
//           tx.add(
//             await operatorClient.characterUpdate(character2, {
//               equippedItems: { weapon: itemID, armor: null },
//               skills: Array(19).fill(false).concat(true),
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(87)
//         })
//       })
//       describe('Empowered Claw', () => {
//         it('should cost 10 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ enhancedClaws: {} }, 10))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { enhancedClaws: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(90)
//         })
//         it('should increase the damage dealt by 5 when attacking with a claw', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'claw',

//               itemType: {
//                 weapon: {
//                   weaponType: { zombieClaw: {} },
//                   damage: 8,
//                   breakChance: 0,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2
//           tx.add(
//             await operatorClient.characterUpdate(character2, {
//               equippedItems: { weapon: itemID, armor: null },
//               skills: Array(20).fill(false).concat(true),
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(87)
//         })
//       })
//       describe('Mutated Zombie', () => {
//         it('should cost 25 skill points to unlock', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()

//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character 1, to have skill points
//           tx = await operatorClient.characterUpdate(character1, { skillPoints: 100 })
//           // set skill points required
//           tx.add(await operatorClient.configSetSkillPointsRequired({ mutatedZombie: {} }, 25))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // unlock skill
//           tx = await playerClient.characterUnlockSkill(character1, { mutatedZombie: {} })
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account.skillPoints).to.equal(75)
//         })
//         it('should double xp gain while a zombie', async () => {
//           let { tileX, tileY } = getUniqueCoords()
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           // init tile
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { hospital: {} },
//           })
//           tx.add(
//             await operatorClient.mapTileInit({
//               canBeBarricaded: true,
//               canBeSearched: true,
//               x: tileX + 1,
//               y: tileY,
//               tileType: { hospital: {} },
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update tile
//           tx = await operatorClient.mapTileUpdate(tileX + 1, tileY, {
//             numZombies: 0,
//             numSurvivors: 0,
//             numBarricades: 1,
//             hasGenerator: false,
//             hasPowerUntil: new BN(0),
//             tileType: { hospital: {} },
//           })
//           // update success rate
//           tx.add(await operatorClient.configSetVariable({ destroyBarricadeSuccessRate: {} }, 10000))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, true, character1)
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update character
//           tx = await operatorClient.characterUpdate(character1, {
//             skills: Array(17).fill(false).concat(true).concat(Array(7).fill(false).concat(true)),
//           })
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterDestroyBarricade(character1, tileX + 1, tileY)
//           let err: any = undefined
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const characterAccount = await program.account.character.fetch(pdas.character(character1))
//           expect(characterAccount.xp).to.equal(50)
//         })
//         it('should double the damage dealt while a zombie', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'claw',

//               itemType: {
//                 weapon: {
//                   weaponType: { zombieClaw: {} },
//                   damage: 8,
//                   breakChance: 0,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2,
//           tx.add(
//             await operatorClient.characterUpdate(character2, {
//               equippedItems: { weapon: itemID, armor: null },
//               skills: Array(25).fill(false).concat(true),
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character1Account = await program.account.character.fetchNullable(pdas.character(character1))
//           expect(character1Account).to.exist
//           expect(character1Account?.hp).to.eq(84)
//         })
//         it('should double the max hp while a zombie', async () => {
//           const character1 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character1',
//             'character1',
//             'character1',
//             500
//           )
//           const character2 = await operatorClient.createCharacterNFT(
//             playerKeypair.publicKey,
//             'https://example.com/character2',
//             'character2',
//             'character2',
//             500
//           )
//           const { tileX, tileY } = getUniqueCoords()
//           // init tiles
//           let tx = await operatorClient.mapTileInit({
//             canBeBarricaded: true,
//             canBeSearched: true,
//             x: tileX,
//             y: tileY,
//             tileType: { fireStation: {} },
//           })
//           // init weapon
//           tx.add(
//             await operatorClient.registerOrUpdateItem({
//               itemId: await getUniqueItemId(),
//               name: 'claw',

//               itemType: {
//                 weapon: {
//                   weaponType: { zombieClaw: {} },
//                   damage: 8,
//                   breakChance: 0,
//                   accuracy: 10000,
//                 },
//               },
//               rarity: {
//                 common: {},
//               },
//               kind: {
//                 none: {}
//               }
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // init character
//           tx = await playerClient.characterInit(tileX, tileY, false, character1)
//           tx.add(await playerClient.characterInit(tileX, tileY, true, character2))
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // update attack success rate
//           const itemID = (await program.account.config.fetch(pdas.config())).numberOfItems - 1
//           tx = await operatorClient.configSetVariable({ unarmedAttackSuccessRate: {} }, 10000)
//           // update character 2,
//           tx.add(
//             await operatorClient.characterUpdate(character2, {
//               equippedItems: { weapon: itemID, armor: null },
//               skills: Array(21).fill(false).concat(true).concat(Array(3).fill(false).concat(true)),
//               hp: 190,
//             })
//           )
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             console.log(e)
//             throw e
//           }
//           // attack
//           tx = await playerClient.characterAttack(character2, character1)
//           let err: any = null
//           try {
//             await anchor
//               .getProvider()
//               .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
//           } catch (e) {
//             err = e
//           }
//           // check results
//           expect(err).to.not.exist
//           const character2Account = await program.account.character.fetchNullable(pdas.character(character2))
//           expect(character2Account).to.exist
//           expect(character2Account?.hp).to.eq(200)
//         })
//       })
//     })
//   })
// })