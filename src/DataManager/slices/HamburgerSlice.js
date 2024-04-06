import { createSlice } from "@reduxjs/toolkit";

const HamburgerSlice = createSlice({
  name: "hamburger",
  initialState: {
    isHamburgerClicked: false,
  },
  reducers: {
    toggleHamburger: (state, action) => {
      state.isHamburgerClicked = action.payload;
    },
  },
});

export const { toggleHamburger } = HamburgerSlice.actions;
export default HamburgerSlice.reducer;
