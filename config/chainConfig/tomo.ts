import {getLocalRPC} from './methods'
import {ChainId} from './chainId'

export const TOMO_MAIN_CHAINID = ChainId.TOMO
export const TOMO_MAINNET = getLocalRPC(TOMO_MAIN_CHAINID, 'https://rpc.tomochain.com')
export const TOMO_MAIN_EXPLORER = 'https://tomoscan.io'

const symbol = 'TOMO'


export default {
  [TOMO_MAIN_CHAINID]: {
    multicalToken: '0xf29848418cDdA0710Ae8d32e951E9DD5249a797B',
    nodeRpc: TOMO_MAINNET,
    nodeRpcList: [
      TOMO_MAINNET,
    ],
    chainID: TOMO_MAIN_CHAINID,
    lookHash: TOMO_MAIN_EXPLORER + '/tx/',
    lookAddr: TOMO_MAIN_EXPLORER + '/address/',
    lookBlock: TOMO_MAIN_EXPLORER + '/block/',
    explorer: TOMO_MAIN_EXPLORER,
    symbol: symbol,
    name: 'TomoChain',
    networkName: 'TomoChain mainnet',
    walletName: 'TomoChain',
    type: 'main',
    label: TOMO_MAIN_CHAINID,
  },
}