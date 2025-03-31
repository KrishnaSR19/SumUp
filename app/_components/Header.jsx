import React from 'react'
import Image from 'next/image'

function Header() {
  return (
    <div className='p-5'>
        <Image src={'./logo.svg'}
        alt="Logo"
        width={100}
        height={100}
        />
    </div>
  )
}

export default Header;