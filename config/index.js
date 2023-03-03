import {
  chainInfo
} from '@/config/chainConfig'
import {
  isBrowser,
  bridgeApi,
  multiBridgeApi,
  controlConfig,
  initConfig,
  explorer
} from '@/config/constant'
// const isBrowser = () => typeof window !== 'undefined'

const config = {
  isBrowser,
  chainInfo,
  bridgeApi,
  multiBridgeApi,
  controlConfig,
  initConfig,
  explorer
}

export default config