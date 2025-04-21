import React from "react";
import style from "./index.module.scss";
import { InputNumber, Input as AntdInput, DatePicker } from "antd";
import dayjs from "dayjs";
const { TextArea } = AntdInput;

const Input = ({
  type,
  size,
  className,
  disabledDate,
  placeholder = "",
  ...rest
}) => {
  return (
    <>
      {type === "number" ? (
        <InputNumber
          className={
            className
              ? className
              : size === "sm"
              ? style.input_sm
              : size === "xs"
              ? style.input_xs
              : style.input
          }
          min={1}
          placeholder={placeholder}
          {...rest}
        />
      ) : type === "textarea" ? (
        <TextArea
          className={style.textarea}
          autoSize={{
            minRows: 2,
            maxRows: 4,
          }}
          maxLength={500}
          placeholder={placeholder}
          {...rest}
        />
      ) : type === "date" ? (
        <DatePicker
          className={
            className
              ? className
              : size === "sm"
              ? style.date_sm
              : size === "xs"
              ? style.date_xs
              : style.date
          }
          format="DD.MM.YYYY"
          disabledDate={
            disabledDate === "until"
              ? (current) => current && current > dayjs().endOf("day")
              : disabledDate === "after"
              ? (current) => current && current < dayjs().startOf("day")
              : false
          }
          placeholder={placeholder}
          {...rest}
        />
      ) : (
        <AntdInput
          className={
            className ? className : size === "sm" ? style.input_sm : style.input
          }
          {...rest}
        />
      )}
    </>
  );
};

export default Input;
