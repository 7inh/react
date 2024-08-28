import GitHubIcon from "@assets/icons/GitHubIcon"
import GoogleIcon from "@assets/icons/GoogleIcon"
import OutLineContainer from "@components/containers/OutLineContainer"
import { Button } from "@components/ui/Button"
import { Checkbox } from "@components/ui/Checkbox"
import InputHF from "@components/ui/InputHF"
import { Label } from "@components/ui/Label"
import Link from "@components/ui/Link"
import HookFormWrapper from "@components/wrappers/HookFormWrapper"
import { cn } from "@lib/utils"

export interface SignInFormProps
  extends React.HTMLAttributes<HTMLFormElement> {}

const SignInForm = ({ className, ...props }: SignInFormProps) => {
  return (
    <HookFormWrapper
      className={cn(
        "space-y-3.5 border p-6 rounded-lg shadow-sm bg-white",
        className
      )}
      {...props}
    >
      <h2 className="text-3xl font-bold">Sign In</h2>
      <div className="grid grid-cols-2 gap-2.5 py-2">
        <OutLineContainer>
          <GoogleIcon />
          <p className="text-sm font-normal">Login with Google</p>
        </OutLineContainer>
        <OutLineContainer>
          <GitHubIcon />
          <p className="text-sm font-normal">Login with GitHub</p>
        </OutLineContainer>
      </div>
      <div className="flex items-center space-x-5">
        <hr className="border-gray-200 flex-grow" />
        <p className="text-center text-gray-500">or</p>
        <hr className="border-gray-200 flex-grow" />
      </div>
      <InputHF label="Email" name="email" type="email" />
      <InputHF label="Password" name="password" type="password" />
      <div className="flex items-center space-x-2 py-1">
        <Checkbox id="remember" />
        <Label htmlFor="remember">Remember me</Label>
        <div className="flex-grow" />
        <Link to="auth/forgot-password" className="text-sm font-medium">
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
    </HookFormWrapper>
  )
}

export default SignInForm
