'use client'

import { useRide } from '@/components/providers/current-ride-provider'
import { useUser } from '@/components/providers/user-provider'
import CurrentRide from '@/components/rider/current-ride-card'
import {
  SearchTrip
} from '@/components/rider/search-trip'
import { Layout } from '@/components/ui/app-layout'
import { Button } from '@/components/ui/button'
import SocketIndicator from '@/components/ui/socket-indicator'
import { Coordinates } from '@/hooks/use-directions'
import useRideActions from '@/hooks/use-ride-actions'
import { RideStatus } from '@prisma/client'
import { useRouter } from 'next/navigation'

export default function Page() {
  const router = useRouter()
  const { rider, logoutRider } = useUser()
  const { currentRide } = useRide()
  const { searchRide } = useRideActions()

  const handleSearch = async ({ destination, origin }: { origin: Coordinates, destination: Coordinates }) => {
    try {
      if (!rider?.id) {
        throw new Error('Rider is not present')
      }
      await searchRide({ destination, origin, riderId: rider.id })
    } catch (error) {
      console.error('Error searching route', error)
    }
  }

  const handleLogout = () => {
    logoutRider()
    router.push('/')
  }

  const showRideSearch = (!currentRide ||
    currentRide.status === RideStatus.CANCELLED ||
    currentRide.status === RideStatus.COMPLETED)

  return (
    <Layout
      header={
        <div className="flex flex-1 justify-between">
          <span>Goober</span>
          <div>
            <SocketIndicator />
          </div>
          {rider?.id && (
            <>
              <span>Hello {rider?.name}!</span>{' '}
              <Button onClick={handleLogout}>Logout</Button>
            </>
          )}
        </div>
      }
      leftContent={
        <div className="flex flex-col w-full gap-2 bg-background">
          {(showRideSearch) && (
            <SearchTrip onSearch={({ from, to }) => handleSearch({ origin: from, destination: to })} />
          )}
          {currentRide && <CurrentRide ride={currentRide} />}
        </div>
      }
      // rightContent={<RideMap />}
    />
  )
}
