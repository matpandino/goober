'use client'

import { useRide } from '@/components/providers/current-ride-provider'
import { useUser } from '@/components/providers/user-provider'
import RideMap from '@/components/ride/ride-map'
import CurrentRide from '@/components/rider/current-ride-card'
import { SearchTrip } from '@/components/rider/search-trip'
import { Layout } from '@/components/ui/app-layout'
import { Coordinates } from '@/hooks/use-directions'
import useRideActions from '@/hooks/use-ride-actions'
import { useState } from 'react'

export default function Page() {
  const { rider } = useUser()
  const { currentRide } = useRide()
  const { searchRide } = useRideActions()
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async ({
    destination,
    origin,
  }: {
    origin: Coordinates
    destination: Coordinates
  }) => {
    try {
      setIsLoading(true)
      if (!rider?.id) {
        throw new Error('Rider is not present')
      }
      await searchRide({ destination, origin, riderId: rider.id })
    } catch (error) {
      console.error('Error searching route', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Layout
      leftContent={
        <div className="flex flex-col w-full gap-2 bg-background">
          {!currentRide && (
            <SearchTrip
              disableSearchButton={isLoading}
              onSearch={({ from, to }) =>
                handleSearch({ origin: from, destination: to })
              }
            />
          )}
          {currentRide && <CurrentRide ride={currentRide} />}
        </div>
      }
      rightContent={<RideMap />}
    />
  )
}
