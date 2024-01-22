import { Prisma } from '@prisma/client'
import { Server as NetServer, Socket } from 'net'
import { NextApiResponse } from 'next'
import { Server as ServerIOServer } from 'socket.io'
import { prisma } from './lib/prisma'

export type NextApiResponseServerIO = NextApiResponse & {
    socket: Socket & {
        server: NetServer & {
            io: ServerIOServer
        }
    }
}

export type RideCreateBody = Prisma.Args<typeof prisma.ride, 'create'>['data']
