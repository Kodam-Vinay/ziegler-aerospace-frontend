import React, { useState } from "react";
import { useSelector } from "react-redux";
import "../css/AuthForm.css";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { ColorRing } from "react-loader-spinner";
import useDeviceResize from "../hooks/useDeviceResize";

const AuthForm = ({
  name,
  email,
  password,
  confirmPassword,
  userIdOrEmail,
  userType,
  isError,
  setName,
  setEmail,
  setPassword,
  setConfirmPassword,
  setUserIdOrEmail,
  setUserType,
  setIsError,
  error,
  onSubmitForm,
  handleImageUpload,
  isLoading,
}) => {
  const activeAuth = useSelector(
    (store) => store?.persistedReducer?.auth?.activeAuth
  );

  const imageName = useSelector(
    (store) => store?.persistedReducer?.cloudinary?.imageName
  );
  const size = useDeviceResize();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <form className="auth-form-container" onSubmit={onSubmitForm}>
      {activeAuth === "signup" && (
        <input
          type="email"
          className="input-field white-color-background height-width-for-form-elements"
          placeholder="Enter Your Email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setIsError(false);
          }}
        />
      )}

      <input
        type="text"
        className="input-field white-color-background height-width-for-form-elements"
        placeholder={
          activeAuth === "signup"
            ? "Create a User Id for Your self"
            : "Enter Your Email or User Id"
        }
        value={userIdOrEmail}
        onChange={(e) => {
          setUserIdOrEmail(e.target.value);
          setIsError(false);
        }}
      />

      {activeAuth === "signup" && (
        <input
          type="text"
          className="input-field white-color-background height-width-for-form-elements"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setIsError(false);
          }}
        />
      )}

      <div className="height-width-for-form-elements input-field-container white-color-background">
        <input
          type={showPassword ? "text" : "password"}
          className="input-field password-text-field white-color"
          placeholder="Enter Your Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setIsError(false);
          }}
        />
        <button
          onClick={() => setShowPassword(!showPassword)}
          className="button"
          type="button"
        >
          {showPassword ? <IoEyeOff size={25} /> : <IoEye size={25} />}
        </button>
      </div>

      {activeAuth === "signup" && (
        <div className="height-width-for-form-elements input-field-container white-color-background">
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="input-field password-text-field white-color-background"
            placeholder="Enter Password Again"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setIsError(false);
            }}
          />
          <button
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="button"
            type="button"
          >
            {showConfirmPassword ? <IoEyeOff size={25} /> : <IoEye size={25} />}
          </button>
        </div>
      )}

      {activeAuth === "signup" && (
        <select
          className="height-width-for-form-elements input-field-container white-color-background user-type-selection-option"
          onChange={(e) => {
            setUserType(e.target.value);
            setIsError(false);
          }}
          value={userType}
        >
          <option value="admin">Admin</option>
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
        </select>
      )}

      {activeAuth === "signup" && (
        <div className="height-width-for-form-elements image-upload-container">
          <input
            type="file"
            className="input-field height-width-for-form-elements"
            accept="image/*"
            onChange={(e) => handleImageUpload(e.target.files[0])}
          />
          <label>
            {size?.width < 300
              ? imageName?.slice(0, 8) +
                imageName?.slice(imageName?.length - 4, imageName?.length)
              : size?.width > 300 && size?.width < 500
              ? imageName.slice(0, 12) +
                imageName?.slice(imageName?.length - 4, imageName?.length)
              : size?.width > 500 && size?.width < 1100
              ? imageName.slice(0, 20) +
                imageName?.slice(imageName?.length - 4, imageName?.length)
              : imageName}
          </label>
        </div>
      )}

      {isLoading && activeAuth === "signup" && (
        <div className="sign-in-loader">
          <ColorRing
            visible={true}
            height="60"
            width="60"
            ariaLabel="color-ring-loading"
            wrapperStyle={{}}
            wrapperClass="color-ring-wrapper"
            colors={["#e15b64", "#f47e60", "#f8b26a", "#abbd81", "#849b87"]}
          />
        </div>
      )}

      <div className="height-width-for-form-elements input-field-container white-color-background button-field-container">
        <button
          className="form-submit-button height-width-for-form-elements button"
          type="submit"
        >
          {activeAuth === "login" ? "Login" : "Sign Up"}
        </button>
      </div>

      {isError && <p className="error-message">*{error}</p>}
    </form>
  );
};

export default AuthForm;
