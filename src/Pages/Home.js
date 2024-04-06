import { useSelector } from "react-redux";
import "../css/Home.css";
import ChangableHome from "../components/ChangableHome";
import SellerPage from "./SellerPage";
import BuyerPage from "./BuyerPage";

const Home = () => {
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  return (
    <div className="home-main-container">
      {user?.user_type === "admin" && <ChangableHome />}
      {user?.user_type === "seller" && <SellerPage />}
      {user?.user_type === "buyer" && <BuyerPage />}
    </div>
  );
};

export default Home;
