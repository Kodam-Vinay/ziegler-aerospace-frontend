import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import UserSlice from "./slices/UserSlice";
import AuthSlice from "./slices/AuthSlice";
import CloudinarySlice from "./slices/CloudinarySlice";
import LoginSlice from "./slices/LoginSlice";
import HamburgerSlice from "./slices/HamburgerSlice";
import ProductSlice from "./slices/ProductSlice";
import CartSlice from "./slices/CartSlice";

const persistConfig = {
  key: "userInfo",
  storage,
};

const reducers = combineReducers({
  user: UserSlice,
  cloudinary: CloudinarySlice,
  auth: AuthSlice,
  cart: CartSlice,
});
const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: {
    persistedReducer: persistedReducer,
    login: LoginSlice,
    hamburger: HamburgerSlice,
    product: ProductSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
persistStore(store);
export default store;
