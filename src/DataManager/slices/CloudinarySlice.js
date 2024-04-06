import { createSlice } from "@reduxjs/toolkit";

const CloudinarySlice = createSlice({
  name: "cloudinary",
  initialState: {
    imageId: "",
    imageName: "",
  },
  reducers: {
    setImageId: (state, action) => {
      state.imageId = action?.payload;
    },
    setImageName: (state, action) => {
      state.imageName = action?.payload;
    },
  },
});
export const { setImageId, setImageName } = CloudinarySlice.actions;
export default CloudinarySlice.reducer;
