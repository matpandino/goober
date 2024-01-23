import { prisma } from '@/lib/prisma'
import { type RideCreateBody } from '@/types'
import { NextResponse } from 'next/server'
import { calculateRidePrice } from '../../../lib/calculate-ride-price'

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

// export async function PUT(request: Request) {
//   try {
//     const { rideId, status, driverId } = await request.json()

//     const existingRide = await prisma.ride.findUnique({
//       where: {
//         id: rideId,
//       },
//     })

//     if (!existingRide) {
//       return new NextResponse('Ride not found', { status: 404 })
//     }

//     const updatedRide = await prisma.ride.update({
//       where: {
//         id: rideId,
//       },
//       data: {
//         status,
//         cancelledAt: status.status === RideStatus.CANCELLED ? new Date() : undefined,
//         ...(!!driverId ? {
//           rider: {
//             connect: {
//               id: driverId,
//             }
//           }
//         } : {}),
//       },
//     })

//     const rideKey = `ride:${existingRide.id}:update`;
//     response.socket?.server?.io?.emit(rideKey, {
//       ride: updatedRide,
//     })

//     console.log('socket =', JSON.stringify(response))

//     console.log('updatedRide', updatedRide)
//     return NextResponse.json({ ...updatedRide }, { status: 200 })
//   } catch (error) {
//     console.log('Error updating ride', error)
//     return new NextResponse('Internal Error', { status: 500 })
//   }
// }
