import { Calendar } from "@components/ui/calendar"
import ThemeToggle from "@components/ui/theme-toggle"
import { useState } from "react"

export interface SignInPageProps {}

const SignInPage = (props: SignInPageProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="">
      SignInPage
      <button className="animate-bounce delay-150 duration-300 ...">
        Button A
      </button>
      <button className="animate-bounce delay-300 duration-300 ...">
        Button B
      </button>
      <button className="animate-bounce delay-700 duration-300 ...">
        Button C
      </button>
      <div className="w-fit">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border"
        />
      </div>
      <ThemeToggle />
    </div>
  )
}

export default SignInPage
