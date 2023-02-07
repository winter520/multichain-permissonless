
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const BLOCK_MAINNET = ''
export const BLOCK_MAIN_CHAINID = ChainId.BLOCK
export const BLOCK_MAIN_EXPLORER = ''

const symbol = 'BLOCK'


export default {
  [BLOCK_MAIN_CHAINID]: {
    multicalToken: '',
    nodeRpc: BLOCK_MAINNET,
    nodeRpcList: [],
    chainID: BLOCK_MAIN_CHAINID,
    lookHash: BLOCK_MAIN_EXPLORER + '/tx/',
    lookAddr: BLOCK_MAIN_EXPLORER + '/address/',
    lookBlock: BLOCK_MAIN_EXPLORER + '/block/',
    explorer: BLOCK_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Blocknet',
    networkName: 'Blocknet mainnet',
    type: 'main',
    label: BLOCK_MAIN_CHAINID,
    chainType: 'NOWALLET'
  },
}