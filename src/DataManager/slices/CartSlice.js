import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    totalPrice: 0,
  },
  reducers: {
    storeCartItems: (state, action) => {
      const product = action.payload;
      const result = state.cartItems?.find(
        (eachItem) => eachItem?.product_id === product?.product_id
      );
      if (result) {
        const newCount = result?.ItemsInCart + 1;
        const updatedList = state.cartItems?.map((eachItem) => {
          if (eachItem?.product_id === product?.product_id) {
            return { ...eachItem, ItemsInCart: newCount };
          }
          return eachItem;
        });
        state.cartItems = updatedList;
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...action.payload, ItemsInCart: 1 },
        ];
      }
    },
    makeStoreEmpty: (state) => {
      state.cartItems = [];
    },
    increaseCount: (state, action) => {
      const product_id = action.payload;
      const updatedList = state.cartItems?.map((eachItem) => {
        if (eachItem?.product_id === product_id) {
          return { ...eachItem, ItemsInCart: eachItem.ItemsInCart + 1 };
        }
        return eachItem;
      });
      state.cartItems = updatedList;
    },
    decreaseCount: (state, action) => {
      const product_id = action.payload;
      const updatedList = state.cartItems?.map((eachItem) => {
        if (eachItem.product_id === product_id) {
          if (eachItem.ItemsInCart > 1) {
            return { ...eachItem, ItemsInCart: eachItem.ItemsInCart - 1 };
          }
        }
        return eachItem;
      });
      state.cartItems = updatedList;
    },
    removeItem: (state, action) => {
      const product_id = action.payload;
      const updatedList = state.cartItems?.filter(
        (eachItem) => eachItem.product_id !== product_id
      );
      state.cartItems = updatedList;
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
