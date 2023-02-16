import React, {useCallback, useMemo, useRef, useState, createRef} from 'react'
import { 
  Button,
  Modal,
  Input,
  styled,
  Grid,
  Row,
  Col,
  Tooltip,
  Text,
  theme,
  Badge
} from "@nextui-org/react";
import {
  useActiveReact
} from '@/hooks/useActiveReact'
import {
  useSwitchNetworks
} from "@/hooks/useSwitchNetwork"

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
import { Settings, CheckSquare, Star } from 'react-feather'

import {LazyList} from "@/components/Lazyload/LazyList"
import Loading from "@/components/Lazyload/Loading"
import TokenLogo from "@/components/TokenLogo"

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

export const IconButton = styled('button', {
  dflex: 'center',
  border: 'none',
  outline: 'none',
  cursor: 'pointer',
  padding: '0',
  margin: '0',
  bg: 'transparent',
  transition: '$default',
  '&:hover': {
    opacity: '0.8'
  },
  '&:active': {
    opacity: '0.6'
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
  const item = config.chainInfo[curChainId]
  const [viewUrl, setViewUrl] = useState<string>(item.nodeRpc)
  const [viewLoading, setViewLoading] = useState<boolean>(false)
  const [edit, setEdit] = useState(false)

  const {onChangeStarChain, starChainList} = useStarChain()
  // console.log(viewUrl)
  const isActive = useMemo(() => {
    if (
      curChainId
      && selectChainId
      && curChainId.toString() === selectChainId.toString()
    ) return true
    return false
  }, [curChainId, selectChainId])
  return (
    <>
      <Grid.Container
        gap={0}
        justify="center"
        css={{
          padding: '12px 0',
          borderBottom: '1px solid ' + theme.colors.gray200.value,
          cursor: 'pointer'
        }}
      >
        <Grid xs={10} onClick={() => {changeNetwork(item)}}>
          <Row justify="flex-start" align="center" css={{
            width:'100%'
          }}>
            {
              isActive ? <Badge color="success" variant="dot" /> : ''
            }
            <TokenLogo
              symbol={item?.networkLogo ?? item?.symbol}
              size={'md'}
              style={{
                marginRight: '10px'
              }}
            ></TokenLogo>
            {
              edit ? (
                <Input 
                  underlined 
                  placeholder="Please input RPC" 
                  color="secondary"
                  value={viewUrl}
                  onChange={(event:any) => {
                    setViewUrl(event.target.value)
                  }}
                  css={{
                    width:'100%'
                  }}
                />
              ) : (
                <Text>{item.networkName}</Text>
              )
            }
          </Row>
        </Grid>
        <Grid xs={2}>
          <Row justify="center" align="center">
            <Col css={{ d: "flex" }}>
              {
                edit ? (
                  <Tooltip content="Details">
                    <IconButton onClick={() => console.log("View user")}>
                      <CheckSquare size={20} />
                    </IconButton>
                  </Tooltip>
                ) : (
                  <Tooltip content="Edit user">
                    <IconButton onClick={() => setEdit(true)}>
                      <Settings size={20} />
                    </IconButton>
                  </Tooltip>
                )
              }
            </Col>
            <Col css={{ d: "flex" }}>
              <Tooltip
                content="Favorites"
                color={starChainList?.[curChainId] ? 'warning' : 'default'}
                onClick={() => onChangeStarChain(curChainId)}
              >
                <IconButton>
                  <Star size={20}  />
                </IconButton>
              </Tooltip>
            </Col>
          </Row>
        </Grid>
      </Grid.Container>
    </>
  )
}

function ChainListBox ({
  useChainId,
  changeNetwork,
  searchQuery,
  selectTab,
  size
}: {
  useChainId: any
  changeNetwork: (value:any) => void
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
    // console.log(records)
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
                changeNetwork(val)
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
  const {chainId, account} = useActiveReact()
  const {starTabIndex, onChangeStarTab} = useChangeStarTab('CHAIN')
  const networkModalOpen = useModalOpen(ApplicationModal.NETWORK)
  const toggleNetworkModal = useNetworkModalToggle()
  // const {loginEvm} = useLoginEvm()
  const {switchNetwork} = useSwitchNetworks()

  const {selectNetworkInfo, setUserSelectNetwork} = useUserSelectChainId()
  const [searchQuery, setSearchQuery] = useState<string>('')
  // console.log(networkModalOpen)
  // const inputRef = useRef<HTMLInputElement>()
  const useChainId = useMemo(() => {
    // const hrefPath = window.location.pathname
    // if (selectNetworkInfo && hrefPath.indexOf('/' + selectNetworkInfo?.label?.toLowerCase()) !== -1) {
    if (selectNetworkInfo?.chainId) {
      return selectNetworkInfo?.chainId
    }
    return chainId
  }, [selectNetworkInfo, chainId])

  function changeNetwork (item:any) {
    if (item?.chainType && item?.chainType !== 'EVM') {
      if (setUserSelectNetwork) {
        setUserSelectNetwork({
          chainId: item.chainID,
          label: item?.chainType
        })
      }
      toggleNetworkModal()
    } else {
      switchNetwork(item.chainID, 1).then((res:any) => {
        // console.log(res)
        if (res.msg === 'Error') {
          alert(t('changeMetamaskNetwork', {label: item.networkName}))
        } else {
          if (setUserSelectNetwork) {
            setUserSelectNetwork({
              chainId: item.chainID,
              label: item?.chainType ?? item.chainID
            })
          }
        }
        toggleNetworkModal()
      })
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
      onClose={networkModalOpen ? toggleNetworkModal : () => {}}
    >
      <Modal.Header>
        <Input
          size="lg"
          clearable
          placeholder={t("selectNetwork") ?? ''}
          onChange={handleInput}
          css={{
            width:'90%'
          }}
        />
      </Modal.Header>
      <Modal.Body>
        <ChainListBox
          useChainId={useChainId}
          changeNetwork={changeNetwork}
          searchQuery={searchQuery}
          selectTab={starTabIndex}
        />
      </Modal.Body>
    </Modal>
  </>
}