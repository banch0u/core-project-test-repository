import React from "react";
import style from "./Delete.module.scss";
import Button from "../Button";
import text from "../../translations/index.json";
import { useLang } from "../../hooks/useLang";

const Delete = ({ value, onCancel, onDelete }) => {
  const lang = useLang();
  const c = text?.[lang]?.pages?.common;
  return (
    <div className={style.container}>
      <h3 className={style.value}>
        {c?.deleteConfirm?.replace("{value}", value)}
      </h3>
      <div className={style.footer}>
        <Button color="white" onClick={onCancel}>
          {c?.back}
        </Button>
        <Button color="red" onClick={onDelete}>
          {c?.delete}
        </Button>
      </div>
    </div>
  );
};
export default Delete;
