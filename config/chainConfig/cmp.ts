import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const CMP_MAIN_CHAINID = ChainId.CMP
export const CMP_MAINNET = getLocalRPC(CMP_MAIN_CHAINID, 'https://mainnet.block.caduceus.foundation')
export const CMP_MAIN_EXPLORER = 'https://mainnet.scan.caduceus.foundation'

const symbol = 'CMP'

export default {
  [CMP_MAIN_CHAINID]: {
    multicalToken: '0xC43E77E8641d41028785779Df0F3D021bD54a1d6',
    nodeRpc: CMP_MAINNET,
    nodeRpcList: [
      CMP_MAINNET,
    ],
    chainID: CMP_MAIN_CHAINID,
    lookHash: CMP_MAIN_EXPLORER + '/tx/',
    lookAddr: CMP_MAIN_EXPLORER + '/address/',
    lookBlock: CMP_MAIN_EXPLORER + '/block/',
    explorer: CMP_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Caduceus',
    networkName: 'Caduceus mainnet',
    walletName: 'CMP-Mainnet',
    type: 'main',
    label: CMP_MAIN_CHAINID,
  },
}