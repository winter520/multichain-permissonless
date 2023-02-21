import {
  chainInfo
} from '@/config/chainConfig'
import {
  isBrowser,
  bridgeApi,
  controlConfig,
  initConfig
} from '@/config/constant'
// const isBrowser = () => typeof window !== 'undefined'

const config = {
  isBrowser,
  chainInfo,
  bridgeApi,
  controlConfig,
  initConfig
}

export default config