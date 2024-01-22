'use client'

import PendingRides from '@/components/driver/pending-rides'
import { useRide } from '@/components/providers/current-ride-provider'
import { useUser } from '@/components/providers/user-provider'
import { Layout } from '@/components/ui/app-layout'
import { Button } from '@/components/ui/button'
import SocketIndicator from '@/components/ui/socket-indicator'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const { driver, logoutDriver } = useUser()
  const { currentRide } = useRide()

  const handleLogout = () => {
    logoutDriver()
    router.push('/')
  }

  return (
    <Layout
      header={
        <div className="flex flex-1 justify-between">
          <span>Goober</span>
          <div>
            <SocketIndicator />
          </div>
          {driver?.id && (
            <>
              <span>Hello {driver?.name}!</span>{' '}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>
      }
      leftContent={
        <div className="flex flex-col w-full gap-2 bg-background">
          {currentRide && (
            JSON.stringify(currentRide, null, 2)
          )}
          {!currentRide && <PendingRides />}
        </div>
      }
      // rightContent={<RideMap />}
    />
  )
}
