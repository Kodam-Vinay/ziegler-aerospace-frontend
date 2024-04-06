import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
  },
  reducers: {
    storeUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
  },
});

export const { storeUserInfo } = UserSlice.actions;
export default UserSlice.reducer;
