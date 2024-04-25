import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const SellerRoute = ({ children }) => {
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  return user?.user_type === "seller" ? children : <Navigate to="/" />;
};

export default SellerRoute;
