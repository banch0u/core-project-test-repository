import React from "react";
import style from "./Success.module.scss";
import { OkIcon } from "../../assets/icons";
import Button from "../Button";

const Success = ({ value, customValue, onClick }) => {
  return (
    <div className={style.container}>
      <figure>
        <OkIcon />
      </figure>
      {value ? (
        <h3 className={style.value}>{value} uğurla əlavə edildi</h3>
      ) : (
        <h3 className={style.value}>{customValue}</h3>
      )}
      <Button onClick={onClick}>Əsas səhifəyə geri qayıt</Button>
    </div>
  );
};

export default Success;
