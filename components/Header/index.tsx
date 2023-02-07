import { 
  Navbar, 
  // Button, 
  Link, 
  Text, 
  useTheme,
  Avatar,
  Dropdown,
  Switch
} from "@nextui-org/react";
// import { useRouter } from 'next/router';
// import { useTranslation } from 'react-i18next'
import {useTranslation} from '@/pages/i18n'
import { useTheme as useNextTheme } from 'next-themes'

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
      <Navbar variant="sticky" disableShadow>
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
          activeColor="secondary"
          hideIn="xs"
          variant="highlight-rounded"
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
          <Switch
            size="xl"
            iconOn={<SunIcon filled />}
            iconOff={<MoonIcon filled />}
            checked={isDark}
            onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
          />
          <Avatar
            bordered
            as="button"
            color="secondary"
            size="md"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            onClick={toggleWalletModal}
          />
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
