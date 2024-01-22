'use client'

import { useSocket } from '@/components/providers/socket-provider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type Ride } from '@/types'
import { RideStatus } from '@prisma/client'
import { useQuery } from 'react-query'
import { useRide } from '../providers/current-ride-provider'
import { useUser } from '../providers/user-provider'
import { Button } from '../ui/button'

const PendingRides = () => {
  const { isConnected } = useSocket()
  const { driver } = useUser()
  const { setCurrentRide } = useRide()

  const { isLoading, data, refetch } = useQuery(
    'pendingRides',
    async () =>
      await fetch('/api/rides/pending').then(async (res) => await res.json()),
    {
      refetchInterval: !isConnected ? 1000 : undefined,
    },
  )

  const handleAcceptRide = async (ride: Ride) => {
    try {
      const response = await fetch('/api/rides', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rideId: ride.id,
          driverId: driver?.id,
          status: RideStatus.ACCEPTED,
        }),
      })

      if (response.ok) {
        setCurrentRide(ride)
        refetch()
      } else {
        console.error('Failed to cancel ride:', response.statusText)
      }
    } catch (error) {
      console.error('Error accepting ride:', error)
    }
  }

  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-md">Pending rides</CardTitle>
      </CardHeader>
      <CardContent>
        {!!data?.rides?.length && (
          <div className="overflow-hidden rounded-md border border-gray-300 bg-background">
            <ul role="list" className="divide-y divide-gray-300">
              {data?.rides?.map((ride: Ride) => (
                <li
                  key={ride.id}
                  className="flex px-6 py-4 text-sm justify-between items-center"
                >
                  <span>{ride.rider.name} is pending a ride</span>
                  <Button
                    disabled={isLoading}
                    onClick={async () => {
                      await handleAcceptRide(ride)
                    }}
                  >
                    Accept
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isLoading && <span>Loading</span>}
        {!isLoading && data.rides?.length === 0 && (
          <span>No pending rides found</span>
        )}
      </CardContent>
    </Card>
  )
}

export default PendingRides
