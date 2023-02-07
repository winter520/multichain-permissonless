import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import { ChainId } from './chainId'

export const CUBE_MAIN_CHAINID = ChainId.CUBE
export const CUBE_MAINNET = getLocalRPC(CUBE_MAIN_CHAINID, 'https://http-mainnet.cube.network')
export const CUBE_MAIN_EXPLORER = 'https://www.cubescan.network/en-us'


const symbol = 'CUBE'

export default {
  [CUBE_MAIN_CHAINID]: {
    multicalToken: '',
    nodeRpc: CUBE_MAINNET,
    nodeRpcList: [
      CUBE_MAINNET,
      'https://http-mainnet.cube.network',
      'https://http-mainnet-sg.cube.network',
      'https://http-mainnet-us.cube.network',
    ],
    chainID: CUBE_MAIN_CHAINID,
    lookHash: CUBE_MAIN_EXPLORER + '/tx/',
    lookAddr: CUBE_MAIN_EXPLORER + '/address/',
    lookBlock: CUBE_MAIN_EXPLORER + '/block/',
    explorer: CUBE_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Cube Chain',
    networkName: 'Cube Chain mainnet',
    walletName: 'Cube Chain Mainnet',
    type: 'main',
    label: CUBE_MAIN_CHAINID,
  },
}