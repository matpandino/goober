import { RideStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'

export async function GET(
  request: NextRequest,
  { params: { driverId } }: { params: { driverId?: string } },
) {
  console.log('DRIVERID', driverId)

  const currentRide = await prisma.ride.findFirst({
    where: {
      driverId: {
        equals: driverId,
      },
      status: {
        equals: RideStatus.ACCEPTED,
      },
    },
    include: {
      rider: true,
      driver: true,
    },
  })

  return NextResponse.json(currentRide, { status: 200 })
}
