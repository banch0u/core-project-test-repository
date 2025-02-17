import React, { useState } from "react";
import { Dropdown, Menu, Checkbox } from "antd";
import style from "./index.module.scss";
import { SortIcon } from "./assets/icons";
import Button from "./components/Button";

const ColSort = ({ columns, selectedColumns, handleColumnToggle }) => {
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (isVisible) => {
    setVisible(isVisible);
  };

  const menu = (
    <Menu className={style.menu}>
      {columns
        .filter((col) => col.dataIndex !== "filterOnly") // Exclude columns with dataIndex === "filterOnly"
        .map(
          (col) =>
            col.showCheckbox !== false && (
              <Menu.Item key={col.title}>
                <div className={style.menu_item}>
                  <Checkbox
                    disabled={col.disabled}
                    checked={selectedColumns.includes(col.dataIndex)}
                    onChange={(e) =>
                      handleColumnToggle(e.target.checked, col.dataIndex)
                    }
                  />
                  <span>{col.title}</span>
                </div>
              </Menu.Item>
            )
        )}
    </Menu>
  );

  return (
    <Dropdown
      overlay={menu}
      trigger={["click"]}
      visible={visible}
      onVisibleChange={handleVisibleChange}>
      <Button color="white">
        <SortIcon />
      </Button>
    </Dropdown>
  );
};

export default ColSort;
