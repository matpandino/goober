import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Ride, RideStatus } from '@prisma/client'
import EstimatedRideCard from './estimated-ride-card'
import AcceptedRideCard from './accepted-ride-card'

const CurrentRide = ({ ride }: { ride: Ride }) => {
  if (ride.status === RideStatus.REQUESTED) {
    return <EstimatedRideCard ride={ride} />
  }
  if (ride.status === RideStatus.ACCEPTED) {
    return <AcceptedRideCard ride={ride} />
  }

  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-md">{ride.status} trip</CardTitle>
        <CardDescription className="text-xs">
          <b>From:</b> <i>{ride.fromName}</i>
        </CardDescription>
        <CardDescription className="text-xs">
          <b>To:</b> <i>{ride.toName}</i>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <span className="text-sm text-slate-600">
          Duration: {ride.estDuration}
        </span>
        <br />
        <span className="text-sm text-slate-600">
          Distance: {ride.distance}
        </span>
      </CardContent>
    </Card>
  )
}

export default CurrentRide