import { useRide } from '@/components/providers/current-ride-provider'
import { Ride } from '@/types'
import { RideStatus } from '@prisma/client'
import useDirections, { Coordinates } from './use-directions'

const useRideActions = () => {
  const { setCurrentRide } = useRide()
  const { calculateDirections } = useDirections()

  const acceptRide = async (ride: Ride, driverId: string) => {
    try {
      const response = await fetch(`/api/socket/rides/${ride.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rideId: ride.id,
          driverId,
          status: RideStatus.ACCEPTED,
        }),
      })
      if (response.ok) {
        setCurrentRide({ ...ride, status: RideStatus.ACCEPTED })
      } else {
        console.error('Failed to accept ride:', response.statusText)
      }
    } catch (error) {
      console.error('Error accepting ride:', error)
    }
  }

  const cancelRide = async (ride: Ride) => {
    try {
      const response = await fetch(`/api/socket/rides/${ride.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rideId: ride.id,
          status: RideStatus.CANCELLED,
        }),
      })
      if (response.ok) {
        setCurrentRide({ ...ride, status: RideStatus.CANCELLED })
      } else {
        console.error('Failed to cancel ride:', response.statusText)
      }
    } catch (error) {
      console.error('Error cancelling ride:', error)
    }
  }

  const finishRide = async (ride: Ride) => {
    try {
      const response = await fetch(`/api/socket/rides/${ride.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rideId: ride.id,
          status: RideStatus.COMPLETED,
        }),
      })
      if (response.ok) {
        setCurrentRide({ ...ride, status: RideStatus.COMPLETED })
      } else {
        console.error('Failed to finish ride:', response.statusText)
      }
    } catch (error) {
      console.error('Error finishing ride:', error)
    }
  }

  const searchRide = async ({
    destination,
    origin,
    riderId,
  }: {
    origin: Coordinates
    destination: Coordinates
    riderId: string
  }) => {
    try {
      const calculatedRoute = await calculateDirections(origin, destination)
      const directionDetails = calculatedRoute!.routes[0]?.legs[0]
      if (!directionDetails) {
        throw new Error('Directions not found')
      }
      const response = await fetch('/api/rides', {
        body: JSON.stringify({
          riderId,
          estDuration: directionDetails.duration!.value,
          toName: directionDetails.start_address,
          toLat: origin.lat,
          toLng: origin.lng,
          fromLat: destination.lat,
          fromLng: destination.lng,
          fromName: directionDetails.end_address,
          distance: directionDetails.distance!.value,
        }),
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
      if (response.ok) {
        const ride = await response.json()
        setCurrentRide(ride)
      } else {
        console.error('Failed to finish ride:', response.statusText)
      }
    } catch (error) {
      console.error('Error finishing ride:', error)
    }
  }

  return { acceptRide, cancelRide, finishRide, searchRide }
}

export default useRideActions
