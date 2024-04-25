import { useState } from "react";
import useGetData from "../hooks/useGetData";
import { API_URL } from "../constants/constants";
import { toast } from "react-toastify";
import "../css/Orders.css";
import "../css/Table.css";
import { CirclesWithBar } from "react-loader-spinner";
import EachOrder from "../components/EachOrder";

const Orders = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const [isApiCallComplete, setApiCallComplete] = useState(false);
  const apiUrl = API_URL + "orders/seller-orders";

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
    <div className="product-table-container">
      {isApiCallComplete && data?.length > 0 && !isError ? (
        <table className="product-table">
          <tbody>
            <tr className="each-row-container">
              <th className="each-row-container tabel-head">Name</th>
              <th className="each-row-container tabel-head">Price</th>
              <th className="each-row-container tabel-head">Category</th>
              <th className="each-row-container tabel-head">Image</th>
              <th className="each-row-container tabel-head">User Name</th>
              <th className="each-row-container tabel-head">Count</th>
              <th className="each-row-container tabel-head">Total</th>
              <th className="each-row-container tabel-head">Date&Time</th>
            </tr>
            {data?.map((each) => (
              <EachOrder details={each} key={each?._id} />
            ))}
          </tbody>
        </table>
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
        <p className="no-products-found-text">No Orders Found</p>
      )}
    </div>
  );
};

export default Orders;
