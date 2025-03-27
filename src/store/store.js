import { configureStore } from "@reduxjs/toolkit";
import { global } from "./slices/global";
import { auth } from "./slices/auth";

export const store = configureStore({
  reducer: {

    [global.name]: global.reducer,
    [auth.name]: auth.reducer,
  },
});

export default store;
