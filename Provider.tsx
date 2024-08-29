'use client'

import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react'
import { ReactNode } from 'react'
import Loader from './components/Loader'
import { getClerkUsers } from './lib/actions/users.actions'

const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <LiveblocksProvider
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}
      authEndpoint="/api/liveblocks-auth">
      <ClientSideSuspense fallback={<Loader />}>
        {children}
      </ClientSideSuspense>
      {/* </RoomProvider> */}
    </LiveblocksProvider>
  )
}

export default Provider