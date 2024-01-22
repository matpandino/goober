import React from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Ride } from '@prisma/client'
import CancelTripButton from '../ride/cancel-trip-button'

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
            <CardContent>
                <span className="text-sm text-slate-600">
                    Duration: {ride.estDuration}
                </span>
                <br />
                <span className="text-sm text-slate-600">
                    Distance: {ride.distance}
                </span>
            </CardContent>
            <CardFooter>
                <CancelTripButton rideId={ride.id} />
            </CardFooter>
        </Card>
    )
}

export default EstimatedRideCard