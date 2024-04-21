import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {},
    totalPrice: 0,
  },
  reducers: {
    storeCartItems: (state, action) => {
      const cart = state.cartItems;
      const product = action.payload;
      if (!cart?.[product?.user_id]) {
        cart[product?.user_id] = [{ ...product, ItemsInCart: 1 }];
      } else {
        const productExist = cart[product?.user_id]?.find(
          (each) => each?.product_id === product?.product_id
        );

        if (productExist) {
          const newCount = productExist?.ItemsInCart + 1;
          const updatedList = cart[product?.user_id]?.map((eachItem) => {
            if (eachItem?.product_id === product?.product_id) {
              return { ...eachItem, ItemsInCart: newCount };
            }
            return eachItem;
          });
          cart[product?.user_id] = updatedList;
        } else {
          cart[product?.user_id] = [
            ...cart[product?.user_id],
            { ...product, ItemsInCart: 1 },
          ];
        }
      }
    },
    makeStoreEmpty: (state, action) => {
      const user_id = action.payload;
      const cart = state.cartItems;
      cart[user_id] = [];
    },
    increaseCount: (state, action) => {
      const cart = state.cartItems;
      const product_details = action.payload;
      const { product_id, user_id } = product_details;
      const updatedList = cart[user_id]?.map((eachItem) => {
        if (eachItem?.product_id === product_id) {
          return { ...eachItem, ItemsInCart: eachItem.ItemsInCart + 1 };
        }
        return eachItem;
      });
      cart[user_id] = updatedList;
    },
    decreaseCount: (state, action) => {
      const cart = state.cartItems;
      const product_details = action.payload;
      const { product_id, user_id } = product_details;
      const updatedList = cart[user_id]?.map((eachItem) => {
        if (eachItem.product_id === product_id) {
          if (eachItem.ItemsInCart > 1) {
            return { ...eachItem, ItemsInCart: eachItem.ItemsInCart - 1 };
          }
        }
        return eachItem;
      });
      cart[user_id] = updatedList;
    },
    removeItem: (state, action) => {
      const cart = state.cartItems;
      const product_details = action.payload;
      const { product_id, user_id } = product_details;
      const updatedList = cart[user_id]?.filter(
        (eachItem) => eachItem.product_id !== product_id
      );
      cart[user_id] = updatedList;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = action.payload;
    },
  },
});
export const {
  storeCartItems,
  makeStoreEmpty,
  increaseCount,
  decreaseCount,
  removeItem,
  setTotalPrice,
} = CartSlice.actions;
export default CartSlice.reducer;
