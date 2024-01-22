'use client'

import PendingRides from '@/components/driver/pending-rides'
import { useUser } from '@/components/providers/user-provider'
import { Layout } from '@/components/ui/app-layout'
import { Button } from '@/components/ui/button'
import Map from '@/components/ui/map'
import SocketIndicator from '@/components/ui/socket-indicator'
import useComponentDimensions from '@/hooks/useComponentDimensions'
import { DirectionsRenderer } from '@react-google-maps/api'
import { useRouter } from 'next/navigation'
import { useRef, useState } from 'react'

interface Coordinates {
  lat: number
  lng: number
}

export default function Page() {
  const router = useRouter()
  const { driver, logoutDriver } = useUser()
  const ref = useRef<HTMLDivElement>(null)
  const { height: mapHeight, width: mapWidth } = useComponentDimensions(ref)
  const [direction, setDirection] =
    useState<google.maps.DirectionsResult | null>(null)

  const calculateRoute = async (
    origin: Coordinates,
    destination: Coordinates,
  ) => {
    try {
      const directionService = new google.maps.DirectionsService()
      const result = await directionService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      console.log('result:', result)
      setDirection(result)
    } catch (error) {
      console.error('calculate route error', error)
    }
  }

  const clearRoute = async () => {
    setDirection(null)
  }

  // const handleSearch = async (route: SearchForTripArgs) => {
  //     // change status: waiting for driver
  //     // if (route) {
  //     //     await calculateRoute({ lat: route.from.lat, lng: route.from.lng }, { lat: route.to.lat, lng: route.to.lng })
  //     // } else {
  //     //     clearRoute()
  //     // }
  // };

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
          <PendingRides />
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
