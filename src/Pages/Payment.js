import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { makeStoreEmpty } from "../DataManager/slices/CartSlice";
import "../css/Payment.css";

const Payment = () => {
  const dispatch = useDispatch();
  const totalPrice = useSelector(
    (store) => store?.persistedReducer?.cart?.totalPrice
  );

  const onClickHome = () => {
    dispatch(makeStoreEmpty());
  };

  return (
    <div className="payment-container">
      <p>Your Order was successfull with ${totalPrice}</p>
      <Link to="/" className="cart-below-button" onClick={onClickHome}>
        <button className="cart-button add-animation">Home</button>
      </Link>
    </div>
  );
};

export default Payment;
