import React, {useCallback, useMemo, useRef, useState, createRef} from 'react'
import { 
  Button,
  Modal,
  Input,
  styled
} from "@nextui-org/react";
import {
  useActiveReact
} from '@/hooks/useActiveReact'

import config from '@/config';
import {
  CHAIN_TYPE
} from '@/config/constant'
import {
  spportChainArr
} from '@/config/chainConfig'

import {
  useModalOpen,
  useNetworkModalToggle
} from "@/state/application/hooks"
import {
  ApplicationModal,
} from "@/state/application/actions"
import {
  useStarChain,
  useUserSelectChainId,
  useChangeStarTab
} from "@/state/user/hooks"

import { t } from 'i18next';

import {LazyList} from "@/components/Lazyload/LazyList"
import Loading from "@/components/Lazyload/Loading"

import {
  useLoginEvm
} from "@/chains/evm"

const NetWorkList = styled('div',{
  width:"100%",
  overflow: "auto"
})

const LoadingBox = styled('div')

const OptionCardClickable = styled('div', {
  width: '100%',
  variants: {
    size: {
      mysize: {
        height: '$12', // space[12]
        borderRadius: '$xs' // radii.xs
      }
    },
    color: {
      mycolor: {
        background: '$purple800', // colors.green800
        color: '$purple100', 
        border: '$space$1 solid transparent',
        '&:hover': {
          background: '$purple100',
          color: '$purple800',
        },
        '&:active': {
          background: '$purple200',
        },
        '&:focus': {
          borderColor: '$purple400',
        },
      }
    }
  }
});

function Option ({
  curChainId,
  selectChainId,
  changeNetwork
}: {
  curChainId:any,
  selectChainId:any,
  changeNetwork: (value:any) => void
}) {
  return <>

  </>
}

function ChainListBox ({
  useChainId,
  openUrl,
  searchQuery,
  selectTab,
  size
}: {
  useChainId: any
  openUrl: (value:any) => void
  searchQuery: any
  selectTab: any
  size?: number
}) {
  const pageSize = size || 20
  const boxRef = createRef<any>()
  const watchRef = createRef<any>()
  const {starChainList} = useStarChain()

  const comparator = (a:any, b:any) => {
    if (a.networkName > b.networkName) {
      return 1
    }
    return -1
  }

  const chainList = useMemo(() => {
    const arr:any = []
    // const starArr:any = []
    for (const c of spportChainArr) {
      if (selectTab === 0 && starChainList?.[c]) {
        arr.push(config.chainInfo[c])
      } else if (selectTab === 1) {
        arr.push(config.chainInfo[c])
      } else if (selectTab === 2 && config.chainInfo[c]?.hotType === CHAIN_TYPE.HOT) {
        arr.push(config.chainInfo[c])
      }
    }
    if (selectTab === 0) {
      return arr.sort(comparator)
    } else {
      return arr
    }
  }, [spportChainArr, starChainList, selectTab])

  function List({ records }: { records?: any [] }) {
    return (<>{
      records?.map((item:any, index:any) => {
        if (
          (
            searchQuery
            && item
            && (
              item.name.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
              || item.symbol.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1
              || (item.networkName && item.networkName.toLowerCase().indexOf(searchQuery.toLowerCase()) !== -1)
              || searchQuery.toLowerCase() === item.chainID.toString().toLowerCase()
            )
          )
          || !searchQuery
        ) {
          return (
            <OptionCardClickable key={index} className={ useChainId?.toString() === item?.chainID?.toString()  ? 'active' : ''}>
              <Option curChainId={item.chainID} selectChainId={useChainId} changeNetwork={(val) => {
                openUrl(val)
              }}></Option>
            </OptionCardClickable>
          )
        }
        return
      })
    }
    </>);
  }
  return (
    <>
      <NetWorkList ref={ boxRef }>
        {/* <LazyList records={ spportChainArr } pageSize={ pageSize } */}
        <LazyList records={ chainList } pageSize={ pageSize } boxRef={ boxRef } watchRef={ watchRef } list={ List }>
          <LoadingBox ref={ watchRef }>
            <Loading></Loading>
          </LoadingBox>
        </LazyList>
      </NetWorkList>
    </>
  )
}

export default function SelectNetwork () {
  const {chainId} = useActiveReact()
  const {starTabIndex, onChangeStarTab} = useChangeStarTab('CHAIN')
  const networkModalOpen = useModalOpen(ApplicationModal.NETWORK)
  const toggleNetworkModal = useNetworkModalToggle()
  const {loginEvm} = useLoginEvm()

  const {selectNetworkInfo, setUserSelectNetwork} = useUserSelectChainId()
  const [searchQuery, setSearchQuery] = useState<string>('')

  const inputRef = useRef<HTMLInputElement>()
  const useChainId = useMemo(() => {
    // const hrefPath = window.location.pathname
    // if (selectNetworkInfo && hrefPath.indexOf('/' + selectNetworkInfo?.label?.toLowerCase()) !== -1) {
    if (selectNetworkInfo?.chainId) {
      return selectNetworkInfo?.chainId
    }
    return chainId
  }, [selectNetworkInfo, chainId])
  function openUrl (item:any) {
    if (item?.chainType && item?.chainType !== 'EVM') {
      if (setUserSelectNetwork) {
        setUserSelectNetwork({
          chainId: item.chainID,
          label: item?.chainType
        })
      }
      toggleNetworkModal()
    } else {
      loginEvm()
    }
  }
  const handleInput = useCallback((event:any) => {
    const input = event.target.value
    setSearchQuery(input)
    // fixedList.current?.scrollTo(0)
  }, [])
  return <>
    <Modal
      scroll
      closeButton
      // width="600px"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      open={networkModalOpen}
    >
      <Modal.Header>
        {/* <Text id="modal-title" size={18}>
          Modal with a lot of content
        </Text> */}
        <Input size="lg" clearable placeholder={t("selectNetwork") ?? ''} onChange={handleInput} />
      </Modal.Header>
      <Modal.Body>
        <ChainListBox
          useChainId={useChainId}
          openUrl={openUrl}
          searchQuery={searchQuery}
          selectTab={starTabIndex}
        />
      </Modal.Body>
      <Modal.Footer>
        {/* <Button auto flat color="error" onPress={() => setVisible(false)}>
          Close
        </Button>
        <Button auto onPress={() => setVisible(false)}>
          Agree
        </Button> */}
      </Modal.Footer>
    </Modal>
  </>
}