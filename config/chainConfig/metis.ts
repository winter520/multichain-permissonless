import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const METIS_MAIN_CHAINID = ChainId.METIS
export const METIS_MAINNET = getLocalRPC(METIS_MAIN_CHAINID, 'https://andromeda.metis.io/?owner=1088')
export const METIS_MAIN_EXPLORER = 'https://andromeda-explorer.metis.io'

const symbol = 'METIS'

export default {
  [METIS_MAIN_CHAINID]: {
    multicalToken: '0x7C598c96D02398d89FbCb9d41Eab3DF0C16F227D',
    nodeRpc: METIS_MAINNET,
    nodeRpcList: [
      METIS_MAINNET,
    ],
    chainID: METIS_MAIN_CHAINID,
    lookHash: METIS_MAIN_EXPLORER + '/tx/',
    lookAddr: METIS_MAIN_EXPLORER + '/address/',
    lookBlock: METIS_MAIN_EXPLORER + '/block/',
    explorer: METIS_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Metis',
    networkName: 'Metis mainnet',
    walletName: 'Metis Andromeda Mainnet',
    type: 'main',
    label: METIS_MAIN_CHAINID,
  },
}