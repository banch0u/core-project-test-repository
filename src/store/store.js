import { configureStore } from "@reduxjs/toolkit";
import { global } from "./slices/global";
import { auth } from "./slices/auth";
import { notification } from "./slices/notification";

export const store = configureStore({
  reducer: {
    [notification.name]: notification.reducer,
    [global.name]: global.reducer,
    [auth.name]: auth.reducer,
  },
});

export default store;
