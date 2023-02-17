import config from "@/config"
import {
  USE_VERSION
} from "@/config/constant"
export const navList = [
  {
    path: '/router',
    textKey: 'router',
    regex: /\/router/,
    isOutLink: false,
    isView: config.controlConfig[USE_VERSION].isOpenRouter,
  },
  {
    path: '/pool',
    textKey: 'pool',
    regex: /\/pool/,
    isOutLink: false,
    isView: config.controlConfig[USE_VERSION].isOpenRouter,
    isActive: ['/add', '/remove']
  },
  {
    path: '/usdc',
    textKey: 'USDC',
    regex: /\/usdc/,
    isOutLink: false,
    isView: config.controlConfig[USE_VERSION].isOpenUSDC,
  },
  {
    path: '/vest',
    textKey: 'veMULTI',
    regex: /\/vest/,
    isOutLink: false,
    isView: 1,
  },
  {
    path: '/nft',
    textKey: 'nftrouter',
    regex: /\/nft/,
    isOutLink: false,
    isView: 1,
  },
  {
    path: '/gasswap',
    textKey: 'gasswap',
    regex: /\/gasswap/,
    isOutLink: false,
    isView: 1,
  },
  {
    path: '/history',
    textKey: 'history',
    regex: /\/history/,
    isOutLink: false,
    isView: 1,
  },
]

export const moreList = [
  {
    path: '/multi',
    textKey: 'MULTI',
    regex: /\/multi/,
    isOutLink: false,
    isView: 1,
  },
  {
    path: 'https://anycall.multichain.org/',
    textKey: 'anyCall',
    regex: '',
    isOutLink: true,
    isView: 1,
  },
  {
    path: "https://scan.multichain.org/",
    textKey: 'explorer',
    regex: '',
    isOutLink: true,
    isView: 1,
  },
  {
    path: 'https://multichain.zendesk.com/hc/en-us',
    textKey: 'support',
    regex: '',
    isOutLink: true,
    isView: 1,
  },
]