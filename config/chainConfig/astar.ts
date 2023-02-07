import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const ASTAR_MAIN_CHAINID = ChainId.ASTAR
export const ASTAR_MAINNET = getLocalRPC(ASTAR_MAIN_CHAINID, 'https://rpc.astar.bldnodes.org/')
export const ASTAR_MAIN_EXPLORER = 'https://astar.subscan.io'

export const testTokenList = []

const symbol = 'ASTR'

export default {
  [ASTAR_MAIN_CHAINID]: {
    multicalToken: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
    nodeRpc: ASTAR_MAINNET,
    nodeRpcList: [
      ASTAR_MAINNET,
      'https://rpc.astar.network:8545',
      'https://astar.subscan.io',
    ],
    chainID: ASTAR_MAIN_CHAINID,
    lookHash: ASTAR_MAIN_EXPLORER + '/extrinsic/',
    lookAddr: ASTAR_MAIN_EXPLORER + '/account/',
    lookBlock: ASTAR_MAIN_EXPLORER + '/block/',
    explorer: ASTAR_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Astar Network',
    networkName: 'Astar mainnet',
    networkLogo: 'ASTR',
    walletName: 'Astar',
    type: 'main',
    label: ASTAR_MAIN_CHAINID,
  },
}