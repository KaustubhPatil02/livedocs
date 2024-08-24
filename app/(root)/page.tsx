import { Editor } from '@/components/editor/Editor'
import Header from '@/components/Header'
import { Button } from '@/components/ui/button'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import React from 'react'

const Document = () => {
  return (
    <div> 
      <Header />
    <SignedIn>
      <UserButton />
    </SignedIn>
    <SignedOut>
      <SignInButton />
    </SignedOut>
    <Editor />
    <Button>Click me</Button>
    </div>
  )
}

export default Document