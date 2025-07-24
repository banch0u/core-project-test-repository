import React from "react";
import { TreeSelect } from "antd";
import useStructureOption from "../../hooks/useGeneralStructureOption";
import style from "../Select/index.module.scss";

const GeneralStructureTreeSelect = ({ size, className, ...rest }) => {
  const { generalStructureOption } = useStructureOption();

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

  const filterTreeNode = (input, treeNode) => {
    const title = treeNode?.title;
    if (typeof title !== "string") return false;
    return normalizeAz(title).includes(normalizeAz(input));
  };

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

  return (
    <TreeSelect
      className={getClassName()}
      showSearch
      popupMatchSelectWidth={false}
      allowClear
      treeData={generalStructureOption}
      filterTreeNode={filterTreeNode}
      {...rest}
    />
  );
};

export default GeneralStructureTreeSelect;
