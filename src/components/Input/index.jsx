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
  allowDecimal = false,
  ...rest
}) => {
  const getClassName = (baseType) => {
    if (className) return className;
    switch (size) {
      case "sm":
        return style[`${baseType}_sm`];
      case "md":
        return style[`${baseType}_md`];
      case "xs":
        return style[`${baseType}_xs`];
      default:
        return style[baseType];
    }
  };

  return (
    <>
      {type === "number" ? (
        <InputNumber
          className={getClassName("input")}
          min={1}
          placeholder={placeholder}
          onKeyPress={(event) => {
            const isDigit = /[0-9]/.test(event.key);
            const isDot = event.key === ".";
            const alreadyHasDot = event.currentTarget.value.includes(".");

            if (!isDigit && (!allowDecimal || !isDot || alreadyHasDot)) {
              event.preventDefault();
            }
          }}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          {...rest}
        />
      ) : type === "textarea" ? (
        <TextArea
          className={getClassName("textarea")}
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
          className={getClassName("date")}
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
          className={getClassName("input")}
          placeholder={placeholder}
          {...rest}
        />
      )}
    </>
  );
};

export default Input;
