import React from "react";
import {
  ContractsIcon,
  DocumentCirculationIcon,
  HRIcon,
  ArchiveIcon,
  TransportIcon,
  LabIcon,
  UserIcon,
} from "../../assets/icons";

let rootUrl;
if (window.location.hostname === "localhost") {
  rootUrl = "http://localhost:" + window.location.port;
} else {
  rootUrl = window.location.origin;
}

export const entryData = [
  {
    id: 1,
    value: "Sənəd Dövriyyəsi",
    pathname: `${rootUrl}/docflow/document-circulation/unread-docs`,
    icon: <DocumentCirculationIcon />,
    scopes: "docflow",
  },
  {
    id: 2,
    value: "Kadrlar sistemi",
    pathname: `${rootUrl}/hr/hr`,
    icon: <HRIcon />,
    scopes: "hr",
  },
  {
    id: 3,
    value: "Müqavilələr",
    pathname: `${rootUrl}/contracts/unread-contract`,
    icon: <ContractsIcon />,
    scopes: "contracts",
  },
  {
    id: 4,
    value: "Şəxsi Kabinet",
    pathname: `${rootUrl}/accounts/private`,
    icon: <UserIcon />,
    scopes: "account",
  },
  {
    id: 5,
    value: "Arxiv",
    pathname: `${rootUrl}/archive/search`,
    icon: <ArchiveIcon />,
    scopes: "archive",
  },
  {
    id: 6,
    value: "Nəqliyyat",
    pathname: `${rootUrl}/transport/personnel`,
    icon: <TransportIcon />,
    scopes: "transport",
  },
  {
    id: 7,
    value: "Laboratoriya",
    pathname: `${rootUrl}/lab/flasks`,
    icon: <LabIcon />,
    scopes: "lab",
  },
];
