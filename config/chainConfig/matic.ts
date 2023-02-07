import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE
} from '../constant'
import {ChainId} from './chainId'

export const MATIC_MAIN_CHAINID = ChainId.MATIC
// export const MATIC_MAINNET = 'https://rpc-mainnet.maticvigil.com'
// export const MATIC_MAINNET = process.env.NODE_ENV === 'development' ? 'https://rpc-mainnet.maticvigil.com' : 'https://maticnode1.anyswap.exchange'
export const MATIC_MAINNET = process.env.NODE_ENV === 'development' ? getLocalRPC(MATIC_MAIN_CHAINID, 'https://polygon-rpc.com/') : getLocalRPC(MATIC_MAIN_CHAINID, 'https://rpc.ankr.com/polygon')
// export const MATIC_MAIN_EXPLORER = 'https://explorer-mainnet.maticvigil.com'
export const MATIC_MAIN_EXPLORER = 'https://polygonscan.com'


export const MATIC_TEST_CHAINID = ChainId.MATIC_TEST
export const MATIC_TESTNET = getLocalRPC(MATIC_TEST_CHAINID, 'https://rpc-mumbai.maticvigil.com')
export const MATIC_TEST_EXPLORER = 'https://mumbai.polygonscan.com'

const symbol = 'MATIC'

export default {
  [MATIC_MAIN_CHAINID]: {
    multicalToken: '0x02817C1e3543c2d908a590F5dB6bc97f933dB4BD',
    nodeRpc: MATIC_MAINNET,
    nodeRpcList: [
      MATIC_MAINNET,
      'https://polygon-rpc.com/',
      'https://rpc-mainnet.matic.network',
      'https://matic-mainnet.chainstacklabs.com',
      'https://rpc-mainnet.maticvigil.com',
      'https://rpc-mainnet.matic.quiknode.pro',
      'https://matic-mainnet-full-rpc.bwarelabs.com',
      'https://matic-mainnet-archive-rpc.bwarelabs.com',
    ],
    chainID: MATIC_MAIN_CHAINID,
    lookHash: MATIC_MAIN_EXPLORER + '/tx/',
    lookAddr: MATIC_MAIN_EXPLORER + '/address/',
    lookBlock: MATIC_MAIN_EXPLORER + '/block/',
    explorer: MATIC_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Polygon',
    networkName: 'Polygon mainnet',
    walletName: 'Polygon Mainnet',
    type: 'main',
    label: MATIC_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
  [MATIC_TEST_CHAINID]: {
    multicalToken: '',
    nodeRpc: MATIC_TESTNET,
    nodeRpcList: [
      MATIC_TESTNET,
    ],
    chainID: MATIC_TEST_CHAINID,
    lookHash: MATIC_TEST_EXPLORER + '/tx/',
    lookAddr: MATIC_TEST_EXPLORER + '/address/',
    lookBlock: MATIC_TEST_EXPLORER + '/block/',
    explorer: MATIC_TEST_EXPLORER,
    symbol: symbol,
    name: 'Mumbai',
    networkName: 'Mumbai testnet',
    walletName: 'Mumbai',
    type: 'test',
    label: MATIC_TEST_CHAINID,
  },
}