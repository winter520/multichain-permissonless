import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const NOVA_MAIN_CHAINID = ChainId.NOVA
export const NOVA_MAINNET = getLocalRPC(NOVA_MAIN_CHAINID, 'https://nova.arbitrum.io/rpc')
export const NOVA_MAIN_EXPLORER = 'https://nova-explorer.arbitrum.io'

const symbol = 'ETH'

export default {
  [NOVA_MAIN_CHAINID]: {
    multicalToken: '0xfA9343C3897324496A05fC75abeD6bAC29f8A40f',
    nodeRpc: NOVA_MAINNET,
    nodeRpcList: [
      NOVA_MAINNET,
    ],
    chainID: NOVA_MAIN_CHAINID,
    lookHash: NOVA_MAIN_EXPLORER + '/tx/',
    lookAddr: NOVA_MAIN_EXPLORER + '/address/',
    lookBlock: NOVA_MAIN_EXPLORER + '/block/',
    explorer: NOVA_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Arbitrum Nova',
    networkName: 'Arbitrum Nova mainnet',
    networkLogo: 'NOVA',
    walletName: 'Arbitrum Nova',
    type: 'main',
    label: NOVA_MAIN_CHAINID,
  },
}