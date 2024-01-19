import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'


export async function POST(request: Request) {
    console.log('POST request', request)
    const { name } = await request.json()

    const riderCreated = await prisma.rider.create({ data: { name } })

    return NextResponse.json({ ...riderCreated }, { status: 200 })
}