import { Home, List } from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import logo from '../../public/faceUp-logo.svg'

// Menu items.
const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'View Reports',
    url: '/reports',
    icon: List,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarContent className='my-4'>
        <SidebarGroup>
          <SidebarGroupLabel>
            <div className='text-center w-full px-4'>
              <Image src={logo} alt='NNTB logo' className='mx-auto w-1/2' />
            </div>
          </SidebarGroupLabel>
          <SidebarGroupContent className='my-8'>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
