
const isBrowser = () => typeof window !== 'undefined'

const config = {
  isBrowser: isBrowser()
}

export default config