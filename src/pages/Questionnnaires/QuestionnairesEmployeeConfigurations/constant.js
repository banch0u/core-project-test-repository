import React from "react";

import style from "../Questionnaires.module.scss";
import { EditIcon } from "../../../assets/icons";

export const getStreetColumns = (
  onEditClick,
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
      title: "Heyyət üzvü",
      dataIndex: "EmployeeIds1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: "Struktur vahidi",
      dataIndex: "GeneralStructures1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: "Vəzifələr",
      dataIndex: "Positions1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: "Məsul şəxs",
      dataIndex: "PersonInChargeForFuelIds1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: "İstismar şöbəsinin rəisi",
      dataIndex: "OperatingManagerIds1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: "Sürücülər",
      dataIndex: "DriverPositions1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: "Mexaniklər",
      dataIndex: "MechanicPositions1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: "Dispetçerlər",
      dataIndex: "DispatcherPositions",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: "",
      key: "actions",
      showCheckbox: false,
      width: 40,
      render: (data) => (
        <>
          <div className={style.number}>
            <div className={style.actions}>
              <div onClick={() => onEditClick(data)} style={{ background: "#DEEAF6" }}>
                <EditIcon />
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
