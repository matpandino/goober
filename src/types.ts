import { type Prisma } from '@prisma/client'
import { type Server as NetServer, type Socket } from 'net'
import { type NextApiResponse } from 'next'
import { type Server as ServerIOServer } from 'socket.io'
import { type prisma } from './lib/prisma'

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIOServer
    }
  }
}

export type RideCreateBody = Prisma.Args<typeof prisma.ride, 'create'>['data']

export type Rider = Prisma.RiderGetPayload<{
  include: {
    rides: true
  }
}>

export type Ride = Prisma.RideGetPayload<{
  include: {
    rider: true
  }
}>
