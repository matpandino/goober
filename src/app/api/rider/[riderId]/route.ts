import { RideStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(request: NextRequest, { params: { riderId } }: { params: { riderId?: string } }) {

    const currentRide = await prisma.ride.findFirst({
        where: {
            AND: [{
                riderId: {
                    equals: riderId,
                }
            },
            {
                OR: [{
                    status: {
                        equals: RideStatus.ACCEPTED
                    },
                },
                {
                    status: {
                        equals: RideStatus.REQUESTED
                    }
                }]
            }]
        },
        include: {
            rider: true,
            driver: true
        }
    })

    return NextResponse.json(currentRide, { status: 200 })
}
