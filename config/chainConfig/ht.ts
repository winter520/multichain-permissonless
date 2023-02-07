import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const HT_MAIN_CHAINID = ChainId.HT
export const HT_MAINNET = getLocalRPC(HT_MAIN_CHAINID, 'https://http-mainnet.hecochain.com')
export const HT_MAIN_EXPLORER = 'https://hecoinfo.com/'

export const HT_TEST_CHAINID = ChainId.HT_TEST
export const HT_TESTNET = getLocalRPC(HT_TEST_CHAINID, 'https://http-testnet.hecochain.com')
export const HT_TEST_EXPLORER = 'https://testnet.hecoinfo.com'

const symbol = 'HT'

export default {
  [HT_MAIN_CHAINID]: {
    multicalToken: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    nodeRpc: HT_MAINNET,
    nodeRpcList: [
      HT_MAINNET,
    ],
    chainID: HT_MAIN_CHAINID,
    lookHash: HT_MAIN_EXPLORER + '/tx/',
    lookAddr: HT_MAIN_EXPLORER + '/address/',
    lookBlock: HT_MAIN_EXPLORER + '/block/',
    explorer: HT_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Huobi',
    networkName: 'Heco mainnet',
    walletName: 'Huobi ECO Chain Mainnet',
    type: 'main',
    label: HT_MAIN_CHAINID,
  },
  [HT_TEST_CHAINID]: {
    multicalToken: '0xe4ea48020f648b1aa7fc25af7b196596190c6b29',
    nodeRpc: HT_TESTNET,
    nodeRpcList: [
      HT_TESTNET,
    ],
    chainID: HT_TEST_CHAINID,
    lookHash: HT_TEST_EXPLORER + '/tx/',
    lookAddr: HT_TEST_EXPLORER + '/address/',
    lookBlock: HT_TEST_EXPLORER + '/block/',
    explorer: HT_TEST_EXPLORER,
    symbol: symbol,
    name: 'Huobi',
    networkName: 'Heco testnet',
    walletName: 'Huobi ECO Chain Testnet',
    type: 'test',
    label: HT_TEST_CHAINID,
  },
}