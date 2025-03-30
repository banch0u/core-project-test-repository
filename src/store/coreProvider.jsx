import React from "react";
import { Provider } from "react-redux";
import store from "./store";

export const CoreProvider = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
