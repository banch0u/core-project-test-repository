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
  QUESTIONNAIRES_COLORS,
  QUESTIONNAIRES_COMPANIES,
  QUESTIONNAIRES_CONTRACTCURRENCIES,
  QUESTIONNAIRES_CONTRACTTYPES,
  QUESTIONNAIRES_CONTRAGENTTYPES,
  QUESTIONNAIRES_COUNTRIES,
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
  QUESTIONNAIRES_GEARBOX_TYPES,
  QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES,
  QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES,
  QUESTIONNAIRES_HALLS,
  QUESTIONNAIRES_HONORARY_TITLES,
  QUESTIONNAIRES_ISSUED_AUTHORITIES,
  QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
  QUESTIONNAIRES_MILITARY_CATEGORIES,
  QUESTIONNAIRES_MILITARY_GROUPS,
  QUESTIONNAIRES_MILITARY_RANKS,
  QUESTIONNAIRES_MILITARY_STAFFS,
  QUESTIONNAIRES_MODELS,
  QUESTIONNAIRES_ORDERS,
  QUESTIONNAIRES_ORGANIZATIONS,
  QUESTIONNAIRES_OWNERSHIP_TYPES,
  QUESTIONNAIRES_POSITIONS,
  // QUESTIONNAIRES_REGIONS,
  QUESTIONNAIRES_REPRIMAND_TYPES,
  QUESTIONNAIRES_SPECIAL_DAYS,
  QUESTIONNAIRES_SPECIALIZATIONS,
  QUESTIONNAIRES_STRUCTURES,
  QUESTIONNAIRES_SUBTOPIC,
  QUESTIONNAIRES_TOPIC,
  QUESTIONNAIRES_TRANSMITTER_TYPES,
  QUESTIONNAIRES_VEHICLE_CATEGORIES,
  QUESTIONNAIRES_VEHICLE_TYPES,
  QUESTIONNAIRES_WAR_PARTICIPANTS,
  QUESTIONNAIRES_WORK_MODES,
  QUESTIONNAIRES_WORK_SCHEDULES,
  SETTINGS_EMPLOYEE_CONFIGURATIONS,
  SETTINGS_QUESTIONNAIRES_ACADEMIC_DEGREES,
  SETTINGS_QUESTIONNAIRES_APPLICATION_FORMS,
  SETTINGS_QUESTIONNAIRES_AREAS,
  SETTINGS_QUESTIONNAIRES_BRANDS,
  SETTINGS_QUESTIONNAIRES_CATEGORIES,
  SETTINGS_QUESTIONNAIRES_CHASSISTYPES,
  SETTINGS_QUESTIONNAIRES_COLORS,
  SETTINGS_QUESTIONNAIRES_COMPANIES,
  SETTINGS_QUESTIONNAIRES_CONTRACTCURRENCIES,
  SETTINGS_QUESTIONNAIRES_CONTRACTTYPES,
  SETTINGS_QUESTIONNAIRES_CONTRAGENTTYPES,
  SETTINGS_QUESTIONNAIRES_COUNTRIES,
  SETTINGS_QUESTIONNAIRES_DISABILITY_STATUSES,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_TYPES,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_WHOM,
  SETTINGS_QUESTIONNAIRES_DRIVING_CATEGORIES,
  SETTINGS_QUESTIONNAIRES_EDUCATION_INSTITUTIONS,
  SETTINGS_QUESTIONNAIRES_EDUCATION_LEVELS,
  SETTINGS_QUESTIONNAIRES_EDUCATION_PAYMENTS,
  SETTINGS_QUESTIONNAIRES_ENGINETYPES,
  SETTINGS_QUESTIONNAIRES_EXECUTION_RULES,
  SETTINGS_QUESTIONNAIRES_GEARBOXTYPES,
  SETTINGS_QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES,
  SETTINGS_QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES,
  SETTINGS_QUESTIONNAIRES_HALLS,
  SETTINGS_QUESTIONNAIRES_HONORARY_TITLES,
  SETTINGS_QUESTIONNAIRES_ISSUEDAUTHORITIES,
  SETTINGS_QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
  SETTINGS_QUESTIONNAIRES_MILITARY_CATEGORIES,
  SETTINGS_QUESTIONNAIRES_MILITARY_GROUPS,
  SETTINGS_QUESTIONNAIRES_MILITARY_RANKS,
  SETTINGS_QUESTIONNAIRES_MILITARY_STAFFS,
  SETTINGS_QUESTIONNAIRES_MODELS,
  SETTINGS_QUESTIONNAIRES_ORDERS,
  SETTINGS_QUESTIONNAIRES_ORGANIZATIONS,
  SETTINGS_QUESTIONNAIRES_OWNERSHIPTYPES,
  SETTINGS_QUESTIONNAIRES_POSITIONS,
  // SETTINGS_QUESTIONNAIRES_REGIONS,
  SETTINGS_QUESTIONNAIRES_REPRIMAND_TYPES,
  SETTINGS_QUESTIONNAIRES_SPECIAL_DAYS,
  SETTINGS_QUESTIONNAIRES_SPECIALIZATIONS,
  SETTINGS_QUESTIONNAIRES_STRUCTURES,
  SETTINGS_QUESTIONNAIRES_SUBTOPIC,
  SETTINGS_QUESTIONNAIRES_TOPIC,
  SETTINGS_QUESTIONNAIRES_TRANSMITTERTYPES,
  SETTINGS_QUESTIONNAIRES_VEHICLE_CATEGORIES,
  SETTINGS_QUESTIONNAIRES_VEHICLETYPES,
  SETTINGS_QUESTIONNAIRES_WAR_PARTICIPANTS,
  SETTINGS_QUESTIONNAIRES_WORK_MODES,
  SETTINGS_QUESTIONNAIRES_WORK_SCHEDULES,
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
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_TOPIC
          : QUESTIONNAIRES_TOPIC,
    },
    {
      key: "subtopic",
      label: "Alt mövzular",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_SUBTOPIC
          : QUESTIONNAIRES_SUBTOPIC,
    },
    {
      key: "executionRules",
      label: "İcra qaydaları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_EXECUTION_RULES
          : QUESTIONNAIRES_EXECUTION_RULES,
    },
    {
      key: "document-recieve-methods",
      label: "Daxil olma yolları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS
          : QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
    },
    {
      key: "documentType",
      label: "Sənəd Növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_DOCUMENT_TYPES
          : QUESTIONNAIRES_DOCUMENT_TYPES,
    },
    {
      key: "country",
      label: "Ölkələr",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_COUNTRIES
          : QUESTIONNAIRES_COUNTRIES,
    },
    {
      key: "organization",
      label: "Təşkilatlar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_ORGANIZATIONS
          : QUESTIONNAIRES_ORGANIZATIONS,
    },
    {
      key: "structure",
      label: "Strukturlar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_STRUCTURES
          : QUESTIONNAIRES_STRUCTURES,
    },
    {
      key: "application_form",
      label: "Müraciət formaları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_APPLICATION_FORMS
          : QUESTIONNAIRES_APPLICATION_FORMS,
    },
    {
      key: "document_whom",
      label: "Şəxslər",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_DOCUMENT_WHOM
          : QUESTIONNAIRES_DOCUMENT_WHOM,
    },
    {
      key: "margin_note_texts",
      label: "Dərkənar mətni",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_MARGIN_NOTE_TEXTS
          : QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
    },
    {
      key: "brands",
      label: "Markalar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_BRANDS
          : QUESTIONNAIRES_BRANDS,
    },
    {
      key: "chassis-types",
      label: "Şassi növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_CHASSISTYPES
          : QUESTIONNAIRES_CHASSIS_TYPES,
    },
    {
      key: "engine-types",
      label: "Mühərrik növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_ENGINETYPES
          : QUESTIONNAIRES_ENGINE_TYPES,
    },
    {
      key: "gearbox-types",
      label: "Sürətlər qutusu",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_GEARBOXTYPES
          : QUESTIONNAIRES_GEARBOX_TYPES,
    },
    {
      key: "issued-authorities",
      label: "Verən orqanlar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_ISSUEDAUTHORITIES
          : QUESTIONNAIRES_ISSUED_AUTHORITIES,
    },
    {
      key: "models",
      label: "Modellər",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_MODELS
          : QUESTIONNAIRES_MODELS,
    },
    {
      key: "ownership-types",
      label: "Mülkiyyət növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_OWNERSHIPTYPES
          : QUESTIONNAIRES_OWNERSHIP_TYPES,
    },
    {
      key: "transmitter-types",
      label: "Ötürücü növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_TRANSMITTERTYPES
          : QUESTIONNAIRES_TRANSMITTER_TYPES,
    },
    {
      key: "vehicle-types",
      label: "Nəqliyyat tipləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_VEHICLETYPES
          : QUESTIONNAIRES_VEHICLE_TYPES,
    },
    {
      key: "colors",
      label: "Rənglər",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_COLORS
          : QUESTIONNAIRES_COLORS,
    },
    {
      key: "academic-degrees",
      label: "Akademik dərəcələr",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_ACADEMIC_DEGREES
          : QUESTIONNAIRES_ACADEMIC_DEGREES,
    },
    {
      key: "disability-statuses",
      label: "Əlillik statusları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_DISABILITY_STATUSES
          : QUESTIONNAIRES_DISABILITY_STATUSES,
    },
    {
      key: "honorary-titles",
      label: "Fəxri adlar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_HONORARY_TITLES
          : QUESTIONNAIRES_HONORARY_TITLES,
    },
    {
      key: "military-staffs",
      label: "Hərbi qulluqçular",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_MILITARY_STAFFS
          : QUESTIONNAIRES_MILITARY_STAFFS,
    },
    {
      key: "military-categories",
      label: "Hərbi kateqoriyalar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_MILITARY_CATEGORIES
          : QUESTIONNAIRES_MILITARY_CATEGORIES,
    },
    {
      key: "military-ranks",
      label: "Hərbi rütbələr",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_MILITARY_RANKS
          : QUESTIONNAIRES_MILITARY_RANKS,
    },
    {
      key: "military-groups",
      label: "Hərbi qruplar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_MILITARY_GROUPS
          : QUESTIONNAIRES_MILITARY_GROUPS,
    },
    {
      key: "general-structure-statuses",
      label: "Ümumi struktur statusları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES
          : QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES,
    },
    {
      key: "work-schedules",
      label: "İş qrafikləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_WORK_SCHEDULES
          : QUESTIONNAIRES_WORK_SCHEDULES,
    },
    {
      key: "specializations",
      label: "İxtisaslar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_SPECIALIZATIONS
          : QUESTIONNAIRES_SPECIALIZATIONS,
    },
    {
      key: "war-participants",
      label: "Müharibə iştirakçıları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_WAR_PARTICIPANTS
          : QUESTIONNAIRES_WAR_PARTICIPANTS,
    },
    {
      key: "general-structure-types",
      label: "Ümumi struktur növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES
          : QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES,
    },
    {
      key: "education-institutions",
      label: "Təhsil müəssisələri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_EDUCATION_INSTITUTIONS
          : QUESTIONNAIRES_EDUCATION_INSTITUTIONS,
    },
    {
      key: "education-payments",
      label: "Təhsil ödənişləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_EDUCATION_PAYMENTS
          : QUESTIONNAIRES_EDUCATION_PAYMENTS,
    },
    {
      key: "education-levels",
      label: "Təhsil səviyyələri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_EDUCATION_LEVELS
          : QUESTIONNAIRES_EDUCATION_LEVELS,
    },
    {
      key: "reprimand-types",
      label: "Töhmət növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_REPRIMAND_TYPES
          : QUESTIONNAIRES_REPRIMAND_TYPES,
    },
    {
      key: "special-days",
      label: "Xüsusi günlər",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_SPECIAL_DAYS
          : QUESTIONNAIRES_SPECIAL_DAYS,
    },
    {
      key: "areas",
      label: "Sahələr",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_AREAS
          : QUESTIONNAIRES_AREAS,
    },
    {
      key: "categories",
      label: "Kateqoriyalar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_CATEGORIES
          : QUESTIONNAIRES_CATEGORIES,
    },
    {
      key: "companies",
      label: "Şirkətlər",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_COMPANIES
          : QUESTIONNAIRES_COMPANIES,
    },
    {
      key: "halls",
      label: "Zallar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_HALLS
          : QUESTIONNAIRES_HALLS,
    },
    {
      key: "positions",
      label: "Vəzifələr",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_POSITIONS
          : QUESTIONNAIRES_POSITIONS,
    },
    {
      key: "driving-categories",
      label: "Sürücülük kateqoriyaları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_DRIVING_CATEGORIES
          : QUESTIONNAIRES_DRIVING_CATEGORIES,
    },
    {
      key: "employee-configurations",
      label: "Heyyət tənzimləmələri",
      link:
        mainPath === "/settings"
          ? SETTINGS_EMPLOYEE_CONFIGURATIONS
          : QUESTIONNAIRES_EMPLOYEE_CONFIGURATIONS,
    },
    {
      key: "contragent-types",
      label: "Müqavilənin tərəfi",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_CONTRAGENTTYPES
          : QUESTIONNAIRES_CONTRAGENTTYPES,
    },
    {
      key: "contract-types",
      label: "Müqavilə növü",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_CONTRACTTYPES
          : QUESTIONNAIRES_CONTRACTTYPES,
    },
    {
      key: "contract-currencies",
      label: "Müqavilə valyutaları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_CONTRACTCURRENCIES
          : QUESTIONNAIRES_CONTRACTCURRENCIES,
    },
    {
      key: "orders",
      label: "Satınalma sifarişi",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_ORDERS
          : QUESTIONNAIRES_ORDERS,
    },
    {
      key: "work-modes",
      label: "İş rejimi",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_WORK_MODES
          : QUESTIONNAIRES_WORK_MODES,
    },
    {
      key: "vehicle-categories",
      label: "Nəqliyyat növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_VEHICLE_CATEGORIES
          : QUESTIONNAIRES_VEHICLE_CATEGORIES,
    },
  ];

  const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

  const filteredItems = sortedItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
      allowed[item.key] // ✅ Check if allowed true
  );

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
          maxHeight: "calc(100vh - 225px)",
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
