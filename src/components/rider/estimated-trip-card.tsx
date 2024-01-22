import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

const EstimatedTripCard = ({ direction }: { direction: google.maps.DirectionsResult }) => {
    return (
        <Card className="bg-slate-100">
            <CardHeader>
                <CardTitle className="text-md">Estimated trip</CardTitle>
                <CardDescription className="text-xs">
                    <b>From:</b> <i>{direction?.routes[0].legs[0].end_address}</i>
                </CardDescription>
                <CardDescription className="text-xs">
                    <b>To:</b> <i>{direction?.routes[0].legs[0].start_address}</i>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <span className="text-sm text-slate-600">
                    Duration: {direction?.routes[0].legs[0].duration?.text}
                </span>
                <br />
                <span className="text-sm text-slate-600">
                    Distance: {direction?.routes[0].legs[0]?.distance?.text}
                </span>
            </CardContent>
        </Card>
    )
}

export default EstimatedTripCard