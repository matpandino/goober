'use client'

import { type Rider } from '@/types'
import { type Driver } from '@prisma/client'
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'

interface RiderDTO {
  name: string
}

interface DriverDTO {
  name: string
  car: string
}

interface UserContextType {
  rider: Rider | null
  driver: Driver | null
  loginDriver: (loginInfo: DriverDTO) => Promise<boolean>
  loginRider: (loginInfo: RiderDTO) => Promise<boolean>
  logoutDriver: () => void
  logoutRider: () => void
}

interface UserProviderProps {
  children: ReactNode
}

const UserContext = createContext<UserContextType | undefined>(undefined)

const DRIVER_KEY = '@driver'
const RIDER_KEY = '@rider'

const UserProvider = ({ children }: UserProviderProps) => {
  const [driver, setDriver] = useState<Driver | null>(null)
  const [rider, setRider] = useState<Rider | null>(null)

  useEffect(() => {
    const storedDriver = JSON.parse(
      localStorage.getItem(DRIVER_KEY) || 'null',
    ) as Driver | null
    if (storedDriver) {
      setDriver(storedDriver)
    }
    const storedRider = JSON.parse(
      localStorage.getItem(RIDER_KEY) || 'null',
    ) as Rider | null
    if (storedRider) {
      setRider(storedRider)
    }
  }, [])

  const loginDriver = async ({ name, car }: DriverDTO) => {
    try {
      const data = await fetch('/api/driver', {
        method: 'POST',
        body: JSON.stringify({ name, car }),
        headers: { 'Content-Type': 'application/json' },
      })

      const driverData = await data.json()

      if (driverData) {
        setDriver(driverData as unknown as Driver)
        localStorage.setItem(DRIVER_KEY, JSON.stringify(driverData))
        return true
      }
      return false
    } catch (error) {
      console.error('Login Rider error: ', error)
      return false
    }
  }

  const loginRider = async ({ name }: RiderDTO) => {
    try {
      const data = await fetch('/api/rider', {
        method: 'POST',
        body: JSON.stringify({ name }),
        headers: { 'Content-Type': 'application/json' },
      })

      const riderData = await data.json()
      if (riderData) {
        setRider(riderData as unknown as Rider)
        localStorage.setItem(RIDER_KEY, JSON.stringify(riderData))
        return true
      }
      return false
    } catch (error) {
      console.error('Login Rider error: ', error)
      return false
    }
  }

  const logoutDriver = () => {
    setDriver(null)
    localStorage.removeItem(DRIVER_KEY)
  }

  const logoutRider = () => {
    setRider(null)
    localStorage.removeItem(RIDER_KEY)
  }

  return (
    <UserContext.Provider
      value={{
        rider,
        driver,
        logoutRider,
        logoutDriver,
        loginDriver,
        loginRider,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

const useUser = (): UserContextType => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

export { UserProvider, useUser }
