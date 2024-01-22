import { prisma } from "@/lib/prisma";
import { NextApiResponseServerIO } from "@/types";
import { RideStatus } from "@prisma/client";
import { NextApiRequest } from "next";

export default async function handler(
    request: NextApiRequest,
    response: NextApiResponseServerIO,
) {
    if (request.method !== "PUT") {
        return response.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { rideId } = request.query;
        const { status, driverId } = request.body;

        const existingRide = await prisma.ride.findUnique({
            where: {
                id: rideId as string,
            },
        })

        if (!existingRide) {
            return response.status(404).json({ error: 'Ride not found' })
        }

        const updatedRide = await prisma.ride.update({
            where: {
                id: rideId as string,
            },
            data: {
                status: status as RideStatus | undefined,
                cancelledAt: (status as RideStatus | undefined) === RideStatus.CANCELLED ? new Date() : undefined,
                ...(!!driverId ? {
                    driver: {
                        connect: {
                            id: driverId as string,
                        }
                    }
                } : {}),
            },
        })

        const rideKey = `ride:${existingRide.id}:update`;
        response?.socket?.server?.io?.emit(rideKey, {
            ride: updatedRide,
        })

        console.log('rideKey', rideKey)
        console.log('updatedRide', updatedRide)
        return response.status(200).json(updatedRide)
    } catch (error) {
        console.log('Error updating ride', error)
        return response.status(500).json({ error: "Internal Error" });
    }
}
