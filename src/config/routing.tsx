import { createBrowserRouter } from "react-router-dom"
import ErrorBoundaryWrapper from "@components/wrappers/ErrorBoundaryWrapper"
import authRoute from "@pages/auth/routing"
import PageNotFound from "@features/PageNotFound"
import ToolPage from "@pages/ToolPage"

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryWrapper />,
    children: [
      {
        path: "/",
        element: <ToolPage />,
      },
      authRoute,
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
])

export default router
