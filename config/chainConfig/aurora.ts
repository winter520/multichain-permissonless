import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const AURORA_MAIN_CHAINID = ChainId.AURORA
export const AURORA_MAINNET = getLocalRPC(AURORA_MAIN_CHAINID, 'https://mainnet.aurora.dev')
export const AURORA_MAIN_EXPLORER = 'https://aurorascan.dev'

export const testTokenList = []

const symbol = 'ETH'

export default {
  [AURORA_MAIN_CHAINID]: {
    multicalToken: '0xE3F5a90F9cb311505cd691a46596599aA1A0AD7D',
    nodeRpc: AURORA_MAINNET,
    nodeRpcList: [
      AURORA_MAINNET,
    ],
    chainID: AURORA_MAIN_CHAINID,
    lookHash: AURORA_MAIN_EXPLORER + '/tx/',
    lookAddr: AURORA_MAIN_EXPLORER + '/address/',
    lookBlock: AURORA_MAIN_EXPLORER + '/block/',
    explorer: AURORA_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Aurora',
    networkName: 'Aurora mainnet',
    networkLogo: 'AURORA',
    walletName: 'Aurora Mainnet',
    type: 'main',
    label: AURORA_MAIN_CHAINID,
  },
}