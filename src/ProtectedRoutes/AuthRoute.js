import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const AuthRoute = ({ children }) => {
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  return user !== null ? children : <Navigate to="/auth" />;
};

export default AuthRoute;
