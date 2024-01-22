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

    // if rider has ongoing ride requests that are REQUESTED or ACCEPTED cancel all

    const riderCreated = await prisma.ride.create({
      data: {
        distance,
        estDuration,
        fromLat,
        fromLng,
        fromName,
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
    return NextResponse.json({ ...riderCreated }, { status: 200 })
  } catch (error) {
    console.log('Error creating ride', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { rideId, status } = await request.json()

    const existingRide = await prisma.ride.findUnique({
      where: {
        id: rideId,
      },
    })

    if (!existingRide) {
      return new NextResponse('Ride not found', { status: 404 })
    }

    const updatedRide = await prisma.ride.update({
      where: {
        id: rideId,
      },
      data: {
        status,
        cancelledAt: new Date(),
      },
    })

    console.log('updatedRide', updatedRide)
    return NextResponse.json({ ...updatedRide }, { status: 200 })
  } catch (error) {
    console.log('Error updating ride', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
