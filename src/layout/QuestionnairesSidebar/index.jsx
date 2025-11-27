import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import { Layout, Menu, Input } from "antd";
import {
  QUESTIONNAIRES_ACADEMIC_DEGREES,
  QUESTIONNAIRES_APPLICATION_FORMS,
  QUESTIONNAIRES_AREAS,
  QUESTIONNAIRES_BRANDS,
  QUESTIONNAIRES_CATEGORIES,
  QUESTIONNAIRES_CHASSIS_TYPES,
  QUESTIONNAIRES_CHEMICALS,
  QUESTIONNAIRES_COLORS,
  QUESTIONNAIRES_COMPANIES,
  QUESTIONNAIRES_CONTRACTCURRENCIES,
  QUESTIONNAIRES_CONTRACTTYPES,
  QUESTIONNAIRES_CONTRAGENTTYPES,
  QUESTIONNAIRES_COUNTRIES,
  QUESTIONNAIRES_CRUSH_REASONS,
  QUESTIONNAIRES_DETAIL_PARTS,
  QUESTIONNAIRES_DISABILITY_STATUSES,
  QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
  QUESTIONNAIRES_DOCUMENT_TYPES,
  QUESTIONNAIRES_DOCUMENT_WHOM,
  QUESTIONNAIRES_DRIVING_CATEGORIES,
  QUESTIONNAIRES_EDUCATION_INSTITUTIONS,
  QUESTIONNAIRES_EDUCATION_LEVELS,
  QUESTIONNAIRES_EDUCATION_PAYMENTS,
  QUESTIONNAIRES_EMPLOYEE_CONFIGURATIONS,
  QUESTIONNAIRES_ENGINE_TYPES,
  QUESTIONNAIRES_EXECUTION_RULES,
  QUESTIONNAIRES_EXTRA_SERVICES,
  QUESTIONNAIRES_FUEL_TYPES,
  QUESTIONNAIRES_GEARBOX_TYPES,
  QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES,
  QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES,
  QUESTIONNAIRES_HALLS,
  QUESTIONNAIRES_HONORARY_TITLES,
  QUESTIONNAIRES_INSURANCE_TYPES,
  QUESTIONNAIRES_ISSUED_AUTHORITIES,
  QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
  QUESTIONNAIRES_MEASUREMENT_TYPES,
  QUESTIONNAIRES_MILITARY_CATEGORIES,
  QUESTIONNAIRES_MILITARY_GROUPS,
  QUESTIONNAIRES_MILITARY_RANKS,
  QUESTIONNAIRES_MILITARY_STAFFS,
  QUESTIONNAIRES_MODELS,
  QUESTIONNAIRES_OIL_FIELDS,
  QUESTIONNAIRES_ORDERS,
  QUESTIONNAIRES_ORGANIZATIONS,
  QUESTIONNAIRES_OWNERSHIP_TYPES,
  QUESTIONNAIRES_PENALTY_TYPES,
  QUESTIONNAIRES_POSITIONS,
  QUESTIONNAIRES_REPAIR_TYPES,
  QUESTIONNAIRES_REPAIRMENT_WORK_TYPES,
  // QUESTIONNAIRES_REGIONS,
  QUESTIONNAIRES_REPRIMAND_TYPES,
  QUESTIONNAIRES_SPECIAL_DAYS,
  QUESTIONNAIRES_SPECIALIZATIONS,
  QUESTIONNAIRES_STRUCTURES,
  QUESTIONNAIRES_SUBTOPIC,
  QUESTIONNAIRES_TOPIC,
  QUESTIONNAIRES_TRANSMITTER_TYPES,
  QUESTIONNAIRES_VEHICLE_CATEGORIES,
  QUESTIONNAIRES_VEHICLE_GROUPS,
  QUESTIONNAIRES_VEHICLE_TYPES,
  QUESTIONNAIRES_WAR_PARTICIPANTS,
  QUESTIONNAIRES_WORK_MODES,
  QUESTIONNAIRES_WORK_SCHEDULES,
  QUESTIONNAIRES_OWNERS,
} from "../../utils/path";

import { SearchIcon } from "../../assets/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const QuestionnairesSidebar = ({ selectedKey, allowed = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const mainPath = `/${location.pathname.split("/")[1]}`;

  const items = [
    {
      key: "topic",
      label: "Mövzular",
      link: QUESTIONNAIRES_TOPIC,
    },
    {
      key: "subtopic",
      label: "Alt mövzular",
      link: QUESTIONNAIRES_SUBTOPIC,
    },
    {
      key: "executionRules",
      label: "İcra qaydaları",
      link: QUESTIONNAIRES_EXECUTION_RULES,
    },
    {
      key: "document-recieve-methods",
      label: "Daxil olma yolları",
      link: QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
    },
    {
      key: "documentType",
      label: "Sənəd Növləri",
      link: QUESTIONNAIRES_DOCUMENT_TYPES,
    },
    {
      key: "country",
      label: "Ölkələr",
      link: QUESTIONNAIRES_COUNTRIES,
    },
    {
      key: "organization",
      label: "Təşkilatlar",
      link: QUESTIONNAIRES_ORGANIZATIONS,
    },
    {
      key: "structure",
      label: "Strukturlar",
      link: QUESTIONNAIRES_STRUCTURES,
    },
    {
      key: "application_form",
      label: "Müraciət formaları",
      link: QUESTIONNAIRES_APPLICATION_FORMS,
    },
    {
      key: "document_whom",
      label: "Şəxslər",
      link: QUESTIONNAIRES_DOCUMENT_WHOM,
    },
    {
      key: "margin_note_texts",
      label: "Dərkənar mətni",
      link: QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
    },
    {
      key: "brands",
      label: "Markalar",
      link: QUESTIONNAIRES_BRANDS,
    },
    {
      key: "chassis-types",
      label: "Şassi növləri",
      link: QUESTIONNAIRES_CHASSIS_TYPES,
    },
    {
      key: "engine-types",
      label: "Mühərrik növləri",
      link: QUESTIONNAIRES_ENGINE_TYPES,
    },
    {
      key: "gearbox-types",
      label: "Sürətlər qutusu",
      link: QUESTIONNAIRES_GEARBOX_TYPES,
    },
    {
      key: "issued-authorities",
      label: "Verən orqanlar",
      link: QUESTIONNAIRES_ISSUED_AUTHORITIES,
    },
    {
      key: "models",
      label: "Modellər",
      link: QUESTIONNAIRES_MODELS,
    },
    {
      key: "ownership-types",
      label: "Mülkiyyət növləri",
      link: QUESTIONNAIRES_OWNERSHIP_TYPES,
    },
    {
      key: "transmitter-types",
      label: "Ötürücü növləri",
      link: QUESTIONNAIRES_TRANSMITTER_TYPES,
    },
    {
      key: "vehicle-types",
      label: "Nəqliyyat tipləri",
      link: QUESTIONNAIRES_VEHICLE_TYPES,
    },
    {
      key: "colors",
      label: "Rənglər",
      link: QUESTIONNAIRES_COLORS,
    },
    {
      key: "academic-degrees",
      label: "Akademik dərəcələr",
      link: QUESTIONNAIRES_ACADEMIC_DEGREES,
    },
    {
      key: "disability-statuses",
      label: "Əlillik statusları",
      link: QUESTIONNAIRES_DISABILITY_STATUSES,
    },
    {
      key: "honorary-titles",
      label: "Fəxri adlar",
      link: QUESTIONNAIRES_HONORARY_TITLES,
    },
    {
      key: "military-staffs",
      label: "Hərbi qulluqçular",
      link: QUESTIONNAIRES_MILITARY_STAFFS,
    },
    {
      key: "military-categories",
      label: "Hərbi kateqoriyalar",
      link: QUESTIONNAIRES_MILITARY_CATEGORIES,
    },
    {
      key: "military-ranks",
      label: "Hərbi rütbələr",
      link: QUESTIONNAIRES_MILITARY_RANKS,
    },
    {
      key: "military-groups",
      label: "Hərbi qruplar",
      link: QUESTIONNAIRES_MILITARY_GROUPS,
    },
    {
      key: "general-structure-statuses",
      label: "Ümumi struktur statusları",
      link: QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES,
    },
    {
      key: "work-schedules",
      label: "İş qrafikləri",
      link: QUESTIONNAIRES_WORK_SCHEDULES,
    },
    {
      key: "specializations",
      label: "İxtisaslar",
      link: QUESTIONNAIRES_SPECIALIZATIONS,
    },
    {
      key: "war-participants",
      label: "Müharibə iştirakçıları",
      link: QUESTIONNAIRES_WAR_PARTICIPANTS,
    },
    {
      key: "general-structure-types",
      label: "Ümumi struktur növləri",
      link: QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES,
    },
    {
      key: "education-institutions",
      label: "Təhsil müəssisələri",
      link: QUESTIONNAIRES_EDUCATION_INSTITUTIONS,
    },
    {
      key: "education-payments",
      label: "Təhsil ödənişləri",
      link: QUESTIONNAIRES_EDUCATION_PAYMENTS,
    },
    {
      key: "education-levels",
      label: "Təhsil səviyyələri",
      link: QUESTIONNAIRES_EDUCATION_LEVELS,
    },
    {
      key: "reprimand-types",
      label: "Töhmət növləri",
      link: QUESTIONNAIRES_REPRIMAND_TYPES,
    },
    {
      key: "special-days",
      label: "Xüsusi günlər",
      link: QUESTIONNAIRES_SPECIAL_DAYS,
    },
    {
      key: "areas",
      label: "Sahələr",
      link: QUESTIONNAIRES_AREAS,
    },
    {
      key: "categories",
      label: "Kateqoriyalar",
      link: QUESTIONNAIRES_CATEGORIES,
    },
    {
      key: "companies",
      label: "Şirkətlər",
      link: QUESTIONNAIRES_COMPANIES,
    },
    {
      key: "halls",
      label: "Zallar",
      link: QUESTIONNAIRES_HALLS,
    },
    {
      key: "positions",
      label: "Vəzifələr",
      link: QUESTIONNAIRES_POSITIONS,
    },
    {
      key: "driving-categories",
      label: "Sürücülük kateqoriyaları",
      link: QUESTIONNAIRES_DRIVING_CATEGORIES,
    },
    {
      key: "employee-configurations",
      label: "Heyyət tənzimləmələri",
      link: QUESTIONNAIRES_EMPLOYEE_CONFIGURATIONS,
    },
    {
      key: "contragent-types",
      label: "Müqavilənin tərəfi",
      link: QUESTIONNAIRES_CONTRAGENTTYPES,
    },
    {
      key: "contract-types",
      label: "Müqavilə növü",
      link: QUESTIONNAIRES_CONTRACTTYPES,
    },
    {
      key: "contract-currencies",
      label: "Müqavilə valyutaları",
      link: QUESTIONNAIRES_CONTRACTCURRENCIES,
    },
    {
      key: "orders",
      label: "Satınalma sifarişi",
      link: QUESTIONNAIRES_ORDERS,
    },
    {
      key: "work-modes",
      label: "İş rejimi",
      link: QUESTIONNAIRES_WORK_MODES,
    },
    {
      key: "vehicle-categories",
      label: "Nəqliyyat növləri",
      link: QUESTIONNAIRES_VEHICLE_CATEGORIES,
    },
    {
      key: "chemicals",
      label: "Kimyəvi maddələr",
      link: QUESTIONNAIRES_CHEMICALS,
    },

    {
      key: "repair-types",
      label: "Təmir növləri",
      link: QUESTIONNAIRES_REPAIR_TYPES,
    },
    {
      key: "detail-parts",
      label: "Ehtiyyat hissələri",
      link: QUESTIONNAIRES_DETAIL_PARTS,
    },
    {
      key: "measurement-types",
      label: "Ölçü vahidləri(Avtonəqliyyat)",
      link: QUESTIONNAIRES_MEASUREMENT_TYPES,
    },
    {
      key: "repairment-work-types",
      label: "Təmir işi növləri",
      link: QUESTIONNAIRES_REPAIRMENT_WORK_TYPES,
    },
    {
      key: "penalty-types",
      label: "Cərimə növləri",
      link: QUESTIONNAIRES_PENALTY_TYPES,
    },
    {
      key: "crush-reasons",
      label: "Qəza səbəbləri",
      link: QUESTIONNAIRES_CRUSH_REASONS,
    },
    {
      key: "insurance-types",
      label: "Sığorta növləri",
      link: QUESTIONNAIRES_INSURANCE_TYPES,
    },
    {
      key: "extra-services",
      label: "Əlavə xidmətlər",
      link: QUESTIONNAIRES_EXTRA_SERVICES,
    },
    {
      key: "fuel-types",
      label: "Yanacaq növləri",
      link: QUESTIONNAIRES_FUEL_TYPES,
    },
    {
      key: "oil-fields",
      label: "Neft şirkətləri",
      link: QUESTIONNAIRES_OIL_FIELDS,
    },

    {
      key: "vehicle-groups",
      label: "Dəstələr",
      link: QUESTIONNAIRES_VEHICLE_GROUPS,
    },

    {
      key: "owners", //delete the "/" at the start of string
      label: "Mülkiyyətçi",
      link: QUESTIONNAIRES_OWNERS,
    },
    // ---- generated sidebar item by questionnaireGenerator: Owners ----
  ];

  const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

  const isAllowAll = allowed === "*" || allowed?.includes("*");

  const filteredItems = sortedItems.filter((item) => {
    const matchesSearch = item.label
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // If allowed="*" → allow all items
    if (isAllowAll) return matchesSearch;

    // Otherwise use allowed[item.key] boolean
    return matchesSearch && allowed[item.key];
  });

  const defaultOpenKeys = items
    .filter(
      (item) =>
        item.children &&
        item.children.some((child) => child.key === selectedKey)
    )
    .map((item) => item.key);

  const renderMenuItems = (items) =>
    items.map((item) => (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.link}>{item.label}</Link>
      </Menu.Item>
    ));

  return (
    <Sider width={256} className={style.sidebar}>
      <div className={style.logo}>
        <h2>Soraqçalar</h2>
      </div>
      <div className={style.search}>
        <Input
          onChange={(e) => setSearchQuery(e?.target?.value)}
          placeholder="Axtar"
          className={style.search_input}
          suffix={
            <div className={style.search_icon}>
              <SearchIcon />
            </div>
          }
        />
      </div>
      <div
        className="questionnaires_menu"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 217px)",
          borderBottomLeftRadius: 18,
        }}>
        <Menu
          defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={defaultOpenKeys}
          className={style.menu}>
          {renderMenuItems(filteredItems)}
        </Menu>
      </div>
    </Sider>
  );
};

export default QuestionnairesSidebar;
