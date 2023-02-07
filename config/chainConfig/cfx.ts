import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const CFX_MAIN_CHAINID = ChainId.CFX
export const CFX_MAINNET = getLocalRPC(CFX_MAIN_CHAINID, 'https://evm.confluxrpc.com')
export const CFX_MAIN_EXPLORER = 'https://evm.confluxscan.io'

const symbol = 'CFX'


export default {
  [CFX_MAIN_CHAINID]: {
    multicalToken: '0xAe8E9F3EA6a5b462b0Ae29aa1a3F6aC072365d9d',
    nodeRpc: CFX_MAINNET,
    nodeRpcList: [
      CFX_MAINNET,
    ],
    chainID: CFX_MAIN_CHAINID,
    lookHash: CFX_MAIN_EXPLORER + '/tx/',
    lookAddr: CFX_MAIN_EXPLORER + '/address/',
    lookBlock: CFX_MAIN_EXPLORER + '/block/',
    explorer: CFX_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Conflux eSpace',
    networkName: 'Conflux eSpace mainnet',
    walletName: 'Conflux eSpace',
    type: 'main',
    label: CFX_MAIN_CHAINID,
  },
}