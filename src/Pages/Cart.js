import { Link } from "react-router-dom";
import {
  CLOUDINARY_IMAGE_ACCESS_URL,
  filterCartItemsList,
} from "../constants/constants";
import "../css/Cart.css";
import { useSelector, useDispatch } from "react-redux";
import { makeStoreEmpty } from "../DataManager/slices/CartSlice";
import TotalPriceCalucation from "../components/TotalPriceCalucation";
import CartItem from "../components/CartItem";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItemsList = useSelector(
    (store) => store?.persistedReducer?.cart?.cartItems
  );
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const cartList = filterCartItemsList(cartItemsList, user);

  const onClickRemoveAll = () => {
    dispatch(makeStoreEmpty(user?.user_id));
  };

  const totalPrice = useSelector(
    (store) => store?.persistedReducer?.cart?.totalPrice
  );
  TotalPriceCalucation();

  const renderEmptyPage = () => (
    <div className="empty-cart-container">
      <img
        src={CLOUDINARY_IMAGE_ACCESS_URL + "cart-empty"}
        alt="empty-cart"
        className="empty-cart-image"
      />
      <div className="flex flex-col items-center text-center space-y-3">
        <h3 className="font-bold text-xl sm:text-2xl">Your Cart Is Empty</h3>
        <p className="font-bold sm:text-xl">Go to Home add Some Products</p>
        <Link to="/" className="cart-below-button">
          <button className="cart-button add-animation">Home</button>
        </Link>
      </div>
    </div>
  );

  const renderResults = () => (
    <div className="cart-render-results-container">
      <h3 className="">
        <span className="">Total:</span>
        <span className="flex items-center ml-2"> ${totalPrice}</span>
      </h3>
      <ul className="w-full h-full space-y-2 flex flex-col mt-0 pb-4 pt-2 px-1 overflow-y-auto">
        {cartList?.map((eachItem, index) => (
          <CartItem
            key={eachItem?.product_id + index * 53}
            cartItemDetails={eachItem}
          />
        ))}
      </ul>
    </div>
  );

  return (
    <div className="cart-main-container">
      <div className="h-full w-full flex flex-col">
        {Object.keys(cartList).length > 0 && (
          <button
            className="add-animation cart-button cart-clear-button"
            onClick={onClickRemoveAll}
          >
            Remove All
          </button>
        )}
        <div className="cart-show-list-container">
          {Object.keys(cartList).length ? renderResults() : renderEmptyPage()}
        </div>
        {Object.keys(cartList).length ? (
          <div className="cart-check-add-more-buttons-container">
            <Link to="/payment" className="cart-below-button">
              <button className="cart-button add-animation">Checkout</button>
            </Link>
            <Link to="/" className="cart-below-button">
              <button className="cart-button add-animation">
                Add More Items
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Cart;
