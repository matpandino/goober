import { calculateRidePrice } from '@/lib/calculate-ride-price'
import { prisma } from '@/lib/prisma'
import { type RideCreateBody } from '@/types'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const {
      riderId,
      distance,
      estDuration,
      fromLat,
      fromLng,
      fromName,
      toLat,
      toLng,
      toName,
    } = await request.json()

    const existingRider = await prisma.rider.findFirst({
      where: { id: riderId },
      include: { rides: true },
    })

    if (!existingRider) {
      return NextResponse.json({ error: 'Rider not found' }, { status: 400 })
    }

    const ridePrice = calculateRidePrice({
      distanceMeters: distance,
      durationSeconds: estDuration,
    })

    const riderCreated = await prisma.ride.create({
      data: {
        distance,
        estDuration,
        fromLat,
        fromLng,
        fromName,
        price: ridePrice,
        toLat,
        toLng,
        toName,
        rider: {
          connect: {
            id: riderId,
          },
        },
      } as RideCreateBody,
    })
    console.log('riderCreated', riderCreated)
    return NextResponse.json(riderCreated, { status: 200 })
  } catch (error) {
    console.log('Error creating ride', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
