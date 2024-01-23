'use client'

import { useUser } from '@/components/providers/user-provider'
import { usePathname, useRouter } from 'next/navigation'
import { type ReactNode } from 'react'
import { Button } from './button'
import SocketIndicator from './socket-indicator'

interface LayoutProps {
  leftContent?: ReactNode
  rightContent?: ReactNode
}

export const Layout = ({ leftContent, rightContent }: LayoutProps) => {
  const pathname = usePathname()
  const router = useRouter()
  const { driver, rider, logoutRider, logoutDriver } = useUser()
  const isDriverApp = !!pathname?.includes('driver')

  const handleLogout = () => {
    if (isDriverApp && driver?.id) {
      logoutDriver()
    }
    if (!isDriverApp && rider?.id) {
      logoutRider()
    }
    router.push('/')
  }

  return (
    <div className="flex h-screen flex-col w-full bg-background">
      <header className="bg-background w-full px-2">
        <nav
          className="mx-auto flex items-center justify-between p-3"
          aria-label="Global"
        >
          <div>
            <span className="mr-2">
              Goober <b>{isDriverApp ? 'driver' : 'rider'}</b>
            </span>
            <SocketIndicator />
          </div>
          {isDriverApp && driver?.id && (
            <div>
              <span className="mr-2">Hello {driver?.name}!</span>{' '}
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          )}
          {!isDriverApp && rider?.id && (
            <div>
              <span className="mr-2">Hello {rider?.name}!</span>{' '}
              <Button onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </nav>
      </header>
      <main className="h-full w-full flex flex-col md:flex-row p-4 gap-4">
        {leftContent && (
          <div className="w-full min-w-96 md:w-3/5 ">
            <div className="flex flex-1 h-auto rounded-lg bg-slate-100">
              {leftContent}
            </div>
          </div>
        )}
        {rightContent && (
          <div className="h-full flex flex-1 w-auto ">
            <div className="flex flex-1 w-auto rounded-lg bg-slate-100">
              {rightContent}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
