'use client'

import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react'
import { ReactNode } from 'react'
import Loader from './components/Loader'

const Provider = ({children} :{ children: ReactNode}) => {
  return (
    <LiveblocksProvider authEndpoint= "/api/liveBlocks-auth">
      {/* <RoomProvider id="my-room"> */}
        <ClientSideSuspense fallback={<Loader />
            // <div>Loading…</div>
            }>
                {/* Loading… */}
          {children}
        </ClientSideSuspense>
      {/* </RoomProvider> */}
    </LiveblocksProvider>
  )
}

export default Provider