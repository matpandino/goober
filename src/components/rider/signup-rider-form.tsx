'use client'

import { useUser } from '@/components/providers/user-provider'
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
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const formNewRiderSchema = z.object({
  name: z
    .string()
    .min(1)
    .max(255)
    .refine((data) => data.trim() !== '', {
      message: 'Field is required',
    }),
})

const SignUpRiderForm = () => {
  const router = useRouter()
  const { loginRider } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const riderForm = useForm<z.infer<typeof formNewRiderSchema>>({
    resolver: zodResolver(formNewRiderSchema),
  })

  const onSubmitNewRider = async (
    values: z.infer<typeof formNewRiderSchema>,
  ) => {
    setIsLoading(true)
    const loggedSuccessfully = await loginRider({ name: values.name })
    if (loggedSuccessfully) {
      router.push('/rider')
    } else {
      // todo show message
    }
    setIsLoading(false)
  }

  return (
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
            <Button type="submit" disabled={isLoading} className="w-full">
              Continue
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  )
}

export default SignUpRiderForm
