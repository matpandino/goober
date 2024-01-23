import { prisma } from '@/lib/prisma'
import { RideStatus } from '@prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params: { driverId } }: { params: { driverId?: string } },
) {
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
