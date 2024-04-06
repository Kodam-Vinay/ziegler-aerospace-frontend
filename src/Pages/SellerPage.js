import { useEffect, useState } from "react";
import ProductTable from "../components/ProductTable";
import useGetData from "../hooks/useGetData";
import { useSelector, useDispatch } from "react-redux";
import { API_URL } from "../constants/constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../css/SellerPage.css";
import {
  setProductCreateResponse,
  setProductEdited,
} from "../DataManager/slices/ProductSlice";
import useGetHeaders from "../hooks/useGetHeaders";

const SellerPage = () => {
  const headers = useGetHeaders();
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isApiCallComplete, setApiCallComplete] = useState(false);
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const checkProductCreateResponse = useSelector(
    (store) => store?.product?.isProductCreatedResponseSuccess
  );
  const checkProductEdited = useSelector(
    (store) => store?.product?.isProductEdited
  );

  const apiUrl = API_URL + "products/all-products";

  useGetData({
    setUsersData: setData,
    setIsError,
    setError,
    apiUrl,
    setApiCallComplete,
  });

  const onClickDeleteProduct = async (product_id) => {
    const checkConfirm = window.confirm(
      "Are You Sure You want to Delete this User"
    );
    if (!checkConfirm) return;
    try {
      const userDetails = {
        user_id: user?.user_id,
        product_id,
      };
      const options = {
        method: "DELETE",
        headers: {
          ...headers,
        },
        body: JSON.stringify(userDetails),
      };
      const apiUrl = API_URL + `products/delete-product/${product_id}`;
      const response = await fetch(apiUrl, options);
      const resData = await response.json();
      if (response.ok) {
        toast(data?.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          type: "success",
        });
        const products = data?.filter(
          (each) => each?.product_id !== resData?.product_id
        );
        setData(products);
      } else {
        toast(data?.message, {
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
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(dispatch(setProductCreateResponse(false)));
      dispatch(dispatch(setProductEdited(false)));
    }, 3000);
    return () => {
      clearTimeout(timer);
    };
  }, [checkProductCreateResponse, checkProductEdited]);

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

  if (checkProductEdited) {
    toast("Product Edited Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      type: "success",
    });
  } else if (checkProductCreateResponse) {
    toast("Product Created Successfully", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      type: "success",
    });
  }
  return (
    <div className="seller-page-container">
      {checkProductCreateResponse || checkProductEdited ? (
        <ToastContainer className="toast-container" />
      ) : null}
      <ProductTable
        products={data}
        setError={setError}
        error={error}
        isError={isError}
        setIsError={setIsError}
        deleteProduct={onClickDeleteProduct}
        isApiCallComplete={isApiCallComplete}
      />
    </div>
  );
};

export default SellerPage;
