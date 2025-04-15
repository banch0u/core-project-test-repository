import React from "react";
import style from "./index.module.scss";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const navigateHome = () => {
    navigate("/");
  };

  return (
    <div className={style.container}>
      <div className={style.allMess}>
        <h1 className={style.errMess}>404 Not Found</h1>
        <span className={style.errMessAz}>Səhifə tapılmadı</span>
        <Button type={"primary"} onClick={navigateHome}>
          Ana Səhifə
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
