"use client";

import { Layout } from "@/components/ui/app-layout";
import { SearchForTripArgs, SearchTrip } from "./_components/search-trip";
import Map from "@/components/ui/map";
import useComponentDimensions from "@/hooks/useComponentDimensions";
import { useRef, useState } from "react";
import { DirectionsRenderer, Marker } from "@react-google-maps/api";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useUser } from "../providers/user-provider";
import { Button } from "../../components/ui/button";
import { useRouter } from "next/navigation";
import SocketIndicator from "@/components/ui/socket-indicator";

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
            setDirection(result);
        } catch (error) {
            console.error("calculate route error", error);
        }
    };

    const clearRoute = async () => {
        setDirection(null);
    };

    const handleSearch = async (route: SearchForTripArgs) => {
        // change status: waiting for driver
        // if (route) {
        //     await calculateRoute({ lat: route.from.lat, lng: route.from.lng }, { lat: route.to.lat, lng: route.to.lng })
        // } else {
        //     clearRoute()
        // }
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
                    <Card className="bg-slate-100">
                        <CardHeader>
                            <CardTitle className="text-md">Estimated trip</CardTitle>
                            <CardDescription className="text-xs">
                                <b>From:</b> <i>{direction?.routes[0].legs[0].end_address}</i>
                            </CardDescription>
                            <CardDescription className="text-xs">
                                <b>To:</b> <i>{direction?.routes[0].legs[0].start_address}</i>
                            </CardDescription>
                        </CardHeader>
                        {direction && (
                            <CardContent>
                                <span className="text-sm text-slate-600">
                                    Duration: {direction?.routes[0].legs[0].duration?.text}
                                </span>
                                <br />
                                <span className="text-sm text-slate-600">
                                    Distance: {direction?.routes[0].legs[0]?.distance?.text}
                                </span>
                            </CardContent>
                        )}
                    </Card>
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
