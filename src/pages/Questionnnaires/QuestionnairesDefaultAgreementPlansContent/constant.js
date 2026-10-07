import * as React from "react";
import style from "../Questionnaires.module.scss";
import { setDeleteModalVisible } from "../../../store/slices/global";
import { DeleteIconQ, EditIcon } from "../../../assets/icons";

export const getStreetColumns = (
  t,
  onEditClick,
  onDelete,
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
      title: t?.fields?.responsiblePerson,
      dataIndex: "responsiblePerson",
      width: innerW,
      disabled: true,
      ellipsis: true,
    },
    {
      title: t?.fields?.groupNo,
      dataIndex: "rank",
      width: innerW,
      disabled: false,
      ellipsis: true,
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
