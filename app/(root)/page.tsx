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
import { DeleteModal } from '@/components/modals/DeleteModal'
import Notifications from '@/components/Notifications'
import { GridPattern } from '@/components/magicui/grid-pattern'
import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern'
import { DotPattern } from '@/components/magicui/dot-pattern'


const Home = async () => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');
  // const documents = [];
  // instead of static documents, we will fetch the documents from the server liveblocks
  const roomDoc = await fetchDocument(clerkUser.emailAddresses[0].emailAddress);

 



  return (

    <main className='home-container'>
    <AnimatedGridPattern
      className="absolute -z-10 opacity-30 fill-blue-900"
      width={100}
      height={100}
      // xOffset={0}
      // yOffset={0}
      // className="opacity-30 fill-slate-200 "
    />
      <Header className='sticky left-0 top-0'>
  
        <div className='flex items-center gap-2 lg:gap-4'>
         <Notifications />
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </Header>


      {roomDoc.data.length > 0 ? (
        <div className='document-list-container'>
          <div className='documnet-list-title flex flex-col items-center'>
            <h2 className='text-28-semibold '> All your Documents</h2>
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
             <DeleteModal roomId={id} />
              </li>
            ))}
          </ul>
        </div>
      ) : 
        // </GridPattern>
        (
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
      <div className='mb-10 flex flex-col items-center justify-center gap-2'>
        <p className='text-sm font-light text-blue-200'>Made with ❤️ by Kaustubh Patil</p>
        <Image
          src={'/kaustubh.png'}
          width={60}
          height={60}
          alt="Kaustubh Patil"
          className='rounded-full'
        />
        <a href="https://kaustubh02.vercel.app/"><p className='font-extralight font-sans'>➡️Learn more about the dev</p></a>
      </div>
    </main>

  )
}

export default Home