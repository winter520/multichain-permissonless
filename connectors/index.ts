
import { AbstractConnector } from '@web3-react/abstract-connector'
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
// console.log(spportChainArr)
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

export interface WalletInfo {
  connector?: AbstractConnector
  name: string
  iconName: string
  description: string
  href: string | null
  color: string
  primary?: true
  mobile?: true
  mobileOnly?: true
}
// console.log(injected)
export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: 'Injected',
    iconName: 'arrow-right.svg',
    description: 'Injected web3 provider.',
    href: null,
    color: '#010101',
    primary: true
  },
  METAMASK: {
    connector: injected,
    name: 'MetaMask',
    iconName: 'metamask.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  WALLET_CONNECT: {
    connector: walletconnect,
    name: 'WalletConnect',
    iconName: 'walletConnectIcon.svg',
    description: 'Connect to Trust Wallet, Rainbow Wallet and more...',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  WALLET_LINK: {
    connector: walletlink,
    name: 'Coinbase Wallet',
    iconName: 'coinbaseWalletIcon.svg',
    description: 'Use Coinbase Wallet app on mobile device',
    href: null,
    color: '#315CF5'
  },
  BITKEEP: {
    connector: bitkeep,
    name: 'BitKeep',
    iconName: 'BitKeep.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  tokenpocket: {
    connector: injected,
    name: 'TokenPocket',
    iconName: 'TPT.jpg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#269964',
  },
  trustwallet: {
    connector: walletconnect,
    name: 'Trust Wallet',
    iconName: 'TWT.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#269964',
  },
  gnosissafe: {
    connector: gnosissafe,
    name: 'Gnosis Safe',
    iconName: 'GnosisSafe.svg',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#269964',
  },
  Binance: {
    connector: bsc,
    name: 'Binance',
    iconName: 'BNB.svg',
    description: 'Login using Binance hosted wallet',
    href: null,
    color: '#F0B90B',
    mobile: true,
  },
  OKEXCHAIN: {
    connector: injected,
    name: 'OKX Wallet',
    iconName: 'OKX.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  COIN98: {
    connector: injected,
    name: 'Coin98',
    iconName: 'Coin98.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#E8831D'
  },
  tally: {
    connector: injected,
    name: 'Tally Ho',
    iconName: 'tally.png',
    description: 'Connect to Tally Ho Wallet.',
    href: null,
    color: '#4196FC',
    mobile: true
  },
  Clover: {
    connector: clover,
    name: 'Clover',
    iconName: 'clv.png',
    description: 'Login using Clover hosted wallet',
    href: null,
    color: '#269964',
  },
  Xdefi: {
    // connector: injected,
    connector: xdefi,
    name: 'XDEFI',
    iconName: 'XDEFI.png',
    description: 'Easy-to-use browser extension.',
    href: null,
    color: '#269964',
  },
  huobi: {
    connector: walletconnect,
    name: 'Huobi',
    iconName: 'HT.png',
    description: 'Connect to Huobi Wallet.',
    href: null,
    color: '#4196FC',
    mobile: true
  },
}