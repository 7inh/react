import { createBrowserRouter } from "react-router-dom";
import ErrorBoundaryWrapper from "@components/Wrappers/ErrorBoundaryWrapper";
import authRoute from "@pages/auth/routing";

const router = createBrowserRouter([
  {
    element: <ErrorBoundaryWrapper />,
    path: "/",
    children: [
      authRoute,
      {
        path: "*",
        element: <div>404</div>,
      },
    ],
  },
]);

export default router;
