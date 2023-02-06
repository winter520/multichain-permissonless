import { 
  Navbar, 
  // Button, 
  Link, 
  Text, 
  useTheme,
  Avatar,
  Dropdown
} from "@nextui-org/react";
// import { useTranslation } from 'react-i18next'
import useTranslation from '@/pages/i18n'

// import { useCallback } from "react";
import { Layout } from "./layouts";
import Logo from "./logo";

import {navList} from './nav'

import config from '@/config'

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
console.log(t('router'))
  return (
    <Layout>
      <Navbar shouldHideOnScroll isBordered={isDark} variant="sticky" disableShadow>
        <Navbar.Toggle showIn="xs" />
        <Navbar.Brand
          css={{
            "@xs": {
              w: "12%",
            },
          }}
        >
          <Logo />
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
                  <Link  href={item.path}>{t(item.textKey)}</Link>
                </Navbar.Item>
              } else {
                return <Navbar.Link
                  href={item.path}
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
          <Dropdown placement="bottom-right">
            <Navbar.Item>
              <Dropdown.Trigger>
                <Avatar
                  bordered
                  as="button"
                  color="secondary"
                  size="md"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                />
              </Dropdown.Trigger>
            </Navbar.Item>
            <Dropdown.Menu
              aria-label="User menu actions"
              color="secondary"
              onAction={(actionKey) => console.log({ actionKey })}
            >
              <Dropdown.Item key="profile" css={{ height: "$18" }}>
                <Text b color="inherit" css={{ d: "flex" }}>
                  Signed in as
                </Text>
                <Text b color="inherit" css={{ d: "flex" }}>
                  zoey@example.com
                </Text>
              </Dropdown.Item>
              <Dropdown.Item key="settings" withDivider>
                My Settings
              </Dropdown.Item>
              <Dropdown.Item key="team_settings">Team Settings</Dropdown.Item>
              <Dropdown.Item key="analytics" withDivider>
                Analytics
              </Dropdown.Item>
              <Dropdown.Item key="system">System</Dropdown.Item>
              <Dropdown.Item key="configurations">Configurations</Dropdown.Item>
              <Dropdown.Item key="help_and_feedback" withDivider>
                Help & Feedback
              </Dropdown.Item>
              <Dropdown.Item key="logout" withDivider color="error">
                Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
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
    </Layout>
  );
}
