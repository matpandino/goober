import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { RideCreateBody } from '@/types'

export async function POST(request: Request) {
    try {
        const { riderId, distance, estDuration, fromLat, fromLng, fromName, toLat, toLng, toName } = await request.json()

        // if (!riderId || !distance || !estDuration || !fromLat || !fromLng || !fromName || !toLat || !toLng || !toName) {
        //     return new NextResponse("Missing field(s)", { status: 400 });
        // }

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
                    }
                }
            } as RideCreateBody
        })
        console.log('riderCreated', riderCreated)
        return NextResponse.json({ ...riderCreated }, { status: 200 })
    } catch (error) {
        console.log("Rides", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}