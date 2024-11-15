import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/app-sidebar'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
})

export const metadata: Metadata = {
  title: 'Faceup Evidence',
  description: 'Faceup Evidence - test project created by Matyas Herman',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <AppSidebar />
          <main className='w-full m-4'>
            {/* <SidebarTrigger /> */}
            {children}
          </main>
        </SidebarProvider>
      </body>
    </html>
  )
}