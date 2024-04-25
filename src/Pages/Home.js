import { useDispatch, useSelector } from "react-redux";
import "../css/Home.css";
import ChangableHome from "../components/ChangableHome";
import SellerPage from "./SellerPage";
import BuyerPage from "./BuyerPage";
import { useState } from "react";
import { toast } from "react-toastify";
import { API_URL } from "../constants/constants";
import useGetHeaders from "../hooks/useGetHeaders";
import { storeUserInfo } from "../DataManager/slices/UserSlice";
import { Navigate } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const headers = useGetHeaders();
  const isPremium = user?.is_premium_user;
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const onClickPremium = async () => {
    const reponse = window.confirm("Do You Want Took Premium");
    if (!reponse) return;
    try {
      const apiUrl = API_URL + "users/update-user";
      const options = {
        method: "PUT",
        headers: {
          ...headers,
        },
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response?.ok) {
        setIsError(false);
        dispatch(storeUserInfo({ ...user, is_premium_user: true }));
      } else {
        setIsError(true);
        setError(data?.message);
      }
    } catch (error) {
      <Navigate to="/error" />;
    }
  };

  if (isError) {
    toast(error, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      type: "error",
    });
  }

  return (
    <div className="home-main-container">
      <div className="home-user-premium-took-container">
        <p className="apply-padding">{`Hello, ${user?.name}`}</p>
        {user?.user_type === "buyer" && !isPremium ? (
          <button
            className="button add-animation add-product-button"
            type="button"
            onClick={onClickPremium}
          >
            Took Premium
          </button>
        ) : user?.user_type === "buyer" && isPremium ? (
          <p className="apply-padding">Premium🔥</p>
        ) : null}
      </div>
      {user?.user_type === "admin" && <ChangableHome />}
      {user?.user_type === "seller" && <SellerPage />}
      {user?.user_type === "buyer" && <BuyerPage />}
    </div>
  );
};

export default Home;
