import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const ETC_MAIN_CHAINID = ChainId.ETC
export const ETC_MAINNET = getLocalRPC(ETC_MAIN_CHAINID, 'https://www.ethercluster.com/etc')
export const ETC_MAIN_EXPLORER = 'https://blockscout.com/etc/mainnet'

const symbol = 'ETC'

export default {
  [ETC_MAIN_CHAINID]: {
    multicalToken: '0xC43E77E8641d41028785779Df0F3D021bD54a1d6',
    nodeRpc: ETC_MAINNET,
    nodeRpcList: [
      ETC_MAINNET,
    ],
    chainID: ETC_MAIN_CHAINID,
    lookHash: ETC_MAIN_EXPLORER + '/tx/',
    lookAddr: ETC_MAIN_EXPLORER + '/address/',
    lookBlock: ETC_MAIN_EXPLORER + '/block/',
    explorer: ETC_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Ethereum Classic',
    networkName: 'Ethereum Classic mainnet',
    walletName: 'Ethereum Classic Mainnet',
    type: 'main',
    label: ETC_MAIN_CHAINID,
  },
}