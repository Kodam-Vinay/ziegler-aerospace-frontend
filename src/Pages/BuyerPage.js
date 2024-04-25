import React, { useState } from "react";
import useGetData from "../hooks/useGetData";
import {
  API_URL,
  filterNotPremiumProducts,
  filterPremiumProducts,
} from "../constants/constants";
import "../css/BuyerPage.css";
import ProductInfo from "../components/ProductInfo";
import { CirclesWithBar } from "react-loader-spinner";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import PremiumProducts from "../components/PremiumProducts";

const BuyerPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [isError, setIsError] = useState(false);
  const [isApiCallComplete, setApiCallComplete] = useState(false);
  const apiUrl = API_URL + "products/all-products";
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);

  useGetData({
    setUsersData: setData,
    setIsError,
    setError,
    apiUrl,
    setApiCallComplete,
  });

  const premiumProducts = filterPremiumProducts(data);
  const notPremiumProducts = filterNotPremiumProducts(data);
  const condition =
    (user?.is_premium_user && premiumProducts?.length > 0) ||
    notPremiumProducts.length > 0;
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
    <div className="buyer-page-container">
      {isApiCallComplete && condition && !isError ? (
        <div>
          {user?.is_premium_user && premiumProducts?.length > 0 ? (
            <p className="add-class-for-premium-and-all-text">
              Premium Products
            </p>
          ) : null}

          {user?.is_premium_user && premiumProducts?.length > 0 ? (
            <PremiumProducts products={premiumProducts} />
          ) : null}

          {notPremiumProducts?.length > 0 && (
            <p className="add-class-for-premium-and-all-text">All Products</p>
          )}

          <div className="buyer-page-products-container">
            {notPremiumProducts?.map((each) => (
              <ProductInfo key={each?.product_id} details={each} />
            ))}
          </div>
        </div>
      ) : !isApiCallComplete && notPremiumProducts?.length === 0 && !isError ? (
        <div className="sign-in-loader">
          <CirclesWithBar
            height="100"
            width="100"
            color="#4fa94d"
            outerCircleColor="#4fa94d"
            innerCircleColor="#4fa94d"
            barColor="#4fa94d"
            ariaLabel="circles-with-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        </div>
      ) : (
        <p className="no-products-found-text">No Products Found</p>
      )}
    </div>
  );
};

export default BuyerPage;
