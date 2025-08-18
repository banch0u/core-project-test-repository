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
  organizationsAll
) => [
    {
      title: "№",
      dataIndex: "num",
      showCheckbox: false,
      ellipsis: true,
      width: 35,
    },
    {
      title: "Ad",
      dataIndex: "name",
      width: 150,
      disabled: true,
      ellipsis: true,
    },
    {
      title: "Soyad",
      dataIndex: "surname",
      width: 150,
      disabled: true,
      ellipsis: true,
    },
    {
      title: "Ata Adı",
      dataIndex: "patronymic",
      width: 150,
      disabled: true,
      ellipsis: true,
    },
    {
      title: "Təşkilat",
      dataIndex: "organisationName",
      width: 150,
      disabled: true,
      ellipsis: true,
    },
    {
      title: "Vəzifə",
      dataIndex: "positionName",
      width: 150,
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
