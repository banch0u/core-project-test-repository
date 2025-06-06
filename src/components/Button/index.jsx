import React from "react";
import style from "./index.module.scss";
const Button = ({
  children,
  onClick,
  color = "blue",
  disabled = false,
  type,
}) => {
  return (
    <>
      {color === "blue" ? (
        <button
          data-no-invert
          disabled={disabled}
          type={type}
          className={style.button}
          onClick={onClick}>
          {children}
        </button>
      ) : null}
      {color === "white" ? (
        <button
          data-no-invert
          disabled={disabled}
          type={type}
          className={style.button_white}
          onClick={onClick}>
          {children}
        </button>
      ) : null}
      {color === "green" ? (
        <button
          data-no-invert
          disabled={disabled}
          type={type}
          className={style.button_green}
          onClick={onClick}>
          {children}
        </button>
      ) : null}
      {color === "green-white" ? (
        <button
          data-no-invert
          disabled={disabled}
          type={type}
          className={style.button_green_white}
          onClick={onClick}>
          {children}
        </button>
      ) : null}
      {color === "red" ? (
        <button
          data-no-invert
          disabled={disabled}
          type={type}
          className={style.button_red}
          onClick={onClick}>
          {children}
        </button>
      ) : null}
    </>
  );
};

export default Button;
