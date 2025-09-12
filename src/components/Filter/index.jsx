import React, { useState } from "react";
import {
  Dropdown,
  Menu,
  Form,
  Input,
  Select as AntdSelect,
  DatePicker,
  TreeSelect,
} from "antd";
import style from "./index.module.scss";
import { FilterIcon } from "../../assets/icons";
import Select from "../Select";
import Button from "../Button";

const { Option } = AntdSelect;
const { RangePicker } = DatePicker;

const Filter = ({
  columns,
  selectedColumns,
  setQuery,
  disabledElementCount,
  setPage,
  setSelectedTopic,
}) => {
  const [filterForm] = Form.useForm();
  const [visible, setVisible] = useState(false);

  const handleOpenChange = (isOpen) => {
    setVisible(isOpen);
  };

  const formatDate = (day, month, year) => {
    const formattedDay = String(day).padStart(2, "0");
    const formattedMonth = String(month).padStart(2, "0");
    return `${formattedDay}.${formattedMonth}.${year}`;
  };
  const handleFinish = (values) => {
    const formattedValues = { ...values };
    Object.keys(values).forEach((key) => {
      if (Array.isArray(values[key]) && values[key].length === 2) {
        const [start, end] = values[key];
        if (start && end) {
          const formattedStart = formatDate(
            start.date(),
            start.month() + 1,
            start.year()
          );
          const formattedEnd = formatDate(
            end.date(),
            end.month() + 1,
            end.year()
          );
          formattedValues[key] = `${formattedStart} - ${formattedEnd}`;
        }
      }
    });
    setQuery(formattedValues);
    setVisible(false);
  };

  // Filter the columns based on selectedColumns, filterDisable, and filter status
  const filteredColumns = columns.filter(
    (col) =>
      (selectedColumns.includes(col.dataIndex) &&
        col.filter !== false &&
        col.filterDisable !== true) ||
      col.dataIndex === "filterOnly" // Always include "filterOnly" columns in the filter
  );

  const getGrid = () => {
    const elementCount = selectedColumns.length - disabledElementCount;
    if (elementCount >= 5) return style.grid5;
    if (elementCount === 4) return style.grid4;
    if (elementCount === 3) return style.grid3;
    if (elementCount === 2) return style.grid2;
    if (elementCount === 1) return style.grid1;
  };

  const menu = (
    <Menu className={style.menu}>
      <div className="filter">
        <Form
          onFinish={handleFinish}
          form={filterForm}
          layout="vertical"
          className={`${style.form} ${getGrid()}`}>
          {[
            ...filteredColumns.filter((col) => !col.isDouble), // Non-double elements
            ...filteredColumns.filter((col) => col.isDouble), // Double elements
          ].map((col) => {
            if (col.showCheckbox === false) {
              return null;
            }

            const gridSpanClass = col.isDouble
              ? style.doubleGrid
              : style.singleGrid;

            if (col.type === "select") {
              return (
                <Form.Item
                  key={col.dataIndex}
                  label={col.title}
                  name={col.queryName ? col.queryName : col.dataIndex}
                  className={gridSpanClass} // Dynamically apply grid class
                >
                  <Select
                    // showSearch={col.isDouble}
                    size="sm"
                    onChange={(value) => {
                      if (col.dataIndex === "topic") {
                        setSelectedTopic(value);
                      }
                    }}>
                    <Option value=""></Option>
                    {(col?.selectData || []).map((option, i) => {
                      const isIdArray = Array.isArray(option.id);
                      return (
                        <Option
                          key={i}
                          value={
                            isIdArray
                              ? JSON.stringify(option.id) // Convert array to string
                              : option.id // Use ID directly
                          }>
                          {option.name} {option.surname} {option.text}
                          {option?.registrationNumber &&
                            option?.vehicleBrand?.text &&
                            option?.vehicleModel?.text &&
                            ` [${option.registrationNumber}] ${option.vehicleBrand?.text} ${option.vehicleModel?.text}`}
                          {/* Display the name */}
                        </Option>
                      );
                    })}
                  </Select>
                </Form.Item>
              );
            }
            if (col.type === "date") {
              return (
                <Form.Item
                  key={col.dataIndex}
                  label={col.title}
                  name={col.queryName ? col.queryName : col.dataIndex}
                  className={gridSpanClass} // Dynamically apply grid class
                >
                  <RangePicker format="DD.MM.YYYY" placeholder="" />
                </Form.Item>
              );
            }
            if (col.type === "recursive") {
              return (
                <Form.Item
                  key={col.dataIndex}
                  label={col.title}
                  name={col.queryName ? col.queryName : col.dataIndex}
                  className={gridSpanClass} // Dynamically apply grid class
                >
                  <TreeSelect
                    showSearch
                    popupMatchSelectWidth={false}
                    allowClear
                    treeDefaultExpandAll
                    treeData={col.selectData}
                  />
                </Form.Item>
              );
            }
            return (
              <Form.Item
                key={col.dataIndex}
                label={col.title}
                name={col.queryName ? col.queryName : col.dataIndex}
                className={gridSpanClass} // Dynamically apply grid class
              >
                <Input />
              </Form.Item>
            );
          })}
        </Form>
        <div className={style.buttons}>
          <Button onClick={() => filterForm.resetFields()} color="white">
            Təmizlə
          </Button>
          <Button
            onClick={() => {
              setPage(1);
              filterForm.submit();
              setVisible(false);
            }}>
            Axtar
          </Button>
        </div>
      </div>
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      open={visible} // Updated to use open
      onOpenChange={handleOpenChange} // Updated to use onOpenChange
    >
      <Button color="white">
        <FilterIcon />
      </Button>
    </Dropdown>
  );
};

export default Filter;
