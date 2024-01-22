'use server'

import { prisma } from '@/lib/prisma'
import { RideStatus } from '@prisma/client'

export async function cancelRide(rideId: string) {
  const response = await prisma.ride.update({
    where: { id: rideId },
    data: {
      status: RideStatus.CANCELLED,
    },
  })
  return response
}
