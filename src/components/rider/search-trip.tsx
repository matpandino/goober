'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Form, FormLabel } from '@/components/ui/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import {
  InputPlaceAutocomplete,
  type SelectPlaceArgs,
} from './input-place-autocomplete'

const location = z.object({
  name: z.string().min(1),
  lat: z.number(),
  lng: z.number(),
})

const formSearchForTripSchema = z.object({
  from: location,
  to: location,
})

export type SearchForTripArgs = z.infer<typeof formSearchForTripSchema>
interface SearchTripProps {
  onSearch: (path: SearchForTripArgs) => void
  disableSearchButton?: boolean
}

export const SearchTrip = ({
  onSearch,
  disableSearchButton = false,
}: SearchTripProps) => {
  const searchForTripForm = useForm<z.infer<typeof formSearchForTripSchema>>({
    resolver: zodResolver(formSearchForTripSchema),
  })

  const onSubmit = (values: z.infer<typeof formSearchForTripSchema>) => {
    onSearch(values)
  }

  const handleSelectLocation = (
    locationInfo: SelectPlaceArgs,
    fieldName: 'from' | 'to',
  ) => {
    if (locationInfo) {
      searchForTripForm.setValue(`${fieldName}.name`, locationInfo?.name)
      searchForTripForm.setValue(`${fieldName}.lng`, locationInfo?.lng)
      searchForTripForm.setValue(`${fieldName}.lat`, locationInfo?.lat)
    } else {
      searchForTripForm.resetField(`${fieldName}`)
    }
    searchForTripForm.trigger()
  }

  return (
    <Form {...searchForTripForm}>
      <form onSubmit={searchForTripForm.handleSubmit(onSubmit)}>
        <Card>
          <CardHeader>
            <CardTitle className="text-md">Find your ride</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <FormLabel>From</FormLabel>
              <InputPlaceAutocomplete
                onSelectPlace={(locationInfo) => {
                  handleSelectLocation(locationInfo, 'from')
                }}
              />
            </div>
            <div>
              <FormLabel>To</FormLabel>
              <InputPlaceAutocomplete
                onSelectPlace={(locationInfo) => {
                  handleSelectLocation(locationInfo, 'to')
                }}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              disabled={
                disableSearchButton || !searchForTripForm.formState.isValid
              }
              className="w-full"
            >
              Search
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}
