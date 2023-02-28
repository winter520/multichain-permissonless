import config from "@/config"
import {
  USE_VERSION,
  VERSION
} from "@/config/constant"

const navVersion = {
  [VERSION.V1]: [
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
  ],
  [VERSION.USDC_DEMO]: [
    {
      path: '/usdc',
      textKey: 'USDC',
      regex: /\/usdc/,
      isOutLink: false,
      isView: config.controlConfig[USE_VERSION].isOpenUSDC,
    },
    {
      path: 'https://usdcfaucet.com/',
      textKey: 'USDC Faucet',
      regex: '',
      isOutLink: true,
      isView: 1,
    },
  ],
  [VERSION.ZK_DEMO]: [
    {
      path: '/zkrouter',
      textKey: 'zkRouter',
      regex: /^\/zkrouter$/,
      isOutLink: false,
      isView: 1,
    },
    {
      path: '/zkrouter/claim',
      textKey: 'Claim',
      regex: /^\/zkrouter\/claim$/,
      isOutLink: false,
      isView: 1,
    },
  ]
}

export const navList = navVersion[USE_VERSION]

const moreVersion = {
  [VERSION.V1]: [
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
  ],
  [VERSION.USDC_DEMO]: [],
  [VERSION.ZK_DEMO]: [],
}

export const moreList = moreVersion[USE_VERSION]