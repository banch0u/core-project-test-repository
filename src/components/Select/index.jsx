import React from "react";
import style from "./index.module.scss";
import { Select as AntdSelect, Divider } from "antd";
import Button from "../Button";
const Select = ({
  children,
  className,
  size,
  placeholder = "",
  onChange = () => {},
  onOpen = () => {},
  disabled = false,
  value,
  defaultValue,
  mode,
  text,
  allowClear = true,
  width,
}) => {
  return (
    <>
      {mode === "multiple" ? (
        <AntdSelect
          className={
            className
              ? className
              : size === "sm"
              ? style.select_sm
              : style.select
          }
          style={{ width: width ? width + "px" : "100%" }}
          showSearch
          allowClear
          placeholder={placeholder}
          optionFilterProp="children"
          onChange={onChange}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          mode="multiple"
          optionLabelProp="label">
          {children}
        </AntdSelect>
      ) : mode === "divider" ? (
        <AntdSelect
          className={
            className
              ? className
              : size === "sm"
              ? style.select_sm
              : style.select
          }
          style={{ width: width ? width + "px" : "100%" }}
          showSearch
          allowClear
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) => {
            if (!option?.children || typeof option.children !== "string")
              return false;

            const normalizeAz = (str) =>
              str
                .replace(/I/g, "i")
                .toLocaleLowerCase("az")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ç/g, "c")
                .replace(/ş/g, "s")
                .replace(/ğ/g, "g")
                .replace(/ü/g, "u")
                .replace(/ö/g, "o")
                .replace(/ə/g, "e");

            const normalizedInput = normalizeAz(input);
            const normalizedOption = normalizeAz(option.children);

            return normalizedOption.includes(normalizedInput);
          }}
          onChange={onChange}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}
          dropdownRender={(menu) => (
            <div>
              {menu}
              <Divider style={{ margin: "4px 0" }} />
              <div className={style.select_add_button}>
                <Button onClick={onOpen}>{text}</Button>
              </div>
            </div>
          )}>
          {children}
        </AntdSelect>
      ) : (
        <AntdSelect
          className={
            className
              ? className
              : size === "sm"
              ? style.select_sm
              : style.select
          }
          style={{ width: width ? width + "px" : "100%" }}
          showSearch
          allowClear={allowClear}
          placeholder={placeholder}
          optionFilterProp="children"
          filterOption={(input, option) => {
            if (!option?.children || typeof option.children !== "string")
              return false;

            const normalizeAz = (str) =>
              str
                .replace(/I/g, "i")
                .toLocaleLowerCase("az")
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/ç/g, "c")
                .replace(/ş/g, "s")
                .replace(/ğ/g, "g")
                .replace(/ü/g, "u")
                .replace(/ö/g, "o")
                .replace(/ə/g, "e");

            const normalizedInput = normalizeAz(input);
            const normalizedOption = normalizeAz(option.children);

            return normalizedOption.includes(normalizedInput);
          }}
          onChange={onChange}
          disabled={disabled}
          value={value}
          defaultValue={defaultValue}>
          {children}
        </AntdSelect>
      )}
    </>
  );
};

export default Select;
