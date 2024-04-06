import { useSelector } from "react-redux";
import "../css/AllUsers.css";
import useGetData from "../hooks/useGetData";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EachUser from "./EachUser";
import { CirclesWithBar } from "react-loader-spinner";
import { API_URL } from "../constants/constants";
import useGetHeaders from "../hooks/useGetHeaders";

const AllUsers = () => {
  const [usersData, setUsersData] = useState([]);
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const userInfo = {
    user_id: user?.user_id,
    user_type: user?.user_type,
  };
  const headers = useGetHeaders();
  const apiUrl = API_URL + "users/all-users";
  useGetData({ userInfo, setUsersData, setIsError, setError, apiUrl });

  const removeUserFromDb = async (id) => {
    const checkConfirm = window.confirm(
      "Are You Sure You want to Delete this User"
    );
    if (!checkConfirm) return;
    try {
      const userDetails = {
        user_id: id,
        admin_id: user?.user_id,
      };
      const options = {
        method: "DELETE",
        headers: {
          ...headers,
        },
        body: JSON.stringify(userDetails),
      };
      const apiUrl = API_URL + "users/delete-user";
      const response = await fetch(apiUrl, options);
      const data = await response.json();
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
        const users = usersData?.filter(
          (each) => each?.user_id !== data?.user_id
        );
        setUsersData(users);
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
    <div className="all-users-container">
      <ToastContainer className="toast-container" />
      <p>Users List</p>
      {usersData?.length > 0 && !isError ? (
        <table className="table-container">
          <tbody>
            <tr className="each-row-container">
              <th className="each-row-container tabel-head">User Name</th>
              <th className="each-row-container tabel-head">User Type</th>
              <th className="each-row-container tabel-head">Action</th>
            </tr>
            {usersData?.map((each) => (
              <EachUser
                details={each}
                key={each?.user_id}
                removeUserFromDb={removeUserFromDb}
              />
            ))}
          </tbody>
        </table>
      ) : !isError && usersData.length === 0 ? (
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
        ""
      )}
    </div>
  );
};

export default AllUsers;
