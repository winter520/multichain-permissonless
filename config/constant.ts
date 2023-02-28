
export enum VERSION {
  V1 = 'MULTICHAIN',
  V1_TEST = 'MULTICHAIN_TEST',
  USDC_DEMO = 'USDC_DEMO',
  ZK_DEMO = 'ZK_DEMO',
}

export enum CHAIN_TYPE {
  HOT = 'HOT',
  COMMON = 'COMMON'
}
export const isBrowser = (() => typeof window !== 'undefined')()
// export const INIT_VERSION = VERSION.V1
// export const INIT_VERSION = VERSION.USDC_DEMO
export const INIT_VERSION = VERSION.ZK_DEMO
// export const INIT_VERSION = VERSION.V7_BAS_TEST

function getUrlVersion (init:any) {
  const url = isBrowser ? window.location.href : ''
  let version:any
  if (url.indexOf('https://stable.anyswap.exchange') === 0) {
    version = VERSION.V1
  } else if (url.indexOf('https://router.anyswap.exchange') === 0) {
    version = VERSION.V1
  } else if (url.indexOf('https://oec.anyswap.exchange') === 0) {
    version = VERSION.V1
  } else if (url.indexOf('https://movr.anyswap.exchange') === 0) {
    version = VERSION.V1
  } else if (
    url.indexOf('https://app.anyswap.exchange') === 0
    || url.indexOf('https://anyswap.exchange') === 0
  ) {
    version = VERSION.V1
  } else if (url.indexOf('https://arb.anyswap.exchange') === 0) {
    version = VERSION.V1
  } else if (url.indexOf('https://nft.anyswap.exchange') === 0) {
    version = VERSION.V1
  } else if (url.indexOf('https://nfttest.anyswap.exchange') === 0) {
    version = VERSION.V1
  } else if (
    url.indexOf('https://app.multichain.org') === 0
    || url.indexOf('https://bridge.multichain.org') === 0
    || url.indexOf('https://conflux.multichain.org') === 0
    || url.indexOf('https://app.multichain.tools') === 0
    || url.indexOf('https://conflux.multichain.tools') === 0
  ) {
    version = VERSION.V1
  } else if (url.indexOf('https://test.multichain.org') === 0) {
    version = VERSION.V1
  } else if (url.indexOf('https://bas.multichain.org') === 0) {
    version = VERSION.V1
  } else {
    version = init
  }
  return version
}
export const USE_VERSION:any = getUrlVersion(INIT_VERSION)

// export const MAIN_COIN = ['USDC', 'ETH', 'ETHK', 'DAI', 'WBTC', 'USDT', 'MIM', 'BTC', 'BTCB', 'USDC.e', 'WBTC.e', 'WETH', 'fUSDT', 'USDD_t', 'MAI']
export const MAIN_COIN_SORT:any = {
  'ETH': {sort: 1},
  'ETHK': {sort: 1},
  'WETH': {sort: 2},
  'BTC': {sort: 3},
  'WBTC': {sort: 3},
  'WBTC.e': {sort: 3},
  'BTCB': {sort: 3},
  'USDC': {sort: 4},
  'USDC.e': {sort: 4},
  'USDT': {sort: 5},
  'USDt': {sort: 5},
  'fUSDT': {sort: 5},
  'DAI': {sort: 6},
  'MIM': {sort: 7},
  'MAI': {sort: 8},
  'BUSD': {sort: 9},
}

export const bridgeApi = USE_VERSION === VERSION.V1 ? 'https://l2api.anyswap.exchange' : 'https://bridgeapi.anyswap.exchange'
export const scanApi = USE_VERSION === VERSION.V1 ? 'https://l2api.anyswap.exchange' : 'https://scanapi.multichain.org'
export const multiBridgeApi = USE_VERSION === VERSION.V1 ? 'https://l2api.anyswap.exchange' : 'https://bridgeapi.multichain.org'

export const explorer = 'https://scan.multichain.org'

export const ENV_NODE_CONFIG = USE_VERSION + '_ENV_NODE_CONFIG'

export const controlConfig:any = {
  [VERSION.V1]: {
    hiddenCoin: [],
    hiddenChain: [],
    showCoin: [],
    showChain: [],
    initNode: '56',
    isOpenRouter: 1,
    tokenlistUrl: 'https://l2api.anyswap.exchange/v4/tokenlistV4'
  },
  [VERSION.USDC_DEMO]: {
    hiddenCoin: [],
    hiddenChain: [],
    showCoin: [],
    showChain: [],
    initNode: '5',
    isOpenRouter: 0,
    isOpenUSDC: 1,
    tokenlistUrl: 'https://l2api.anyswap.exchange/v4/tokenlist/usdc'
  },
  [VERSION.ZK_DEMO]: {
    hiddenCoin: [],
    hiddenChain: [],
    showCoin: [],
    showChain: [],
    initNode: '5',
    isOpenRouter: 0,
    isOpenUSDC: 1,
    tokenlistUrl: 'https://l2api.anyswap.exchange/v4/tokenlist/zk'
  },
}
export const initConfig = controlConfig[USE_VERSION]

export const INIT_NODE = initConfig.initNode

export const END_STATUS = [1, 3, 10, 16,-2, -3]
