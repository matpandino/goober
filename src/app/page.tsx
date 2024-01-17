"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formNewPassengerSchema = z.object({
  name: z.string().min(1).max(255).refine(data => data.trim() !== '', {
    message: 'Field is required',
  }),
})

const formNewDriverSchema = z.object({
  name: z.string().min(1).max(255).refine(data => data.trim() !== '', {
    message: 'Field is required',
  }),
  carModel: z.string().min(1).max(255).refine(data => data.trim() !== '', {
    message: 'Field is required',
  }),
  carPlate: z.string().min(1).max(255).refine(data => data.trim() !== '', {
    message: 'Field is required',
  }),
  carColor: z.string().min(1).max(255).refine(data => data.trim() !== '', {
    message: 'Field is required',
  }),
})

export default function Home() {
  const passengerForm = useForm<z.infer<typeof formNewPassengerSchema>>({
    resolver: zodResolver(formNewPassengerSchema),
  })

  const driverForm = useForm<z.infer<typeof formNewDriverSchema>>({
    resolver: zodResolver(formNewDriverSchema),
  })

  function onSubmitNewPassenger(values: z.infer<typeof formNewPassengerSchema>) {
    // TODO: API integration
    console.log(values)
  }

  function onSubmitNewDriver(values: z.infer<typeof formNewDriverSchema>) {
    // TODO: API integration
    console.log(values)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="new-passenger" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-passenger">Passenger</TabsTrigger>
          <TabsTrigger value="new-driver">Driver</TabsTrigger>
        </TabsList>
        <TabsContent value="new-passenger">
          <Form {...passengerForm}>
            <form onSubmit={passengerForm.handleSubmit(onSubmitNewPassenger)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Request your ride</CardTitle>
                  <CardDescription>
                    {`Create an account here to start your trip. Click 'Continue' when you're done.`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="space-y-1">
                    <FormField
                      control={passengerForm.control}
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
            <form onSubmit={driverForm.handleSubmit(onSubmitNewDriver)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Drive with Goober</CardTitle>
                  <CardDescription>
                    {`Register here to start riding with us. Click 'Continue' when you're done.`}
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
                    name="carModel"
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
                  <FormField
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
                  />
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
