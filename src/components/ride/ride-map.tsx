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
      if (
        currentRide?.id &&
        currentRide.status !== RideStatus.COMPLETED &&
        currentRide.status !== RideStatus.CANCELLED
      ) {
        const { fromLat, fromLng, toLat, toLng } = currentRide
        await calculateDirections(
          { lat: fromLat, lng: fromLng },
          { lat: toLat, lng: toLng },
        )
      } else {
        await clearDirections()
      }
    }
    updateMap()
    return () => {
      clearDirections()
    }
  }, [currentRide?.id])

  return (
    <div ref={ref} className="flex flex-1 relative rounded-md">
      w{mapWidth} h{mapHeight}
      <Map
        mapContainerStyle={{
          width: mapWidth,
          height: mapHeight,
          position: 'absolute',
          borderRadius: 8,
        }}
      >
        {direction && <DirectionsRenderer directions={direction} />}
        {children}
      </Map>
    </div>
  )
}

export default RideMap
