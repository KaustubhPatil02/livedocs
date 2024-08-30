import Image from 'next/image';
import React, { useState } from 'react'
import UserTypesSelector from './UserTypesSelector';
import { Button } from './ui/button';

const Collaborator = ({ roomId, creatorId, collaborator, email, user }: CollaboratorProps) => {
    const [userType, setUserType] = useState(collaborator.userType || 'viewer');
    const [loading, setLoading] = useState(false);

    const shareDocHandler = async (type: string) => {
    }

    const removeCollaboratorHandler = async (type: string) => { }
    return (
        <li className='flex items-center justify-center gap-3 py-3'>
            <div className='flex gap-2'>
                <Image
                    src={collaborator.avatar}
                    alt='User avatar'
                    width={32}
                    height={32}
                    className='size-9 rounded-full'
                />
                <div className='line-clamp-1 text-sm font-semibold leading-4 text-white'>
                    <p>{collaborator.name}
                        <span className='text-10-regular pl-2 text-blue-300 '>
                            {loading && 'updating...'}
                        </span>
                    </p>

                    <p className='font-light text-sm text-blue-100'>
                        {collaborator.email}
                    </p>
                </div>
            </div>
            {creatorId === collaborator.id ? (
                <p className='text-sm  text-blue-400'>Owner</p>
            ) :
                (
                    <div className='flex items-center'>
                        <UserTypesSelector
                            userType={userType as UserType}
                            setUserType={setUserType || 'viewer'}
                            onClickHandler={shareDocHandler}
                        />
                        <Button type='button'
                            onClick={() => removeCollaboratorHandler(collaborator.email)}
                        >
                            Remove
                        </Button>
                    </div>
                )
            }
        </li>
    )
}

export default Collaborator