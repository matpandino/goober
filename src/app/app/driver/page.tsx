'use client'

import CurrentRide from '@/components/driver/current-ride-card'
import PendingRides from '@/components/driver/pending-rides'
import { useRide } from '@/components/providers/current-ride-provider'

export default function Page() {
  const { currentRide } = useRide()
  return (
    <div className="flex flex-col w-full gap-2 bg-background">
      {currentRide && <CurrentRide ride={currentRide} />}
      {!currentRide && <PendingRides />}
    </div>
  )
}
