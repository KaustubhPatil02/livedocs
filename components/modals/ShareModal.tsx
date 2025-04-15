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
import { updateDocumentAccess } from '@/lib/actions/room.actions';

const ShareModal = ({ roomId, currentUserType, collaborators, creatorId }: ShareDocumentDialogProps) => {
  const user = useSelf();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [userType, setUserType] = useState<UserType>('viewer');
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const shareDocHandler = async () => {
    if (!isValidEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError(null); // Clear any previous errors
    try {
      await updateDocumentAccess({ roomId, email, userType: userType as UserType, updatedBy: user.info });
      setEmail(''); // Clear the email input after successful sharing
    } catch (error) {
      console.error('Error sharing document:', error);
      setError('Failed to share the document. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button
          className="gradient-green flex h-9 gap-1 px-4"
          disabled={currentUserType !== 'editor'}
          aria-label="Open share modal"
        >
          <Image
            src="/assets/icons/share.svg"
            alt="Share document icon"
            width={20}
            height={20}
            className="min-w-4 md:size-6"
          />
          <p className="mr-1 hidden sm:block">Share</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="shad-dialog">
        <DialogHeader>
          <DialogTitle>Manage Share Permissions</DialogTitle>
          <DialogDescription>
            Share this document with others by entering their email and selecting their role.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Label htmlFor="email" className="text-blue-200">
            Email Address
          </Label>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex flex-1 rounded-md bg-dark-400">
              <Input
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="share-input"
                aria-label="Email address input"
              />
              <UserTypesSelector
                userType={userType}
                setUserType={setUserType}
              />
            </div>
            <Button
              className="gradient-blue flex h-full gap-1 px-4"
              disabled={loading || !email}
              type="submit"
              onClick={shareDocHandler}
              aria-label="Share document"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="spinner" /> Sharing...
                </span>
              ) : (
                'Share'
              )}
            </Button>
          </div>
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>
        <div className="mt-6">
  <h3 className="text-lg font-semibold text-blue-200">Collaborators</h3>
  <ul className="mt-3 space-y-2">
    {collaborators.map((collaborator) => (
      <li
        key={collaborator.id}
        className="flex items-center gap-4 justify-between rounded-md bg-dark-400 p-4 shadow-sm"
      >
        <Collaborator
          roomId={roomId}
          creatorId={creatorId}
          email={collaborator.email}
          collaborator={collaborator}
          user={user.info}
        />
      </li>
    ))}
  </ul>
</div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;