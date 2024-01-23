import RideMap from '@/components/ride/ride-map'
import { Layout } from '@/components/ui/app-layout'
import { ReactNode } from 'react'

export default function AppRootLayout({ children }: { children: ReactNode }) {
  return <Layout leftContent={children} rightContent={<RideMap />} />
}
