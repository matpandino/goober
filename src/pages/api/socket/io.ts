import { Server as NextServer } from 'http'
import { NextApiRequest } from 'next'

import { Server as ServerIO } from 'socket.io'
import { NextApiResponseServerIO } from '../../../types'

export const config = {
    api: {
        bodyParser: false
    }
}

const ioHandler = (req: NextApiRequest, res: NextApiResponseServerIO) => {
    if (!res.socket.server.io) {
        const httpServer = res.socket.server as any
        const io = new ServerIO(httpServer, {
            path: '/api/socket/io',
            addTrailingSlash: false
        })
        res.socket.server.io = io
    }

    res.end()
}

export default ioHandler