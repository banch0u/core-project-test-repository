import { InputNumber } from "antd";
import React from "react";

const Input = ({ size, defaultValue, onPressEnter }) => {
  return (
    <InputNumber
      style={{ size }}
      defaultValue={defaultValue}
      onPressEnter={onPressEnter}
      min={0}
    />
  );
};

export default Input;
