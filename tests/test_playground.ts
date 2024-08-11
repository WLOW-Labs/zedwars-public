import * as anchor from '@coral-xyz/anchor'
import { Zedwars } from '../target/types/zedwars'
import { BN, Program } from '@coral-xyz/anchor'
import * as SPL from '@solana/spl-token'
import { Keypair, LAMPORTS_PER_SOL, PublicKey, Transaction } from '@solana/web3.js'
import { readFileSync } from 'fs'
import path from 'path'
import { OperatorClient, pdas, PlayerClient } from '../sdk'
import { Metaplex, keypairIdentity } from '@metaplex-foundation/js'
import { expect } from 'chai'

let itemAssetId: PublicKey;

describe('ZedWars', () => {
  let numUniqueCoords = 0
  const uniqueCoordsSeed = 4000
  const getUniqueCoords = () => {
    const tileX = uniqueCoordsSeed + numUniqueCoords++ * 10
    return {
      tileX,
      tileY: tileX,
    }
  }
  let numItems = 0
  // Configure the client to use the local cluster.
  const connection = new anchor.web3.Connection(
    "https://devnet.helius-rpc.com/?api-key=e5c039f0-477f-4fdb-a516-060fda57b12f",
    "confirmed" // or "finalized"
  );
  const wallet = anchor.Wallet.local();
  const provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
  anchor.setProvider(provider);
  const program = anchor.workspace.Zedwars as Program<Zedwars>


  const operatorKeypair = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(readFileSync(path.join(__dirname, './test_operator_key.json'), 'utf8')))
  )
  const operatorClient = new OperatorClient(anchor.getProvider().connection, operatorKeypair)

  const playerKeypair = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(readFileSync(path.join(__dirname, './player_wallet.json'), 'utf8')))
  )

  const fakeKeypair = Keypair.fromSecretKey(
    Buffer.from(JSON.parse(readFileSync(path.join(__dirname, './fake_wallet.json'), 'utf8')))
  )

  const fakePlayerKeypair = Keypair.generate();

  const playerClient = new PlayerClient(anchor.getProvider().connection, playerKeypair.publicKey)

  describe('Playground', () => {
    // it('should be able to mint an item in their inventory', async () => {
    //   let config = await program.account.config.fetch(pdas.config())
    //   let playerAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
    //   console.log(`player_asset: ${playerAssetId.toBase58()}`)
    //   let tx = await playerClient.characterInit(2, 2, false)
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     throw e
    //   }
    //   console.log('updateCharacter');
    //   tx = await operatorClient.characterUpdate(new PublicKey('4yfCGG8p9WzreHHgbBP6AKMkY3gGjFHfoWnrj6orrzyC'), { inventory: [5002], hasPremium: true })
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     throw e
    //   }
    //   console.log('mintItem')
    //   tx = await playerClient.itemMint(playerAssetId, 5002)
    //   let err: any = undefined
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e);
    //     err = e
    //   }
    // })
    // it('should be able to redeem an item in their inventory', async () => {
    //   let config = await program.account.config.fetch(pdas.config())
    //   let playerAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
    //   console.log(`player_asset: ${playerAssetId.toBase58()}`)
    //   let tx = await playerClient.characterInit("test", 2, 2, false)
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     throw e
    //   }
    //   console.log('updateCharacter');
    //   tx = await operatorClient.characterUpdate(playerAssetId, { inventory: [5002], hasPremium: true })
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     throw e
    //   }
    //   config = await program.account.config.fetch(pdas.config())
    //   let itemAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
    //   tx = await playerClient.itemMint(playerAssetId, 5002)
    //   let err: any = undefined
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e);
    //     err = e
    //   }
    //   console.log('redeemItem')
    //   tx = await playerClient.characterRedeemItem(playerAssetId, itemAssetId)
    //   console.log('redeemItem tx created');
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e);
    //     err = e
    //   }
    //   expect(err).to.not.exist
    //   let characterAccount = await program.account.character.fetchNullable(pdas.character(playerAssetId))
    //   expect(characterAccount).to.exist
    //   expect(characterAccount.inventory.length).to.eq(1)
    //   expect(characterAccount.inventory[0]).to.eq(5002)
    // })
    // it('should not be able to control player if not the cnft owner', async () => {
    //   let client = new PlayerClient(anchor.getProvider().connection, fakeKeypair.publicKey)
    //   let config = await program.account.config.fetch(pdas.config())
    //   let playerAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
    //   let tx = await playerClient.characterInit(2, 2, false)
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     throw e
    //   }
    //   tx = await client.characterMove(2, 3, playerAssetId)
    //   let err: any = null
    //   try {
    //     await anchor.getProvider().sendAndConfirm(tx, [fakeKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     err = e
    //   }
    //   // check results
    //   expect(err).to.exist
    //   expect(JSON.stringify(err)).to.contain('6001')
    //   let character1Account = await program.account.character.fetchNullable(pdas.character(playerAssetId))
    //   expect(character1Account).to.exist
    //   expect(character1Account.x).to.eq(2)
    //   expect(character1Account.y).to.eq(2)
    // })
     it('should be able to move the player if the wallet is the owner', async () => {
       let config = await program.account.config.fetch(pdas.config())
       let playerAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
       let tx = await playerClient.characterInit("movetest", 5, 3, false, "002_002_003_001_003_002")
       try {
         await anchor
           .getProvider()
           .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
       } catch (e) {
         console.log(e)
         throw e
       }
       tx = await playerClient.characterMove(6, 3, playerAssetId)
       let err: any = null
       try {
         await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
       } catch (e) {
         err = e
       }
       // check results
       expect(err).to.not.exist;
       let character1Account = await program.account.character.fetchNullable(pdas.character(playerAssetId))
       expect(character1Account).to.exist
       expect(character1Account.x).to.eq(6)
       expect(character1Account.y).to.eq(3)
     })
    // it('should be able to search a tile', async () => {
    //   let config = await program.account.config.fetch(pdas.config())
    //   let playerAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
    //   let tx = await playerClient.characterInit(1, 1, false)
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     throw e
    //   }
    //   tx = await playerClient.characterSearch(playerAssetId)
    //   let err: any = null
    //   try {
    //     await anchor.getProvider().sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     err = e
    //   }
    //   // check results
    //   expect(err).to.not.exist
    // })
    // it('should be able to install a generator from their inventory', async () => {
    //   let config = await program.account.config.fetch(pdas.config())
    //   let playerAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
    //   console.log(`player_asset: ${playerAssetId.toBase58()}`)
    //   let tx = await playerClient.characterInit("test", 1, 1, false, "001_002_003_001_001_002")
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     throw e
    //   }
    //   console.log('updateCharacter');
    //   tx = await operatorClient.characterUpdate(playerAssetId, { inventory: [1001], hasPremium: true })
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e)
    //     throw e
    //   }
    //   let err: any = undefined 
    //   console.log('useItem')
    //   tx = await playerClient.characterUseItem(playerAssetId, playerAssetId, 1001)
    //   try {
    //     await anchor
    //       .getProvider()
    //       .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //   } catch (e) {
    //     console.log(e);
    //     err = e
    //   }
    //   expect(err).to.not.exist
    //   let characterAccount = await program.account.character.fetchNullable(pdas.character(playerAssetId))
    //   expect(characterAccount).to.exist
    //   expect(characterAccount.inventory.length).to.eq(0)
    // })
    //it('should be able to start a courier mission', async () => {
    //  let config = await program.account.config.fetch(pdas.config())
    //  let playerAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
    //  console.log(`player_asset: ${playerAssetId.toBase58()}`)
    //  let tx = await playerClient.characterInit("courier1", 2, 2, false, "001_002_003_001_003_002")
    //  try {
    //    await anchor
    //      .getProvider()
    //      .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //  } catch (e) {
    //    console.log(e)
    //    throw e
    //  }
    //  console.log('updateCharacter');
    //  tx = await operatorClient.characterUpdate(playerAssetId, { x: 3, y: 4, inventory: [5002], hasPremium: true })
    //  try {
    //    await anchor
    //      .getProvider()
    //      .sendAndConfirm(tx, [operatorKeypair], { commitment: 'confirmed', skipPreflight: true })
    //  } catch (e) {
    //    console.log(e)
    //    throw e
    //  }
    //  let err: any = undefined 
    //  console.log('startCourier')
    //  tx = await playerClient.startCourierMission(playerAssetId, 5002);
    //  try {
    //    await anchor
    //      .getProvider()
    //      .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
    //  } catch (e) {
    //    console.log(e);
    //    err = e
    //  }
    //  expect(err).to.not.exist
    //  let characterAccount = await program.account.character.fetchNullable(pdas.character(playerAssetId))
    //  expect(characterAccount).to.exist
    //  expect(characterAccount.inventory.length).to.eq(1)
    //})

    describe('Session Account', () => {
      const delegate = anchor.web3.Keypair.generate()
      it('should be able to create a session account', async () => {
        let tx = await playerClient.createSession(delegate.publicKey, 600, 100000)
        try {
          await anchor
            .getProvider()
            .sendAndConfirm(tx, [playerKeypair, delegate], { commitment: 'confirmed', skipPreflight: true })
        } catch (e) {
          console.log(e)
          throw e
        }
        // check results
        const sessionAccount = await program.account.session.fetchNullable(pdas.session(playerKeypair.publicKey))
        expect(sessionAccount).to.exist
        expect(sessionAccount.delegate.toBase58()).to.eq(delegate.publicKey.toBase58())
        //expect(sessionAccount.validUntil.toNumber()).to.be.approximately(Date.now() / 1000 + 600, 2)
        expect(sessionAccount.player.toBase58()).to.eq(playerKeypair.publicKey.toBase58())
        const sessionAccountInfo = await connection.getAccountInfo(pdas.session(playerKeypair.publicKey))
      })
      it('should be able to control a character with a session account', async () => {
         let config = await program.account.config.fetch(pdas.config())
         let playerAssetId = await playerClient.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));
         // init character
         let tx = await playerClient.characterInit("seshtest", 2, 2, false, "002_002_003_001_003_002")
         try {
           await anchor
             .getProvider()
             .sendAndConfirm(tx, [playerKeypair], { commitment: 'confirmed', skipPreflight: true })
         } catch (e) {
           console.log(e)
           throw e
         }
         tx = await playerClient.characterMove(2, 3, playerAssetId)
         try {
           await anchor.getProvider().sendAndConfirm(tx, [delegate], { commitment: 'confirmed', skipPreflight: true })
         } catch (e) {
           console.log("characterMove", e);
           throw e
         }
         // check results
         const character1Account = await program.account.character.fetch(pdas.character(playerAssetId))
         expect(character1Account.x).to.eq(2)
         expect(character1Account.y).to.eq(3)
         //const playerAccountInfoAfter = await anchor.getProvider().connection.getAccountInfo(playerKeypair.publicKey)
         //expect(playerAccountInfoAfter.lamports).to.eq(playerAccountInfoBefore.lamports)
       })
    })
  })
})