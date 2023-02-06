import React from "react";
import { Container } from "@nextui-org/react";
import Header from '@/components/Header'
export default function AppBody ({ children }: { children: React.ReactNode }) {
  return <Container fluid={true} style={{minHeight: '100vh'}}>
    <Header />
    {children}
  </Container>
}