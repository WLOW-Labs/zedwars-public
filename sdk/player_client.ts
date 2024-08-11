import { AnchorProvider, BN, Program } from '@coral-xyz/anchor'
import { Connection, PublicKey, SystemProgram } from '@solana/web3.js'
import { PROGRAM_ID } from '.'
import { IDL, Zedwars } from './zedwars'
import * as SPL from '@solana/spl-token'
import { Metaplex } from '@metaplex-foundation/js'
import { pdas } from './pda'
import * as web3 from '@solana/web3.js'
import * as anchor from '@coral-xyz/anchor'
import { TileType } from './arg_types'
import { ASSOCIATED_TOKEN_PROGRAM_ID, TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { WrappedConnection } from './WrappedConnection'
import { ConcurrentMerkleTreeAccount, SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, SPL_NOOP_PROGRAM_ID } from '@solana/spl-account-compression'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { findTreeConfigPda, MPL_BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum'
import { PublicKey as UmiPK } from "@metaplex-foundation/umi";

const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

export const getTokenWallet = async (
  wallet: PublicKey,
  mint: PublicKey
) => {
  return (
    PublicKey.findProgramAddressSync(
      [wallet.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), mint.toBuffer()],
      ASSOCIATED_TOKEN_PROGRAM_ID
    )
  )[0]
}

const [bubblegumSigner, _] = PublicKey.findProgramAddressSync(
  // `collection_cpi` is a custom prefix required by the Bubblegum program
  [Buffer.from("collection_cpi", "utf8")],
  new anchor.web3.PublicKey(MPL_BUBBLEGUM_PROGRAM_ID)
);




/**
 * PlayerClient is a wrapper around the Zedwars program
 */
export class PlayerClient {
  public program: Program<Zedwars>
  public playerPubkey: PublicKey
  public metaplex: Metaplex
  public delegatePubkey: PublicKey | null = null
  public config: any
  public session: AnchorProvider | null = null
  public provider: AnchorProvider
  public wrapped: WrappedConnection

  /**
   * The constructor
   * @param connection - The connection to use
   * @param playerPubkey - The player's pubkey
   */
  constructor(
    connection: Connection,
    playerPubkey: PublicKey,
    delegatePubkey: PublicKey | null = null,
    sessionProvider: AnchorProvider | null = null,
    anchorProvider: AnchorProvider | null = null
  ) {
    this.playerPubkey = playerPubkey
    this.delegatePubkey = delegatePubkey
    this.session = sessionProvider

    if (!anchorProvider) {
      this.provider = new AnchorProvider(
        connection,
        {
          publicKey: playerPubkey,
          signTransaction: async (tx) => tx,
          signAllTransactions: async (txs) => txs,
        },
        { commitment: 'confirmed' }
      )
    } else {
      this.provider = anchorProvider
    }

    this.program = new Program<Zedwars>(IDL, PROGRAM_ID, this.provider)
    this.metaplex = Metaplex.make(connection)
    this.wrapped = new WrappedConnection(this.provider.connection.rpcEndpoint)
  }

  static async make(
    connection: Connection,
    playerPubkey: PublicKey,
    delegatePubkey: PublicKey | null = null,
    sessionProvider: AnchorProvider | null = null,
    anchorProvider: AnchorProvider | null = null
  ) {
    const instance = new PlayerClient(connection, playerPubkey, delegatePubkey, sessionProvider, anchorProvider)

    instance.config = await instance.program.account.config.fetch(pdas.config())

    return instance
  }

  /**
   * Initialize a character account
   * It places the character on the map
   * @param name - The name of the character
   * @param x - The x coordinate of the character
   * @param y - The y coordinate of the character
   * @param isZombie - Whether the character is a zombie or not
   * @param characterMint - The mint address of the character NFT
   * @returns The transaction that can be used to call the characterInit instruction
   */
  async characterInit(name: string, x: number, y: number, isZombie: boolean, layers: string) {
    let config = await this.program.account.config.fetch(pdas.config())
    if (config.merkleTree) {
      const umi = createUmi(this.program.provider.connection.rpcEndpoint);
      const treeConfig = findTreeConfigPda(
        umi,
        {
          merkleTree: config.merkleTree.toBase58() as UmiPK,
        }
      )[0]
      let assetId = await this.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));

      let tx = new web3.Transaction()
      tx.add(anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: 400_000,
      }));

      tx.add(await this.program.methods
        .characterInit({
          isZombie,
          layers,
          assetId,
          name,
        })
        .accountsStrict({
          player: this.playerPubkey,
          character: pdas.character(assetId),
          config: pdas.config(),
          treeConfig: treeConfig,
          merkleTree: config.merkleTree,
          collectionMint: config.charactersCollectionMint,
          collectionMetadata: this.metaplex.nfts().pdas().metadata({ mint: config.charactersCollectionMint }),
          collectionMasterEdition: this.metaplex.nfts().pdas().masterEdition({ mint: config.charactersCollectionMint }),
          collectionAuthorityRecord: this.metaplex.nfts().pdas().collectionAuthorityRecord({ mint: config.charactersCollectionMint, collectionAuthority: pdas.config() }),
          logWrapper: SPL_NOOP_PROGRAM_ID,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          bubblegumProgram: MPL_BUBBLEGUM_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          mapTile: pdas.mapTile(x, y),
          bubblegumSigner,
          referrer: null
        })
        .transaction());

      return tx
    }
  }

  /**
   * Move a character
   * @param characterMint - The mint address of the character NFT
   * @param toX - The x coordinate to move to
   * @param toY - The y coordinate to move to
   * @returns
   */
  async characterMove(toX: number, toY: number, characterMint: PublicKey) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))

    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterMove(args)
        .accountsStrict({
          character: pdas.character(characterMint),
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          origTile: pdas.mapTile(character.x, character.y),
          destTile: pdas.mapTile(toX, toY),
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Initiate a character search
   * @param characterMint - The mint address of the character NFT
   * @returns
   */
  async characterSearch(characterMint: PublicKey) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))

    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterSearch(args)
        .accountsStrict({
          character: pdas.character(characterMint),
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          systemProgram: web3.SystemProgram.programId,
          tile: pdas.mapTile(character.x, character.y),
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          config: pdas.config(),
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Barricade a tile
   * @param characterMint - The mint address of the character NFT
   * @returns
   */
  async characterBarricade(characterMint: PublicKey) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))

    let tx = new web3.Transaction()

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterBarricade(args)
        .accountsStrict({
          character: pdas.character(characterMint),
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          tile: pdas.mapTile(character.x, character.y),
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Destroy a barricade
   * @param characterMint - The mint address of the character NFT
   * @returns
   */
  async characterDestroyBarricade(characterMint: PublicKey, targetX: number, targetY: number) {
    let tx = new web3.Transaction()

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterDestroyBarricade(args)
        .accountsStrict({
          character: pdas.character(characterMint),
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          tile: pdas.mapTile(targetX, targetY),
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Destroy a generator
   * @param characterMint - The mint address of the character NFT
   * @returns
   */
  async characterDestroyGenerator(characterMint: PublicKey, targetX: number, targetY: number) {
    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterDestroyGenerator(args)
        .accountsStrict({
          character: pdas.character(characterMint),
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          tile: pdas.mapTile(targetX, targetY),
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Attack a character
   * @param characterMint - The mint address of the character NFT
   * @param targetMint - The mint address of the target character NFT
   * @returns
   */
  async characterAttack(characterMint: PublicKey, targetMint: PublicKey) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))
    let targetCharacter = await this.program.account.character.fetch(pdas.character(targetMint))

    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };

    tx.add(anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
      units: 250_000,
    }));
    tx.add(
      await this.program.methods
        .characterAttack(args)
        .accountsStrict({
          weapon: character.equippedItems.weapon != null ? pdas.item(character.equippedItems.weapon) : null,
          armor: targetCharacter.equippedItems.armor != null ? pdas.item(targetCharacter.equippedItems.armor) : null,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          tile: pdas.mapTile(character.x, character.y),
          targetTile: pdas.mapTile(targetCharacter.x, targetCharacter.y),
          config: pdas.config(),
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          targetCharacter: pdas.character(targetMint),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }


  async renameCharacter(characterMint: PublicKey, newName: string) {
    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["CharacterRenameArgs"] = {
      name: newName,
      playerVerify: verify
    };
    tx.add(
      await this.program.methods
        .characterRename(args)
        .accountsStrict({
          signer: this.playerPubkey,
          playerMerkleTree: args.playerVerify.merkle,
          character: pdas.character(characterMint),
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async upgradeCharacter(characterMint: PublicKey) {
    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    tx.add(
      await this.program.methods
        .characterUpgrade(verify)
        .accountsStrict({
          signer: this.playerPubkey,
          playerMerkleTree: verify.merkle,
          character: pdas.character(characterMint),
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          referrer: null
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx;
  }

  /**
   * Use an item on a character
   * @param characterMint - The mint address of the character NFT
   * @param targetCharacterMint - The mint address of the target character NFT
   * @param item_id - The id of the item to be used
   * @returns
   */
  async characterUseItem(characterMint: PublicKey, targetCharacterMint: PublicKey, itemId: number) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))
    let tx = new web3.Transaction()
    console.log(`Using ${itemId}`)

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    tx.add(
      await this.program.methods
        .characterUseItem({
          itemId,
          playerVerify: verify,
        })
        .accountsStrict({
          player: this.playerPubkey,
          playerMerkleTree: verify.merkle,
          character: pdas.character(characterMint),
          item: pdas.item(itemId),
          tile: pdas.mapTile(character.x, character.y),
          targetCharacter: pdas.character(targetCharacterMint),
          tokenProgram: SPL.TOKEN_PROGRAM_ID,
          systemProgram: web3.SystemProgram.programId,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          config: pdas.config(),
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Equip an item
   * @param characterMint - The mint address of the character NFT
   * @param itemMint - The mint address of the item NFT
   * @returns
   */
  async characterEquipItem(characterMint: PublicKey, itemId: number) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))
    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .itemEquip(args)
        .accountsStrict({
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          item: pdas.item(itemId),
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          config: pdas.config(),
          tile: pdas.mapTile(character.x, character.y),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Unequip an item
   * @param characterMint - The mint address of the character NFT
   * @param itemMint - The mint address of the item NFT
   * @returns
   */
  async characterUnequipItem(characterMint: PublicKey, slot: anchor.IdlTypes<Zedwars>["EquipSlot"]) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))

    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["ItemUnequipArgs"] = {
      playerVerify: verify,
      slot: slot,
    };

    tx.add(
      await this.program.methods
        .itemUnequip(args)
        .accountsStrict({
          player: this.playerPubkey,
          playerMerkleTree: args.playerVerify.merkle,
          character: pdas.character(characterMint),
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Destroy an item
   * @param characterMint - The mint address of the character NFT
   * @param itemMint - The mint address of the item NFT
   * @returns
   */
  async characterDestroyItem(characterMint: PublicKey, itemId: number) {
    let tx = new web3.Transaction()

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["ItemDestroyArgs"] = {
      playerVerify: verify,
      itemId,
    };
    tx.add(
      await this.program.methods
        .itemDestroy(args)
        .accountsStrict({
          character: pdas.character(characterMint),
          player: this.playerPubkey,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          playerMerkleTree: args.playerVerify.merkle,
          config: pdas.config(),
          item: pdas.item(itemId),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  /**
   * Create a session
   * Transfer lamports to the delegate account if needed
   *
   * @param delegatePubkey - The public key of the delegate account
   * @param seconds - The number of seconds the session should last
   * @param lamports - The number of lamports to transfer to the session account
   * @returns
   */
  async createSession(delegatePubkey: web3.PublicKey, seconds: number, lamports: number) {
    this.delegatePubkey = delegatePubkey
    let tx = new web3.Transaction()
    // Transfer lamports to delegate if needed
    let delegateBalance = await this.program.provider.connection.getBalance(this.delegatePubkey)
    let minRent = (await this.program.provider.connection.getMinimumBalanceForRentExemption(0)) * 2;
    if (delegateBalance === 0) {
      tx.add(
        web3.SystemProgram.createAccount({
          fromPubkey: this.playerPubkey,
          newAccountPubkey: this.delegatePubkey,
          lamports: minRent,
          space: 0,
          programId: web3.SystemProgram.programId,
        })
      )
    } else if (delegateBalance < minRent) {
      tx.add(
        web3.SystemProgram.transfer({
          fromPubkey: this.playerPubkey,
          toPubkey: this.delegatePubkey,
          lamports: minRent - delegateBalance,
        })
      )
    }
    // close existing session account if it exists
    if ((await this.program.provider.connection.getAccountInfo(pdas.session(this.playerPubkey))) !== null) {
      tx.add(
        await this.program.methods
          .sessionClose()
          .accountsStrict({
            session: pdas.session(this.playerPubkey),
            player: this.playerPubkey,
          })
          .transaction()
      )
    }
    // create session account
    tx.add(
      await this.program.methods
        .sessionInit({
          seconds: new anchor.BN(seconds),
          lamports: new anchor.BN(lamports),
        })
        .accountsStrict({
          session: pdas.session(this.playerPubkey),
          player: this.playerPubkey,
          systemProgram: web3.SystemProgram.programId,
          delegate: this.delegatePubkey,
        })
        .transaction()
    )

    return tx
  }

  /**
   * Close the session account
   * @returns
   */
  async closeSession() {
    return await this.program.methods
      .sessionClose()
      .accountsStrict({
        session: pdas.session(this.playerPubkey),
        player: this.playerPubkey,
      })
      .transaction()
  }

  async characterUnlockSkill(characterMint: PublicKey, skill: anchor.IdlTypes<Zedwars>["Skill"]) {
    let tx = new web3.Transaction()

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["CharacterUnlockSkillArgs"] = {
      playerVerify: verify,
      skill,
    };
    tx.add(
      await this.program.methods
        .characterUnlockSkill(args)
        .accountsStrict({
          player: this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          systemProgram: web3.SystemProgram.programId,
          playerMerkleTree: args.playerVerify.merkle,
          character: pdas.character(characterMint),
          config: pdas.config(),
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async characterLoot(characterMint: PublicKey, targetCharacterMint: PublicKey, itemId: number) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))
    let tx = new web3.Transaction()

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["CharacterLootArgs"] = {
      playerVerify: verify,
      itemId,
    };
    tx.add(
      await this.program.methods
        .characterLoot(args)
        .accountsStrict({
          player: this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          systemProgram: web3.SystemProgram.programId,
          playerMerkleTree: args.playerVerify.merkle,
          character: pdas.character(characterMint),
          targetCharacter: pdas.character(targetCharacterMint),
          config: pdas.config(),
          item: pdas.item(itemId),
          tile: pdas.mapTile(character.x, character.y),
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async characterStandBackUp(characterMint: PublicKey) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))

    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterStandBackUp(args)
        .accountsStrict({
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          item: pdas.item(500),
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          tile: pdas.mapTile(character.x, character.y),
          fromTile: pdas.mapTile(character.lastX, character.lastY),
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async characterRevive(characterMint: PublicKey, accept: boolean) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))

    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["CharacterReviveArgs"] = {
      accept: accept,
      playerVerify: verify
    };
    tx.add(
      await this.program.methods
        .characterRevive(args)
        .accountsStrict({
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          player: this.playerPubkey,
          playerMerkleTree: verify.merkle,
          character: pdas.character(characterMint),
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          tile: pdas.mapTile(character.x, character.y),
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async generatePlayerVerify(assetId: PublicKey): Promise<[anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"], web3.AccountMeta[]]> {
    let asset = await this.wrapped.getAsset(assetId);
    let assetProof = await this.wrapped.getAssetProof(assetId);
    let merkleTree = new PublicKey(asset.compression.tree);
    const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
      this.wrapped,
      merkleTree
    );
    const canopyDepth = treeAccount.getCanopyDepth()

    const proof: web3.AccountMeta[] = assetProof.proof
      .slice(0, assetProof.proof.length - (!!canopyDepth ? canopyDepth : 0))
      .map((node: string) => ({
        pubkey: new PublicKey(node),
        isSigner: false,
        isWritable: false,
      }));


    const root = [...new PublicKey(assetProof.root.trim()).toBytes()]
    const dataHash = [...new PublicKey(asset.compression.data_hash.trim()).toBytes()]
    const creatorHash = [
      ...new PublicKey(asset.compression.creator_hash.trim()).toBytes(),
    ]

    const nonce = new anchor.BN(asset.compression.leaf_id);
    const index = asset.compression.leaf_id;

    return [
      {
        root,
        dataHash,
        creatorHash,
        nonce,
        index,
        merkle: merkleTree
      },
      proof
    ];
  }

  async itemMint(characterMint: PublicKey, itemId: number) {
    const character = await this.program.account.character.fetch(pdas.character(characterMint))
    let config = await this.program.account.config.fetch(pdas.config())

    if (config.merkleTree) {
      const umi = createUmi(this.program.provider.connection.rpcEndpoint);
      const treeConfig = findTreeConfigPda(
        umi,
        {
          merkleTree: config.merkleTree.toBase58() as UmiPK,
        }
      )[0]

      let assetId = await this.getLeafAssetId(config.merkleTree, new BN(config.merkleTreeItemsMinted));

      let tx = new web3.Transaction()
      tx.add(anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
        units: 400_000,
      }));

      let [verify, proofs] = await this.generatePlayerVerify(characterMint);
      let args: anchor.IdlTypes<Zedwars>["ItemMintArgs"] = {
        assetId: assetId,
        playerVerify: verify
      };
      console.log('itemMint PDA:', pdas.itemMint(assetId).toBase58())
      tx.add(await this.program.methods
        .itemMint(args)
        .accountsStrict({
          player: this.playerPubkey,
          character: pdas.character(characterMint),
          config: pdas.config(),
          item: pdas.item(itemId),
          itemMint: pdas.itemMint(assetId),
          treeConfig: treeConfig,
          merkleTree: config.merkleTree,
          playerMerkleTree: args.playerVerify.merkle,
          itemsCollectionMint: config.itemsCollectionMint,
          itemsCollectionMetadata: this.metaplex.nfts().pdas().metadata({ mint: config.itemsCollectionMint }),
          itemsCollectionMasterEdition: this.metaplex.nfts().pdas().masterEdition({ mint: config.itemsCollectionMint }),
          itemsCollectionAuthorityRecord: this.metaplex.nfts().pdas().collectionAuthorityRecord({ mint: config.itemsCollectionMint, collectionAuthority: pdas.config() }),
          logWrapper: SPL_NOOP_PROGRAM_ID,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          bubblegumProgram: MPL_BUBBLEGUM_PROGRAM_ID,
          systemProgram: anchor.web3.SystemProgram.programId,
          authority: pdas.config(),
          tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
          tile: pdas.mapTile(character.x, character.y),
          bubblegumSigner
        })
        .remainingAccounts(proofs)
        .transaction())

      return tx
    }
  }

  async characterBury(characterMint: PublicKey, targetCharacterMint: PublicKey) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))
    let tx = new web3.Transaction()

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterBury(args)
        .accountsStrict({
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          tile: pdas.mapTile(character.x, character.y),
          config: pdas.config(),
          targetCharacter: pdas.character(targetCharacterMint),
          targetTile: pdas.mapTile(0, 0),
          systemProgram: SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async characterDrag(characterMint: PublicKey, targetCharacterMint: PublicKey, targetX: number, targetY: number) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))
    let tx = new web3.Transaction()

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterDrag(args)
        .accountsStrict({
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          tile: pdas.mapTile(character.x, character.y),
          config: pdas.config(),
          targetCharacter: pdas.character(targetCharacterMint),
          targetTile: pdas.mapTile(targetX, targetY),
          systemProgram: SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async ransackTile(characterMint: PublicKey) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))
    let tx = new web3.Transaction()

    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .ransackTile(args)
        .accountsStrict({
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          tile: pdas.mapTile(character.x, character.y),
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async generateMissions(characterMint: PublicKey) {
    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .characterGenerateMissions(args)
        .accountsStrict({
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async startCourierMission(characterMint: PublicKey, itemId: number) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint))
    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .courierMissionStart(args)
        .accountsStrict({
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          tile: pdas.mapTile(character.x, character.y),
          item: pdas.item(itemId),
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async endCourierMission(characterMint: PublicKey) {
    const character = await this.program.account.character.fetch(pdas.character(characterMint))
    if (character.courierMission && character.courierMission.item) {
      let tx = new web3.Transaction()
      let [verify, proofs] = await this.generatePlayerVerify(characterMint);
      let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
        ...verify
      };
      tx.add(
        await this.program.methods
          .courierMissionEnd(args)
          .accountsStrict({
            signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
            session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
            player: this.playerPubkey,
            playerMerkleTree: args.merkle,
            character: pdas.character(characterMint),
            tile: pdas.mapTile(character.x, character.y),
            item: pdas.item(character.courierMission.item),
            config: pdas.config(),
            systemProgram: SystemProgram.programId,
            sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
            compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
          })
          .remainingAccounts(proofs)
          .transaction()
      )
      return tx
    }
  }

  async characterCraftItem(characterMint: PublicKey, itemId: number) {
    const character = await this.program.account.character.fetch(pdas.character(characterMint))

    let tx = new web3.Transaction()
    let [verify, proofs] = await this.generatePlayerVerify(characterMint);
    let args: anchor.IdlTypes<Zedwars>["PlayerVerifyArgs"] = {
      ...verify
    };
    tx.add(
      await this.program.methods
        .itemCraft(args)
        .accountsStrict({
          config: pdas.config(),
          systemProgram: web3.SystemProgram.programId,
          item: pdas.item(itemId),
          player: this.playerPubkey,
          playerMerkleTree: args.merkle,
          character: pdas.character(characterMint),
          signer: this.delegatePubkey ? this.delegatePubkey : this.playerPubkey,
          session: this.delegatePubkey ? pdas.session(this.playerPubkey) : null,
          tile: pdas.mapTile(character.x, character.y),
          sysvarSlotHashes: web3.SYSVAR_SLOT_HASHES_PUBKEY,
          compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        })
        .remainingAccounts(proofs)
        .transaction()
    )
    return tx
  }

  async characterRedeemItem(characterMint: PublicKey, assetId: PublicKey) {
    const character = await this.program.account.character.fetch(pdas.character(characterMint))
    let asset = await this.wrapped.getAsset(assetId);
    let assetProof = await this.wrapped.getAssetProof(assetId);
    const treeAccount = await ConcurrentMerkleTreeAccount.fromAccountAddress(
      this.wrapped,
      new PublicKey(asset.compression.tree)
    );
    const canopyDepth = treeAccount.getCanopyDepth()

    let proof: web3.AccountMeta[] = assetProof.proof
      .slice(0, assetProof.proof.length - (!!canopyDepth ? canopyDepth : 0))
      .map((node: string) => ({
        pubkey: new PublicKey(node),
        isSigner: false,
        isWritable: false,
      }));

    const umi = createUmi(this.program.provider.connection.rpcEndpoint);
    const treeConfig = findTreeConfigPda(
      umi,
      {
        merkleTree: asset.compression.tree as UmiPK,
      }
    )[0]
    const treeConfigPublicKey = new anchor.web3.PublicKey(treeConfig)
    const root = [...new PublicKey(assetProof.root.trim()).toBytes()]
    const dataHash = [...new PublicKey(asset.compression.data_hash.trim()).toBytes()]
    const creatorHash = [
      ...new PublicKey(asset.compression.creator_hash.trim()).toBytes(),
    ]

    const nonce = new anchor.BN(asset.compression.leaf_id);
    const index = asset.compression.leaf_id;

    let itemMint = await this.program.account.itemMint.fetch(pdas.itemMint(assetId))

    let tx = new web3.Transaction()
    tx.add(anchor.web3.ComputeBudgetProgram.setComputeUnitLimit({
      units: 400_000,
    }));

    return await this.program.methods
      .itemRedeem(
        {
          root,
          dataHash,
          creatorHash,
          nonce,
          index
        }
      )
      .accounts({
        player: this.playerPubkey,
        character: pdas.character(characterMint),
        config: pdas.config(),
        tile: pdas.mapTile(character.x, character.y),
        item: pdas.item(itemMint.id),
        itemMint: pdas.itemMint(assetId),
        tokenProgram: TOKEN_PROGRAM_ID,
        treeConfig: treeConfigPublicKey,
        merkleTree: asset.compression.tree,
        logWrapper: SPL_NOOP_PROGRAM_ID,
        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
        bubblegumProgram: MPL_BUBBLEGUM_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .remainingAccounts(proof)
      .transaction()
  }

  async getItemsCollectionMint() {
    let config = await this.program.account.config.fetch(pdas.config())
    return config.itemsCollectionMint;
  }
  async getItemsCollectionMetadata() {
    let config = await this.program.account.config.fetch(pdas.config())
    return this.metaplex.nfts().pdas().metadata({ mint: config.itemsCollectionMint });
  }
  async getItemsCollectionMasterEdition() {
    let config = await this.program.account.config.fetch(pdas.config())
    return this.metaplex.nfts().pdas().masterEdition({ mint: config.itemsCollectionMint })
  }
  async getCollectionAuthorityRecord() {
    let config = await this.program.account.config.fetch(pdas.config())
    return this.metaplex.nfts().pdas().collectionAuthorityRecord({ mint: config.itemsCollectionMint, collectionAuthority: pdas.config() });
  }

  async getTileTypeIndex(tt: TileType): Promise<number> {
    if (tt.street) return 0;
    if (tt.hospital) return 1;
    if (tt.apartment) return 2;
    if (tt.policeStation) return 3;
    if (tt.warehouse) return 4;
    if (tt.fireStation) return 5;
    if (tt.zedCorp) return 6;
    if (tt.factory) return 7;
    if (tt.secretLocation) return 8;
    return 0;
  }

  async handleTransactionError(err: any, toast: any) {
    if (err.logs) {
      let errorMessage = err.logs.join().match(/Error Message: ([^,]+)/)[1];
      toast({
        title: errorMessage,
        status: 'error',
        duration: 5000,
      })
    } else {
      toast({
        title: 'Something went wrong, please check the dev console for more information',
        status: 'error',
        duration: 5000,
      })
      console.log(err);
    }
  }

  getProvider(): AnchorProvider {
    if (this.session) {
      return this.session;
    } else {
      return this.provider
    }
  }

  async getLeafAssetId(tree: PublicKey, leafIndex: BN): Promise<PublicKey> {
    const [assetId] = PublicKey.findProgramAddressSync(
      [Buffer.from('asset', 'utf8'), tree.toBuffer(), Uint8Array.from(leafIndex.toArray('le', 8))],
      new anchor.web3.PublicKey(MPL_BUBBLEGUM_PROGRAM_ID),
    );
    return assetId;
  }
}
