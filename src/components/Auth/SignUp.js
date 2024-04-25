import React, { useState } from "react";
import AuthForm from "../AuthForm";
import "../../css/Signup.css";
import {
  API_URL,
  CLOUDINARY_IMAGE_UPLOAD_URL,
} from "../../constants/constants";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { storeUserInfo } from "../../DataManager/slices/UserSlice";
import { setLoginClicked } from "../../DataManager/slices/LoginSlice";
import { toast } from "react-toastify";
import {
  setImageId,
  setImageName,
} from "../../DataManager/slices/CloudinarySlice";

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [userIdOrEmail, setUserIdOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("buyer");
  const [error, setError] = useState("");
  const [isError, setIsError] = useState(false);
  const imageId = useSelector(
    (store) => store?.persistedReducer?.cloudinary?.imageId
  );
  const [isLoading, setLoading] = useState(false);
  const handleImageUpload = async (image) => {
    if (!image) return;
    dispatch(setImageName(image?.name));
    setLoading(true);
    if (!image) {
      toast("Please Select A Image!", {
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
      return;
    }
    if (image?.type === "image/png" || image.type === "image/jpeg") {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      formData.append(
        "cloud_name",
        process.env.REACT_APP_CLOUDINARY_CLOUD_NAME
      );

      try {
        const response = await fetch(CLOUDINARY_IMAGE_UPLOAD_URL, {
          method: "POST",
          body: formData,
        });
        const res = await response.json();
        dispatch(
          setImageId(
            res?.public_id
              ? res?.public_id?.slice(11)
              : "DUMMY_PROFILE_LOGO.png"
          )
        );
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setError("Image Upload Fail, Try Again Later");
        setLoading(false);
      }
    }
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    if (
      !name ||
      !email ||
      !userIdOrEmail ||
      !password ||
      !confirmPassword ||
      !userType
    )
      return;

    dispatch(setLoginClicked(true));

    const userDetails = {
      name,
      email,
      user_id: userIdOrEmail,
      password,
      confirm_password: confirmPassword,
      user_type: userType,
      image: imageId,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    };
    try {
      const apiUrl = API_URL + "users/register";
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response?.ok) {
        dispatch(setLoginClicked(false));
        setIsError(false);
        dispatch(storeUserInfo(data));
        dispatch(setImageId(""));
        dispatch(setImageName(""));
        navigate("/");
      } else {
        dispatch(setLoginClicked(false));
        setIsError(true);
        setError(data?.message);
      }
    } catch (error) {
      <Navigate to="/error" />;
    }
  };
  return (
    <div className="signup-auth-container">
      <AuthForm
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        userIdOrEmail={userIdOrEmail}
        setUserIdOrEmail={setUserIdOrEmail}
        password={password}
        setPassword={setPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        onSubmitForm={onSubmitForm}
        setUserType={setUserType}
        userType={userType}
        error={error}
        setError={setError}
        isError={isError}
        setIsError={setIsError}
        handleImageUpload={handleImageUpload}
        isLoading={isLoading}
      />
    </div>
  );
};

export default SignUp;
