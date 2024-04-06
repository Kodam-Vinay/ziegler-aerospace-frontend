import Login from "../components/Auth/Login";
import SignUp from "../components/Auth/SignUp";
import "../css/Auth.css";
import { useDispatch, useSelector } from "react-redux";
import { makeActiveAuth } from "../DataManager/slices/AuthSlice";
import { Grid } from "react-loader-spinner";

const Auth = () => {
  const activeAuth = useSelector(
    (store) => store?.persistedReducer?.auth?.activeAuth
  );
  const isLoginClicked = useSelector((store) => store?.login?.isLoginClicked);
  const dispatch = useDispatch();

  return (
    <div className="auth-container">
      <div
        className={`auth-buttons-container ${
          isLoginClicked ? "loading-login-screen-container-opacity" : ""
        }`}
      >
        <button
          onClick={() => dispatch(makeActiveAuth("login"))}
          className={`auth-button ${
            activeAuth === "login" ? "add-bg-color-active-auth" : ""
          }`}
        >
          Login
        </button>
        <button
          onClick={() => dispatch(makeActiveAuth("signup"))}
          className={`auth-button ${
            activeAuth === "signup" ? "add-bg-color-active-auth" : "auth-button"
          }`}
        >
          SignUp
        </button>
      </div>
      <div
        className={`active-auth-container ${
          isLoginClicked ? "loading-login-screen-container-opacity" : ""
        }`}
      >
        {activeAuth === "login" ? <Login /> : <SignUp />}
      </div>
      {isLoginClicked && (
        <div className="sign-in-loader">
          <Grid
            visible={true}
            height="80"
            width="80"
            color="#fff"
            ariaLabel="grid-loading"
            radius="12.5"
            wrapperStyle={{}}
            wrapperClass="grid-wrapper"
          />
        </div>
      )}
    </div>
  );
};

export default Auth;
