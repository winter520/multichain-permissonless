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
      
      {/* <WalletLogoBox>
        <WalletLogoBox2>
          <div className="left" onClick={() => changeNetwork(config.chainInfo[curChainId])}>
            <IconWrapper>
              <TokenLogo symbol={item?.networkLogo ?? item?.symbol} size={'46px'}></TokenLogo>
            </IconWrapper>
            <OptionCardLeft id={'chain_list_name_' + curChainId}>
              <HeaderText>
                {' '}
                {
                (
                  curChainId
                  && selectChainId
                  && curChainId.toString() === selectChainId.toString()
                ) ? (
                  <CircleWrapper>
                    <GreenCircle>
                      <div />
                    </GreenCircle>
                  </CircleWrapper>
                ) : (
                  ''
                )}
                {item.networkName}
              </HeaderText>
            </OptionCardLeft>
            <OptionCardLeft1 id={'chain_list_url_' + curChainId} onClick={e => e.stopPropagation()}>
              <Input value={viewUrl} id={'chain_list_input_' + curChainId} onChange={(event:any) => {
                setViewUrl(event.target.value)
              }}/>
            </OptionCardLeft1>
          </div>
          <div className='right'>
            {
              item.nodeRpc && !isNaN(curChainId) ? (
                <StyledMenuIcon id={'chain_list_set_' + curChainId} onClick={e => {
                  const htmlNameNode = document.getElementById('chain_list_name_' + curChainId)
                  const htmlNameNode1 = document.getElementById('chain_list_set_' + curChainId)
                  const htmlUrlNode = document.getElementById('chain_list_url_' + curChainId)
                  const htmlUrlNode1 = document.getElementById('chain_list_tick_' + curChainId)
                  if (htmlNameNode) htmlNameNode.style.display = 'none'
                  if (htmlNameNode1) htmlNameNode1.style.display = 'none'
                  if (htmlUrlNode) htmlUrlNode.style.display = 'block'
                  if (htmlUrlNode1) htmlUrlNode1.style.display = 'block'
                  e.stopPropagation()
                }}></StyledMenuIcon>
              ) : ''
            }
            {viewLoading ? <LoaderIcon></LoaderIcon> : (
              <CheckSquareIcon id={'chain_list_tick_' + curChainId} onClick={e => {
                setViewLoading(true)
                const htmlNameNode = document.getElementById('chain_list_name_' + curChainId)
                const htmlNameNode1 = document.getElementById('chain_list_set_' + curChainId)
                const htmlUrlNode = document.getElementById('chain_list_url_' + curChainId)
                const htmlUrlNode1 = document.getElementById('chain_list_tick_' + curChainId)
                isConnect(viewUrl).then((res:any) => {
                  setViewLoading(false)
                  if (res.msg === 'Success') {
                    if (viewUrl === item.nodeRpc) {
                      if (htmlNameNode) htmlNameNode.style.display = 'block'
                      if (htmlNameNode1) htmlNameNode1.style.display = 'block'
                      if (htmlUrlNode) htmlUrlNode.style.display = 'none'
                      if (htmlUrlNode1) htmlUrlNode1.style.display = 'none'
                    } else {
                      setLocalRPC(curChainId, viewUrl)
                      history.go(0)
                    }
                  } else {
                    alert(res.error)
                  }
                })
                e.stopPropagation()
              }}></CheckSquareIcon>
            )}
            <StyledStarIcon className={starChainList?.[curChainId] ? 'star' : ''} onClick={() => onChangeStarChain(curChainId)}/>
          </div>
        </WalletLogoBox2>
      </WalletLogoBox> */}
    </>
  )
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
    console.log(records)
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
  const {chainId, account} = useActiveReact()
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
      onClose={toggleNetworkModal}
    >
      <Modal.Header>
        {/* <Text id="modal-title" size={18}>
          Modal with a lot of content
        </Text> */}
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