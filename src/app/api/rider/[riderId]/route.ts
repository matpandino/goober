import { RideStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest, { params: { riderId } }: { params: { riderId?: string } }) {
    console.log('DRIVERID', riderId)

    const currentRide = await prisma.ride.findFirst({
        where: {
            riderId: {
                equals: riderId,
            },
            status: {
                equals: RideStatus.ACCEPTED
            },
        },
        include: {
            rider: true,
            driver: true
        }
    })

    return NextResponse.json(currentRide, { status: 200 })
}
