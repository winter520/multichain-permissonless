import { 
  Navbar, 
  Button, 
  // Link as LinkUI, 
  Text, 
  useTheme,
  Avatar,
  Dropdown,
  Switch,
  styled,
  theme
} from "@nextui-org/react";
import Link from 'next/link';
import { t } from 'i18next';
import { useTheme as useNextTheme } from 'next-themes'

import Identicon from '../Identicon'
import AccountDetails from "../AccountDetails";
import TokenLogo from "../TokenLogo";

import Logo from "./logo";
import {moreList, navList} from './nav'
import SelectNetwork from "./SelectNetwork";

import {
  SunIcon,
  MoonIcon
} from './dark'

import config from '@/config'

import {
  useActiveReact
} from '@/hooks/useActiveReact'
import {
  useActiveWeb3React
} from "@/hooks"
import {
  injected
} from "@/connectors"

import {
  // useModalOpen,
  useNetworkModalToggle,
  useAccountModalToggle
} from "@/state/application/hooks"

function PathMatch (match:any) {
  if (config.isBrowser) {
    // console.log(window.location)
    if (window?.location?.pathname.match(match)) {
      return true
    }else {
      return false
    }
  } 
  return false
}

const IdenticonBox = styled('div', {
  cursor: "pointer",
  // backgroundColor: theme.colors.secondary.value,
  // padding: "1px",
  // borderRadius: "100%"
})


export default function App() {
  const { isDark } = useTheme();
  const toggleNetworkModal = useNetworkModalToggle()
  const toggleAccountModal = useAccountModalToggle()
  const {activate} = useActiveWeb3React()
  const { setTheme } = useNextTheme()
  const {chainId, account} = useActiveReact()
  // const router = useRouter();
// console.log(params)
  return (
    <>
      <AccountDetails />
      <SelectNetwork />
      <Navbar variant="sticky" disableShadow shouldHideOnScroll>
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          // css={{
          //   "@xs": {
          //     w: "12%",
          //   },
          // }}
        >
          <Link href="/"><Logo /></Link>
        </Navbar.Brand>
        <Navbar.Content
          enableCursorHighlight
          activeColor="primary"
          hideIn="xs"
          variant="underline"
        >
          {
            navList.map((item, index) => {
              if (item.isOutLink) {
                return <Navbar.Item key={index} id={index + ''}>
                  <Link href={item.path} target="_blank">{t(item.textKey)}</Link>
                </Navbar.Item>
              } else {
                return <Navbar.Item key={index} id={index + ''} isActive={PathMatch(item.regex)} underlineHeight="light">
                  <Link href={item.path}>{t(item.textKey)}</Link>
                </Navbar.Item>
              }
            })
          }
          <Dropdown>
            <Navbar.Item>
              <Dropdown.Button
                light
                css={{
                  px: 0,
                  dflex: "center",
                  svg: { pe: "none" },
                }}
              >
                More
              </Dropdown.Button>
            </Navbar.Item>
            <Dropdown.Menu
              color={"default"}
              variant="light"
              aria-label="Actions"
            >
              {
                moreList.map((item, index) => {
                  return <Dropdown.Item
                    variant="light"
                    aria-label="Actions"
                    key={index}
                  >
                    {
                      item.isOutLink ? (
                        <Link href={item.path} target="_blank">{t(item.textKey)}</Link>
                      ) : (
                        <Link href={item.path}>{t(item.textKey)}</Link>
                      )
                    }
                  </Dropdown.Item>
                })
              }
            </Dropdown.Menu>
          </Dropdown>
        </Navbar.Content>

        <Navbar.Content
          // css={{
          //   "@xs": {
          //     w: "5%",
          //     jc: "flex-end",
          //   },
          // }}
        >
          <Navbar.Item hideIn="xs">
            <Button
              light
              auto
              icon={<TokenLogo symbol={config.chainInfo[chainId].symbol}/>}
              css={{
                backgroundColor: !isDark ? theme.colors.purple100.value : 'rgba(255,255,255,.2)'
              }}
              onClick={toggleNetworkModal}
            >
              {config.chainInfo[chainId].name}
            </Button>
          </Navbar.Item>
          <Navbar.Item hideIn="xs">
            <Switch
              size="xl"
              iconOn={<SunIcon filled />}
              iconOff={<MoonIcon filled />}
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
          </Navbar.Item>
          <Navbar.Item>
            {
              account ? (
                <Button
                  light
                  auto
                  icon={<Avatar
                    icon={<Identicon imageKey={"0x1111111111111111111111111111111111111111"}/>}
                    size="sm"
                    zoomed
                    color="gradient"
                    bordered
                  />}
                  css={{
                    backgroundColor: !isDark ? theme.colors.purple900.value : 'rgba(255,255,255,.2)'
                  }}
                  onClick={toggleAccountModal}
                >
                  {config.chainInfo[chainId].name}
                </Button>
              ) : (
                <Button
                  light
                  auto
                  css={{
                    backgroundColor: !isDark ? theme.colors.purple800.value : 'rgba(255,255,255,.2)',
                    color: theme.colors.white.value, 
                  }}
                  // onClick={toggleNetworkModal}
                  onClick={() => {
                    activate(injected)
                  }}
                >
                  {t('ConnectToWallet')}
                </Button>
              )
            }
          </Navbar.Item>
        </Navbar.Content>

        <Navbar.Collapse>
          {
            navList.map((item, index) => {
              return <Navbar.CollapseItem key={index} id={index + ''} isActive={PathMatch(item.regex)}>
                <Link href={item.path}>{t(item.textKey)}</Link>
              </Navbar.CollapseItem>
            })
          }
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
