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
      title: "Təşkilatlar",
      dataIndex: "name",
      disabled: true,
      ellipsis: true,
      width: innerW,
    },
    {
      title: "VÖEN",
      dataIndex: "voen",
      disabled: false,
      ellipsis: true,
      width: innerW,
    },
    {
      title: "Ünvan",
      dataIndex: "address",
      disabled: false,
      ellipsis: true,
      width: innerW,
    },
    {
      title: "Qısa ad ",
      dataIndex: "shortName",
      disabled: false,
      ellipsis: true,
      width: innerW,
    },
    {
      title: "Email",
      dataIndex: "email",
      disabled: false,
      ellipsis: true,
      width: innerW,
    },
    {
      title: "Nömrə",
      dataIndex: "phone",
      disabled: false,
      ellipsis: true,
      width: innerW,
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
