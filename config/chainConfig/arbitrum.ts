import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE
} from '../constant'
import {ChainId} from './chainId'

export const ARBITRUM_MAIN_CHAINID = ChainId.ARBITRUM
export const ARBITRUM_MAINNET = getLocalRPC(ARBITRUM_MAIN_CHAINID, 'https://arb1.arbitrum.io/rpc')
export const ARBITRUM_MAIN_EXPLORER = 'https://arbiscan.io/'

export const ARBITRUM_TEST_CHAINID = ChainId.ARBITRUM_TEST
export const ARBITRUM_TESTNET = getLocalRPC(ARBITRUM_TEST_CHAINID, 'https://rinkeby.arbitrum.io/rpc')
export const ARBITRUM_TEST_EXPLORER = 'https://rinkeby-explorer.arbitrum.io/#'

const symbol = 'ETH'

export default {
  
  [ARBITRUM_MAIN_CHAINID]: {
    multicalToken: '0x80C7DD17B01855a6D2347444a0FCC36136a314de',
    nodeRpc: ARBITRUM_MAINNET,
    nodeRpcList: [
      ARBITRUM_MAINNET
    ],
    chainID: ARBITRUM_MAIN_CHAINID,
    lookHash: ARBITRUM_MAIN_EXPLORER + '/tx/',
    lookAddr: ARBITRUM_MAIN_EXPLORER + '/address/',
    lookBlock: ARBITRUM_MAIN_EXPLORER + '/block/',
    explorer: ARBITRUM_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Arbitrum',
    networkName: 'Arbitrum mainnet',
    networkLogo: 'ARBITRUM',
    walletName: 'Arbitrum One',
    type: 'main',
    label: ARBITRUM_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
  [ARBITRUM_TEST_CHAINID]: {
    multicalToken: '0xf27ee99622c3c9b264583dacb2cce056e194494f',
    nodeRpc: ARBITRUM_TESTNET,
    nodeRpcList: [
      ARBITRUM_TESTNET
    ],
    chainID: ARBITRUM_TEST_CHAINID,
    lookHash: ARBITRUM_TEST_EXPLORER + '/tx/',
    lookAddr: ARBITRUM_TEST_EXPLORER + '/address/',
    lookBlock: ARBITRUM_TEST_EXPLORER + '/block/',
    explorer: ARBITRUM_TEST_EXPLORER,
    symbol: symbol,
    name: 'Arbitrum',
    networkName: 'Arbitrum testnet',
    networkLogo: 'ARBITRUM',
    walletName: 'Arbitrum Rinkeby',
    type: 'test',
    label: ARBITRUM_TEST_CHAINID,
  },
}