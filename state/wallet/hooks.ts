import { useCallback, useMemo } from 'react'
import {
  useDispatch,
  useSelector
} from 'react-redux'
import {
  AppState,
  AppDispatch
} from '@/state'
import {walletViews} from './actions'

import {
  gnosissafe
} from '@/connectors'
import {
  useActiveWeb3React
} from '@/hooks'
import { useMulticallContract } from '@/hooks/useContract'

import {
  isAddress
} from '@/utils/isAddress'

import {
  useSingleContractMultipleData,
  useMultipleContractSingleData
} from '@/chains/evm/multical'

import ERC20_INTERFACE from '@/config/abi/erc20'

import { ChainId } from '@/config/chainConfig/chainId'
import { BigAmount } from '@/utils/bigNumber'

export function useETHWalletBalances(
  uncheckedAddresses?: (string | undefined)[],
  chainId?: any
): { [address: string]: any } {
  const multicallContract = useMulticallContract()
  const addresses: string[] = useMemo(
    () =>
      uncheckedAddresses
        ? uncheckedAddresses
            .map(isAddress)
            .filter((a): a is string => a !== false)
            .sort()
        : [],
    [uncheckedAddresses]
  )

  const results = useSingleContractMultipleData(
    multicallContract,
    'getEthBalance',
    addresses.map(address => [address]),
    undefined,
    chainId
  )
  // console.log(multicallContract)
  // console.log(results)
  // console.log(addresses)
  return useMemo(
    () =>
      addresses.reduce<{ [address: string]: any }>((memo, address, i) => {
        const value = results?.[i]?.result?.[0]
        if (value) memo[address] = BigAmount.format(18, value.toString())
        return memo
      }, {}),
    [addresses, results]
  )
}

export function useTokenBalancesWithLoadingIndicator(
  address?: string,
  tokens?: (any | undefined)[],
  chainId?:any
): [{ [tokenAddress: string]: BigAmount | undefined }, boolean] {
  const validatedTokens: any[] = useMemo(
    () => tokens?.filter((t?: any): t is any => isAddress(t?.address) !== false) ?? [],
    [tokens]
  )

  const validatedTokenAddresses = useMemo(() => validatedTokens.map(vt => vt.address), [validatedTokens])
  // console.log(chainId)
  // console.log(validatedTokenAddresses)
  const balances = useMultipleContractSingleData(validatedTokenAddresses, ERC20_INTERFACE, 'balanceOf', [address], undefined, chainId)
  // console.log(validatedTokenAddresses)
  // console.log(address)
  // console.log(balances)

  const anyLoading: boolean = useMemo(() => balances.some(callState => callState.loading), [balances])

  return [
    useMemo(
      () => {
        if (address && validatedTokens.length > 0) {
          const results = validatedTokens.reduce<{ [tokenAddress: string]: BigAmount | undefined }>((memo, token, i) => {
            const value = balances?.[i]?.result?.[0]
            const amount = value ? value.toString() : undefined
            if (amount) {
              memo[token.address.toLowerCase()] = BigAmount.format(token.decimals ? token.decimals : 0, amount)
            }
            // console.log(memo)
            return memo
          }, {})
          return results
        } else {
          return {}
        }
      },
      [address, validatedTokens, balances]
    ),
    anyLoading
  ]
}

export function useTokenBalances(
  address?: string,
  tokens?: (any | undefined)[],
  chainId?:any
): { [tokenAddress: string]: BigAmount | undefined } {
  return useTokenBalancesWithLoadingIndicator(address ? address?.toLowerCase() : undefined, tokens, chainId)[0]
}

export function useWalletViews () {
  const walletViewsResult:any = useSelector<AppState, AppState['wallet']>(state => state.wallet.walletViews)
  const dispatch = useDispatch<AppDispatch>()
  // const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const setWalletView = useCallback((type: any) => {
    // console.log(type)
    dispatch(walletViews({type}))
  }, [])

  return {
    walletView: walletViewsResult,
    setWalletView
  }
}

export function useIsGnosisSafeWallet () {
  const { connector, account } = useActiveWeb3React()
  const isGnosisSafeWallet =  useMemo(() => {
    // console.log(gnosissafe)
    // console.log(connector)
    if ( gnosissafe === connector && account) {
      return true
    }
    return false
  }, [gnosissafe, connector, account])
  return {
    isGnosisSafeWallet
  }
}