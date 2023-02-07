import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const OKT_MAIN_CHAINID = ChainId.OKT
export const OKT_MAINNET = getLocalRPC(OKT_MAIN_CHAINID, 'https://exchainrpc.okex.org')
export const OKT_MAIN_EXPLORER = 'https://www.oklink.com/okexchain'

const symbol = 'OKT'

export default {
  [OKT_MAIN_CHAINID]: {
    multicalToken: '0xF4d73326C13a4Fc5FD7A064217e12780e9Bd62c3',
    nodeRpc: OKT_MAINNET,
    nodeRpcList: [
      OKT_MAINNET,
    ],
    chainID: OKT_MAIN_CHAINID,
    lookHash: OKT_MAIN_EXPLORER + '/tx/',
    lookAddr: OKT_MAIN_EXPLORER + '/address/',
    lookBlock: OKT_MAIN_EXPLORER + '/block/',
    explorer: OKT_MAIN_EXPLORER,
    symbol: symbol,
    name: 'OKC',
    networkName: 'OKC mainnet',
    walletName: 'OKXChain Mainnet',
    type: 'main',
    label: OKT_MAIN_CHAINID,
  },
}