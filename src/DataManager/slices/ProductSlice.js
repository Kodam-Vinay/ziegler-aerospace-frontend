import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
  name: "products",
  initialState: {
    isProductCreatedResponseSuccess: false,

    isProductEdited: false,
  },
  reducers: {
    setProductCreateResponse: (state, action) => {
      state.isProductCreatedResponseSuccess = action.payload;
    },
    setProductEdited: (state, action) => {
      state.isProductEdited = action.payload;
    },
  },
});
export const { setProductCreateResponse, setProductEdited } =
  ProductSlice.actions;
export default ProductSlice.reducer;
