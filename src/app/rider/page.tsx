'use client'

import { Layout } from "@/components/ui/app-layout"
import { SearchTrip } from "./_components/search-trip"
import Map from "@/components/ui/map"
import useComponentDimensions from "@/hooks/useComponentDimensions"
import { useRef } from "react"
import { Marker } from "@react-google-maps/api"

export default function Page() {
    const ref = useRef<HTMLDivElement>(null)
    const { height: mapHeight, width: mapWidth } = useComponentDimensions(ref)
    return (
        <Layout
            header={<>Goober</>}
            leftContent={
                <div className="flex flex-col w-full gap-2 bg-background">
                    <SearchTrip />
                </div>
            }
            rightContent={
                <div ref={ref} className="bg-red-300 w-full rounded-md">
                    <Map mapContainerStyle={{ height: mapHeight, width: mapWidth, borderRadius: 10 }}
                    >
                        <Marker position={{ lat: 40.756795, lng: -73.954298 }}>Test</Marker>
                    </ Map>
                </div>
            }
        />

    )
}