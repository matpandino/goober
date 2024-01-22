import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { RideStatus } from '@prisma/client'

export async function GET() {
  try {
    const rides = await prisma.ride.findMany({
      where: {
        status: RideStatus.REQUESTED,
      },
      include: {
        rider: true,
      },
    })

    console.log('pending rides', rides)
    return NextResponse.json({ rides }, { status: 200 })
  } catch (error) {
    console.error('Error fetching rides', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
