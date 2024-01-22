'use client'

import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete'

export type SelectPlaceArgs =
  | { lat: number; lng: number; name: string }
  | undefined

export interface InputPlaceAutocompleteProps {
  onSelectPlace: (locationInfo?: SelectPlaceArgs) => void
}

const InputPlaceAutocomplete = ({
  onSelectPlace,
}: InputPlaceAutocompleteProps) => {
  const {
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    callbackName: 'GMAPSSCRIPT',
    initOnMount: true,
    debounce: 300,
  })

  const handleSelect = async (address: string) => {
    setValue(address, false)
    clearSuggestions()

    const results = await getGeocode({ address })
    const { lat, lng } = await getLatLng(results[0])

    if (lat && lng) {
      onSelectPlace({ lat, lng, name: address })
      return
    }
    onSelectPlace()
  }

  return (
    <Command shouldFilter={false}>
      <Input
        value={value}
        onChange={(value) => {
          setValue(value.target.value)
        }}
        placeholder="Search an address"
        className="combobox-input"
      />
      {status === 'OK' && data.length > 0 && (
        <CommandList className="absolute z-10 bg-background mt-12 border rounded-md">
          <CommandGroup>
            {data.map(({ place_id, description }) => (
              <CommandItem
                key={place_id}
                value={description}
                onSelect={handleSelect}
              >
                {description}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      )}
    </Command>
  )
}

export { InputPlaceAutocomplete }
