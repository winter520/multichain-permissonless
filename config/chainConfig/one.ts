import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const ONE_MAIN_CHAINID = ChainId.ONE
export const ONE_MAINNET = getLocalRPC(ONE_MAIN_CHAINID, 'https://api.harmony.one')
export const ONE_MAIN_EXPLORER = 'https://explorer.harmony.one/#'

const symbol = 'ONE'

export default {
  [ONE_MAIN_CHAINID]: {
    multicalToken: '0xdDCbf776dF3dE60163066A5ddDF2277cB445E0F3',
    nodeRpc: ONE_MAINNET,
    nodeRpcList: [
      ONE_MAINNET,
      'https://api.s0.t.hmny.io'
    ],
    chainID: ONE_MAIN_CHAINID,
    lookHash: ONE_MAIN_EXPLORER + '/tx/',
    lookAddr: ONE_MAIN_EXPLORER + '/address/',
    lookBlock: ONE_MAIN_EXPLORER + '/block/',
    explorer: ONE_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Harmony',
    networkName: 'Harmony mainnet',
    walletName: 'Harmony Mainnet Shard 0',
    type: 'main',
    label: ONE_MAIN_CHAINID,
  },
}