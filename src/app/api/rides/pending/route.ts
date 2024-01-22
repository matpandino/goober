import { prisma } from '@/lib/prisma'
import { RideStatus } from '@prisma/client'
import { NextResponse } from 'next/server'

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

    return NextResponse.json({ rides }, { status: 200 })
  } catch (error) {
    console.error('Error fetching rides', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}
