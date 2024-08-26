'use client'

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React from 'react'

import { Editor } from '@/components/editor/Editor'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Header from './docActions/Header'
import ActiveCollabs from './ActiveCollabs'

const CollabRoom = ({ roomId, roomMetadata}: CollaborativeRoomProps) => {
  return (
    <RoomProvider id={roomId}>
        <ClientSideSuspense fallback={<div>Loading…</div>}>
          <div className='collaborative-room'>
          <Header>
        <div className='flex w-fit items-center justify-center gap-2'>
            <p className='document-title'>
              A Static Page
            </p>
        </div>

        <div className='flex w-full flex-1 justify-end gap-3'>
          <ActiveCollabs />
        <SignedOut>
            <SignInButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>

        
      </Header>
      <Editor />

          </div>
        </ClientSideSuspense>
      </RoomProvider>
  )
}

export default CollabRoom