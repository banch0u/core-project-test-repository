import React, { useEffect } from "react";
import { TreeSelect } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getInventoryCategoriesAll } from "../../store/slices/questionnaire";
import style from "./index.module.scss";

const mapCategoriesToTree = (nodes = []) =>
  nodes.map((node) => ({
    title: node.name,
    value: node.id,
    children: node.children?.length ? mapCategoriesToTree(node.children) : [],
  }));

const CategoryTreeSelect = ({ value, onChange, ...rest }) => {
  const dispatch = useDispatch();

  const inventoryCategoriesAll = useSelector(
    (state) => state.questionnaire.inventoryCategoriesAll,
  );

  useEffect(() => {
    if (!inventoryCategoriesAll?.length) {
      dispatch(getInventoryCategoriesAll("onlyactive"));
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <TreeSelect
      value={value}
      onChange={onChange}
      treeData={mapCategoriesToTree(inventoryCategoriesAll ?? [])}
      showSearch
      allowClear
      treeNodeFilterProp="title"
      placeholder=""
      style={{ width: "100%", height: 42 }}
      className={style.treeSelect}
      {...rest}
    />
  );
};

export default CategoryTreeSelect;
