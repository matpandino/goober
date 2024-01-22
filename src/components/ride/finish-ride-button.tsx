'use client'

import { useRide } from '@/components/providers/current-ride-provider'
import { Button } from '@/components/ui/button'
import useRideActions from '@/hooks/use-ride-actions'
import { useState } from 'react'

const FinishRideButton = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { currentRide } = useRide()
  const { finishRide } = useRideActions()
  const handleClick = async () => {
    if (currentRide) {
      setIsLoading(true)
      await finishRide(currentRide)
      setIsLoading(false)
    }
  }
  const disabled = isLoading || !currentRide

  return (
    <Button onClick={handleClick} disabled={disabled} className="w-full">
      Finish
    </Button>
  )
}

export default FinishRideButton
