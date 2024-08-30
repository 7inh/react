import RootLayout from "@components/layouts/RootLayout"
import SignInPage from "@pages/auth/SignInPage"
import { RouteObject } from "react-router-dom"

const authRoute: RouteObject = {
  path: "auth",
  element: <RootLayout />,
  children: [
    {
      path: "sign-in",
      element: <SignInPage />,
    },
  ],
}

export default authRoute
