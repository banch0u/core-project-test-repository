import * as React from "react";
import { Switch, Tooltip } from "antd";
import style from "../Questionnaires.module.scss";
import { setDeleteModalVisible } from "../../../store/slices/global";
import { DeleteIconQ, EditIcon } from "../../../assets/icons";

export const getStreetColumns = (
  onEditClick,
  onDelete,
  onStatusChange,
  dispatch,
  innerW,
  dynamicNumWidth
) => [
    {
      title: "",
      dataIndex: "num",
      showCheckbox: false,
      ellipsis: true,
      width: Math.max(dynamicNumWidth || 120, 100), // ✅ dynamic
    },
    {
      title: "Kateqoriyalar",
      dataIndex: "name",
      disabled: true,
      ellipsis: true,
      render: (text, record) => (
        <div
          style={{
            paddingLeft: `${record.level * 20}px`,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>{text}</span>

        </div>
      ),
    },
    {
      title: "Status",
      key: "status",
      disabled: true,
      width: 100,
      filter: false,
      render: (data) => (
        <Tooltip placement="top" title="Statusu dəyiş">
          <Switch
            size="medium"
            checked={data?.isActive}
            onChange={(checked) => onStatusChange(data, checked)}
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
      ),
    },
  ];