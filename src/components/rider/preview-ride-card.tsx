import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { type Ride } from '@prisma/client'

const PreviewRideCard = ({ ride }: { ride: Partial<Ride> }) => {
  return (
    <Card className="bg-slate-100">
      <CardHeader>
        <CardTitle className="text-md">Preview ride</CardTitle>
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

export default PreviewRideCard
