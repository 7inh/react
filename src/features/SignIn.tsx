import SignInForm from "@components/ui/SignInForm"
import { useToast } from "@hooks/useToast"

const SignIn = () => {
  const { toast } = useToast()
  const onSubmit = () => {
    toast({
      title: "Scheduled: Catch up",
      description: "Friday, February 10, 2023 at 5:57 PM",
    })
  }

  return <SignInForm className="w-full max-w-md" onSubmit={onSubmit} />
}

export default SignIn
