import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Popup from "reactjs-popup";
import {
  API_URL,
  CLOUDINARY_IMAGE_ACCESS_URL,
  CLOUDINARY_IMAGE_UPLOAD_URL,
} from "../constants/constants";
import "../css/Table.css";
import { useState } from "react";
import useDeviceResize from "../hooks/useDeviceResize";
import { ColorRing } from "react-loader-spinner";
import { useSelector, useDispatch } from "react-redux";
import { setProductEdited } from "../DataManager/slices/ProductSlice";
import useGetHeaders from "../hooks/useGetHeaders";

const EachProduct = ({ details, deleteProduct, setIsError, setError }) => {
  const dispatch = useDispatch();
  const size = useDeviceResize();
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

  const onclickSubmitForm = async (product_id) => {
    try {
      let specsToArray = specifications?.split(",");
      if (specsToArray[specsToArray.length - 1] === "") {
        specsToArray = specsToArray.slice(0, specsToArray.length - 1);
      }

      if (!name || !price || !rating || !category || !specifications) {
        return;
      }

      const imageName = image?.includes("products/") ? image?.slice(9) : image;
      const productDetails = {
        product_id,
        product_name: name,
        product_image: imageName,
        product_price: price,
        rating,
        category,
        specifications: specsToArray,
        user_id: user?.user_id,
      };

      const options = {
        method: "PUT",
        headers: {
          ...headers,
        },
        body: JSON.stringify(productDetails),
      };

      const apiUrl = API_URL + `products/update-product/${product_id}`;

      const response = await fetch(apiUrl, options);
      const data = await response.json();
      if (response?.ok) {
        dispatch(setProductEdited(true));
        setName("");
        setPrice("");
        setCategory("");
        setRating("");
        setSpecifications("");
        setImage("");
        setImageName("");
        setIsError(false);
      } else {
        dispatch(setProductEdited(false));
        setIsError(true);
        setError(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageUpload = async (image) => {
    if (!image) return;
    setLoading(true);
    if (!image) {
      setIsError(true);
      setError("Please Select A Image!");
      return;
    }
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

  const onClickEdit = (product) => {
    setName(product?.product_name);
    setCategory(product?.category);
    setImage(product?.product_image);
    setRating(product?.rating);
    setPrice(product?.product_price);
    setImageName(product?.product_image);
    const specs = product?.specifications.join(",");
    setSpecifications(specs);
  };

  const onClickDelete = (product_id) => {
    deleteProduct(product_id);
  };
  const imageUrl =
    Object.values(details).length > 0 && details?.product_image?.length > 0
      ? CLOUDINARY_IMAGE_ACCESS_URL.replace(
          "e-commerce/",
          "e-commerce-products/"
        ) + details?.product_image
      : CLOUDINARY_IMAGE_ACCESS_URL.replace(
          "e-commerce/",
          "e-commerce-products/"
        ) + "NO-PRODUCT-IMAGE";
  return (
    <tr className="each-row-container">
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.product_name}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.product_price}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.category}</span>
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">
          {details?.specifications?.join(",")}
        </span>
      </td>
      <td className="each-row-container table-data">
        <img
          className="product-image product-table-image"
          src={imageUrl}
          alt="product"
        />
      </td>
      <td className="each-row-container table-data">
        <span className="each-value-container">{details?.rating}</span>
      </td>
      <td className="each-row-container">
        <Popup
          trigger={
            <button
              className="button add-animation each-value-container"
              type="button"
            >
              <FaEdit
                color="white"
                size={22}
                onClick={() => onClickEdit(details)}
              />
            </button>
          }
          modal
          nested
        >
          {(close) => (
            <div className="modal popup-container">
              <button className="close close-button" onClick={close}>
                &times;
              </button>
              <form
                className="main-popup-container"
                onSubmit={(e) => {
                  e.preventDefault();
                  onclickSubmitForm(details?.product_id);
                }}
              >
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
                        imageName?.slice(
                          imageName?.length - 4,
                          imageName?.length
                        )
                      : size?.width > 300 && size?.width < 500
                      ? imageName.slice(0, 12) +
                        imageName?.slice(
                          imageName?.length - 4,
                          imageName?.length
                        )
                      : size?.width > 500 && size?.width < 1100
                      ? imageName.slice(0, 20) +
                        imageName?.slice(
                          imageName?.length - 4,
                          imageName?.length
                        )
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
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          )}
        </Popup>
        <button
          className="button add-animation logout-button each-value-container"
          onClick={() => onClickDelete(details?.product_id)}
          type="button"
        >
          <MdDeleteOutline color="white" size={22} />
        </button>
      </td>
    </tr>
  );
};

export default EachProduct;
