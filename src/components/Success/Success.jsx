import React from "react";
import style from "./Success.module.scss";
import { OkIcon } from "../../assets/icons";
import Button from "../Button";
import text from "../../translations/index.json";
import { useLang } from "../../hooks/useLang";

const Success = ({ value, customValue, onClick }) => {
  const lang = useLang();
  const c = text?.[lang]?.pages?.common;
  return (
    <div className={style.container}>
      <figure>
        <OkIcon />
      </figure>
      {value ? (
        <h3 className={style.value}>
          {c?.successAdded?.replace("{value}", value)}
        </h3>
      ) : (
        <h3 className={style.value}>{customValue}</h3>
      )}
      <Button onClick={onClick}>{c?.backToMain}</Button>
    </div>
  );
};

export default Success;
