"use client";

import React from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button';
import { useUser, UserButton } from '@clerk/nextjs';
import Link from 'next/link';

function Header() {
  const { user, isSignedIn } = useUser();

  return (
    <div className="p-5 flex justify-between items-center border shadow-md rounded-sm bg-slate-100 dark:bg-gray-900 dark:border-gray-700">
      <Link href={'/'}>
        <Image
          src="/logo.png"
          alt="logo"
          width={100}
          height={50}
          priority
          style={{ height: "auto" }}
        />
      </Link>

      {isSignedIn ? (
        <UserButton />
      ) : (
        <Link href={'/sign-in'}>
          <Button className="border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white shadow-sm transition-colors hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-800">
            Get Started
          </Button>
        </Link>
      )}
    </div>
  )
}

export default Header;
