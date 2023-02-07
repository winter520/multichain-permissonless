import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE
} from '../constant'
import {ChainId} from './chainId'

export const OPTIMISM_MAIN_CHAINID = ChainId.OPTIMISM
export const OPTIMISM_MAINNET = getLocalRPC(OPTIMISM_MAIN_CHAINID, 'https://mainnet.optimism.io')
export const OPTIMISM_MAIN_EXPLORER = 'https://optimistic.etherscan.io'

export const OPTIMISM_TEST_CHAINID = ChainId.OPTIMISM_TEST
export const OPTIMISM_TESTNET = getLocalRPC(OPTIMISM_TEST_CHAINID, 'https://kovan.optimism.io')
export const OPTIMISM_TEST_EXPLORER = 'https://kovan-l2-explorer.surge.sh'


const symbol = 'OETH'


export default {
  
  [OPTIMISM_MAIN_CHAINID]: {
    multicalToken: '0xFbdd194376de19a88118e84E279b977f165d01b8',
    nodeRpc: OPTIMISM_MAINNET,
    nodeRpcList: [
      OPTIMISM_MAINNET,
    ],
    chainID: OPTIMISM_MAIN_CHAINID,
    lookHash: OPTIMISM_MAIN_EXPLORER + '/tx/',
    lookAddr: OPTIMISM_MAIN_EXPLORER + '/address/',
    lookBlock: OPTIMISM_MAIN_EXPLORER + '/block/',
    explorer: OPTIMISM_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Optimism',
    networkName: 'Optimism mainnet',
    networkLogo: 'OPTIMISM',
    walletName: 'Optimism',
    type: 'main',
    label: OPTIMISM_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
  [OPTIMISM_TEST_CHAINID]: {
    multicalToken: '0x332730a4f6e03d9c55829435f10360e13cfa41ff',
    nodeRpc: OPTIMISM_TESTNET,
    nodeRpcList: [],
    chainID: OPTIMISM_TEST_CHAINID,
    lookHash: OPTIMISM_TEST_EXPLORER + '/tx/',
    lookAddr: OPTIMISM_TEST_EXPLORER + '/address/',
    lookBlock: OPTIMISM_TEST_EXPLORER + '/block/',
    explorer: OPTIMISM_TEST_EXPLORER,
    symbol: symbol,
    name: 'OPTIMISM',
    networkName: 'OPTIMISM Rinkeby',
    networkLogo: 'OPTIMISM',
    walletName: 'Optimism Kovan',
    type: 'main',
    label: OPTIMISM_TEST_CHAINID,
  },
}