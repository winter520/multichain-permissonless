import React from "react";
import AppBody from '@/components/AppBody'
import {
  useActiveReact
} from "@/hooks/useActiveReact"

export default function Router () {
  const { account, chainId } = useActiveReact()
  return <>
    <AppBody>
      Router
      {account}
      {chainId}
    </AppBody> 
  </>
}