import React from "react";
import { Pagination as AntPagination } from "antd";
import style from "./Pagination.module.scss";
import Select from "./Select";

const Pagination = ({ onChange, page = 1, size = 10, total = 0, setSize }) => {
  const setPagination = (page) => {
    onChange(page); // Trigger the page change callback

    // Find the scrollable part of the Ant Table and scroll to the top
    const tableBody = document.querySelector(".ant-table-body");
    if (tableBody) {
      tableBody.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className={style.container}>
      <AntPagination
        className={style.pagination}
        current={Number(page)} // Ensure numeric values
        onChange={setPagination}
        total={Number(total)} // Ensure numeric values
        showSizeChanger={false}
      />
      <div className="pagination_select">
        <Select size={size} setSize={setSize} style={{ marginTop: "10px" }} />
      </div>
    </div>
  );
};

export default Pagination;
