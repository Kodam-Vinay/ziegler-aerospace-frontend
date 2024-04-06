import { createSlice } from "@reduxjs/toolkit";

const LoginSlice = createSlice({
  name: "login",
  initialState: {
    isLoginClicked: false,
  },
  reducers: {
    setLoginClicked: (state, action) => {
      state.isLoginClicked = action.payload;
    },
  },
});
export const { setLoginClicked } = LoginSlice.actions;
export default LoginSlice.reducer;
