"use client";

import { Layout } from "@/components/ui/app-layout";
import { SearchForTripArgs, SearchTrip } from "@/components/rider/search-trip";
import Map from "@/components/ui/map";
import useComponentDimensions from "@/hooks/useComponentDimensions";
import { useRef, useState } from "react";
import { DirectionsRenderer } from "@react-google-maps/api";
import { useUser } from "@/components/providers/user-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import SocketIndicator from "@/components/ui/socket-indicator";
import EstimatedTripCard from "@/components/rider/estimated-trip-card";

type Coordinates = { lat: number; lng: number };

export default function Page() {
    const router = useRouter();
    const { rider, logoutRider } = useUser();
    const ref = useRef<HTMLDivElement>(null);
    const { height: mapHeight, width: mapWidth } = useComponentDimensions(ref);
    const [direction, setDirection] =
        useState<google.maps.DirectionsResult | null>(null);

    const calculateRoute = async (
        origin: Coordinates,
        destination: Coordinates
    ) => {
        try {
            const directionService = new google.maps.DirectionsService();
            const result = await directionService!.route({
                origin,
                destination,
                travelMode: google.maps.TravelMode.DRIVING,
            });
            console.log("result:", result);
            return result
        } catch (error) {
            console.error("calculate route error", error);
            return null
        }
    };

    const clearRoute = async () => {
        setDirection(null);
    };

    const handleSearch = async (route: SearchForTripArgs) => {
        try {
            if (route) {
                const calculatedRoute = await calculateRoute({ lat: route.from.lat, lng: route.from.lng }, { lat: route.to.lat, lng: route.to.lng })
                if (!!calculateRoute) {
                    setDirection(calculatedRoute)
                    const directionDetails = calculatedRoute!.routes[0]?.legs[0]
                    if (!directionDetails) {
                        // todo: no direction found
                        console.error("direction not found")
                        return
                    }

                    await fetch('/api/rides', {
                        body: JSON.stringify({
                            riderId: rider?.id,
                            estDuration: directionDetails.duration!.value,
                            toName: directionDetails.start_address,
                            toLat: route.to.lat,
                            toLng: route.to.lng,
                            fromLat: route.from.lat,
                            fromLng: route.from.lng,
                            fromName: directionDetails.end_address,
                            distance: directionDetails.distance?.value
                        }),
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' }
                    })
                }
            } else {
                clearRoute()
            }
        } catch (error) {
            console.error('Error searching route', error)
        }
    };

    const handleLogout = () => {
        logoutRider()
        router.push('/')
    }

    return (
        <Layout
            header={
                <div className="flex flex-1 justify-between">
                    <span>Goober</span>
                    <div>
                        <SocketIndicator />
                    </div>
                    {rider?.id && (
                        <>
                            <span>Hello {rider?.name}!</span>{" "}
                            <Button onClick={handleLogout}>Logout</Button>
                        </>
                    )}
                </div>
            }
            leftContent={
                <div className="flex flex-col w-full gap-2 bg-background">
                    <SearchTrip onSearch={handleSearch} />
                    {direction && (<EstimatedTripCard direction={direction} />)}
                </div>
            }
            rightContent={
                <div ref={ref} className="bg-red-300 w-full rounded-md">
                    <Map
                        mapContainerStyle={{
                            height: mapHeight,
                            width: mapWidth,
                            borderRadius: 10,
                        }}
                    >
                        {direction && <DirectionsRenderer directions={direction} />}
                    </Map>
                </div>
            }
        />
    );
}
