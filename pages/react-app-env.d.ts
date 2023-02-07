interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
  }
  okexchain:any
  tronWeb:any
  tronLink:any
  web3?: {}
  returnCitySN?: {},
  near: any,
  mozIndexedDB: any
  webkitIndexedDB: any
  msIndexedDB: any
  webkitIDBTransaction: any
  msIDBTransaction: any
  webkitIDBKeyRange: any
  msIDBKeyRange: any
  freighterApi: any
  xfi: any
  cardano: any
  typhon: any
  typhoncip30: any
  solana: any
  bitkeep: any
  aptos: any
  bitcoin: any
  providerManager: any
  tally: any
  keplr: any
  getOfflineSigner: any
  NasExtWallet: any
}
declare const __DEV__: boolean;