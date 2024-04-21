import { createBrowserRouter } from "react-router-dom";
import LoginRoute from "../ProtectedRoutes/LoginRoute";
import Auth from "../Pages/Auth";
import AuthRoute from "../ProtectedRoutes/AuthRoute";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import AllUsers from "../components/AllUsers";
import Payment from "../Pages/Payment";

const ReactRouter = ({ RenderLayout }) => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RenderLayout />,
      children: [
        {
          path: "auth",
          element: (
            <LoginRoute>
              <Auth />
            </LoginRoute>
          ),
        },
        {
          path: "/",
          element: (
            <AuthRoute>
              <Home />
            </AuthRoute>
          ),
        },

        {
          path: "/users",
          element: (
            <AuthRoute>
              <AllUsers />
            </AuthRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <AuthRoute>
              <Cart />
            </AuthRoute>
          ),
        },
        {
          path: "/payment",
          element: (
            <AuthRoute>
              <Payment />
            </AuthRoute>
          ),
        },
        {
          path: "error",
          element: <Error />,
        },
        {
          path: "*",
          element: (
            <AuthRoute>
              <Home />
            </AuthRoute>
          ),
        },
      ],
    },
  ]);
  return router;
};

export default ReactRouter;
