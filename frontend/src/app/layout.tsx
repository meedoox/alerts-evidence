import type { Metadata } from 'next'
import './globals.css'

import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'

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
      <body>
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
