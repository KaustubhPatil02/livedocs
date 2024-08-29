'use client'

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react'
import React, { useEffect, useRef, useState } from 'react'

import { Editor } from '@/components/editor/Editor'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Header from './docActions/Header'
import ActiveCollabs from './ActiveCollabs'
import { Input } from './ui/input'
import { currentUser } from '@clerk/nextjs/server'
import Image from 'next/image'
import editImg from '../public/assets/icons/edit.svg'
import { updateDocument } from '@/lib/actions/room.actions'
import Loader from './Loader'

const CollabRoom = ({ roomId, roomMetadata, users, currentUserType }: CollaborativeRoomProps) => {
  // const currentUserType = {currentUserType}
  const [editing, setediting] = useState(false);
  const [loading, setloading] = useState(false);
  const [doctitle, setdoctitle] = useState(roomMetadata.title);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // keys
  const updateTitleHandler = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setloading(true);
      try {
        if(doctitle !== roomMetadata.title) {
         const updatedDocument = await updateDocument(roomId, doctitle);

         if(updatedDocument) {
           setloading(false);
           setediting(false);
        }
      }
      }
       catch (error) {
        console.error(error);        
    }
  }
}
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if(containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setediting(false);
        updateDocument(roomId, doctitle);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  },[roomId, doctitle])

  useEffect(() =>{
    if(editing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing])


  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<div><Loader /></div>}>
        <div className='collaborative-room'>
          <Header>
            <div ref={containerRef} className='flex w-fit items-center justify-center gap-2'>
              {/* <p className='document-title'>
              A Static Page
            </p> */}
              {/* //TODO: add dynamic block for title */}
              {editing && !loading ? (
                <Input
                  className='document-title-input'
                  type='text'
                  value={doctitle}
                  ref={inputRef}
                  placeholder='Enter title'
                  onChange={(e) => setdoctitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                />
              ) : (
                <>
                  <p className='document-title'>{doctitle}</p>
                </>
              )}

              {currentUserType === 'editor' && !editing && (
                <Image
                  src={editImg}
                  alt='edit-title'
                  width={20}
                  height={20}
                  onClick={() => setediting(true)}
                  className='pointer'
                />
              )}

              {currentUserType !== 'editor' && !editing && (
                <p className='view-only-tag'>View Only</p>
              )}
              
              {loading && <p className='text-sm text-white'>Updating please wait...</p>}
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
          <Editor
            roomId={roomId}
            // users={users}
            currentUserType={currentUserType}
          />

        </div>
      </ClientSideSuspense>
    </RoomProvider>
  )
}

export default CollabRoom