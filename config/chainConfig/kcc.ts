import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const KCC_MAIN_CHAINID = ChainId.KCC
export const KCC_MAINNET = getLocalRPC(KCC_MAIN_CHAINID, 'https://rpc-mainnet.kcc.network')
export const KCC_MAIN_EXPLORER = 'https://explorer.kcc.io/cn'

const symbol = 'KCS'

export default {
  [KCC_MAIN_CHAINID]: {
    multicalToken: '0xA649325Aa7C5093d12D6F98EB4378deAe68CE23F',
    nodeRpc: KCC_MAINNET,
    nodeRpcList: [
      KCC_MAINNET,
    ],
    chainID: KCC_MAIN_CHAINID,
    lookHash: KCC_MAIN_EXPLORER + '/tx/',
    lookAddr: KCC_MAIN_EXPLORER + '/address/',
    lookBlock: KCC_MAIN_EXPLORER + '/block/',
    explorer: KCC_MAIN_EXPLORER,
    symbol: symbol,
    name: 'KCC',
    networkName: 'KCC mainnet',
    walletName: 'KCC Mainnet',
    type: 'main',
    label: KCC_MAIN_CHAINID,
  },
}