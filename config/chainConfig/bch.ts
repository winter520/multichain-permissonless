import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const BCH_MAIN_CHAINID = ChainId.BCH
export const BCH_MAINNET = getLocalRPC(BCH_MAIN_CHAINID, 'https://global.uat.cash')
export const BCH_MAIN_EXPLORER = 'https://sonar.cash'

const symbol = 'BCH'


export default {
  [BCH_MAIN_CHAINID]: {
    multicalToken: '0xeFAeeE334F0Fd1712f9a8cc375f427D9Cdd40d73',
    nodeRpc: BCH_MAINNET,
    nodeRpcList: [
      BCH_MAINNET,
      'https://smartbch.devops.cash/mainnet',
      'https://smartbch.greyh.at',
      'https://smartbch.fountainhead.cash/mainnet',
    ],
    chainID: BCH_MAIN_CHAINID,
    lookHash: BCH_MAIN_EXPLORER + '/tx/',
    lookAddr: BCH_MAIN_EXPLORER + '/address/',
    lookBlock: BCH_MAIN_EXPLORER + '/block/',
    explorer: BCH_MAIN_EXPLORER,
    symbol: symbol,
    name: 'sBCH',
    networkName: 'sBCH mainnet',
    walletName: 'Smart Bitcoin Cash',
    type: 'main',
    label: BCH_MAIN_CHAINID,
  },
}