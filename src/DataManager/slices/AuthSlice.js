import { createSlice } from "@reduxjs/toolkit";

const AuthSlice = createSlice({
  name: "auth",
  initialState: {
    activeAuth: "login",
  },
  reducers: {
    makeActiveAuth: (state, action) => {
      state.activeAuth = action.payload;
    },
  },
});
export const { makeActiveAuth } = AuthSlice.actions;
export default AuthSlice.reducer;
