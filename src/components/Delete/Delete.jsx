import React from "react";
import style from "./Delete.module.scss";
import Button from "../Button";

const Delete = ({ value, onCancel, onDelete }) => {
  return (
    <div className={style.container}>
      <h3 className={style.value}>
        {value} silmək istədiyinizdən əminsizinmi?
      </h3>
      <div className={style.footer}>
        <Button color="white" onClick={onCancel}>
          Geri
        </Button>
        <Button color="red" onClick={onDelete}>
          Soraqçanı sil
        </Button>
      </div>
    </div>
  );
};
export default Delete;
