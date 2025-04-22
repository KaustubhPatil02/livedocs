import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { AnimatedGridPattern } from '../magicui/animated-grid-pattern'
import { GridPattern } from '../magicui/grid-pattern'

const Header = ({ children, className }: HeaderProps) => {
  return (
    <div className={cn("header", className)}>
       <GridPattern
            width={100}
            height={100}
            // xOffset={0}
            // yOffset={0}
            className="opacity-15 fill-slate-200 "
          />
      <Link href='/' className="md:flex-1">
        <Image 
        // src='/vercel.svg'
        src="/assets/icons/doclogo.svg"

          alt="Logo with name"
          width={50}
          height={20}
          className="hidden md:block"
        />
        <Image 
          // src="/assets/images/logodoc.svg"
        src="/assets/icons/doclogo.svg"

          alt="Logo"
          width={32}
          height={32}
          className="mr-2 md:hidden"
        />
      </Link>
      {children}
    </div>
  )
}

export default Header