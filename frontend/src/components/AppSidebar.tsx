import {
  ChevronUp,
  Home,
  List,
  LogOut,
  MailPlus,
  Settings,
  User2,
} from 'lucide-react'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import logo from '../../public/faceUp-logo.svg'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'

interface SidebarItems {
  title: string
  url: string
  icon: any
  className?: string
}
const items: SidebarItems[] = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'Add Alert',
    url: '/alerts/add',
    icon: MailPlus,
    className: 'font-bold',
  },
  {
    title: 'View Alerts',
    url: '/alerts',
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
                  <SidebarMenuButton asChild className={item.className}>
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
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> Username
                  <ChevronUp className='ml-auto' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                className='w-[--radix-popper-anchor-width]'
              >
                <DropdownMenuItem>
                  <User2 />
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <LogOut />
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
