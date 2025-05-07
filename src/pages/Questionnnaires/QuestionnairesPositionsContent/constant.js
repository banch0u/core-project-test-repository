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
  positionOption,
  categoryOption
) => [
    {
      title: "№",
      dataIndex: "num",
      showCheckbox: false,
      ellipsis: true,
      width: 35,
    },
    {
      key: "position_name",
      title: "Vəzifə adı",
      filterKey: "ids",
      dataIndex: "name",
    },
    {
      key: "category_name",
      title: "Kateqoriya",
      filterKey: "categories",
      dataIndex: "categoryId",
    },
    {
      key: "from",
      title: "Dərəcədən",
      filterKey: "ids",
      dataIndex: "from",
    },
    {
      key: "to",
      title: "Dərəcəyə",
      filterKey: "ids",
      dataIndex: "to",
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
