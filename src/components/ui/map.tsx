'use client'

import React from 'react'
import {
  GoogleMap,
  type GoogleMapProps,
  useJsApiLoader,
} from '@react-google-maps/api'
import { usePosition } from 'use-position'

const center = {
  lat: 40.756795,
  lng: -73.954298,
}

interface MapProps extends GoogleMapProps {}

function Map(props: MapProps) {
  const { latitude, longitude } = usePosition(false)

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  })

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      options={{ disableDefaultUI: true }}
      mapContainerStyle={{ width: '800px', height: '800px', borderRadius: 10 }}
      center={{ lat: latitude || center.lat, lng: longitude || center.lng }}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
      {...props}
    />
  ) : (
    <></>
  )
}

export default React.memo(Map)
