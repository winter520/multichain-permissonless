import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

// export const BAS_MAIN_CHAINID = ChainId.BAS
// export const BAS_MAINNET = process.env.NODE_ENV === 'development' ? getLocalRPC(BAS_MAIN_CHAINID, useNode) : getLocalRPC(BAS_MAIN_CHAINID, 'https://bscnode1.anyswap.exchange')
// export const BAS_MAIN_EXPLORER = 'https://bscscan.com'

export const BAS_TEST_CHAINID = ChainId.BAS_TEST
export const BAS_TESTNET = getLocalRPC(BAS_TEST_CHAINID, 'https://rpc.dev-01.bas.ankr.com/')
export const BAS_TEST_EXPLORER = 'https://explorer.dev-01.bas.ankr.com/'

const symbol = 'BAS'

export default {
  // [BAS_MAIN_CHAINID]: {
  //   multicalToken: '0xa9193376D09C7f31283C54e56D013fCF370Cd9D9',
  //   nodeRpc: BAS_MAINNET,
  //   nodeRpcList: [
    
  //   ],
  //   chainID: BAS_MAIN_CHAINID,
  //   lookHash: BAS_MAIN_EXPLORER + '/tx/',
  //   lookAddr: BAS_MAIN_EXPLORER + '/address/',
  //   lookBlock: BAS_MAIN_EXPLORER + '/block/',
  //   explorer: BAS_MAIN_EXPLORER,
  //   symbol: symbol,
  //   symbolName: 'Binance',
  //   name: 'BAS CHAIN',
  //   networkName: 'BAS CHAIN mainnet',
  //   type: 'main',
  //   label: BAS_MAIN_CHAINID,
  // },
  [BAS_TEST_CHAINID]: {
    multicalToken: '0xC43E77E8641d41028785779Df0F3D021bD54a1d6',
    nodeRpc: BAS_TESTNET,
    nodeRpcList: [
      BAS_TESTNET
    ],
    chainID: BAS_TEST_CHAINID,
    lookHash: BAS_TEST_EXPLORER + '/tx/',
    lookAddr: BAS_TEST_EXPLORER + '/address/',
    lookBlock: BAS_TEST_EXPLORER + '/block/',
    explorer: BAS_TEST_EXPLORER,
    symbol: symbol,
    name: 'BAS',
    networkName: 'BAS testnet',
    type: 'test',
    label: BAS_TEST_CHAINID,
  }
}