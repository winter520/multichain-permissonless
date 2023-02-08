import { 
  Navbar, 
  // Button, 
  Link, 
  Text, 
  useTheme,
  Avatar,
  Dropdown,
  Switch,
  styled,
  theme
} from "@nextui-org/react";
// import { useRouter } from 'next/router';
// import { useTranslation } from 'react-i18next'
import {useTranslation} from '@/pages/i18n'
import Jazzicon from 'react-jazzicon'
import { useTheme as useNextTheme } from 'next-themes'

import Identicon from '../Identicon'

import AccountDetails from "../AccountDetails";
import Logo from "./logo";

import {navList} from './nav'
import {
  SunIcon,
  MoonIcon
} from './dark'

import config from '@/config'

import {
  // useModalOpen,
  useWalletModalToggle
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
  backgroundColor: theme.colors.secondary.value,
  padding: "1px",
  borderRadius: "100%"
})

export default function App() {
  const { isDark } = useTheme();
  const { t } = useTranslation()
  const toggleWalletModal = useWalletModalToggle()
  const { setTheme } = useNextTheme()
  // const router = useRouter();
// console.log(params)
  return (
    <>
      <AccountDetails />
      <Navbar variant="sticky" disableShadow >
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
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
                  <Link href={item.path}>{t(item.textKey)}</Link>
                </Navbar.Item>
              } else {
                return <Navbar.Link
                  href={`${item.path}`}
                  key={index}
                  isActive={PathMatch(item.regex)}
                  id={index + ''}
                  underlineHeight="light"
                >{t(item.textKey)}</Navbar.Link>
              }
            })
          }
        </Navbar.Content>

        <Navbar.Content
          css={{
            "@xs": {
              w: "12%",
              jc: "flex-end",
            },
          }}
        >
          <Navbar.Item>
            <Switch
              size="xl"
              iconOn={<SunIcon filled />}
              iconOff={<MoonIcon filled />}
              checked={isDark}
              onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
            />
          </Navbar.Item>
          <Navbar.Item>
            <IdenticonBox onClick={toggleWalletModal}>
              <Identicon imageKey={"0x1111111111111111111111111111111111111111"} size={32}/>
            </IdenticonBox>
          </Navbar.Item>
        </Navbar.Content>

        <Navbar.Collapse>
          {
            navList.map((item, index) => {
              return <Navbar.CollapseItem key={index} id={index + ''}>
                <Link  href={item.path} isExternal={Boolean(item.isOutLink)}>{t(item.textKey)}</Link>
              </Navbar.CollapseItem>
            })
          }
        </Navbar.Collapse>
      </Navbar>
    </>
  );
}
