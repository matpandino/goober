'use client'

import { type Ride } from '@/types'
import { useQuery } from '@tanstack/react-query'
import { usePathname } from 'next/navigation'
import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSocket } from './socket-provider'
import { useUser } from './user-provider'

interface CurrentRideContextType {
  setCurrentRide: React.Dispatch<React.SetStateAction<(Ride | null)>>
  currentRide: Ride | null
}

const CurrentRideContext = createContext<CurrentRideContextType | undefined>(
  undefined,
)

const CurrentRideProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null)
  const { socket, isConnected } = useSocket()
  const pathname = usePathname();
  const { driver, rider } = useUser()

  const currentRideSocketKey = currentRide?.id ? `ride:${currentRide.id}:update` : null

  const { isLoading, data } = useQuery(
    {
      queryKey: ['currentRide', driver?.id, rider?.id],
      queryFn: async () => {
        const isRiderApp = pathname?.includes('rider')
        return await fetch(`/api/${isRiderApp ? 'rider' : 'driver'}/${isRiderApp ? rider?.id : driver?.id}`).then(async (res) => await res.json())
      },
      refetchInterval: isConnected ? false : 1000,
      // refetchInterval: 1000,
    }
  )

  useEffect(() => {
    if (data) {
      setCurrentRide(data)
    }
  }, [data])


  useEffect(() => {
    if (!socket) {
      return
    }
    if (currentRideSocketKey) {
      socket?.on(currentRideSocketKey, (data: { ride: Ride }) => {
        console.log(`UPDATE rideKey: ${currentRideSocketKey} =>`, data)
        setCurrentRide(data.ride)
      })

      console.log('rideKey =>', currentRideSocketKey)
    }
    return () => {
      if (currentRideSocketKey) {
        socket?.off(currentRideSocketKey, {} as any)
      }
    }
  }, [currentRideSocketKey, socket, isConnected])

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
