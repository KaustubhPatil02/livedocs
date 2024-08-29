'use client'

import { ClientSideSuspense, LiveblocksProvider } from '@liveblocks/react'
import { ReactNode } from 'react'
import Loader from './components/Loader'
import { getClerkUsers, getDocumentUsers } from './lib/actions/users.actions'
import { useUser } from '@clerk/nextjs'

const Provider = ({ children }: { children: ReactNode }) => {
  const {user: clerkUser} = useUser();
  return (
    <LiveblocksProvider
      resolveUsers={async ({ userIds }) => {
        const users = await getClerkUsers({ userIds });
        return users;
      }}

      resolveMentionSuggestions ={async ({text, roomId}) => {
        const roomUsers = await getDocumentUsers({roomId, 
          currentUser: clerkUser?.emailAddresses[0].emailAddress!, 
          text});
          return roomUsers;
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