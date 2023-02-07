import {getLocalRPC} from './methods'
import {
  // VERSION,
  // USE_VERSION,
  CHAIN_TYPE,
  isBrowser
} from '../constant'
import {ChainId} from './chainId'

const navLang = isBrowser ? navigator.language : false

export const ETH_MAIN_CHAINID = ChainId.ETH
// export const ETH_MAINNET = process.env.NODE_ENV === 'development' ? getLocalRPC(ETH_MAIN_CHAINID, process.env.REACT_APP_NETWORK_URL) : getLocalRPC(ETH_MAIN_CHAINID, 'https://ethmainnet.anyswap.exchange')
// export const ETH_MAINNET = process.env.NODE_ENV === 'development' ? getLocalRPC(ETH_MAIN_CHAINID, 'https://rpc.ankr.com/eth') : getLocalRPC(ETH_MAIN_CHAINID, 'https://ethmainnet.anyswap.exchange')
export const ETH_MAINNET = getLocalRPC(ETH_MAIN_CHAINID, 'https://rpc.ankr.com/eth')
// export const ETH_MAINNET = getLocalRPC(ETH_MAIN_CHAINID, 'https://ethmainnet.anyswap.exchange')
export const ETH_MAIN_EXPLORER = navLang === 'zh-CN' ? 'https://cn.etherscan.com' : 'https://etherscan.io'

export const ETH_TEST_CHAINID = ChainId.RINKEBY
export const ETH_TESTNET = getLocalRPC(ETH_TEST_CHAINID, 'https://rinkeby.infura.io/v3/613a4ccfe37f4870a2c3d922e58fa2bd')
export const ETH_TEST_EXPLORER = 'https://rinkeby.etherscan.io'

export const ETH_TEST1_CHAINID = ChainId.GOERLI
export const ETH_TEST1NET = getLocalRPC(ETH_TEST1_CHAINID, 'https://goerli.infura.io/v3/613a4ccfe37f4870a2c3d922e58fa2bd')
export const ETH_TEST1_EXPLORER = 'https://goerli.etherscan.io'

const symbol = 'ETH'

export default {
  [ETH_MAIN_CHAINID]: {
    multicalToken: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
    nodeRpc: ETH_MAINNET,
    nodeRpcList: [
      ETH_MAINNET
    ],
    chainID: ETH_MAIN_CHAINID,
    lookHash: ETH_MAIN_EXPLORER + '/tx/',
    lookAddr: ETH_MAIN_EXPLORER + '/address/',
    lookBlock: ETH_MAIN_EXPLORER + '/block/',
    explorer: ETH_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Ethereum',
    networkName: 'Ethereum mainnet',
    walletName: 'Ethereum Mainnet',
    type: 'main',
    label: ETH_MAIN_CHAINID,
    hotType: CHAIN_TYPE.HOT
  },
  [ETH_TEST_CHAINID]: {
    multicalToken: '0x42Ad527de7d4e9d9d011aC45B31D8551f8Fe9821',
    nodeRpc: ETH_TESTNET,
    nodeRpcList: [
      ETH_TESTNET,
      'https://rinkeby.infura.io/v3/613a4ccfe37f4870a2c3d922e58fa2bd',
      'https://rinkeby.infura.io/v3/0e40cfd5e7a64b2d9aea8427e4bd52a0'
    ],
    chainID: ETH_TEST_CHAINID,
    lookHash: ETH_TEST_EXPLORER + '/tx/',
    lookAddr: ETH_TEST_EXPLORER + '/address/',
    lookBlock: ETH_TEST_EXPLORER + '/block/',
    explorer: ETH_TEST_EXPLORER,
    symbol: symbol,
    name: 'Rinkeby',
    networkName: 'ETH rinkeby',
    walletName: 'Rinkeby',
    type: 'test',
    label: ETH_TEST_CHAINID,
  },
  [ETH_TEST1_CHAINID]: {
    multicalToken: '0x5BA1e12693Dc8F9c48aAD8770482f4739bEeD696',
    nodeRpc: ETH_TEST1NET,
    nodeRpcList: [
      ETH_TEST1NET
    ],
    chainID: ETH_TEST1_CHAINID,
    lookHash: ETH_TEST1_EXPLORER + '/tx/',
    lookAddr: ETH_TEST1_EXPLORER + '/address/',
    lookBlock: ETH_TEST1_EXPLORER + '/block/',
    explorer: ETH_TEST1_EXPLORER,
    symbol: symbol,
    name: 'Goerli',
    networkName: 'ETH Goerli',
    walletName: 'Goerli',
    type: 'test',
    label: ETH_TEST1_CHAINID,
  },
}