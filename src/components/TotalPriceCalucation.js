import { useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { setTotalPrice } from "../DataManager/slices/CartSlice";

const TotalPriceCalucation = () => {
  const dispatch = useDispatch();
  const cartItemsList = useSelector(
    (store) => store?.persistedReducer?.cart?.cartItems
  );
  const user = useSelector((store) => store?.persistedReducer?.user?.userInfo);
  const cart = cartItemsList[user?.user_id];
  let TotalPrice = 0;
  cart?.map((each) => {
    if (each?.product_price) {
      TotalPrice += each?.product_price * each?.ItemsInCart;
    } else {
      TotalPrice += 5000 * each?.ItemsInCart;
    }
    return TotalPrice;
  });

  useEffect(() => {
    dispatch(setTotalPrice(Math.round(TotalPrice)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItemsList]);
};
export default TotalPriceCalucation;
