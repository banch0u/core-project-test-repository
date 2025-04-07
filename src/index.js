import React from "react";
import "./assets/fonts/fonts.css";
import "./assets/css/antd.css";
import "./index.css";
export { default as Button } from "./components/Button";
export { default as ColSort } from "./components/ColSort";
export { default as Filter } from "./components/Filter";
export { default as Loading } from "./components/Loading";
export { default as Pagination } from "./components/Pagination";
export { default as FormModal } from "./components/FormModal";
export { default as useNotification } from "./hooks/useNotification";
export { default as message } from "./utils/message";
export { default as Table } from "./components/Table";
export { default as Select } from "./components/Select";



import LoginPage from "./pages/Login";
import PlatformPage from "./pages/Platform";
import HeaderLayout from "./layout/Header";
import { CoreProvider } from "./store/coreProvider";

export const Login = () => (
  <CoreProvider>
    <LoginPage />
  </CoreProvider>
);

export const Platform = () => (
  <CoreProvider>
    <PlatformPage />
  </CoreProvider>
);

export const Header = () => (
  <CoreProvider>
    <HeaderLayout />
  </CoreProvider>
);
