import { prisma } from '@/lib/prisma'
import { NextApiResponseServerIO } from '@/types'
import { RideStatus } from '@prisma/client'
import { NextApiRequest } from 'next'

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponseServerIO,
) {
  if (request.method !== 'PUT') {
    return response.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { rideId } = request.query
    const { status, driverId } = request.body

    const existingRide = await prisma.ride.findUnique({
      where: {
        id: rideId as string,
      },
    })

    if (!existingRide) {
      return response.status(404).json({ error: 'Ride not found' })
    }

    if (
      status === RideStatus.ACCEPTED &&
      existingRide.status !== RideStatus.REQUESTED
    ) {
      return response.status(400).json({ error: 'Ride is not available' })
    }

    const updatedRide = await prisma.ride.update({
      where: {
        id: rideId as string,
      },
      data: {
        status: status as RideStatus | undefined,
        cancelledAt:
          (status as RideStatus | undefined) === RideStatus.CANCELLED
            ? new Date()
            : undefined,
        acceptedAt:
          (status as RideStatus | undefined) === RideStatus.ACCEPTED
            ? new Date()
            : undefined,
        completedAt:
          (status as RideStatus | undefined) === RideStatus.COMPLETED
            ? new Date()
            : undefined,
        ...(driverId
          ? {
              driver: {
                connect: {
                  id: driverId as string,
                },
              },
            }
          : {}),
      },
      include: {
        driver: true,
        rider: true,
      },
    })

    const rideKey = `ride:${existingRide.id}:update`
    response?.socket?.server?.io?.emit(rideKey, {
      ride: updatedRide,
    })

    return response.status(200).json(updatedRide)
  } catch (error) {
    console.log('Error updating ride', error)
    return response.status(500).json({ error: 'Internal Error' })
  }
}
