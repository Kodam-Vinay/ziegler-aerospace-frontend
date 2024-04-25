import { createBrowserRouter } from "react-router-dom";
import LoginRoute from "../ProtectedRoutes/LoginRoute";
import Auth from "../Pages/Auth";
import AuthRoute from "../ProtectedRoutes/AuthRoute";
import Error from "../Pages/Error";
import Home from "../Pages/Home";
import Cart from "../Pages/Cart";
import AllUsers from "../components/AllUsers";
import Payment from "../Pages/Payment";
import Orders from "../Pages/Orders";
import SellerRoute from "../ProtectedRoutes/SellerRoute";
import AdminRoute from "../ProtectedRoutes/AdminRoute";
import BuyerRoute from "../ProtectedRoutes/BuyerRoute";

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
              <AdminRoute>
                <AllUsers />
              </AdminRoute>
            </AuthRoute>
          ),
        },
        {
          path: "/orders",
          element: (
            <AuthRoute>
              <SellerRoute>
                <Orders />
              </SellerRoute>
            </AuthRoute>
          ),
        },
        {
          path: "/cart",
          element: (
            <AuthRoute>
              <BuyerRoute>
                <Cart />
              </BuyerRoute>
            </AuthRoute>
          ),
        },
        {
          path: "/payment",
          element: (
            <AuthRoute>
              <BuyerRoute>
                <Payment />
              </BuyerRoute>
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
