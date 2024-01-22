'use client'

import { useRide } from '@/components/providers/current-ride-provider'
import Map from '@/components/ui/map'
import useComponentDimensions from '@/hooks/use-component-dimensions'
import useDirections from '@/hooks/use-directions'
import { RideStatus } from '@prisma/client'
import { DirectionsRenderer } from '@react-google-maps/api'
import { ReactNode, useEffect, useRef } from 'react'

const RideMap = ({ children }: { children?: ReactNode }) => {
  const { calculateDirections, clearDirections, direction } = useDirections()
  const { currentRide } = useRide()
  const ref = useRef<HTMLDivElement>(null)
  const { height: mapHeight, width: mapWidth } = useComponentDimensions(ref)

  useEffect(() => {
    const updateMap = async () => {
      console.log('updating map', currentRide)
      if (
        currentRide?.id &&
        currentRide.status !== RideStatus.COMPLETED &&
        currentRide.status !== RideStatus.CANCELLED
      ) {
        console.log('updating map1')
        const { fromLat, fromLng, toLat, toLng } = currentRide
        await calculateDirections(
          { lat: fromLat, lng: fromLng },
          { lat: toLat, lng: toLng },
        )
      } else {
        console.log('updating map2')
        await clearDirections()
      }
    }
    updateMap()
    return () => {
      clearDirections()
    }
  }, [currentRide?.id])

  return (
    <div ref={ref} className="w-full rounded-md">
      <Map
        mapContainerStyle={{
          height: mapHeight,
          width: mapWidth,
          borderRadius: 10,
        }}
      >
        {direction && <DirectionsRenderer directions={direction} />}
        {children}
      </Map>
    </div>
  )
}

export default RideMap
