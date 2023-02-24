import {useMemo} from "react"
import { Contract } from '@ethersproject/contracts'

import {
  useActiveReact
} from "@/hooks/useActiveReact"
import {
  getContract
} from "@/utils"
import { ChainId } from "@/config/chainConfig/chainId"
import ENS_ABI from '@/config/abi/ens-registrar.json'
import ENS_PUBLIC_RESOLVER_ABI from '@/config/abi/ens-public-resolver.json'
import MULTICALL_ABI from '@/config/abi/multicall.json'
import ERC20_ABI from '@/config/abi/erc20.json'

import config from "@/config"

export function useContract(address: string | undefined, ABI: any, withSignerIfPossible = true): Contract | null {
  const { library, account }: any = useActiveReact()

  return useMemo(() => {
    if (!address || !ABI || !library) return null
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      console.error('Failed to get contract', error)
      return null
    }
  }, [address, ABI, library, withSignerIfPossible, account])
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean): Contract | null {
  const { chainId } = useActiveReact()
  let address: string | undefined
  if (chainId) {
    switch (chainId) {
      case ChainId.ETH:
      case ChainId.GOERLI:
      case ChainId.RINKEBY:
        address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'
        break
      case ChainId.BNB:
        address = '0x08ced32a7f3eec915ba84415e9c07a7286977956'
        break
    }
  }
  return useContract(address, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean): Contract | null {
  return useContract(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useMulticallContract(): Contract | null {
  const { chainId } = useActiveReact()
  // return useContract(chainId && MULTICALL_NETWORKS[chainId], MULTICALL_ABI, false)
  // console.log(config.getCurChainInfo(chainId).multicalToken)
  return useContract(config.chainInfo[chainId]?.multicalToken, MULTICALL_ABI, false)
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_ABI, withSignerIfPossible)
}