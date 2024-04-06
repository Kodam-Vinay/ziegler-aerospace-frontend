import React, { useState } from "react";
import Popup from "reactjs-popup";
import useDeviceResize from "../hooks/useDeviceResize";
import { API_URL, CLOUDINARY_IMAGE_UPLOAD_URL } from "../constants/constants";
import { ColorRing } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import "../css/Table.css";
import { setProductCreateResponse } from "../DataManager/slices/ProductSlice";
import useGetHeaders from "../hooks/useGetHeaders";

const PopupForAddProduct = ({ setError, setIsError }) => {
  const dispatch = useDispatch();
  const headers = useGetHeaders();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("computers/laptops");
  const [rating, setRating] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState("");
  const [imageName, setImageName] = useState("");
  const [specifications, setSpecifications] = useState("");
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const size = useDeviceResize();

  const handleImageUpload = async (image) => {
    if (!image) return;
    setLoading(true);
    if (!image) {
      setIsError(true);
      setError("Please Select A Image!");
      return;
    }
    setIsError(false);
    setImageName(image?.name);
    if (image?.type === "image/png" || image.type === "image/jpeg") {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        process.env.REACT_APP_CLOUDINARY_PRODUCTS_PRESET
      );
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
        setImage(
          res?.public_id ? res?.public_id?.slice(11) : "DUMMY_PROFILE_LOGO.png"
        );
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setError("Image Upload Fail, Try Again Later");
        setLoading(false);
      }
    }
  };

  const onclickSubmitForm = async (e) => {
    e.preventDefault();
    let specsToArray = specifications?.split(",");
    if (specsToArray[specsToArray.length - 1] === "") {
      specsToArray = specsToArray.slice(0, specsToArray.length - 1);
    }

    if (!name || !price || !rating || !category || !specifications) {
      return;
    }
    const productDetails = {
      product_name: name,
      product_image: image?.slice(9),
      product_price: price,
      rating,
      category,
      specifications: specsToArray,
      user_id: user?.user_id,
    };

    const options = {
      method: "POST",
      headers: {
        ...headers,
      },
      body: JSON.stringify(productDetails),
    };

    try {
      const apiUrl = API_URL + "products/add-product";
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response?.ok) {
        dispatch(setProductCreateResponse(true));
        setName("");
        setPrice("");
        setCategory("");
        setRating("");
        setSpecifications("");
        setImage("");
        setImageName("");
      } else {
        dispatch(setProductCreateResponse(false));
        setError(data?.message);
        setIsError(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Popup
      trigger={<button className="add-button"> Add Product </button>}
      modal
      nested
    >
      {(close) => (
        <div className="modal popup-container">
          <button className="close close-button" onClick={close}>
            &times;
          </button>
          <form className="main-popup-container" onSubmit={onclickSubmitForm}>
            <input
              type="text"
              className="input-field white-color-background height-width-for-form-elements"
              placeholder="Enter Product Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsError(false);
              }}
            />

            <input
              type="number"
              className="input-field white-color-background height-width-for-form-elements"
              placeholder="Enter Product price"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setIsError(false);
              }}
            />

            <select
              className="height-width-for-form-elements input-field-container white-color-background user-type-selection-option"
              onChange={(e) => {
                setCategory(e.target.value);
                setIsError(false);
              }}
              value={category}
            >
              <option value="computers/laptops">Computers/Laptops</option>
              <option value="mobiles">Mobiles</option>
            </select>

            <input
              type="number"
              className="input-field white-color-background height-width-for-form-elements"
              placeholder="Enter Product rating"
              value={rating}
              onChange={(e) => {
                if (e.target.value.length < 4) {
                  setRating(e.target.value);
                  setIsError(false);
                }
              }}
            />

            <input
              type="text"
              className="input-field white-color-background height-width-for-form-elements"
              placeholder="Enter Product Specs with comma ',' "
              value={specifications}
              onChange={(e) => {
                setSpecifications(e.target.value);
                setIsError(false);
              }}
            />

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

            {isLoading && (
              <div className="sign-in-loader">
                <ColorRing
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "#e15b64",
                    "#f47e60",
                    "#f8b26a",
                    "#abbd81",
                    "#849b87",
                  ]}
                />
              </div>
            )}

            <div className="height-width-for-form-elements input-field-container white-color-background button-field-container">
              <button
                className="form-submit-button height-width-for-form-elements button"
                type="submit"
              >
                Create Product
              </button>
            </div>
          </form>
        </div>
      )}
    </Popup>
  );
};

export default PopupForAddProduct;
