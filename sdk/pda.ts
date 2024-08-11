import { PublicKey } from '@solana/web3.js'
import * as anchor from '@coral-xyz/anchor'
import { PROGRAM_ID } from '.'

/**
 * PDA helpers
 */
export const pdas = {
  /**
   * The config account PDA
   * @returns The config account PDA
   */
  config: function (): PublicKey {
    return PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode('Config')], PROGRAM_ID)[0]
  },
  /**
   * The PDA of the item mint account
   * @param id - The ID of the item
   * @returns The PDA of the item mint
   */
  sftMint: function (id: number): PublicKey {
    let itemBuffer = Buffer.alloc(2)
    itemBuffer.writeUInt16LE(id)
    return PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode('ItemMint'), itemBuffer], PROGRAM_ID)[0]
  },

  /**
   * The PDA of a minted item
   * @param itemMint - The mint of the NFT
   * @returns The PDA of the ItemMint
   */
  itemMint: function (itemMint: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('ItemMint'), itemMint.toBuffer()],
      PROGRAM_ID
    )[0]
  },
  /**
   * The PDA of the item account
   * @param itemMint - The mint of the item
   * @returns The PDA of the item
   */
  item: function (item_id: number): PublicKey {
    let itemBuffer = Buffer.alloc(4)
    itemBuffer.writeUInt32LE(item_id)
    return PublicKey.findProgramAddressSync([anchor.utils.bytes.utf8.encode('Item'), itemBuffer], PROGRAM_ID)[0]
  },
  /**
   * The PDA of a map tile account
   * @param x - The x coordinate of the map tile
   * @param y - The y coordinate of the map tile
   * @returns The PDA of the map tile
   */
  mapTile: function (x: number, y: number): PublicKey {
    let xBuffer = Buffer.alloc(4)
    xBuffer.writeInt32LE(x)
    let yBuffer = Buffer.alloc(4)
    yBuffer.writeInt32LE(y)
    return PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('MapTile'), xBuffer, yBuffer],
      PROGRAM_ID
    )[0]
  },
  /**
   * The PDA of a character account
   * @param characterAsset - The asset_id of the character cNFT
   * @returns The PDA of the character account
   */
  character: function (characterAsset: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('Character'), characterAsset.toBuffer()],
      PROGRAM_ID
    )[0]
  },

  /**
   * The PDA of a session account
   * @param playerPubkey - The public key of the player
   * @returns
   */
  session: function (playerPubkey: PublicKey): PublicKey {
    return PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('Session'), playerPubkey.toBuffer()],
      PROGRAM_ID
    )[0]
  },
}
