import React, { useContext } from "react";
import style from "./index.module.scss";
import { Select as AntdSelect, Divider } from "antd";
import { FormItemInputContext } from "antd/es/form/context";
import Button from "../Button";

const Select = ({
  children,
  className,
  size,
  placeholder = "",
  onChange = () => {},
  onOpen = () => {},
  disabled: customDisabled,
  value,
  defaultValue,
  mode,
  text,
  allowClear = true,
  width,
  ...rest
}) => {
  const formItemContext = useContext(FormItemInputContext);
  const mergedDisabled = customDisabled ?? formItemContext?.disabled ?? false;

  const getClassName = () => {
    if (className) return className;
    switch (size) {
      case "sm":
        return style.select_sm;
      case "md":
        return style.select_md;
      default:
        return style.select;
    }
  };

  const commonProps = {
    className: getClassName(),
    style: { width: width ? `${width}px` : "100%" },
    showSearch: true,
    allowClear,
    placeholder,
    optionFilterProp: "children",
    onChange,
    disabled: mergedDisabled,
    value,
    defaultValue,
  };

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

  const filterOption = (input, option) => {
    if (!option?.children || typeof option.children !== "string") return false;
    return normalizeAz(option.children).includes(normalizeAz(input));
  };

  if (mode === "multiple") {
    return (
      <AntdSelect
        {...commonProps}
        {...rest}
        mode="multiple"
        optionLabelProp="label">
        {children}
      </AntdSelect>
    );
  }

  if (mode === "divider") {
    return (
      <AntdSelect
        {...rest}
        {...commonProps}
        filterOption={filterOption}
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
    );
  }

  return (
    <AntdSelect {...commonProps} {...rest} filterOption={filterOption}>
      {children}
    </AntdSelect>
  );
};

export default Select;
