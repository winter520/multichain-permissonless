import { Web3Provider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import {BscConnector} from '@binance-chain/bsc-connector'
import {CloverConnector} from '@clover-network/clover-connector'
import { NetworkConnector } from './NetworkConnector'
import {XdefiConnector} from './xdefi'
import {BitKeepConnector} from './bitkeep'
import {SafeAppConnector} from './gnosis-safe'
import {TallyConnector} from './tally'

import {spportChainArr as sc} from '@/config/chainConfig/index'
import config from '@/config'


export const NetworkContextName = 'NETWORK'

export const NETWORK_CHAIN_ID: number = 1

const spportChain:any = {}
const spportChainArr:any = []
for (const chainID in config.chainInfo) {
// for (const chainID of spportChainArr) {
  if (isNaN(Number(chainID))) continue
  if (chainID && config.chainInfo[chainID]?.nodeRpc) {
    // spportChainArr.push(Number(chainID))
    spportChain[chainID] = config.chainInfo[chainID].nodeRpc
  }
}
// const sc1:any = sc
for (const c of sc) {
  if (isNaN(Number(c))) continue
  spportChainArr.push(Number(c))
}
export const walletconnect = new WalletConnectConnector({
  supportedChainIds: [...spportChainArr],
  rpc: {
    ...spportChain
  },
  qrcode: true,
})

export const network = new NetworkConnector({
  defaultChainId: NETWORK_CHAIN_ID,
  urls: { ...spportChain }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({
  supportedChainIds: [...spportChainArr]
})


export const walletlink = new WalletLinkConnector({
  url: spportChain[NETWORK_CHAIN_ID],
  appName: 'Anyswap',
  appLogoUrl: 'https://assets.coingecko.com/coins/images/12242/small/anyswap.jpg',
  supportedChainIds: [...spportChainArr]
})


export const bsc = new BscConnector({
  supportedChainIds: [...spportChainArr],
})
export const xdefi = new XdefiConnector({
  supportedChainIds: [...spportChainArr],
})
export const bitkeep = new BitKeepConnector({
  supportedChainIds: [...spportChainArr],
})

export const clover =  new CloverConnector({
  supportedChainIds: [...spportChainArr],
})
export const tally =  new TallyConnector({
  supportedChainIds: [...spportChainArr],
})
export const gnosissafe =  new SafeAppConnector()