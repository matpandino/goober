'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { InputPlaceAutocomplete, SelectPlaceArgs } from './input-place-autocomplete'

const location = z.object({
    name: z.string().min(1),
    lat: z.number().min(1),
    lng: z.number().min(1)
})

const formSearchForTripSchema = z.object({
    from: location,
    to: location,
});

export const SearchTrip = () => {
    const searchForTripForm = useForm<z.infer<typeof formSearchForTripSchema>>({
        resolver: zodResolver(formSearchForTripSchema),
    })

    const { from, to } = searchForTripForm.watch()

    const canSearch = !!from?.lat && !!from?.lng && !!to?.lat && !!to?.lng

    const onSubmit = (values: z.infer<typeof formSearchForTripSchema>) => {
        // TODO: API integration
        console.log(values)
    }

    const handleSelectLocation = (locationInfo: SelectPlaceArgs, fieldName: 'from' | 'to') => {
        if (locationInfo) {
            searchForTripForm.setValue(`${fieldName}.name`, locationInfo?.name)
            searchForTripForm.setValue(`${fieldName}.lng`, locationInfo?.lng)
            searchForTripForm.setValue(`${fieldName}.lat`, locationInfo?.lat)
        } else {
            searchForTripForm.resetField(`${fieldName}`)
        }
    }

    return (
        <Form {...searchForTripForm}>
            <form onSubmit={searchForTripForm.handleSubmit(onSubmit)}>
                <Card>
                    <CardContent>
                        <CardTitle className="py-4 text-md">Find your ride</CardTitle>
                        <div className='mb-4'>
                            <FormLabel>From</FormLabel>
                            <InputPlaceAutocomplete onSelectPlace={(locationInfo) => handleSelectLocation(locationInfo, 'from')} />
                        </div>
                        <div>
                            <FormLabel>To</FormLabel>
                            <InputPlaceAutocomplete onSelectPlace={(locationInfo) => handleSelectLocation(locationInfo, 'to')} />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={!canSearch} className='w-full'>Search</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}