import React from "react";
import { Select as AntSelect } from "antd";
import { counts } from "./constant";
const { Option } = AntSelect;

const Select = ({ setSize, size }) => {
  const handleChange = (value) => {
    setSize(value);
  };

  return (
    <AntSelect
      onChange={handleChange}
      defaultValue={size}
      style={{ width: 60, marginTop: "10px", marginLeft: "10px" }}
    >
      {counts.map((item) => (
        <Option key={item.id} value={item.value}>
          {item.value}
        </Option>
      ))}
    </AntSelect>
  );
};

export default Select;
