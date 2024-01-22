'use client'

import CurrentRide from '@/components/driver/current-ride-card'
import PendingRides from '@/components/driver/pending-rides'
import { useRide } from '@/components/providers/current-ride-provider'
import RideMap from '@/components/ride/ride-map'
import { Layout } from '@/components/ui/app-layout'

export default function Page() {
  const { currentRide } = useRide()
  return (
    <Layout
      leftContent={
        <div className="flex flex-col w-full gap-2 bg-background">
          {currentRide && <CurrentRide ride={currentRide} />}
          {!currentRide && <PendingRides />}
        </div>
      }
      rightContent={<RideMap />}
    />
  )
}
