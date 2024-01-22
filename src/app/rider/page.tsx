'use client'

import { useUser } from '@/components/providers/user-provider'
import CurrentRide from '@/components/rider/current-ride-card'
import {
  SearchTrip,
  type SearchForTripArgs,
} from '@/components/rider/search-trip'
import { Layout } from '@/components/ui/app-layout'
import { Button } from '@/components/ui/button'
import Map from '@/components/ui/map'
import SocketIndicator from '@/components/ui/socket-indicator'
import useComponentDimensions from '@/hooks/use-component-dimensions'
import useDirections from '@/hooks/use-directions'
import { RideStatus } from '@prisma/client'
import { DirectionsRenderer } from '@react-google-maps/api'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'

export default function Page() {
  const router = useRouter()
  const { rider, logoutRider, syncUsers } = useUser()
  const ref = useRef<HTMLDivElement>(null)
  const { height: mapHeight, width: mapWidth } = useComponentDimensions(ref)
  const { calculateDirections, clearDirections, direction } = useDirections()

  const activeRide = rider?.rides?.[rider?.rides?.length - 1] || null

  useEffect(() => {
    syncUsers()
  }, [])

  const handleSearch = async (route: SearchForTripArgs) => {
    try {
      if (route) {
        const calculatedRoute = await calculateDirections(
          { lat: route.from.lat, lng: route.from.lng },
          { lat: route.to.lat, lng: route.to.lng },
        )
        if (calculatedRoute) {
          const directionDetails = calculatedRoute!.routes[0]?.legs[0]
          if (!directionDetails) {
            // todo: no direction found
            console.error('direction not found')
            return
          }

          const newRideResponse = await fetch('/api/rides', {
            body: JSON.stringify({
              riderId: rider?.id,
              estDuration: directionDetails.duration!.value,
              toName: directionDetails.start_address,
              toLat: route.to.lat,
              toLng: route.to.lng,
              fromLat: route.from.lat,
              fromLng: route.from.lng,
              fromName: directionDetails.end_address,
              distance: directionDetails.distance?.value,
            }),
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          })
          if (newRideResponse.status === 200) {
            await syncUsers()
          }
        }
      } else {
        clearDirections()
      }
    } catch (error) {
      clearDirections()
      console.error('Error searching route', error)
    }
  }

  const handleLogout = () => {
    logoutRider()
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
          {(!activeRide ||
            activeRide.status === RideStatus.CANCELLED ||
            activeRide.status === RideStatus.COMPLETED) && (
            <SearchTrip onSearch={handleSearch} />
          )}
          {activeRide && <CurrentRide ride={activeRide} />}
        </div>
      }
      rightContent={
        <div ref={ref} className="bg-red-300 w-full rounded-md">
          <Map
            mapContainerStyle={{
              height: mapHeight,
              width: mapWidth,
              borderRadius: 10,
            }}
          >
            {direction && <DirectionsRenderer directions={direction} />}
          </Map>
        </div>
      }
    />
  )
}
