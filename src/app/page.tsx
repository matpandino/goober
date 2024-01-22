'use client'

import SignUpDriverForm from '@/components/driver/signup-driver-form'
import { useUser } from '@/components/providers/user-provider'
import SignUpRiderForm from '@/components/rider/signup-rider-form'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const { rider, logoutRider, driver, logoutDriver } = useUser()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="new-rider" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-rider">Rider</TabsTrigger>
          <TabsTrigger value="new-driver">Driver</TabsTrigger>
        </TabsList>
        <TabsContent value="new-rider">
          {!rider ? (
            <SignUpRiderForm />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Hello, {rider.name}</CardTitle>
                <CardDescription>
                  {"Welcome back! Let's get a ride?"}
                </CardDescription>
              </CardHeader>
              <CardFooter className='flex-col gap-2'>
                <Button className='w-full' onClick={() => router.push('/rider')}>Continue</Button>
                <Button className='w-full bg-red-600 hover:bg-red-500' onClick={() => {
                  logoutRider()
                }}>Logout</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="new-driver">
          {!driver ? (
            <SignUpDriverForm />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Hello, {driver.name}</CardTitle>
                <CardDescription>
                  {"Welcome back! Let's start a ride?"}
                </CardDescription>
              </CardHeader>
              <CardFooter className='flex-col gap-2'>
                <Button className='w-full' onClick={() => router.push('/driver')}>Continue</Button>
                <Button className='w-full bg-red-600 hover:bg-red-500' onClick={() => {
                  logoutDriver()
                }}>Logout</Button>
              </CardFooter>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </main>
  )
}
