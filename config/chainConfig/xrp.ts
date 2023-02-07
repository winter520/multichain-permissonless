// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const XRP_MAINNET = ''
export const XRP_MAIN_CHAINID = ChainId.XRP
export const XRP_MAIN_EXPLORER = 'https://xrpscan.com'

const symbol = 'XRP'


export default {
  [XRP_MAIN_CHAINID]: {
    multicalToken: '',
    nodeRpc: XRP_MAINNET,
    nodeRpcList: [],
    chainID: XRP_MAIN_CHAINID,
    lookHash: XRP_MAIN_EXPLORER + '/tx/',
    lookAddr: XRP_MAIN_EXPLORER + '/account/',
    lookBlock: XRP_MAIN_EXPLORER + '/block/',
    explorer: XRP_MAIN_EXPLORER,
    symbol: symbol,
    name: 'XRP Ledger',
    networkName: 'XRP Ledger mainnet',
    networkLogo: 'XRP',
    type: 'main',
    label: XRP_MAIN_CHAINID,
    chainType: 'NOWALLET'
  },
}