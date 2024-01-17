import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"

export default function Home() {

  // TODO: add form validation and submit to api

  const handleNewPassenger = () => {}

  const handleNewDriver = () => {}

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Tabs defaultValue="new-passenger" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new-passenger">Passenger</TabsTrigger>
          <TabsTrigger value="new-driver">Driver</TabsTrigger>
        </TabsList>
        <TabsContent value="new-passenger">
          <Card>
            <CardHeader>
              <CardTitle>Request your ride</CardTitle>
              <CardDescription>
                Create an account here to start your trip. Click "Continue" when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" defaultValue="John Doe" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="new-driver">
          <Card>
            <CardHeader>
              <CardTitle>Drive with Goober</CardTitle>
              <CardDescription>
                Register here to start riding with us. Click "Continue" when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="car-model">Car model</Label>
                <Input id="car-model" type="text" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="car-color">Car color</Label>
                <Input id="car-color" type="text" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="car-plate">Car plate</Label>
                <Input id="car-plate" type="text" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  )
}
