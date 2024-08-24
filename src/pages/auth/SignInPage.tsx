import { Calendar } from "@components/ui/calendar"
import { useState } from "react"

export interface SignInPageProps {}

const SignInPage = (props: SignInPageProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <div className="bg-black text-white">
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
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </div>
  )
}

export default SignInPage
