import SignInForm from "@components/ui/SignInForm"
import { useToast } from "@hooks/useToast"

const SignIn = () => {
  const { toast } = useToast()
  const onSubmit = () => {
    toast({
      title: "Scheduled: Catch up",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec auctor, libero at luctus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
    })
  }

  return <SignInForm className="w-full max-w-md" onSubmit={onSubmit} />
}

export default SignIn
