import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const HOO_MAIN_CHAINID = ChainId.HOO
export const HOO_MAINNET = getLocalRPC(HOO_MAIN_CHAINID, 'https://http-mainnet.hoosmartchain.com')
export const HOO_MAIN_EXPLORER = 'https://hooscan.com'

const symbol = 'HOO'


export default {
  [HOO_MAIN_CHAINID]: {
    multicalToken: '0xC43E77E8641d41028785779Df0F3D021bD54a1d6',
    nodeRpc: HOO_MAINNET,
    nodeRpcList: [
      HOO_MAINNET,
    ],
    chainID: HOO_MAIN_CHAINID,
    lookHash: HOO_MAIN_EXPLORER + '/tx/',
    lookAddr: HOO_MAIN_EXPLORER + '/address/',
    lookBlock: HOO_MAIN_EXPLORER + '/block/',
    explorer: HOO_MAIN_EXPLORER,
    symbol: symbol,
    name: 'HSC',
    networkName: 'HSC mainnet',
    walletName: 'Hoo Smart Chain',
    type: 'main',
    label: HOO_MAIN_CHAINID,
  },
}