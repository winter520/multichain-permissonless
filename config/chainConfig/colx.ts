// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const COLX_MAINNET = ''
export const COLX_MAIN_CHAINID = ChainId.COLX
export const COLX_MAIN_EXPLORER = ''

const symbol = 'COLX'


export default {
  [COLX_MAIN_CHAINID]: {
    multicalToken: '',
    nodeRpc: COLX_MAINNET,
    nodeRpcList: [],
    chainID: COLX_MAIN_CHAINID,
    lookHash: COLX_MAIN_EXPLORER + '/tx/',
    lookAddr: COLX_MAIN_EXPLORER + '/address/',
    lookBlock: COLX_MAIN_EXPLORER + '/block/',
    explorer: COLX_MAIN_EXPLORER,
    symbol: symbol,
    name: 'ColossusXT',
    networkName: 'ColossusXT mainnet',
    type: 'main',
    label: COLX_MAIN_CHAINID,
    chainType: 'NOWALLET'
  },
}