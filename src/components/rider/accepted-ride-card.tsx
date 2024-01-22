'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Ride } from '@prisma/client'
import CancelTripButton from '../ride/cancel-trip-button'

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
                    Duration: {ride.estDuration}
                </span>
                <br />
                <span className="text-sm text-slate-600">
                    Distance: {ride.distance}
                </span>
            </CardContent>
            <CancelTripButton rideId={ride.id} />
        </Card>
    )
}

export default AcceptedRideCard