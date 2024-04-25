import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AdminRoute = ({ children }) => {
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  return user?.user_type === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
