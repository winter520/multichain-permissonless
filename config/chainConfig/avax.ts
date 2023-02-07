import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE
} from '../constant'
import {ChainId} from './chainId'

export const AVAX_MAIN_CHAINID = ChainId.AVAX
export const AVAX_MAINNET = getLocalRPC(AVAX_MAIN_CHAINID, 'https://api.avax.network/ext/bc/C/rpc')
export const AVAX_MAIN_EXPLORER = 'https://snowtrace.io'

export const AVAX_TEST_CHAINID = ChainId.AVAX_TEST
export const AVAX_TESTNET = getLocalRPC(AVAX_TEST_CHAINID, 'https://api.avax-test.network/ext/bc/C/rpc')
export const AVAX_TEST_EXPLORER = 'https://testnet.snowtrace.io'

const symbol = 'AVAX'

export default {
  [AVAX_MAIN_CHAINID]: {
    multicalToken: '0xd8e95abcce8901cc2640d2ff4444c85506fb829d',
    nodeRpc: AVAX_MAINNET,
    nodeRpcList: [
      AVAX_MAINNET
    ],
    chainID: AVAX_MAIN_CHAINID,
    lookHash: AVAX_MAIN_EXPLORER + '/tx/',
    lookAddr: AVAX_MAIN_EXPLORER + '/address/',
    lookBlock: AVAX_MAIN_EXPLORER + '/block/',
    explorer: AVAX_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Avalanche',
    networkName: 'Avalanche mainnet',
    walletName: 'Avalanche C-Chain',
    type: 'main',
    label: AVAX_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
  [AVAX_TEST_CHAINID]: {
    multicalToken: '',
    nodeRpc: AVAX_TESTNET,
    nodeRpcList: [
      AVAX_TESTNET
    ],
    chainID: AVAX_TEST_CHAINID,
    lookHash: AVAX_TEST_EXPLORER + '/tx/',
    lookAddr: AVAX_TEST_EXPLORER + '/address/',
    lookBlock: AVAX_TEST_EXPLORER + '/block/',
    explorer: AVAX_TEST_EXPLORER,
    symbol: symbol,
    name: 'Avalanche',
    networkName: 'Avalanche testnet',
    walletName: 'Avalanche Fuji Testnet',
    type: 'test',
    label: AVAX_TEST_CHAINID,
  },
}