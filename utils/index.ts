import { Contract } from '@ethersproject/contracts'
import { AddressZero } from '@ethersproject/constants'
import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers'
import config from "@/config"
import {
  isAddress
} from "@/utils/isAddress"

export function getEtherscanLink(
  chainId: any,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {

  switch (type) {
    case 'transaction': {
      const url = config.chainInfo[chainId].lookHash + data
      return url
    }
    case 'token': {
      const url = config.chainInfo[chainId].lookAddr + data
      return url
    }
    case 'block': {
      const url = config.chainInfo[chainId].lookBlock + data
      return url
    }
    case 'address':
    default: {
      const url = config.chainInfo[chainId].lookAddr + data
      return url
    }
  }
}

export function shortenAddress(address: string, chars = 4): string {
  return `${address.substring(0, chars + 2)}...${address.substring(address.length - chars)}`
}

// account is not optional
export function getSigner(library: Web3Provider, account: string): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked()
}

// account is optional
export function getProviderOrSigner(library: Web3Provider, account?: string): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library
}

// account is optional
export function getContract(address: string, ABI: any, library: Web3Provider, account?: string): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`)
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account) as any)
}

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

export function getParams(param: any) {
  const str = window.location.href.indexOf('?') ? window.location.href.split('?')[1] : ''
  if (str) {
    const arr = str.split('&')
    let value = ''
    for (const str2 of arr) {
      const arr2 = str2.split('=')
      if (arr2[0] === param) {
        value = arr2[1]
        break
      }
    }
    return value
  } else {
    return ''
  }
}

export function formatDecimal(num:any, decimal:number) {
  if (isNaN(num)) {
    return num
  }
  const minnum = 1 / Math.pow(10, decimal)
  // console.log(decimal)
  // console.log(minnum)
  if (!num || Number(num) <= 0) {
    return '0.00'
  }
  if (Number(num) < minnum) {
    return '<' + minnum
  }
  // num = (num * 10000).toFixed(decimal) / 10000
  num = num.toString()
  const index = num.indexOf('.')
  if (index !== -1) {
      num = num.substring(0, decimal + index + 1)
  } else {
      num = num.substring(0)
  }
  return Number(parseFloat(num).toFixed(decimal))
}

function thousandBitFormat (num:any, dec:any = 8) {
  const numArr = num.toString().split('.')
  const numInt = numArr[0]
  const numDec = numArr[1] ? numArr[1] : ''
  const numStr = numInt.toString().replace(/\d{1,3}(?=(\d{3})+$)/g,function(s:any){
    return s+','
  })
  if (isNaN(dec)) {

    return numStr + (numDec ? '.' + numDec : '')
  }
  return numStr + (numDec ? '.' + numDec.substr(0,dec) : '')
}

export function thousandBit (num:any, dec:any = 8) {
  if (!Number(num)) return '0.00'
  if (Number(num) < 0.00000001) return '<0.00000001'
  if (Number(num) < 0.01) {
    if (isNaN(dec)) {
      return num
    } else {
      return formatDecimal(num, 6)
    }
  }
  if (Number(num) < 1) {
    if (isNaN(dec)) {
      return num
    } else {
      return formatDecimal(num, 4)
    }
  }
  if (Number(num) < 1000) {
    if (isNaN(dec)) {
      return num
    } else {
      return formatDecimal(num, dec)
    }
  }
  const _num = num = Number(num)
  if (isNaN(num)) {
    num = 0
    num = formatDecimal(num, dec)
  } else {
    num = thousandBitFormat(num, dec)
  }
  if (_num < 0 && num.toString().indexOf('-') < 0) {
    num = '-' + num
  }
  return num
}