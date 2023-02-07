import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE
} from '../constant'
import {ChainId} from './chainId'
// console.log(process.env)
// alert(process.env.NODE_ENV)

// const useNode = 'https://bsc-dataseed1.defibit.io/'
// const useNode = 'https://bsc-dataseed2.defibit.io/'
// const useNode = 'https://bsc-dataseed3.defibit.io/'
// const useNode = 'https://bsc-dataseed4.defibit.io/'

// const useNode = 'https://bsc-dataseed1.ninicoin.io/'
// const useNode = 'https://bsc-dataseed2.ninicoin.io/'
const useNode = 'https://bsc-dataseed3.ninicoin.io/'
// const useNode = 'https://bsc-dataseed4.ninicoin.io/'

// const useNode = 'https://bsc-dataseed1.binance.org/'
// const useNode = 'https://bsc-dataseed2.binance.org/'
// const useNode = 'https://bsc-dataseed3.binance.org/'
// const useNode = 'https://bsc-dataseed4.binance.org/'

export const BNB_MAIN_CHAINID = ChainId.BNB
// export const BNB_MAINNET = process.env.NODE_ENV === 'development' ? getLocalRPC(BNB_MAIN_CHAINID, useNode) : getLocalRPC(BNB_MAIN_CHAINID, 'https://bscnode1.anyswap.exchange')
export const BNB_MAINNET = process.env.NODE_ENV === 'development' ? getLocalRPC(BNB_MAIN_CHAINID, useNode) : getLocalRPC(BNB_MAIN_CHAINID, 'https://rpc.ankr.com/bsc')
export const BNB_MAIN_EXPLORER = 'https://bscscan.com'
// console.log(BNB_MAINNET)
export const BNB_TEST_CHAINID = ChainId.BNB_TEST
export const BNB_TESTNET = getLocalRPC(BNB_TEST_CHAINID, 'https://data-seed-prebsc-1-s1.binance.org:8545')
export const BNB_TEST_EXPLORER = 'https://testnet.bscscan.com'


const symbol = 'BNB'


export default {
  [BNB_MAIN_CHAINID]: {
    multicalToken: '0xa9193376D09C7f31283C54e56D013fCF370Cd9D9',
    nodeRpc: BNB_MAINNET,
    nodeRpcList: [
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed2.defibit.io/',
      'https://bsc-dataseed3.defibit.io/',
      'https://bsc-dataseed4.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
      'https://bsc-dataseed2.ninicoin.io/',
      'https://bsc-dataseed3.ninicoin.io/',
      'https://bsc-dataseed4.ninicoin.io/',
      'https://bsc-dataseed1.binance.org/',
      'https://bsc-dataseed2.binance.org/',
      'https://bsc-dataseed3.binance.org/',
      'https://bsc-dataseed4.binance.org/',
      'https://bsc-mainnet.nodereal.io/v1/60da44aa9d5747eaab321b08cce17cbc',
    ],
    chainID: BNB_MAIN_CHAINID,
    lookHash: BNB_MAIN_EXPLORER + '/tx/',
    lookAddr: BNB_MAIN_EXPLORER + '/address/',
    lookBlock: BNB_MAIN_EXPLORER + '/block/',
    explorer: BNB_MAIN_EXPLORER,
    symbol: symbol,
    symbolName: 'Binance',
    name: 'BNB CHAIN',
    networkName: 'BNB CHAIN mainnet',
    walletName: 'Binance Smart Chain Mainnet',
    type: 'main',
    label: BNB_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
  [BNB_TEST_CHAINID]: {
    multicalToken: '0xe348b292e8eA5FAB54340656f3D374b259D658b8',
    nodeRpc: BNB_TESTNET,
    nodeRpcList: [
      BNB_TESTNET
    ],
    chainID: BNB_TEST_CHAINID,
    lookHash: BNB_TEST_EXPLORER + '/tx/',
    lookAddr: BNB_TEST_EXPLORER + '/address/',
    lookBlock: BNB_TEST_EXPLORER + '/block/',
    explorer: BNB_TEST_EXPLORER,
    symbol: symbol,
    name: 'BNB CHAIN',
    networkName: 'BNB CHAIN testnet',
    walletName: 'Binance Smart Chain Testnet',
    type: 'test',
    label: BNB_TEST_CHAINID,
  }
}