import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';

function Header() {
  return (
    <div className='p-5 flex justify-between items-center border shadow-md rounded-sm'>
        <Image src={'./logo.svg'}
        alt="Logo"
        width={100}
        height={100}
        />
        <Button>Get Started</Button>
    </div>
  )
}

export default Header;