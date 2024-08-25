import Link  from 'next/link'
import Image from 'next/image'
import React from 'react'
import logo from '../public/next.svg'


//props code from types/index.ts file

const Header = ({ children }: HeaderProps) => {
  return (
    <div className='header'>
       <Link href='/' className='md:flex-1 '>
        <Image
          src='/vercel.svg'
          alt='logo'
          width={320}
          height={80}
          className='hidden mr-2 md:block md:mr-0'
        />
      </Link>
      {children}
    </div>
  )
}

export default Header