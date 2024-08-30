'use client'
import { useSelf } from '@liveblocks/react/suspense'
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import Image from 'next/image';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import UserTypesSelector from '../UserTypesSelector';
import Collaborator from '../Collaborator';

const ShareModal = ({ roomId, currentUserType, collaborators, creatorId }: ShareDocumentDialogProps) => {
  const user = useSelf();
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState('');
  const [userRole, setUserRole] = useState<UserType>('viewer');

  const shareDocHandler = async () => { }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button className='gradient-green flex h-9 gap-1 px-4'
          disabled={currentUserType !== 'editor'}>
          <Image
            src='/assets/icons/share.svg'
            alt='Share document icon'
            width={20}
            height={20}
            className='min-w-4 md:size-6'
          />
          <p className='mr-1 hidden sm:block'>Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className='shad-dialog'>
        <DialogHeader >
          <DialogTitle>Manage share permissions</DialogTitle>
          <DialogDescription>
           With whom you want to share this document?
          </DialogDescription>
        </DialogHeader>
        <Label
          htmlFor='email' 
          className='mt-7 text-blue-200'
        >
         Email address 
        </Label>
        <div className='flex items-center gap-2'>
          <div className='flex flex-1 rounded-md b bg-dark-400'>
            <Input
              id='email'
              placeholder='Enter email address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='share-input'
            />
            <UserTypesSelector 
              userType={userRole}
              setUserType={setUserRole}
            />
          </div>
          <Button 
          className='gradient-blue flex h-full gap-1 px-4' 
          disabled={loading}
          type='submit'
          onClick={shareDocHandler}
          >
            {loading ? 'Sharing...' : 'Share'}
          </Button>
        </div>
        <div className='my-2 space-y-2'>
          <ul className='flex flec-col'>
            {collaborators.map((collaborator) => (
              // static code
              // <li key={collaborator.id} className='flex items-center gap-2'>
              //   <Image
              //     src='/assets/icons/user.svg'
              //     alt='User icon'
              //     width={20}
              //     height={20}
              //     className='min-w-4 md:size-6'
              //   />
              //   <p className='text-blue-200'>{collaborator.email}</p>
              // </li>
              <Collaborator
              key={collaborator.id}
              roomId={roomId}
              creatorId={creatorId}
              email={collaborator.email}
              collaborator={collaborator}
              user={user.info}
              />
            ))}
          </ul>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default ShareModal