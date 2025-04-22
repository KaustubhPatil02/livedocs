import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern'
import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='auth-page mt-4'>
      
      <AnimatedGridPattern
        className="absolute -z-10 opacity-30 fill-blue-900"
        width={100}
        height={100}
      />
      {/* <div> */}
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-blue-50 drop-shadow-xl">
          Welcome again to LiveDocs ✨
        </h1>
        <p className="text-xl font-medium text-blue-200">
          LiveDocs✨ is a live collaborative editor powered by LiveBlocks.
        </p>
        <p className="text-sm  text-blue-100 font-semibold">
          Let&apos;s Log you in and start collaborating in real-time.
        </p>
      </div>
    <SignIn />
    {/* <div className='flex flex-col items-center justify-center gap-2'>
            <p className='text-sm font-light text-blue-200'>Made with ❤️ by Kaustubh Patil</p>
            <Image
              src={'/kaustubh.png'}
              width={60}
              height={60}
              alt="Kaustubh Patil"
              className='rounded-full'
            />
            <a href="https://kaustubh02.vercel.app/"><p className='font-extralight font-sans'>➡️Learn more about the dev</p></a>
          </div> */}
</main>
  )
}

export default SignInPage