import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const JEWEL_MAIN_CHAINID = ChainId.JEWEL
export const JEWEL_MAINNET = getLocalRPC(JEWEL_MAIN_CHAINID, 'https://subnets.avax.network/defi-kingdoms/dfk-chain/rpc')
export const JEWEL_MAIN_EXPLORER = 'https://subnets.avax.network/defi-kingdoms/dfk-chain/explorer'

const symbol = 'JEWEL'


export default {
  [JEWEL_MAIN_CHAINID]: {
    multicalToken: '0x5b24224dC16508DAD755756639E420817DD4c99E',
    nodeRpc: JEWEL_MAINNET,
    nodeRpcList: [
      JEWEL_MAINNET,
    ],
    chainID: JEWEL_MAIN_CHAINID,
    lookHash: JEWEL_MAIN_EXPLORER + '/tx/',
    lookAddr: JEWEL_MAIN_EXPLORER + '/address/',
    lookBlock: JEWEL_MAIN_EXPLORER + '/block/',
    explorer: JEWEL_MAIN_EXPLORER,
    symbol: symbol,
    name: 'DeFi Kingdoms',
    networkName: 'DeFi Kingdoms mainnet',
    walletName: 'DFK Chain',
    type: 'main',
    label: JEWEL_MAIN_CHAINID,
  },
}