import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE
} from '../constant'
import {ChainId} from './chainId'

export const MOVR_MAIN_CHAINID = ChainId.MOVR
export const MOVR_MAINNET = getLocalRPC(MOVR_MAIN_CHAINID, 'https://rpc.moonriver.moonbeam.network')
export const MOVR_MAIN_EXPLORER = 'https://moonriver.moonscan.io'

const symbol = 'MOVR'


export default {
  [MOVR_MAIN_CHAINID]: {
    multicalToken: '0x270f2F35bED92B7A59eA5F08F6B3fd34c8D9D9b5',
    nodeRpc: MOVR_MAINNET,
    nodeRpcList: [
      MOVR_MAINNET,
    ],
    chainID: MOVR_MAIN_CHAINID,
    lookHash: MOVR_MAIN_EXPLORER + '/tx/',
    lookAddr: MOVR_MAIN_EXPLORER + '/address/',
    lookBlock: MOVR_MAIN_EXPLORER + '/block/',
    explorer: MOVR_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Moonriver',
    networkName: 'Moonriver mainnet',
    walletName: 'Moonriver',
    type: 'main',
    label: MOVR_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
}