'use client'

import { CurrentRideProvider } from '@/components/providers/current-ride-provider'
import RideMap from '@/components/ride/ride-map'
import { Layout } from '@/components/ui/app-layout'
import { LoadScript } from '@react-google-maps/api'
import { ReactNode } from 'react'

export default function AppRootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <CurrentRideProvider>
        <LoadScript
          loadingElement={<></>}
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}
          libraries={['places']}
        >
          <Layout leftContent={children} rightContent={<RideMap />} />
        </LoadScript>
      </CurrentRideProvider>
    </>
  )
}
