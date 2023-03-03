import {
  getEvmHashStatus
} from './evm'

export function getHashStatus (chainId:any, hash:string): Promise<void> | undefined {
  if (isNaN(chainId)) {
    return undefined
  } else {
    return getEvmHashStatus(chainId, hash)
  }
}