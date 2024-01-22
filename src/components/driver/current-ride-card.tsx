import AcceptedRideCard from '@/components/ride/accepted-ride-card'
import CompletedRideCard from '@/components/ride/completed-ride-card'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Ride } from '@/types'
import { RideStatus } from '@prisma/client'
import CanceledRideCard from '../ride/canceled-ride-card'
import CardRideContentInfo from '../ride/card-ride-content-info'

const CurrentRide = ({ ride }: { ride: Ride }) => {
  if (ride.status === RideStatus.ACCEPTED) {
    return <AcceptedRideCard ride={ride} showDriverInfo={false} />
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
