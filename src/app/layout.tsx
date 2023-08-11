import Nav from '@/components/nav'
import './globals.css'
import type { Metadata } from 'next'
import { VT323 } from 'next/font/google'

const vt323 = VT323({
  weight: '400',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'TabQuest',
  description: 'Begin your TabQuest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={vt323.className}>
      <div className="content fixed top-0 right-0 w-full h-full z-0">
        <div className="layer absolute bg-gradient-to-br from-sky-200 to-sky-300 dark:from-sky-800 dark:to-sky-950 bg-cover w-full h-full"></div>
        <div className="layer pixel absolute clouds bg-cover w-full h-full"></div>
        <div className="layer pixel absolute clouds2 bg-cover w-full h-full"></div>
        <div className="layer pixel absolute clouds3 bg-cover w-full h-full"></div>
        <div className="layer pixel absolute city bg-cover w-full h-full"></div>
        <div className="layer pixel absolute foreground bg-cover w-full h-full"></div>
      </div>
      <div className="z-10 absolute w-full">
        <Nav/>
        {children}
      </div>
      </body>
    </html>
  )
}
