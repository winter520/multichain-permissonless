import React from "react";
import { Container } from "@nextui-org/react";
import Header from '@/components/Header'
import '@/utils/i18n'
export default function AppBody ({ children }: { children: React.ReactNode }) {
  return <>
      <Header />
      <Container lg style={{minHeight: '100vh'}}>
        {children}
      </Container>
  </>
}