'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useUser } from '../providers/user-provider'
import { Button } from '../ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

const formNewDriverSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(255)
        .refine((data) => data.trim() !== '', {
            message: 'Field is required',
        }),
    car: z
        .string()
        .min(1)
        .max(255)
        .refine((data) => data.trim() !== '', {
            message: 'Field is required',
        }),
})

const SignUpDriverForm = () => {
    const router = useRouter()
    const { loginDriver } = useUser()
    const [isLoading, setIsLoading] = useState(false)

    const driverForm = useForm<z.infer<typeof formNewDriverSchema>>({
        resolver: zodResolver(formNewDriverSchema),
    })

    const onSubmitNewDriver = async (
        values: z.infer<typeof formNewDriverSchema>,
    ) => {
        console.log(values)
        setIsLoading(true)
        const loggedSuccessfully = await loginDriver({
            name: values.name,
            car: values.car,
        })
        setIsLoading(false)
        if (loggedSuccessfully) {
            router.push('/driver')
        } else {
            // todo show message
        }
    }

    return (
        <Form {...driverForm}>
            <form
                onSubmit={driverForm.handleSubmit(onSubmitNewDriver)}
                className="space-y-8"
            >
                <Card>
                    <CardHeader>
                        <CardTitle>Drive with Goober</CardTitle>
                        <CardDescription>
                            {
                                "Register here to start riding with us. Click 'Continue' when you're done."
                            }
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <FormField
                            control={driverForm.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormDescription>
                                        This is your public display name.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={driverForm.control}
                            name="car"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Car model</FormLabel>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" disabled={isLoading} className='w-full'>Continue</Button>
                    </CardFooter>
                </Card>
            </form>
        </Form>
    )
}

export default SignUpDriverForm