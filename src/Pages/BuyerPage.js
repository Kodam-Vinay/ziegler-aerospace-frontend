import React, { useState } from "react";
import useGetData from "../hooks/useGetData";
import { API_URL } from "../constants/constants";
import "../css/BuyerPage.css";
import ProductInfo from "../components/ProductInfo";
import { CirclesWithBar } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BuyerPage = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  const [isError, setIsError] = useState(false);
  const [isApiCallComplete, setApiCallComplete] = useState(false);
  const apiUrl = API_URL + "products/all-products";

  useGetData({
    setUsersData: setData,
    setIsError,
    setError,
    apiUrl,
    setApiCallComplete,
  });

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
      <ToastContainer />
      {isApiCallComplete && data?.length > 0 && !isError ? (
        <div className="buyer-page-products-container">
          {data?.map((each) => (
            <ProductInfo key={each?.product_id} details={each} />
          ))}
        </div>
      ) : !isApiCallComplete && data?.length === 0 && !isError ? (
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
