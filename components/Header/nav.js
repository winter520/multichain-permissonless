
export const navList = [
  {
    path: '/router',
    textKey: 'router',
    regex: /\/router/,
    className: 'otherInfo',
    isOutLink: false,
    isView: 1,
  },
  {
    path: '/pool',
    textKey: 'pool',
    regex: /\/pool/,
    className: 'otherInfo',
    isOutLink: false,
    isView: 1,
    isActive: ['/add', '/remove']
  },
  {
    path: '/vest',
    textKey: 'veMULTI',
    regex: /\/vest/,
    className: 'otherInfo',
    isOutLink: false,
    isView: 1,
  },
  {
    path: '/nft',
    textKey: 'nftrouter',
    regex: /\/nft/,
    className: 'otherInfo',
    isOutLink: false,
    isView: 1,
  },
  {
    path: '/gasswap',
    textKey: 'gasswap',
    regex: /\/gasswap/,
    className: 'otherInfo',
    isOutLink: false,
    isView: 1,
  },
  {
    path: '/history',
    textKey: 'history',
    regex: /\/history/,
    className: 'otherInfo',
    isOutLink: false,
    isView: 1,
  },
]

export const moreList = [
  {
    path: '/multi',
    textKey: 'MULTI',
    regex: /\/multi/,
    className: 'otherInfo',
    isOutLink: false,
    isView: 1,
  },
  {
    path: 'https://anycall.multichain.org/',
    textKey: 'anyCall',
    regex: '',
    className: 'otherInfo',
    isOutLink: true,
    isView: 1,
  },
  {
    path: "https://scan.multichain.org/",
    textKey: 'explorer',
    regex: '',
    className: 'otherInfo',
    isOutLink: true,
    isView: 1,
  },
  {
    path: 'https://multichain.zendesk.com/hc/en-us',
    textKey: 'support',
    regex: '',
    className: 'otherInfo',
    isOutLink: true,
    isView: 1,
  },
]