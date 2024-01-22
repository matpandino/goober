import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Ride } from '@/types'
import CancelRideButton from '../ride/cancel-ride-button'
import CardRideContentInfo from '../ride/card-ride-content-info'

const EstimatedRideCard = ({ ride }: { ride: Ride }) => {
  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-md">Searching for a driver</CardTitle>
        <CardDescription className="text-xs">
          <b>From:</b> <i>{ride.fromName}</i>
        </CardDescription>
        <CardDescription className="text-xs">
          <b>To:</b> <i>{ride.toName}</i>
        </CardDescription>
      </CardHeader>
      <CardRideContentInfo ride={ride} showRiderInfo={false} />
      <CardFooter>
        <CancelRideButton />
      </CardFooter>
    </Card>
  )
}

export default EstimatedRideCard
