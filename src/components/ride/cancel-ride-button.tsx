'use client'

import { useRide } from '@/components/providers/current-ride-provider'
import { Button } from '@/components/ui/button'
import useRideActions from '@/hooks/use-ride-actions'
import { useState } from 'react'

const CancelRideButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { currentRide } = useRide()
  const { cancelRide } = useRideActions()
  const handleClick = async () => {
    if (currentRide) {
      setIsLoading(true)
      await cancelRide(currentRide)
      setIsLoading(false)
    }
  }
  const disabled = isLoading || !currentRide

  return (
    <Button
      onClick={handleClick}
      disabled={disabled}
      className="w-full bg-red-600 hover:bg-red-500"
    >
      Cancel
    </Button>
  )
}

export default CancelRideButton
