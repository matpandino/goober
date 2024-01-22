'use client'

import { useSocket } from '@/components/providers/socket-provider'
import { Badge } from './badge'

const SocketIndicator = () => {
  const { isConnected } = useSocket()
  return (
    <>
      {isConnected ? (
        <Badge className="bg-green-600">live</Badge>
      ) : (
        <Badge className="bg-red-600">polling</Badge>
      )}
    </>
  )
}

export default SocketIndicator
