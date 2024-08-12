import Link  from 'next/link'
import Image from 'next/image'
import React from 'react'
import logo from '../public/assets/icons/logo.svg'



const Header = ({ children }: HeaderProps) => {
  return (
    <div className='header'>
       <Link href='/' className='md:flex-1 '>
        <Image
          src={logo}
          alt='logo'
          width={120}
          height={32}
          className='hidden md:block md:mr-0 mr-2'
        />
      </Link>
      {children}
    </div>
  )
}

export default Header