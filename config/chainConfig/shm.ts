import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

// export const SHM_MAIN_CHAINID = ChainId.SHM
// export const SHM_MAINNET = getLocalRPC(SHM_MAIN_CHAINID, 'https://v1.mainnet.godwoken.io/rpc')
// export const SHM_MAIN_EXPLORER = 'https://gw-mainnet-explorer.nervosdao.community'

export const SHM_TEST_CHAINID = ChainId.SHM_TEST
export const SHM_TESTNET = getLocalRPC(SHM_TEST_CHAINID, 'https://liberty10.shardeum.org/')
export const SHM_TEST_EXPLORER = 'https://explorer-liberty10.shardeum.org'

const symbol = 'SHM'


export default {
  // [SHM_MAIN_CHAINID]: {
  //   multicalToken: '0x218c3c3D49d0E7B37aff0D8bB079de36Ae61A4c0',
  //   nodeRpc: SHM_MAINNET,
  //   nodeRpcList: [
  //     SHM_MAINNET,
  //   ],
  //   chainID: SHM_MAIN_CHAINID,
  //   lookHash: SHM_MAIN_EXPLORER + '/tx/',
  //   lookAddr: SHM_MAIN_EXPLORER + '/address/',
  //   lookBlock: SHM_MAIN_EXPLORER + '/block/',
  //   explorer: SHM_MAIN_EXPLORER,
  //   symbol: symbol,
  //   name: 'Shardeum',
  //   networkName: 'Shardeum mainnet',
  //   type: 'main',
  //   label: SHM_MAIN_CHAINID,
  // },
  [SHM_TEST_CHAINID]: {
    multicalToken: '',
    nodeRpc: SHM_TESTNET,
    nodeRpcList: [
      SHM_TESTNET,
    ],
    chainID: SHM_TEST_CHAINID,
    lookHash: SHM_TEST_EXPLORER + '/transaction/',
    lookAddr: SHM_TEST_EXPLORER + '/account/',
    lookBlock: SHM_TEST_EXPLORER + '/block/',
    explorer: SHM_TEST_EXPLORER,
    symbol: symbol,
    name: 'Shardeum',
    networkName: 'Shardeum testnet',
    walletName: 'Shardeum Liberty 1.6',
    type: 'test',
    label: SHM_TEST_CHAINID,
  },
}