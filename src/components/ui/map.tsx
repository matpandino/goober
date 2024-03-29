'use client'

import { GoogleMap, type GoogleMapProps } from '@react-google-maps/api'
import { memo } from 'react'
import { usePosition } from 'use-position'

const center = {
  lat: 40.756795,
  lng: -73.954298,
}

interface MapProps extends GoogleMapProps {}

function Map(props: MapProps) {
  const { latitude, longitude } = usePosition(false)

  return (
    <GoogleMap
      options={{ disableDefaultUI: true }}
      mapContainerStyle={{ width: '800px', height: '800px', borderRadius: 10 }}
      center={{ lat: latitude || center.lat, lng: longitude || center.lng }}
      zoom={10}
      {...props}
    />
  )
}

export default memo(Map)
