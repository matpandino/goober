'use client'

import { Ride } from '@/types';
import React, { createContext, useContext, useState } from 'react'

interface CurrentRideContextType {
  setCurrentRide: (ride: Ride) => void
  currentRide: Ride | null
}

const CurrentRideContext = createContext<CurrentRideContextType | undefined>(undefined);

const CurrentRideProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentRide, setCurrentRide] = useState<Ride | null>(null);

  return (
    <CurrentRideContext.Provider value={{ currentRide, setCurrentRide }}>
      {children}
    </CurrentRideContext.Provider>
  )
}

const useRide = (): CurrentRideContextType => {
  const context = useContext(CurrentRideContext);
  if (!context) {
    throw new Error('useRide must be used within a CurrentRideProvider');
  }
  return context;
};

export { CurrentRideProvider, useRide };