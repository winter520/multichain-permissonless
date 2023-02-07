import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const RBTC_MAIN_CHAINID = ChainId.RBTC
export const RBTC_MAINNET = getLocalRPC(RBTC_MAIN_CHAINID, 'https://public-node.rsk.co')
export const RBTC_MAIN_EXPLORER = 'https://explorer.rsk.co'


const symbol = 'RBTC'

export default {
  [RBTC_MAIN_CHAINID]: {
    multicalToken: '0xFbdd194376de19a88118e84E279b977f165d01b8',
    nodeRpc: RBTC_MAINNET,
    nodeRpcList: [
      RBTC_MAINNET,
    ],
    chainID: RBTC_MAIN_CHAINID,
    lookHash: RBTC_MAIN_EXPLORER + '/tx/',
    lookAddr: RBTC_MAIN_EXPLORER + '/address/',
    lookBlock: RBTC_MAIN_EXPLORER + '/block/',
    explorer: RBTC_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Rootstock RSK',
    networkName: 'Rootstock RSK mainnet',
    walletName: 'RSK Mainnet',
    type: 'main',
    label: RBTC_MAIN_CHAINID,
  },
}