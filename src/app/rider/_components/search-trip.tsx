'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { useForm } from "react-hook-form"
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

const formSearchForTripSchema = z.object({
    from: z.object({
        name: z.string().min(1),
        coordinates: z.string().min(1)
    }),
    to: z.object({
        name: z.string().min(1),
        coordinates: z.string().min(1)
    }),
});

export const SearchTrip = () => {
    const searchForTripForm = useForm<z.infer<typeof formSearchForTripSchema>>({
        resolver: zodResolver(formSearchForTripSchema),
    })

    const onSubmit = (values: z.infer<typeof formSearchForTripSchema>) => {
        // TODO: API integration
        console.log(values)
    }

    return (
        <Form {...searchForTripForm}>
            <form onSubmit={searchForTripForm.handleSubmit(onSubmit)}>
                <Card>
                    <CardContent>
                        <CardTitle className="py-4 text-md">Find your ride</CardTitle>
                        <FormField
                            control={searchForTripForm.control}
                            name="from.name"
                            render={({ field }) => (
                                <FormItem className='mb-4'>
                                    <FormLabel>From</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={searchForTripForm.control}
                            name="to.name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>To</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className='w-full'>Search</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}