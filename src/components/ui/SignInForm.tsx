import OutLineContainer from "@components/containers/OutLineContainer"
import { Button } from "@components/ui/Button"
import { Checkbox } from "@components/ui/Checkbox"
import { Input } from "@components/ui/Input"
import { Label } from "@components/ui/Label"
import Link from "@components/ui/Link"
import { cn } from "@lib/utils"

export interface SignInFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

const SignInForm = ({ className, ...props }: SignInFormProps) => {
  return (
    <form
      {...props}
      className={cn(
        "space-y-3.5 border p-6 rounded-lg shadow-sm bg-white",
        className
      )}
    >
      <h2 className="text-3xl font-bold">Sign In</h2>
      <div className="grid grid-cols-2 gap-2.5 py-2">
        <OutLineContainer>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="size-6"
          >
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          <p className="text-sm font-normal">Login with Google</p>
        </OutLineContainer>
        <OutLineContainer>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            version="1.1"
            data-view-component="true"
            className="size-6"
          >
            <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
          </svg>
          <p className="text-sm font-normal">Login with GitHub</p>
        </OutLineContainer>
      </div>
      <div className="flex items-center space-x-5">
        <hr className="border-gray-200 flex-grow" />
        <p className="text-center text-gray-500">or</p>
        <hr className="border-gray-200 flex-grow" />
      </div>
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
      <div className="flex items-center space-x-2 py-1">
        <Checkbox id="remember" disabled />
        <Label htmlFor="remember">Remember me</Label>
        <div className="flex-grow" />
        <Link
          to="auth/forgot-password"
          className="text-sm font-medium ml-auto self-end"
        >
          Forgot Password?
        </Link>
      </div>
      <Button type="submit" className="w-full">
        Sign In
      </Button>
      <p className="text-sm">
        Don't have an account?{" "}
        <Link to="auth/sign-up" className="font-medium">
          Sign Up
        </Link>
      </p>
    </form>
  )
}

export default SignInForm
