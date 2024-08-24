import SignInPage from "@pages/auth/SignInPage"
import { Outlet, RouteObject } from "react-router-dom"

const authRoute: RouteObject = {
  path: "auth",
  element: <Outlet />,
  children: [
    {
      path: "signin",
      element: <SignInPage />,
    },
  ],
}

export default authRoute
