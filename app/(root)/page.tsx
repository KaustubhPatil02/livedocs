//react arrow function component (rafce)
import { Editor } from '@/components/editor/Editor'
import { Button } from '@/components/ui/button'
import Header from '@/components/ui/Header'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'


const Home = () => {
  return (
    <div>
      {/* <Header />
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <Editor /> */}
    <Button>Click me</Button>
    </div>
  )
}

export default Home