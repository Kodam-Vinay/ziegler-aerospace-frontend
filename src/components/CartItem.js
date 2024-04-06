import { CLOUDINARY_IMAGE_ACCESS_URL } from "../constants/constants";
import { useDispatch } from "react-redux";
import "../css/Cart.css";
import {
  decreaseCount,
  increaseCount,
  removeItem,
} from "../DataManager/slices/CartSlice";

const CartItem = ({ cartItemDetails }) => {
  const dispatch = useDispatch();
  const { product_id, product_name, product_image, product_price } =
    cartItemDetails;

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img
          src={
            CLOUDINARY_IMAGE_ACCESS_URL.replace(
              "e-commerce/",
              "e-commerce-products/"
            ) + product_image
          }
          alt={product_name}
          className="cart-item"
        />
      </div>
      <div className="cart-item-details">
        <h3>{product_name}</h3>
        <p>Price: ${product_price}</p>
        <p>Quantity: {cartItemDetails?.ItemsInCart}</p>
        <div className="cart-item-actions">
          <button onClick={() => dispatch(decreaseCount(product_id))}>-</button>
          <button onClick={() => dispatch(increaseCount(product_id))}>+</button>
          <button onClick={() => dispatch(removeItem(product_id))}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
