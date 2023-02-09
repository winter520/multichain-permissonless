import React from 'react'
import { 
  Button,
} from "@nextui-org/react";
import {
  useActiveReact
} from '@/hooks/useActiveReact'
import config from '@/config';

export default function SelectNetwork () {
  const {chainId} = useActiveReact()
  return <>
    <Button flat color="secondary" auto>
      {config.chainInfo[chainId].name}
    </Button>
  </>
}