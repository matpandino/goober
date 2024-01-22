'use client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Ride } from '@/types'
import CardRideContentInfo from '../ride/card-ride-content-info'
import ResetRide from '../ride/reset-ride-button'

const CompletedRideCard = ({ ride }: { ride: Ride }) => {
  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-lg">Completed trip</CardTitle>
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

export default CompletedRideCard
