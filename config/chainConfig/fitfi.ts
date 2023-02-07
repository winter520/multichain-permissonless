import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const FITFI_MAIN_CHAINID = ChainId.FITFI
export const FITFI_MAINNET = getLocalRPC(FITFI_MAIN_CHAINID, 'https://rpc.step.network/')
export const FITFI_MAIN_EXPLORER = 'https://stepscan.io'

const symbol = 'FITFI'


export default {
  [FITFI_MAIN_CHAINID]: {
    multicalToken: '0x639A647fbe20b6c8ac19E48E2de44ea792c62c5C',
    nodeRpc: FITFI_MAINNET,
    nodeRpcList: [
      FITFI_MAINNET,
    ],
    chainID: FITFI_MAIN_CHAINID,
    lookHash: FITFI_MAIN_EXPLORER + '/tx/',
    lookAddr: FITFI_MAIN_EXPLORER + '/address/',
    lookBlock: FITFI_MAIN_EXPLORER + '/block/',
    explorer: FITFI_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Step Network',
    networkName: 'Step Network mainnet',
    walletName: 'Step Network',
    type: 'main',
    label: FITFI_MAIN_CHAINID,
  },
}