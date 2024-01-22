'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type Ride } from '@prisma/client'
import { formatSecondsToText, kmFormatter } from '../../lib/utils'
import CancelRideButton from '../ride/cancel-ride-button'

const AcceptedRideCard = ({ ride }: { ride: Ride }) => {
  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-md">Ongoing trip</CardTitle>
        <CardDescription className="text-xs">
          <b>From:</b> <i>{ride.fromName}</i>
        </CardDescription>
        <CardDescription className="text-xs">
          <b>To:</b> <i>{ride.toName}</i>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-slate-600">
          Duration: {formatSecondsToText(ride.estDuration)}
        </span>
        <br />
        <span className="text-sm text-slate-600">
          Distance: {kmFormatter.format(ride.distance / 1000)}
        </span>
      </CardContent>
      <CancelRideButton/>
    </Card>
  )
}

export default AcceptedRideCard
