import { useState } from "react";
import "../../css/Login.css";
import AuthForm from "../AuthForm";
import { API_URL } from "../../constants/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeUserInfo } from "../../DataManager/slices/UserSlice";
import { setLoginClicked } from "../../DataManager/slices/LoginSlice";
import {
  setImageId,
  setImageName,
} from "../../DataManager/slices/CloudinarySlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userIdOrEmail, setUserIdOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (!userIdOrEmail || !password) return;
    dispatch(setLoginClicked(true));
    const apiUrl = API_URL + "users/login";
    const userDetails = {
      email: userIdOrEmail,
      password,
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response?.ok) {
        dispatch(setLoginClicked(false));
        dispatch(storeUserInfo(data));
        dispatch(setImageId(""));
        dispatch(setImageName(""));
        setIsError(false);
        navigate("/");
      } else {
        dispatch(setLoginClicked(false));
        setIsError(true);
        setError(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login-auth-container">
      <AuthForm
        userIdOrEmail={userIdOrEmail}
        setUserIdOrEmail={setUserIdOrEmail}
        password={password}
        setPassword={setPassword}
        onSubmitForm={onSubmitForm}
        isError={isError}
        setIsError={setIsError}
        error={error}
      />
    </div>
  );
};

export default Login;
