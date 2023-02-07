import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const CELO_MAIN_CHAINID = ChainId.CELO
export const CELO_MAINNET = getLocalRPC(CELO_MAIN_CHAINID, 'https://forno.celo.org')
export const CELO_MAIN_EXPLORER = 'https://explorer.celo.org'

const symbol = 'CELO'


export default {
  [CELO_MAIN_CHAINID]: {
    multicalToken: '0xC43E77E8641d41028785779Df0F3D021bD54a1d6',
    nodeRpc: CELO_MAINNET,
    nodeRpcList: [
      CELO_MAINNET,
    ],
    chainID: CELO_MAIN_CHAINID,
    lookHash: CELO_MAIN_EXPLORER + '/tx/',
    lookAddr: CELO_MAIN_EXPLORER + '/address/',
    lookBlock: CELO_MAIN_EXPLORER + '/block/',
    explorer: CELO_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Celo',
    networkName: 'Celo mainnet',
    walletName: 'Celo Mainnet',
    type: 'main',
    label: CELO_MAIN_CHAINID,
  },
}