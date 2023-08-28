import Slab from '@/components/slab';
import { Metadata } from 'next';
import { VT323 } from 'next/font/google';
import Link from 'next/link';
import React from 'react';

export const metadata: Metadata = {
  title: 'Random Encounters',
  description: 'Begin your Quest',
}
const vt323 = VT323({
    weight: '400',
    subsets: ['latin']
});

export default function Home() {
  return (
    <div className={`${vt323.className} z-10 absolute w-full`}>
      <Slab>
        <div className='text-3xl w-full font-semibold text-center'>Welcome</div>
        <div className='w-full pt-28 flex flex-row justify-center'>
          <Link href="/tab" className='text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
            Begin your quest?
          </Link>
        </div>
      </Slab>
    </div>
  );
}
