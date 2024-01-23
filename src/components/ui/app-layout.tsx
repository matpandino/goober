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
    if (isDriverApp && rider?.id) {
      logoutRider()
    }
    if (!isDriverApp && driver?.id) {
      logoutDriver()
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
      <main className="h-full w-full flex p-4 gap-4">
        {leftContent && (
          <div className="h-full w-2/5 max-w-lg flex bg-background">
            <div className="flex-1 flex rounded-lg bg-slate-100">
              {leftContent}
            </div>
          </div>
        )}
        {rightContent && (
          <div className="h-full flex-1 w-auto flex bg-background">
            <div className="flex-1 flex rounded-lg bg-slate-200">
              {rightContent}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
