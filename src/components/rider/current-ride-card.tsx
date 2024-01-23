import AcceptedRideCard from '@/components/ride/accepted-ride-card'
import CanceledRideCard from '@/components/ride/canceled-ride-card'
import CardRideContentInfo from '@/components/ride/card-ride-content-info'
import CompletedRideCard from '@/components/ride/completed-ride-card'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Ride } from '@/types'
import { RideStatus } from '@prisma/client'
import EstimatedRideCard from './estimated-ride-card'

const CurrentRide = ({ ride }: { ride: Ride }) => {
  if (ride.status === RideStatus.REQUESTED) {
    return <EstimatedRideCard ride={ride} />
  }
  if (ride.status === RideStatus.ACCEPTED) {
    return <AcceptedRideCard ride={ride} showRiderInfo={false} />
  }
  if (ride.status === RideStatus.COMPLETED) {
    return <CompletedRideCard ride={ride} />
  }
  if (ride.status === RideStatus.CANCELLED) {
    return <CanceledRideCard ride={ride} />
  }

  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-lg">{ride.status} trip</CardTitle>
        <CardDescription className="text-xs">
          <b>From:</b> <i>{ride.fromName}</i>
        </CardDescription>
        <CardDescription className="text-xs">
          <b>To:</b> <i>{ride.toName}</i>
        </CardDescription>
      </CardHeader>
      <CardRideContentInfo ride={ride} />
    </Card>
  )
}

export default CurrentRide
