'use client'

import { useUser } from '@/components/providers/user-provider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useRideActions from '@/hooks/use-ride-actions'
import { kmFormatter, moneyFormatter } from '@/lib/utils'
import { type Ride } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'

const PendingRides = () => {
  const { driver } = useUser()
  const { acceptRide } = useRideActions()
  const [isLoadingAccept, setIsLoadingAccept] = useState(false)
  const [rejectedRides, setRejectedRides] = useState<string[]>([])

  const { isLoading, data } = useQuery({
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
    setIsLoadingAccept(true)
    await acceptRide(ride, driver.id)
    setIsLoadingAccept(false)
  }

  const handleRejectRide = (ride: Ride) => {
    setRejectedRides((prev) => [...prev, ride.id])
  }

  const filteredRides = (data?.rides as Ride[] | undefined)?.filter(
    (ride) => !rejectedRides.includes(ride.id),
  )

  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-md">Pending rides</CardTitle>
      </CardHeader>
      <CardContent>
        {!!data?.rides?.length && (
          <div className="overflow-hidden rounded-md border border-gray-300 bg-background">
            <ul role="list" className="divide-y divide-gray-300">
              {filteredRides?.map((ride: Ride) => (
                <li
                  key={ride.id}
                  className="flex px-6 py-4 gap-2 text-sm justify-between items-center"
                >
                  <div className="flex-col">
                    <span>
                      <b>{ride.rider.name}</b> is pending a{' '}
                      <b>{kmFormatter.format(ride.distance / 1000)}</b> ride
                    </span>
                    <br />
                    <span className="text-slate-500 text-xs">
                      <b>From:</b> <i>{ride.fromName}</i>
                    </span>
                    <br />
                    <span className="text-slate-500 text-xs">
                      <b>To:</b> <i>{ride.toName}</i>
                    </span>
                    <br />
                    <span className="text-base text-green-700">
                      {moneyFormatter.format(ride.price / 100)}
                    </span>
                  </div>
                  <div className="flex flex-col  gap-3">
                    <Button
                      disabled={isLoadingAccept}
                      onClick={() => handleAcceptRide(ride)}
                    >
                      Accept
                    </Button>
                    <Button
                      className="bg-red-600 hover:bg-red-500"
                      disabled={isLoadingAccept}
                      onClick={() => handleRejectRide(ride)}
                    >
                      Reject
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {isLoading && <span>Loading</span>}
        {!isLoading && data.rides?.length === 0 && (
          <span className="text-slate-500">No pending rides at the moment</span>
        )}
      </CardContent>
    </Card>
  )
}

export default PendingRides
