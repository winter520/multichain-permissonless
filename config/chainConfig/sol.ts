// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

// export const SOL_MAINNET = 'https://api.mainnet-beta.solana.com'
export const SOL_MAINNET = 'https://rpc.ankr.com/solana'
export const SOL_MAIN_CHAINID = ChainId.SOL
export const SOL_MAIN_EXPLORER = 'https://solscan.io'

export const SOL_TESTNET = 'https://api.testnet.solana.com'
export const SOL_TEST_CHAINID = ChainId.SOL_TEST
export const SOL_TEST_EXPLORER = 'https://solana.fm'

const symbol = 'SOL'


export default {
  [SOL_MAIN_CHAINID]: {
    multicalToken: '',
    nodeRpc: SOL_MAINNET,
    nodeRpcList: [],
    chainID: SOL_MAIN_CHAINID,
    lookHash: SOL_MAIN_EXPLORER + '/tx/',
    lookAddr: SOL_MAIN_EXPLORER + '/account/',
    lookBlock: SOL_MAIN_EXPLORER + '/block/',
    explorer: SOL_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Solana',
    networkName: 'Solana mainnet',
    networkLogo: 'SOL',
    type: 'main',
    label: SOL_MAIN_CHAINID,
    chainType: SOL_MAIN_CHAINID
  },
  [SOL_TEST_CHAINID]: {
    multicalToken: '',
    nodeRpc: SOL_TESTNET,
    chainID: SOL_TEST_CHAINID,
    nodeRpcList: [],
    lookHash: SOL_TEST_EXPLORER + '/tx/',
    lookAddr: SOL_TEST_EXPLORER + '/address/',
    lookBlock: SOL_TEST_EXPLORER + '/block/',
    explorer: SOL_TEST_EXPLORER,
    symbol: symbol,
    name: 'Solana',
    networkName: 'Solana testnet',
    networkLogo: 'SOL',
    type: 'test',
    label: SOL_TEST_CHAINID,
    chainType: SOL_TEST_CHAINID
  },
}