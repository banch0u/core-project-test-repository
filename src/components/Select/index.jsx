import React from "react";
import style from "./index.module.scss";
import Button from "../Button";
import { Divider, Select as AntdSelect } from "antd";
const Select = ({
  children,
  className,
  placeholder = "",
  divider = false,
  dividerButtonName = "",
  onOpen = () => {},
  onChange = () => {},
  disabled = false,
  mode = "single",
  optionLabelProp = "children",
  tagRender = () => {},
  value,
  defaultValue,
}) => {
  return (
    <AntdSelect
      className={className || style.select}
      showSearch
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
      dropdownRender={(menu) => (
        <>
          <div>
            {menu}
            {divider ? (
              <>
                <Divider style={{ margin: "4px 0" }} />
                <div className={style.select_add_button}>
                  <Button onClick={onOpen}>{dividerButtonName}</Button>
                </div>
              </>
            ) : null}
          </div>
        </>
      )}
      onChange={onChange}
      disabled={disabled}
      mode={mode}
      optionLabelProp={optionLabelProp}
      tagRender={tagRender}
      value={value}
      defaultValue={defaultValue}>
      {children}
    </AntdSelect>
  );
};

export default Select;
