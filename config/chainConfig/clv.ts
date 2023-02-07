import {getLocalRPC} from './methods'
// import {VERSION, USE_VERSION} from '../constant'
import {ChainId} from './chainId'

export const CLV_MAIN_CHAINID = ChainId.CLV
export const CLV_MAINNET = getLocalRPC(CLV_MAIN_CHAINID, 'https://api-para.clover.finance')
export const CLV_MAIN_EXPLORER = 'https://clvscan.com'


const symbol = 'CLV'


export default {
  [CLV_MAIN_CHAINID]: {
    multicalToken: '0x59346C1143d1dFCa87F4570d4FC4f27c674a1593',
    nodeRpc: CLV_MAINNET,
    nodeRpcList: [
      CLV_MAINNET,
    ],
    chainID: CLV_MAIN_CHAINID,
    lookHash: CLV_MAIN_EXPLORER + '/tx/',
    lookAddr: CLV_MAIN_EXPLORER + '/address/',
    lookBlock: CLV_MAIN_EXPLORER + '/block/',
    explorer: CLV_MAIN_EXPLORER,
    symbol: symbol,
    name: 'CLV Parachain',
    networkName: 'CLV Parachain mainnet',
    walletName: 'CLV Parachain',
    type: 'main',
    label: CLV_MAIN_CHAINID,
  },
}