'use client'

import { cancelRide } from '@/actions/cancelRideAction'
import { Button } from '@/components/ui/button'
import { useTransition } from 'react'

const CancelTripButton = ({ rideId }: { rideId: string }) => {
  const [_, startTransition] = useTransition()

  return (
    <Button
      className="w-full bg-red-600 hover:bg-red-500"
      onClick={() => {
        startTransition(() => {
          cancelRide(rideId)
        })
      }}
    >
      Cancel
    </Button>
  )
}

export default CancelTripButton
