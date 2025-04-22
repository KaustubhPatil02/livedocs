import { AnimatedGridPattern } from '@/components/magicui/animated-grid-pattern'
import { SignIn } from '@clerk/nextjs'
import React from 'react'

const SignInPage = () => {
  return (
    <main className='auth-page'>
      
      <AnimatedGridPattern
        className="absolute -z-10 opacity-30 fill-blue-900"
        width={100}
        height={100}
      />
      {/* <div> */}
      <div className="flex flex-col items-center gap-6 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-blue-100 drop-shadow-lg">
          Welcome again to LiveDocs ✨
        </h1>
        <p className="text-sm font-light text-blue-300">
          LiveDocs✨ is a live collaborative editor powered by LiveBlocks.
        </p>
        <p className="text-lg font-light text-blue-200">
          Let's Log you in and start collaborating in real-time.
        </p>
      </div>
    <SignIn />
</main>
  )
}

export default SignInPage