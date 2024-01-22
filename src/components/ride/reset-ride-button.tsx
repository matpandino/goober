'use client'

import { useRide } from '@/components/providers/current-ride-provider'
import { Button } from '@/components/ui/button'

const ResetRide = () => {
  const { currentRide, setCurrentRide } = useRide()
  const handleClick = () => {
    setCurrentRide(null)
  }

  const disabled = !currentRide

  return (
    <Button onClick={handleClick} disabled={disabled} className="w-full">
      Start new ride
    </Button>
  )
}

export default ResetRide
