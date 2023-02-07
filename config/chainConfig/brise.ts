import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const BRISE_MAIN_CHAINID = ChainId.BRISE
export const BRISE_MAINNET = getLocalRPC(BRISE_MAIN_CHAINID, 'https://rpc.icecreamswap.com')
export const BRISE_MAIN_EXPLORER = 'https://brisescan.com'

// export const BRISE_TEST_CHAINID = ChainId.BRISE_TEST
// export const BRISE_TESTNET = getLocalRPC(BRISE_TEST_CHAINID, 'BRISEtps://BRISEtp-testnet.hecochain.com')
// export const BRISE_TEST_EXPLORER = 'BRISEtps://testnet.hecoinfo.com'

const symbol = 'BRISE'

export default {
  [BRISE_MAIN_CHAINID]: {
    multicalToken: '',
    nodeRpc: BRISE_MAINNET,
    nodeRpcList: [
      BRISE_MAINNET,
      'https://serverrpc.com/',
      'https://rpc-bitgert-vefi.com/',
      'https://chainrpc.com/',
    ],
    chainID: BRISE_MAIN_CHAINID,
    lookHash: BRISE_MAIN_EXPLORER + '/tx/',
    lookAddr: BRISE_MAIN_EXPLORER + '/address/',
    lookBlock: BRISE_MAIN_EXPLORER + '/block/',
    explorer: BRISE_MAIN_EXPLORER,
    symbol: symbol,
    name: 'Bitgert',
    networkName: 'Bitgert mainnet',
    walletName: 'Bitgert Mainnet',
    type: 'main',
    label: BRISE_MAIN_CHAINID,
  },
  // [BRISE_TEST_CHAINID]: {
  //   multicalToken: '',
  //   nodeRpc: BRISE_TESTNET,
  //   nodeRpcList: [
  //     BRISE_TESTNET,
  //   ],
  //   chainID: BRISE_TEST_CHAINID,
  //   lookHash: BRISE_TEST_EXPLORER + '/tx/',
  //   lookAddr: BRISE_TEST_EXPLORER + '/address/',
  //   lookBlock: BRISE_TEST_EXPLORER + '/block/',
  //   explorer: BRISE_TEST_EXPLORER,
  //   symbol: symbol,
  //   name: 'Bitgert',
  //   networkName: 'Bitgert testnet',
  //   type: 'test',
  //   label: BRISE_TEST_CHAINID,
  // },
}