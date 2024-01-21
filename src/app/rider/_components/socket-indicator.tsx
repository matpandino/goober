'use client'

import { useSocket } from "@/components/providers/socket-provider"

const SocketIndicator = () => {
    const { isConnected } = useSocket()
    return (
        <>
            {isConnected ?
                (
                    <div>LIVE</div>
                ) : (
                    <div>Fallback: polling every 1s</div>
                )}
        </>
    )
}

export default SocketIndicator