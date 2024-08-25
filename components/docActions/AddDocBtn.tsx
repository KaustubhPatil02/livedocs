'use client'
import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const AddDocBtn = ({userId, email} :AddDocumentBtnProps ) => {
  const addDocumentHandler = async () =>{
    
  }


  return (
    <Button type='submit' onClick={addDocumentHandler}
      className='gradient-blue flex gap-1 shadow-md'
    >
      <Image 
        src='/assets/icons/add.svg'
        alt='Add document icon'
        width={20}
        height={20}
      />
      <p className='hidden sm:block'>
        Create your first document!
      </p>
    </Button>
  )
}

export default AddDocBtn