import React from "react";
import style from "./index.module.scss";
import { Spin } from "antd";

const Loading = () => {
  return (
    <>
      <div className={style.overlay}></div>
      <div className={style.spinner}>
        <Spin size="large" />
      </div>
    </>
  );
};

export default Loading;
