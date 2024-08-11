import { PublicKey } from "@solana/web3.js"

export interface ZWCharacter {
    name: string
    x: number
    y: number
    hp: number
    mint: PublicKey
    isZombie: boolean | null
    inventory: number[]
}