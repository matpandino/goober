import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const { name, car } = await request.json()

  const driverCreated = await prisma.driver.create({ data: { name, car } })

  return NextResponse.json({ ...driverCreated }, { status: 200 })
}
