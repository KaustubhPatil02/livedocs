import { SignedIn, UserButton } from '@clerk/nextjs';
import Image from 'next/image';
import React from 'react';
import AddDocBtn from '@/components/docActions/AddDocBtn';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { fetchDocument } from '@/lib/actions/room.actions';
import Link from 'next/link';
import { dateConverter } from '@/lib/utils';
import { DeleteModal } from '@/components/modals/DeleteModal';
import Notifications from '@/components/Notifications';
import { GridPattern } from '@/components/magicui/grid-pattern';
import HeaderWrapper from './HeaderWrapper';
import Header from '@/components/docActions/Header';
import SearchInput from '@/components/SearchInput';


const Home = async ({ searchParams }: { searchParams: { query?: string } }) => {
  const clerkUser = await currentUser();
  if (!clerkUser) redirect('/sign-in');

  const roomDoc = await fetchDocument(clerkUser.emailAddresses[0].emailAddress);

  // Get the search query from the URL
  const searchQuery = searchParams.query || '';

    // Get the current pathname


  return (
    <main className="home-container">
      <GridPattern
        className="absolute -z-10 opacity-30 fill-blue-900"
        width={100}
        height={100}
      />
      {/* Conditionally Render Header */}
        <HeaderWrapper
          className="sticky left-0 top-0"
          showSearch={true}
          docs={roomDoc.data.map((doc: any) => ({
            id: doc.id,
            title: doc.metadata.title,
          }))}
          searchQuery={searchQuery}
        >
          <div className="flex items-center gap-2 lg:gap-4">
            <Notifications />
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </HeaderWrapper>

      {roomDoc.data.length > 0 ? (
        <div className="document-list-container">
          <div className="documnet-list-title flex flex-col items-center">
            <h2 className="text-28-semibold">All your Documents</h2>
            <AddDocBtn
              userId={clerkUser.id}
              email={clerkUser.emailAddresses[0].emailAddress}
            />
          </div>
          <SearchInput  docs={roomDoc.data.map((doc: any) => ({ id: doc.id, title: doc.metadata.title }))} />
          <h2 className="text-28-semibold" />
          
          <ul className="document-ul">
  {roomDoc.data.map(({ id, metadata, createdAt }: any) => (
    <li
      className="document-list-item flex items-center gap-4 rounded-md p-4 hover:bg-blue-100 transition-colors"
      key={id}
    >
      <Link
        href={`/documents/${id}`}
        className="flex flex-1 items-center gap-4"
      >
        <div className="hidden rounded-md bg-dark-500 p-2 sm:block">
          <Image
            src="/assets/icons/doclogo.svg"
            alt="Document icon"
            width={30}
            height={30}
          />
        </div>
        <div className="space-y-1">
          <p className="line-clamp-1">{metadata.title}</p>
          <p className="text-sm font-light text-blue-200">
            Created At{' '}
            <span
              dangerouslySetInnerHTML={{
                __html: dateConverter(createdAt),
              }}
            />
          </p>
        </div>
      </Link>
      <DeleteModal roomId={id} />
    </li>
  ))}
</ul>
        </div>
      ) : (
        <div className="document-list-empty">
          <Image
            src="/assets/icons/doclogo.svg"
            alt="Document icon"
            width={40}
            height={40}
            className="mx-auto"
          />
          <AddDocBtn
            userId={clerkUser.id}
            email={clerkUser.emailAddresses[0].emailAddress}
          />
        </div>
      )}
       {/* Footer Section */}
  <footer className="mt-20 mb-10 flex flex-col items-center justify-center gap-2 border-t border-blue-800 pt-4">
    <p className="text-sm font-light text-blue-200">
      Made with ❤️ by <a href="https://github.com/Kaustubhpatil02"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:underline font-semibold"
      >Kaustubh Patil</a>
      <Link
     href="https://github.com/Kaustubhpatil02"
     target="_blank"
     rel="noopener noreferrer"
    >
      <Image
        src={'/github.svg'}
        width={35}
        height={35}
        alt="Github icon"
        className="inline-block ml-1 hover:bg-gray-600 rounded-full p-1"

      />
      </Link>
    </p>
    
    <Image
      src={'/kaustubh.png'}
      width={60}
      height={60}
      alt="Kaustubh Patil"
      className="rounded-full"
    />
    <a
      href="https://kaustubh02.vercel.app/"
      target="_blank"
      rel="noopener noreferrer"
      className="text-xl font-medium text-blue-300 "
    >
      ➡️ Learn more about the dev
    </a>
  </footer>
    </main>
  );
};

export default Home;