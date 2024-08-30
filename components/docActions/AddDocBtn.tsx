'use client'
import React, { useState } from 'react';
import { Button } from '../ui/button';
import Image from 'next/image';
import { createDocument } from '@/lib/actions/room.actions';
import { useRouter } from 'next/navigation';
import { ConfettiButton } from "@/components/magicui/confetti";
import Loader from '../Loader';

const AddDocBtn = ({ userId, email }: AddDocumentBtnProps) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const addDocumentHandler = async () => {
    setLoading(true);
    try {
      const room = await createDocument({ userId, email });
      if (room) router.push(`/documents/${room.id}`);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ConfettiButton className='bg-transparent'>
      <Button
        type='submit'
        onClick={addDocumentHandler}
        className={`gradient-green flex gap-1 shadow-md ${loading ? 'opacity-50' : ''}`}
        disabled={loading}
      >
        {loading ? (
          <Loader />
        ) : (
          <>
            <Image
              src='/assets/icons/add.svg'
              alt='Add document icon'
              width={20}
              height={20}
            />
            <p className='hidden sm:block'>
              Create a blank document!
            </p>
          </>
        )}
      </Button>
    </ConfettiButton>
  );
};

export default AddDocBtn;