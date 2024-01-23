'use client'

import { useState } from 'react'

export interface Coordinates {
  lat: number
  lng: number
}

const useDirections = () => {
  const [direction, setDirection] =
    useState<google.maps.DirectionsResult | null>(null)

  const calculateDirections = async (
    origin: Coordinates,
    destination: Coordinates,
  ) => {
    try {
      if (!google) {
        throw new Error('Google service is not ready')
      }
      const directionService = new google.maps.DirectionsService()
      const result = await directionService.route({
        origin,
        destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      setDirection(result)
      return result
    } catch (error) {
      console.error('calculate route error', error)
      return null
    }
  }

  const clearDirections = async () => {
    setDirection(null)
  }

  return { direction, clearDirections, calculateDirections }
}

export default useDirections
