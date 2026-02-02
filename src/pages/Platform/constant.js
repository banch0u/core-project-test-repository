import React, { useMemo } from "react";
import {
  ContractsIcon,
  DocumentCirculationIcon,
  HRIcon,
  ArchiveIcon,
  TransportIcon,
  LabIcon,
  UserIcon,
} from "../../assets/icons";
import { useLang } from "../../hooks/useLang";
import text from "../../translations/index.json";

const getRootUrl = () => {
  if (window.location.hostname === "localhost") {
    return `http://localhost:${window.location.port}`;
  }
  return window.location.origin;
};

export function useEntryData() {
  const lang = useLang();
  const rootUrl = useMemo(() => getRootUrl(), []);

  return useMemo(
    () => [
      {
        id: 1,
        value: text?.[lang]?.pages?.platform?.projects?.docflow,
        pathname: `${rootUrl}/docflow/document-circulation/unread-docs`,
        icon: <DocumentCirculationIcon />,
        scopes: "docflow",
      },
      {
        id: 2,
        value: text?.[lang]?.pages?.platform?.projects?.hr ?? "Kadrlar sistemi",
        pathname: `${rootUrl}/hr/hr`,
        icon: <HRIcon />,
        scopes: "hr",
      },
      {
        id: 3,
        value:
          text?.[lang]?.pages?.platform?.projects?.contracts ?? "Müqavilələr",
        pathname: `${rootUrl}/contracts/unread-contract`,
        icon: <ContractsIcon />,
        scopes: "contracts",
      },
      {
        id: 4,
        value:
          text?.[lang]?.pages?.platform?.projects?.accounts ?? "Şəxsi Kabinet",
        pathname: `${rootUrl}/accounts/private`,
        icon: <UserIcon />,
        scopes: "account",
      },
      {
        id: 5,
        value: text?.[lang]?.pages?.platform?.projects?.archive ?? "Arxiv",
        pathname: `${rootUrl}/archive/search`,
        icon: <ArchiveIcon />,
        scopes: "archive",
      },
      {
        id: 6,
        value: text?.[lang]?.pages?.platform?.projects?.transport ?? "Nəqliyyat",
        pathname: `${rootUrl}/transport/personnel`,
        icon: <TransportIcon />,
        scopes: "transport",
      },
      {
        id: 7,
        value: text?.[lang]?.pages?.platform?.projects?.lab ?? "Laboratoriya",
        pathname: `${rootUrl}/lab/flasks`,
        icon: <LabIcon />,
        scopes: "lab",
      },
    ],
    [lang, rootUrl]
  );
}
