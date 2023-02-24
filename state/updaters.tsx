import React from 'react'
import ListsUpdater from './lists/updater'
import ApplicationUpdater from './application/updater'

import ChainUpdater from '@/chains/updaters'

export function Updaters() {
  return (
    <>
      <ListsUpdater />
      <ApplicationUpdater />
      <ChainUpdater />
    </>
  )
}