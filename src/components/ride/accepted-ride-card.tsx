'use client'

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Ride } from '@/types'
import CancelRideButton from './cancel-ride-button'
import CardRideContentInfo from './card-ride-content-info'

const AcceptedRideCard = ({ ride, showDriverInfo = true, showRiderInfo = true }: { ride: Ride, showDriverInfo?: boolean, showRiderInfo?: boolean }) => {
  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-lg">Ongoing trip</CardTitle>
        <CardDescription className="text-xs">
          <b>From:</b> <i>{ride.fromName}</i>
        </CardDescription>
        <CardDescription className="text-xs">
          <b>To:</b> <i>{ride.toName}</i>
        </CardDescription>
      </CardHeader>
      <CardRideContentInfo ride={ride} showRiderInfo={showRiderInfo} showDriverInfo={showDriverInfo} />
      <CardFooter>
        <CancelRideButton />
      </CardFooter>
    </Card>
  )
}

export default AcceptedRideCard
