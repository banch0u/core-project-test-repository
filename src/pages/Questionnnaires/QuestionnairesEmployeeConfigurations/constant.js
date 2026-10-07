import React from "react";

import style from "../Questionnaires.module.scss";
import { EditIcon } from "../../../assets/icons";

export const getStreetColumns = (
  t,
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
      title: t?.fields?.staffMember,
      dataIndex: "EmployeeIds1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: t?.fields?.structuralUnit,
      dataIndex: "GeneralStructures1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: t?.titles?.positions,
      dataIndex: "Positions1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: t?.fields?.responsiblePerson,
      dataIndex: "PersonInChargeForFuelIds1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: t?.fields?.operationsHead,
      dataIndex: "OperatingManagerIds1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: t?.fields?.drivers,
      dataIndex: "DriverPositions1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: t?.fields?.mechanics,
      dataIndex: "MechanicPositions1",
      width: innerW,
      disabled: false,
      ellipsis: true,
    },
    {
      title: t?.fields?.dispatchers,
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
