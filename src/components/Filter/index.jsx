import React, { useState } from "react";
import {
  Dropdown,
  Menu,
  Form,
  Select as AntdSelect,
  DatePicker,
  TreeSelect,
} from "antd";
import style from "./index.module.scss";
import { FilterIcon } from "../../assets/icons";
import Select from "../Select";
import Input from "../Input";
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

  // ✅ detect dayjs/moment-like objects
  const isDateLike = (v) => {
    if (!v) return false;
    if (typeof v?.isValid === "function" && v.isValid()) return true; // dayjs/moment
    if (
      typeof v?.date === "function" &&
      typeof v?.month === "function" &&
      typeof v?.year === "function"
    )
      return true; // fallback
    return false;
  };

  // ✅ only treat [start,end] as date range if both are date-like
  const isDateRange = (v) =>
    Array.isArray(v) && v.length === 2 && isDateLike(v[0]) && isDateLike(v[1]);

  const handleFinish = (values) => {
    const formattedValues = { ...values };

    Object.keys(values).forEach((key) => {
      const val = values[key];

      // ✅ only format RangePicker values, ignore multi-select arrays
      if (isDateRange(val)) {
        const [start, end] = val;

        // Prefer .format if available (dayjs/moment), else manual
        const formattedStart =
          typeof start?.format === "function"
            ? start.format("DD.MM.YYYY")
            : formatDate(start.date(), start.month() + 1, start.year());

        const formattedEnd =
          typeof end?.format === "function"
            ? end.format("DD.MM.YYYY")
            : formatDate(end.date(), end.month() + 1, end.year());

        formattedValues[key] = `${formattedStart} - ${formattedEnd}`;
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
      col.dataIndex === "filterOnly"
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
            ...filteredColumns.filter((col) => !col.isDouble),
            ...filteredColumns.filter((col) => col.isDouble),
          ].map((col) => {
            if (col.showCheckbox === false) return null;

            const gridSpanClass = col.isDouble
              ? style.doubleGrid
              : style.singleGrid;

            if (col.type === "select") {
              return (
                <Form.Item
                  key={col.dataIndex}
                  label={col.title}
                  name={col.queryName ? col.queryName : col.dataIndex}
                  className={gridSpanClass}>
                  <Select
                    size="sm"
                    style={{ height: "32px" }}
                    onChange={(value) => {
                      if (
                        col.dataIndex === "topic" ||
                        col.dataIndex === "contractTypeId" ||
                        col.dataIndex === "contractType"
                      ) {
                        setSelectedTopic(value);
                      }
                    }}
                    mode={col.selectType === "multiple" ? "multiple" : "single"}
                    optionFilterProp="label">
                    <Option value=""></Option>
                    {(col?.selectData || []).map((option, i) => {
                      const isIdArray = Array.isArray(option.id);
                      return (
                        <Option
                          key={i}
                          value={
                            isIdArray ? JSON.stringify(option.id) : option.id
                          }
                          label={option.name}>
                          {option.name} {option.surname} {option.text}
                          {option?.registrationNumber &&
                            option?.brandId?.text &&
                            option?.modelId?.text &&
                            ` [${option.registrationNumber}] ${option.brandId?.text} ${option.modelId?.text}`}
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
                  className={gridSpanClass}>
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
                  className={gridSpanClass}>
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
                className={gridSpanClass}>
                <Input size="sm" />
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
      open={visible}
      onOpenChange={handleOpenChange}>
      <Button color="white">
        <FilterIcon />
      </Button>
    </Dropdown>
  );
};

export default Filter;
