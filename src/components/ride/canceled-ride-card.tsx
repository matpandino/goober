'use client'

import CardRideContentInfo from '@/components/ride/card-ride-content-info'
import ResetRide from '@/components/ride/reset-ride-button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Ride } from '@/types'

const CanceledRideCard = ({ ride }: { ride: Ride }) => {
  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-lg text-red-600">Canceled ride</CardTitle>
        <CardDescription className="text-xs">
          <b>From:</b> <i>{ride.fromName}</i>
        </CardDescription>
        <CardDescription className="text-xs">
          <b>To:</b> <i>{ride.toName}</i>
        </CardDescription>
      </CardHeader>
      <CardRideContentInfo ride={ride} />
      <CardFooter>
        <ResetRide />
      </CardFooter>
    </Card>
  )
}

export default CanceledRideCard
