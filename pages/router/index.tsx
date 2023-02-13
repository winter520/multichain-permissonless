import React from "react";
import AppBody from '@/components/AppBody'
import {
  useActiveWeb3React
} from "@/hooks"

export default function Router () {
  const { account, chainId } = useActiveWeb3React()
  return <>
    <AppBody>
      Router
      {account}
      {chainId}
    </AppBody> 
  </>
}