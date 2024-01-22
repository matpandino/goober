'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { type Ride } from '@/types'
import { useQuery } from '@tanstack/react-query'
import useRideActions from '../../hooks/use-ride-actions'
import { useUser } from '../providers/user-provider'
import { Button } from '../ui/button'

const PendingRides = () => {
  const { driver } = useUser()
  const { acceptRide } = useRideActions()

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['pendingRides'],
    queryFn: async () =>
      await fetch('/api/rides/pending').then(async (res) => await res.json()),
    refetchInterval: 1000,
  })

  const handleAcceptRide = async (ride: Ride) => {
    if (!driver?.id) {
      console.error('Driver not found')
      return
    }
    await acceptRide(ride, driver.id)
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
                    onClick={() => handleAcceptRide(ride)}
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
