//react arrow function component (rafce)
import Header from '@/components/docActions/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'
import AddDocBtn from '@/components/docActions/AddDocBtn'
import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { fetchDocument } from '@/lib/actions/room.actions'
import Link from 'next/link'
import { dateConverter } from '@/lib/utils'


const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');
  // const documents = [];
  // instead of static documents, we will fetch the documents from the server liveblocks
  const roomDoc = await fetchDocument(clerkUser.emailAddresses[0].emailAddress);

  const notificationHandler = () => {}
  return (

    <main className='home-container'>
      <Header className='sticky left-0 top-0'>
        <div className='flex items-center gap-2 lg:gap-4'>
          <Image
            src='/assets/icons/bell.svg'
            alt='Notification icon'
            width={20}
            height={20}
            // onClick={() => notificationHandler()}
            className='pointer'
          />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>

      {roomDoc.data.length > 0 ? (
        <div className='document-list-container'>
          <div className='documnet-list-title flex flex-col items-center '>
            <h2 className='text-28-semibold'> All your Documents</h2>
            <AddDocBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <ul className='document-ul'>
            {roomDoc.data.map(({ id, metadata, createdAt }: any) => (
              <li
                className='document-list-item'
                key={id}>
                <Link
                  href={`/documents/${id}`}
                  className='flex flex-1 items-center gap-4'
                >
                  <div className='hidden rounded-md bg-dark-500 p-2 sm:block'>
                    <Image
                      src='/assets/icons/doclogo.svg'
                      alt='Document icon'
                      width={30}
                      height={30}
                    />
                  </div>
                  <div className='space-y-1'>
                    <p className='line-clamp-1'>
                      {metadata.title}
                    </p>
                    <p className='text-sm font-light text-blue-200'>
                      Created At <span dangerouslySetInnerHTML={{ __html: dateConverter(createdAt) }} />
                    </p>
                    {/* <p className='text-sm font-light text-blue-200'>Created @ {dateConverter(createdAt)}</p> */}
                  </div>
                </Link>

              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className='document-list-empty'>
          <Image
            src="/assets/icons/doclogo.svg"
            alt='Document icon'
            width={40}
            height={40}
            className='mx-auto'
          />
          <AddDocBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>


      )}
    </main>
  )
}

export default Home