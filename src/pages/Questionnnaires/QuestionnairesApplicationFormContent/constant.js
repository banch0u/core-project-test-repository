import React from "react";
import { Switch, Tooltip } from "antd";

import style from "../Questionnaires.module.scss";
import { setDeleteModalVisible } from "../../../store/slices/global";
import { DeleteIconQ, EditIcon } from "../../../assets/icons";

export const getStreetColumns = (
  onEditClick,
  onDelete,
  onStatusChange,
  dispatch,
  innerW
) => [
  {
    title: "№",
    dataIndex: "num",
    showCheckbox: false,
    ellipsis: true,
    width: 35,
  },
  {
    title: "Mövzu",
    dataIndex: "name",
    width: innerW,
    disabled: true,
    ellipsis: true,
  },
  {
    title: "Status",
    key: "status",
    disabled: true,

    filter: false,
    render: (data) => (
      <Tooltip placement="top" title="Statusu dəyiş">
        <Switch
          size="medium"
          checked={data?.isActive}
          onChange={(checked) => onStatusChange(data, checked, dispatch)}
        />
      </Tooltip>
    ),
  },
  {
    title: "",
    key: "actions",
    showCheckbox: false,
    width: 80,
    render: (data) => (
      <>
        <div className={style.number}>
          <div className={style.actions}>
            <div onClick={() => onEditClick(data)}>
              <EditIcon />
            </div>
            <div
              onClick={() => {
                onDelete(data?.id);
                dispatch(setDeleteModalVisible(true));
              }}
            >
              <DeleteIconQ />
            </div>
          </div>
        </div>
      </>
    ),
  },
];
