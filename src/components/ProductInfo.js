import { CLOUDINARY_IMAGE_ACCESS_URL } from "../constants/constants";
import "../css/BuyerPage.css";
import { useDispatch, useSelector } from "react-redux";
import { storeCartItems } from "../DataManager/slices/CartSlice";

const ProductInfo = ({ details }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const onClickAddItem = (details) => {
    dispatch(storeCartItems({ ...details, user_id: user?.user_id }));
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
    <div className="product-card">
      <div className="product-image">
        <img src={imageUrl} alt={details?.product_name} />
      </div>
      <div className="product-details">
        <h2>{details?.product_name}</h2>
        <p>Price: ${details?.product_price}</p>
        <p>Rating: {details?.rating}</p>
        <p>Seller: {details?.seller_id}</p>
        <p>Specifications: {details?.specifications.join(", ")}</p>
        <button
          className="button add-animation add-product-button"
          onClick={() => onClickAddItem(details)}
          type="button"
        >
          Add +
        </button>
      </div>
    </div>
  );
};

export default ProductInfo;
