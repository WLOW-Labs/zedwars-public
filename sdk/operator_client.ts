import { AnchorProvider, BN, Program } from '@coral-xyz/anchor'
import { keypairIdentity, Metaplex } from '@metaplex-foundation/js'
import { Connection, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js'
import { PROGRAM_ID } from '.'
import { IDL, Zedwars } from './zedwars'
import { pdas } from './pda'
import * as web3 from '@solana/web3.js'
import {
  CharacterUpdateArgs, ItemKind,
} from './arg_types'
import { createAllocTreeIx, SPL_ACCOUNT_COMPRESSION_PROGRAM_ID, SPL_NOOP_PROGRAM_ID, ValidDepthSizePair } from '@solana/spl-account-compression'
import { findTreeConfigPda, MPL_BUBBLEGUM_PROGRAM_ID } from '@metaplex-foundation/mpl-bubblegum'
import { createUmi } from '@metaplex-foundation/umi-bundle-defaults'
import { PublicKey as UmiPK } from "@metaplex-foundation/umi";
import * as anchor from '@coral-xyz/anchor'

export const merkleSizes = [
  [3, 8, 0],
  [5, 8, 2],
  [14, 64, 11],
  [15, 64, 12],
  [16, 64, 13],
  [17, 64, 14],
  [18, 64, 15],
  [19, 64, 16],
  [20, 64, 17],
  [24, 64, 17],
];

const TOKEN_METADATA_PROGRAM_ID = new PublicKey('metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s');

const [bubblegumSigner, _] = PublicKey.findProgramAddressSync(
  // `collection_cpi` is a custom prefix required by the Bubblegum program
  [Buffer.from("collection_cpi", "utf8")],
  new anchor.web3.PublicKey(MPL_BUBBLEGUM_PROGRAM_ID)
);

/**
 * OperatorClient is a wrapper around the Zedwars program
 * that provides a higher level API for the operator.
 */
export class OperatorClient {
  public program: Program<Zedwars>
  public metaplex: Metaplex
  public keypair: Keypair

  /**
   * The constructor
   * @param connection - The connection to use
   * @param operatorKeypair - The operator's keypair
   */
  constructor(connection: Connection, operatorKeypair: Keypair) {
    this.keypair = operatorKeypair
    this.program = new Program<Zedwars>(
      IDL,
      PROGRAM_ID,
      new AnchorProvider(
        connection,
        {
          publicKey: operatorKeypair.publicKey,
          signTransaction: async (tx) => tx,
          signAllTransactions: async (txs) => txs,
        },
        { commitment: 'singleGossip', preflightCommitment: 'confirmed' }
      )
    )

    this.metaplex = Metaplex.make(connection).use(keypairIdentity(operatorKeypair))
  }
  /**
   * Create a collection NFT
   * @param name - The name of the collection
   * @param symbol - The symbol of the collection
   * @param uri - The URI of the collection
   * @returns The mint address of the collection NFT
   */
  async createCollectionNFT(name: string, symbol: string, uri: string): Promise<PublicKey> {
    let result = await this.metaplex.nfts().create({
      uri,
      name,
      symbol,
      sellerFeeBasisPoints: 500,
      isCollection: true,
    })
    await this.metaplex.nfts().approveCollectionAuthority({
      mintAddress: result.mintAddress,
      collectionAuthority: pdas.config(),
    })
    return result.mintAddress
  }

  /**
   * Create a character NFT that can be used to play the game
   * @param playerPubkey - The pubkey of the player, the NFT will be owned by this account
   * @param uri - The URI of the NFT
   * @param name - The name of the NFT
   * @param symbol - The symbol of the NFT
   * @param sellerFeeBasisPoints - The seller fee basis points of the NFT
   * @returns The mint address of the character NFT mint
   */
  async createCharacterNFT(
    playerPubkey: PublicKey,
    uri: string,
    name: string,
    symbol: string,
    sellerFeeBasisPoints: number
  ) {
    let config = await this.program.account.config.fetch(pdas.config())
    let result = await this.metaplex.nfts().create({
      uri,
      name,
      symbol,
      sellerFeeBasisPoints,
      isCollection: false,
      collection: config.charactersCollectionMint,
      tokenOwner: playerPubkey,
    })
    await this.metaplex
      .nfts()
      .verifyCollection({ mintAddress: result.mintAddress, collectionMintAddress: config.charactersCollectionMint })
    return result.mintAddress
  }

  /**
   * Initialize the config account
   * @param itemCollectionNFTMint - The mint address of the item collection NFT
   * @param charactersCollectionNFTMint - The mint address of the characters collection NFT
   * @returns The transaction that can be used to call the configInit instruction
   */
  async configInit(itemCollectionNFTMint: PublicKey, charactersCollectionNFTMint: PublicKey) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configInit()
        .accountsStrict({
          operator: this.program.provider.publicKey,
          config: pdas.config(),
          itemsCollectionMint: itemCollectionNFTMint,
          itemsCollectionMetadata: this.metaplex.nfts().pdas().metadata({ mint: itemCollectionNFTMint }),
          itemsCollectionMasterEdition: this.metaplex.nfts().pdas().masterEdition({ mint: itemCollectionNFTMint }),
          itemsCollectionAuthorityRecord: this.metaplex.nfts().pdas().collectionAuthorityRecord({
            mint: itemCollectionNFTMint,
            collectionAuthority: pdas.config(),
          }),

          charactersCollectionMint: charactersCollectionNFTMint,
          charactersCollectionMetadata: this.metaplex.nfts().pdas().metadata({ mint: charactersCollectionNFTMint }),
          charactersCollectionMasterEdition: this.metaplex
            .nfts()
            .pdas()
            .masterEdition({ mint: charactersCollectionNFTMint }),
          charactersCollectionAuthorityRecord: this.metaplex.nfts().pdas().collectionAuthorityRecord({
            mint: charactersCollectionNFTMint,
            collectionAuthority: pdas.config(),
          }),
          systemProgram: SystemProgram.programId,
        })
        .transaction()
    }
  }
  async configSetVariable(variable: anchor.IdlTypes<Zedwars>["ConfigVar"], value: number) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configSetVariables(variable, value)
        .accountsStrict({
          operator: this.program.provider.publicKey,
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
        })
        .transaction()
    }
  }

  async configAddLegendaryItem(kind: string, id: number) {
    let itemKind: any = {}
    itemKind[kind] = {};
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configAddLegendaryItem(itemKind, id)
        .accountsStrict({
          operator: this.program.provider.publicKey,
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
        })
        .transaction();
    }
  }
  async configAddItemToRareDropTable(id: number) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configAddRareDropTableItem(id)
        .accountsStrict({
          operator: this.program.provider.publicKey,
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
        })
        .transaction();
    }
  }

  async configSetItemRandomWeights(tileType: string, itemIds: number[], weights: number[]) {
    let tileTypeArg: any = {}
    tileTypeArg[tileType] = {}
    // transform itemIds[], weights[] to {itemId,weight}[]
    let itemWeights = []
    for (let i = 0; i < itemIds.length; i++) {
      itemWeights.push({ itemId: itemIds[i], weight: weights[i] })
    }
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configSetItemRandomWeights(tileTypeArg, itemWeights)
        .accountsStrict({
          operator: this.program.provider.publicKey,
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
        })
        .transaction()
    }
  }

  async configSetLootRegenRates(tileType: string, regenRate: number) {
    let tileTypeArg: any = {}
    tileTypeArg[tileType] = {}
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configSetLootRegenRate(tileTypeArg, regenRate)
        .accountsStrict({
          operator: this.program.provider.publicKey,
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
        })
        .transaction();
    }
  }
  /**
   * Register a new item, or updates an existing item if one with the same item ID already exists.
   * @param args - The arguments to pass to the instruction
   * @returns The transaction that can be used to call the configRegisterSft instruction
   */
  async registerOrUpdateItem(args: anchor.IdlTypes<Zedwars>["UpdateItemArgs"]) {
    if (this.program.provider.publicKey) {
      let item = await this.program.account.item.fetchNullable(pdas.item(args.itemId), 'confirmed')
      if (item) {
        return await this.program.methods
          .itemUpdate(args)
          .accountsStrict({
            operator: this.program.provider.publicKey,
            systemProgram: SystemProgram.programId,
            item: pdas.item(args.itemId)
          })
          .transaction();
      } else {
        let updateArgs: anchor.IdlTypes<Zedwars>["ConfigRegisterItemArgs"] = {
          itemId: args.itemId,
          name: args.name,
          itemType: args.itemType,
          rarity: args.rarity,
          kind: args.kind,
          convertsTo: args.convertsTo,
        }
        return await this.program.methods
          .configRegisterItem(updateArgs)
          .accountsStrict({
            operator: this.program.provider.publicKey,
            config: pdas.config(),
            systemProgram: SystemProgram.programId,
            item: pdas.item(args.itemId),
            rent: web3.SYSVAR_RENT_PUBKEY,
          })
          .transaction()
      }
    }
  }
  /**
   * The mapTileInit instruction
   * @param args - The arguments to pass to the instruction
   * @returns The tranaction that can be used to call the mapTileInit instruction
   */
  async mapTileInit(args: anchor.IdlTypes<Zedwars>["MapTileInitArgs"]) {
    // console.log(args.x, args.y)
    if (this.program.provider.publicKey) {
      let tile = await this.program.account.mapTile.fetchNullable(pdas.mapTile(args.x, args.y));
      if (tile) {
        let updateArgs: anchor.IdlTypes<Zedwars>["MapTileUpdateArgs"] = {
          numZombies: tile.numZombies,
          numSurvivors: tile.numSurvivors,
          numBarricades: tile.numBarricades,
          hasGenerator: tile.hasGenerator,
          hasPowerUntil: tile.hasPowerUntil,
          tileType: args.tileType,
          lootableItems: tile.lootableItems,
          canBeSearched: args.canBeSearched,
          canBeBarricaded: args.canBeBarricaded,
        }
        return await this.program.methods
          .mapTileUpdate(updateArgs)
          .accountsStrict({
            operator: this.program.provider.publicKey,
            systemProgram: SystemProgram.programId,
            mapTile: pdas.mapTile(args.x, args.y),
          })
          .transaction()
      } else {
        return await this.program.methods
          .mapTileInit(args)
          .accountsStrict({
            operator: this.program.provider.publicKey,
            systemProgram: SystemProgram.programId,
            mapTile: pdas.mapTile(args.x, args.y),
          })
          .transaction()
      }
    }
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
          name
        })
        .accountsStrict({
          player: this.keypair.publicKey,
          character: pdas.character(assetId),
          config: pdas.config(),
          treeConfig: treeConfig,
          merkleTree: config.merkleTree,
          referrer: null,
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
          bubblegumSigner
        })
        .transaction());

      return tx
    }
  }

  async characterUpdate(characterMint: PublicKey, args: CharacterUpdateArgs) {
    let character = await this.program.account.character.fetch(pdas.character(characterMint), 'confirmed')

    let updateArgs: any = {
      x: character.x,
      y: character.y,
      hp: character.hp,
      name: character.name,
      isZombie: character.isZombie,
      xp: character.xp,
      bonusXp: character.bonusXp,
      level: character.level,
      skillPoints: character.skillPoints,
      lastAttackedAt: character.lastAttackedAt,
      lastActedAt: character.lastActedAt,
      isInfected: character.isInfected,
      energy: character.energy,
      energyUpdatedAt: character.energyUpdatedAt,
      backpackSpace: character.backpackSpace,
      inventory: character.inventory,
      equippedItems: character.equippedItems,
      skills: character.skills,
      killedBy: character.killedBy,
      killedAt: character.killedAt,
      hasPremium: character.hasPremium,
    }
    // update args with new values
    for (let key in args) {
      updateArgs[key] = args[key as keyof CharacterUpdateArgs]
    }

    if (this.program.provider.publicKey) {
      return await this.program.methods
        .characterUpdate(updateArgs)
        .accountsStrict({
          operator: this.keypair.publicKey,
          systemProgram: SystemProgram.programId,
          character: pdas.character(characterMint),
        })
        .transaction()
    }
  }


  async resizeCharacter(characterMint: PublicKey, size: number) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .characterResize(size)
        .accountsStrict({
          operator: this.keypair.publicKey,
          systemProgram: SystemProgram.programId,
          character: pdas.character(characterMint),
        })
        .transaction()
    }
  }

  async resizeItem(item: number) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .itemResize(500)
        .accountsStrict({
          operator: this.keypair.publicKey,
          systemProgram: SystemProgram.programId,
          item: pdas.item(item),
        })
        .transaction()
    }
  }

  async resizeTile(x: number, y: number) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .resizeTile(500)
        .accountsStrict({
          operator: this.keypair.publicKey,
          systemProgram: SystemProgram.programId,
          tile: pdas.mapTile(x, y),
        })
        .transaction()
    }
  }

  async resizeConfig(size: number) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configResize(size)
        .accountsStrict({
          operator: this.keypair.publicKey,
          systemProgram: SystemProgram.programId,
          config: pdas.config(),
        })
        .transaction()
    }
  }

  async withdrawTreasury() {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .withdrawTreasury()
        .accountsStrict({
          operator: this.keypair.publicKey,
          systemProgram: SystemProgram.programId,
          config: pdas.config(),
        })
        .transaction()
    }
  }

  async mapTileUpdate(mapTileX: number, mapTileY: number, args: anchor.IdlTypes<Zedwars>["MapTileUpdateArgs"]) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .mapTileUpdate(args)
        .accountsStrict({
          operator: this.keypair.publicKey,
          systemProgram: SystemProgram.programId,
          mapTile: pdas.mapTile(mapTileX, mapTileY),
        })
        .transaction()
    }
  }
  async configSetSkillPointsRequired(skill: anchor.IdlTypes<Zedwars>["Skill"], value: number) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configSetSkillPointsRequired(skill, value)
        .accountsStrict({
          operator: this.program.provider.publicKey,
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
        })
        .transaction()
    }
  }

  async configSetSearchSuccessRate(tileType: anchor.IdlTypes<Zedwars>["TileType"], value: number) {
    if (this.program.provider.publicKey) {
      return await this.program.methods
        .configSetSearchSuccessRate(tileType, value)
        .accountsStrict({
          operator: this.program.provider.publicKey,
          config: pdas.config(),
          systemProgram: SystemProgram.programId,
        })
        .transaction()
    }
  }

  async airdropItem(wallet: PublicKey, item: number) {
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

      let args: anchor.IdlTypes<Zedwars>["ItemAirdropArgs"] = {
        assetId: assetId,
      };
      tx.add(await this.program.methods
        .itemAirdrop(args)
        .accountsStrict({
          operator: this.keypair.publicKey,
          config: pdas.config(),
          item: pdas.item(item),
          itemMint: pdas.itemMint(assetId),
          treeConfig: treeConfig,
          merkleTree: config.merkleTree,
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
          bubblegumSigner,
          destination: wallet,
        })
        .transaction())

      return tx
    }
  }

  async configSetMerkleTree(merkle: Keypair, count: number) {
    const [size, buffer, _] = merkleSizes.find(
      ([height]) => Math.pow(2, height) > count * 2
    )!;

    let maxDepthSizePair: ValidDepthSizePair = {
      maxDepth: size as any,
      maxBufferSize: buffer as any
    }

    const umi = createUmi(this.program.provider.connection.rpcEndpoint);
    const treeConfig = findTreeConfigPda(
      umi,
      {
        merkleTree: merkle.publicKey.toBase58() as UmiPK,
      }
    )[0]

    if (this.program.provider.publicKey) {

      let tx = new Transaction();
      const allocTreeIx = await createAllocTreeIx(
        this.program.provider.connection,
        merkle.publicKey,
        this.program.provider.publicKey,
        maxDepthSizePair,
        size - 3,
      );
      tx.add(allocTreeIx);
      tx.add(
        await this.program.methods
          .configSetMerkleTree({
            maxDepth: size,
            maxBufferSize: buffer,
          })
          .accounts({
            operator: this.program.provider.publicKey,
            config: pdas.config(),
            merkleTree: merkle.publicKey,
            treeConfig: treeConfig,
            logWrapper: SPL_NOOP_PROGRAM_ID,
            compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
            bubblegumProgram: MPL_BUBBLEGUM_PROGRAM_ID,
            systemProgram: SystemProgram.programId,
          })
          .transaction()
      )

      return tx
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
