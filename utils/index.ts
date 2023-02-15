import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import config from "@/config"
import {
  isAddress
} from "@/utils/isAddress"

export function getEtherscanLink(
  chainId: any,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {

  switch (type) {
    case 'transaction': {
      const url = config.chainInfo[chainId].lookHash + data
      return url
    }
    case 'token': {
      const url = config.chainInfo[chainId].lookAddr + data
      return url
    }
    case 'block': {
      const url = config.chainInfo[chainId].lookBlock + data
      return url
    }
    case 'address':
    default: {
      const url = config.chainInfo[chainId].lookAddr + data
      return url
    }
  }
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}