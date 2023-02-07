import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE
} from '../constant'
import {ChainId} from './chainId'

export const KAVA_MAIN_CHAINID = ChainId.KAVA
export const KAVA_MAINNET = getLocalRPC(KAVA_MAIN_CHAINID, 'https://evm.kava.io')
export const KAVA_MAIN_EXPLORER = 'https://explorer.kava.io'

const symbol = 'KAVA'


export default {
  [KAVA_MAIN_CHAINID]: {
    multicalToken: '0x30A62aA52Fa099C4B227869EB6aeaDEda054d121',
    nodeRpc: KAVA_MAINNET,
    nodeRpcList: [
      KAVA_MAINNET,
    ],
    chainID: KAVA_MAIN_CHAINID,
    lookHash: KAVA_MAIN_EXPLORER + '/tx/',
    lookAddr: KAVA_MAIN_EXPLORER + '/address/',
    lookBlock: KAVA_MAIN_EXPLORER + '/block/',
    explorer: KAVA_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Kava',
    networkName: 'Kava mainnet',
    walletName: 'Kava EVM',
    type: 'main',
    label: KAVA_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
}