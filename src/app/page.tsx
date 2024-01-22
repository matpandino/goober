'use client'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { useUser } from '@/components/providers/user-provider'

const formNewRiderSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => data.trim() !== '', {
      message: 'Field is required',
    }),
})

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

export default function Home() {
  const router = useRouter()
  const { loginRider, loginDriver } = useUser()

  const riderForm = useForm<z.infer<typeof formNewRiderSchema>>({
    resolver: zodResolver(formNewRiderSchema),
  })

  const driverForm = useForm<z.infer<typeof formNewDriverSchema>>({
    resolver: zodResolver(formNewDriverSchema),
  })

  const onSubmitNewRider = async (
    values: z.infer<typeof formNewRiderSchema>,
  ) => {
    console.log(values)
    const loggedSuccessfully = await loginRider({ name: values.name })
    if (loggedSuccessfully) {
      router.push('/rider')
    } else {
      // todo show message
    }
  }

  const onSubmitNewDriver = async (
    values: z.infer<typeof formNewDriverSchema>,
  ) => {
    console.log(values)
    const loggedSuccessfully = await loginDriver({
      name: values.name,
      car: values.car,
    })
    if (loggedSuccessfully) {
      router.push('/driver')
    } else {
      // todo show message
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="new-rider" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-rider">Rider</TabsTrigger>
          <TabsTrigger value="new-driver">Driver</TabsTrigger>
        </TabsList>
        <TabsContent value="new-rider">
          <Form {...riderForm}>
            <form
              onSubmit={riderForm.handleSubmit(onSubmitNewRider)}
              className="space-y-8"
            >
              <Card>
                <CardHeader>
                  <CardTitle>Request your ride</CardTitle>
                  <CardDescription>
                    {
                      "Create an account here to start your trip. Click 'Continue' when you're done."
                    }
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <FormField
                      control={riderForm.control}
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
                  </div>
                </CardContent>
                <CardFooter>
                  <Button type="submit">Continue</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
        <TabsContent value="new-driver">
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
                  {/* <FormField
                    control={driverForm.control}
                    name="carPlate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car plate</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={driverForm.control}
                    name="carColor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Car color</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  /> */}
                </CardContent>
                <CardFooter>
                  <Button type="submit">Continue</Button>
                </CardFooter>
              </Card>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </main>
  )
}
