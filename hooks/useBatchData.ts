// import { Interface } from '@ethersproject/abi'
import ERC20_ABI from '@/config/abi/erc20.json'
import multicallABI from '@/config/abi/multicall.json'
import config from '@/config'

const Web3 = require('web3')

const TIMEOUT = 'timeout'

export function getWeb3 ({rpc, provider}: {rpc?:string, provider?:any}) {
  rpc = rpc ? rpc : ''
  if (provider) {
    // console.log(library)
    const wFn = new Web3(provider)
    // console.log(wFn)
    return wFn
  } else {
    // console.log(rpc)
    const wFn = new Web3(new Web3.providers.HttpProvider(rpc))
    return wFn
  }
}

export function getContract({abi, rpc, provider}:any) {
  const web3 = getWeb3({rpc, provider})
  abi = abi ? abi : ERC20_ABI
  return new web3.eth.Contract(abi)
}

function timeoutWeb3 () {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(TIMEOUT)
    }, 1000 * 60)
  })
}


function getBatchWeb3Data ({rpc, calls, provider}:any) {
  return new Promise((resolve, reject) => {
    const web3 = getWeb3({rpc, provider})
    const batch = new web3.BatchRequest()
    // console.log(calls)
    for (const obj of calls) {
      if (obj.callData) {
        batch.add(web3.eth.call.request({data: obj.callData, to: obj.target}, 'latest'))
      } else {
        const property = obj.property ? obj.property : 'eth'
        batch.add(web3[property][obj.methods].request(...obj.input))
      }
    }
    batch.add(web3['eth']['getBlockNumber'].request())
    batch.requestManager.sendBatch(batch.requests, (err:any, res:any) => {
      if (err) {
        reject(err)
      } else {
        // console.log(res)
        const len = res.length
        const arr = res.splice(0, len - 1).map(({result}:any) => (result))
        // console.log(arr)
        resolve({returnData: arr, blockNumber: res[len - 1]})
      }
    })
  })
}

export function getMulticallData ({chainId, rpc, calls, provider}:any) {
  return new Promise((resolve, reject) => {
    const contract = getContract({abi: multicallABI, rpc: rpc, provider})
    contract.options.address = config.chainInfo[chainId].multicalToken
    // console.log(chainId)
    // console.log(rpc)
    // console.log(calls)
    // console.log(provider)
    const arr = []
    for (const obj of calls) {
      if (obj.target) {
        arr.push({
          target: obj.target,
          callData: obj.callData
        })
      } else {
        if (obj.methods === 'getBalance') {
          // contract.methods.getEthBalance(...obj.input)
          arr.push({
            target: config.chainInfo[chainId].multicalToken,
            callData: contract.methods.getEthBalance(...obj.input).encodeABI()
          })
        }
      }
    }
    // arr.push({
    //   target: config.chainInfo[chainId].multicalToken,
    //   callData: contract.methods.getEthBalance('0xC03033d8b833fF7ca08BF2A58C9BC9d711257249').encodeABI()
    // })
    contract.methods.aggregate(arr).call((err:any, res:any) => {
      // console.log(res)
      if (err) {
        // console.log(err)
        // console.log(calls)
        reject(err)
      } else {
        // resolve(res.returnData)
        resolve({returnData: res.returnData, blockNumber: res.blockNumber})
      }
    })
  })
}

function getBatchResult ({chainId, rpc, calls, provider}:any) {
  return new Promise((resolve, reject) => {
    // console.log(config.chainInfo[chainId].multicalToken)
    // console.log(calls)
    const useMethods = config.chainInfo[chainId].multicalToken ? getMulticallData : getBatchWeb3Data
    // const useMethods = getBatchWeb3Data
    Promise.race([
      timeoutWeb3(),
      useMethods({chainId, rpc, calls, provider})
    ]).then(res => {
      if (res === TIMEOUT) {
        reject(res)
      } else {
        resolve(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

const useNode:any = {}

export async function useBatchData ({chainId, calls, provider}:any) {
  if (isNaN(chainId)) return undefined
  const rpcArr = config.chainInfo[chainId].nodeRpcList
  const len = rpcArr.length - 1
  if (!useNode[chainId]) {
    useNode[chainId] = {
      rpc: rpcArr[0],
      index: 0
    }
  }
  let index = useNode[chainId].index
  const rpc = rpcArr[useNode[chainId].index]
  let results:any = ''
  try {
    results = await getBatchResult({chainId, rpc, calls, provider})
  } catch (error:any) {
    console.log('error')
    console.log(error.toString())
    if ( error.toString().indexOf('Error: Returned error: execution reverted: Multicall aggregate: call failed') !== -1) {
      // logger.error(error.toString(), 11111)
      results = ''
    } else if (
      error.toString().indexOf('Invalid JSON RPC response') !== -1
      || error.toString().indexOf('Error: Returned error') !== -1
      || error === TIMEOUT
    ) {
      if (index < len && !provider) {
        index ++
        useNode[chainId] = {
          rpc: rpcArr[index],
          index: index
        }
        results = await useBatchData({chainId, calls, provider})
      } else {
        useNode[chainId] = {
          rpc: rpcArr[0],
          index: 0
        }
      }
    } else {
      results = error
    }
  }
  // console.log(results)
  return results
}


/*
[
  {
    callData: '',
    target: '',
    methods: '',
    input: []
  }
]
*/
// useBatchWeb3('56', [
//   {
//     data: '',
//     to: '',
//     property: 'eth',
//     methods: 'getTransactionReceipt',
//     inputFormatter: ['0x17405c1d0284d7a44b42a255b66ec35c6e1fe47f1e9bbd7f6ce31fe126b85792']
//   },
//   {
//     data: '',
//     to: '',
//     property: 'eth',
//     methods: 'getTransaction',
//     inputFormatter: ['0x17405c1d0284d7a44b42a255b66ec35c6e1fe47f1e9bbd7f6ce31fe126b85792']
//   }
// ]).then(res => {
//   console.log('res1')
//   console.log(res)
// })

// export {
//   getWeb3,
//   useBatchData,
//   getContract
// }