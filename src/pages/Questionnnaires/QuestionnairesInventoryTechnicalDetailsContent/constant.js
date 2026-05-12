import * as React from "react";
import { Switch, Tooltip } from "antd";
import style from "../Questionnaires.module.scss";
import { setDeleteModalVisible } from "../../../store/slices/global";
import { DeleteIconQ, EditIcon } from "../../../assets/icons";

export const getStreetColumns = (
  onEditClick,
  onDelete,
  onStatusChange,
  categorySelect,
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
      title: "Xarakteristikalar",
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
            disabled={categorySelect !== data?.inventoryCategory?.id}
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
              <div
                style={{
                  cursor: categorySelect !== data?.inventoryCategory?.id ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (categorySelect !== data?.inventoryCategory?.id) return;
                  onEditClick(data);
                }}
              >
                <div style={{ pointerEvents: "none", height: "24px" }}>
                  <EditIcon />
                </div>
              </div>
              <div
                style={{
                  cursor: categorySelect !== data?.inventoryCategory?.id ? "not-allowed" : "pointer",
                }}
                onClick={() => {
                  if (categorySelect !== data?.inventoryCategory?.id) return;
                  onDelete(data?.id);
                  dispatch(setDeleteModalVisible(true));
                }}
              >
                <div style={{ pointerEvents: "none", height: "24px" }}>
                  <DeleteIconQ />
                </div>
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
