import {
  chainInfo
} from '@/config/chainConfig'
import {
  isBrowser,
  bridgeApi,
  controlConfig
} from '@/config/constant'
// const isBrowser = () => typeof window !== 'undefined'

const config = {
  isBrowser,
  chainInfo,
  bridgeApi,
  controlConfig
}

export default config