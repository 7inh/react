import { Toaster } from "@components/ui/Toaster"
import { Outlet } from "react-router-dom"

const RootLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  )
}

export default RootLayout
