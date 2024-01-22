import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
    const { name } = await request.json()

    const riderCreated = await prisma.rider.create({ data: { name } })

    return NextResponse.json({ ...riderCreated }, { status: 200 })
}
export async function GET(request: NextRequest) {
    try {
        const id = request.nextUrl.searchParams.get('id')
        if (!!id) {
            const rider = await prisma.rider.findFirst({
                where: { id },
                include: {
                    rides: true
                }
            })
            return NextResponse.json({ ...rider }, { status: 200 })
        }
        return new NextResponse("Id not found", { status: 400 });
    } catch (error) {
        console.log("Error getting rider", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}