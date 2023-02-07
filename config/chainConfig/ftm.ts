import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE
} from '../constant'
import {ChainId} from './chainId'

export const FTM_MAIN_CHAINID = ChainId.FTM
// const useNode = 'https://rpc.fantom.network'
// const useNode = 'https://rpc2.fantom.network'
// const useNode = 'https://rpc3.fantom.network'
// const useNode = 'https://rpcapi.fantom.network'
const useNode = 'https://rpc.ftm.tools/'
export const FTM_MAINNET = process.env.NODE_ENV === 'development' ? getLocalRPC(FTM_MAIN_CHAINID, useNode) : getLocalRPC(FTM_MAIN_CHAINID, 'https://rpc.ftm.tools/')
export const FTM_MAIN_EXPLORER = 'https://ftmscan.com'

export const FTM_TEST_CHAINID = ChainId.FTM_TEST
export const FTM_TESTNET = getLocalRPC(FTM_TEST_CHAINID, 'https://rpc.testnet.fantom.network')
export const FTM_TEST_EXPLORER = 'https://testnet.ftmscan.com/'

const symbol = 'FTM'

export default {
  [FTM_MAIN_CHAINID]: {
    multicalToken: '0x22D4cF72C45F8198CfbF4B568dBdB5A85e8DC0B5',
    nodeRpc: FTM_MAINNET,
    nodeRpcList: [
      FTM_MAINNET,
      'https://rpc.fantom.network',
      'https://rpc2.fantom.network',
      'https://rpc3.fantom.network',
      'https://rpcapi.fantom.network'
    ],
    chainID: FTM_MAIN_CHAINID,
    lookHash: FTM_MAIN_EXPLORER + '/tx/',
    lookAddr: FTM_MAIN_EXPLORER + '/address/',
    lookBlock: FTM_MAIN_EXPLORER + '/block/',
    explorer: FTM_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Fantom',
    networkName: 'Fantom mainnet',
    walletName: 'Fantom Opera',
    type: 'main',
    label: FTM_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
  [FTM_TEST_CHAINID]: {
    multicalToken: '0x5aF9b9de61F645C08eA4540C177737C6c6622060',
    nodeRpc: FTM_TESTNET,
    nodeRpcList: [
      FTM_TESTNET,
    ],
    chainID: FTM_TEST_CHAINID,
    lookHash: FTM_TEST_EXPLORER + '/tx/',
    lookAddr: FTM_TEST_EXPLORER + '/address/',
    lookBlock: FTM_TEST_EXPLORER + '/block/',
    explorer: FTM_TEST_EXPLORER,
    symbol: symbol,
    name: 'Fantom',
    networkName: 'Fantom testnet',
    walletName: 'Fantom Testnet',
    type: 'test',
    label: FTM_TEST_CHAINID,
  },
}