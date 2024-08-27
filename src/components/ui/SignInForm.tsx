import { Button } from "@components/ui/Button"
import { Checkbox } from "@components/ui/Checkbox"
import { Input } from "@components/ui/Input"
import { Label } from "@components/ui/Label"
import { cn } from "@lib/utils"

export interface SignInFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

const SignInForm = ({ className, ...props }: SignInFormProps) => {
  return (
    <form
      {...props}
      className={cn("space-y-3.5 border p-6 rounded-lg shadow-sm", className)}
    >
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          type="email"
          id="email"
          name="email"
          placeholder="example@email.com"
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          type="password"
          id="password"
          name="password"
          placeholder="123456"
          required
        />
      </div>
      {/* <div className="pt-0.5"></div> */}

      <div className="flex items-center space-x-2 py-1">
        <Checkbox id="remember" disabled />
        <Label
          htmlFor="remember"
          // className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Remember me
        </Label>
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
    </form>
  )
}

export default SignInForm
