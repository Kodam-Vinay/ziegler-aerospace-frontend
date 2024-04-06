import { Outlet, RouterProvider, useLocation } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./DataManager/store";
import ReactRouter from "./components/ReactRouter";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

const RenderLayout = () => {
  const location = useLocation();
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  return (
    <>
      {location?.pathname !== "/auth" && user && <Navbar />}
      <Outlet />
    </>
  );
};

function App() {
  const router = ReactRouter({ RenderLayout });
  return (
    <div className="app-router-container">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
}

export default App;
