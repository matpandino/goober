'use client'

import { type Ride } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from './socket-provider'
import { useUser } from './user-provider'

interface CurrentRideContextType {
  setCurrentRide: React.Dispatch<React.SetStateAction<Ride | null>>
  currentRide: Ride | null
}

const CurrentRideContext = createContext<CurrentRideContextType | undefined>(
  undefined,
)

const CurrentRideProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null)
  const { socket, isConnected } = useSocket()
  const pathname = usePathname()
  const { driver, rider } = useUser()

  const { data } = useQuery({
    queryKey: ['currentRide', driver?.id, rider?.id],
    queryFn: async () => {
      const isRiderApp = pathname?.includes('rider')
      const apiUrl = isRiderApp
        ? `/api/rider/${rider?.id}`
        : `/api/driver/${driver?.id}`
      return await fetch(apiUrl).then(async (res) => await res.json())
    },
    refetchInterval: isConnected ? false : 1000,
    // refetchInterval: 1000,
  })

  useEffect(() => {
    if (data) {
      setCurrentRide(data)
    }
  }, [data])

  useEffect(() => {
    if (!socket || !isConnected) {
      return
    }

    if (currentRide?.id) {
      const currentRideSocketKey = `ride:${currentRide.id}:update`
      socket?.on(currentRideSocketKey, (data: { ride: Ride }) => {
        console.log(`UPDATE rideKey: ${currentRideSocketKey} =>`, data.ride)
        setCurrentRide(data.ride)
      })

      console.log('rideKey ON =>', currentRideSocketKey)
    }
    return () => {
      if (currentRide?.id && socket && isConnected) {
        const currentRideSocketKey = `ride:${currentRide.id}:update`
        console.log('rideKey OFF =>', currentRideSocketKey)
        socket?.off(currentRideSocketKey)
      }
    }
  }, [currentRide?.id, socket, isConnected])

  return (
    <CurrentRideContext.Provider value={{ currentRide, setCurrentRide }}>
      {children}
    </CurrentRideContext.Provider>
  )
}

const useRide = (): CurrentRideContextType => {
  const context = useContext(CurrentRideContext)
  if (!context) {
    throw new Error('useRide must be used within a CurrentRideProvider')
  }
  return context
}

export { CurrentRideProvider, useRide }
