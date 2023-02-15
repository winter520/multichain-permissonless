import {
  chainInfo
} from '@/config/chainConfig'
import {
  isBrowser,
  bridgeApi
} from '@/config/constant'
// const isBrowser = () => typeof window !== 'undefined'

const config = {
  isBrowser,
  chainInfo,
  bridgeApi
}

export default config