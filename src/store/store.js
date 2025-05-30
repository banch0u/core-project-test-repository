import { configureStore } from "@reduxjs/toolkit";
import { global } from "./slices/global";
import { auth } from "./slices/auth";
import { notification } from "./slices/notification";
import { companyInfo } from "./slices/companyInfo";
import { questionnaire } from "./slices/questionnaire";
import { employees } from "./slices/employees";

export const store = configureStore({
  reducer: {
    [employees.name]: employees.reducer,
    [notification.name]: notification.reducer,
    [global.name]: global.reducer,
    [auth.name]: auth.reducer,
    [companyInfo.name]: companyInfo.reducer,
    [questionnaire.name]: questionnaire.reducer,
  },
});

export default store;
