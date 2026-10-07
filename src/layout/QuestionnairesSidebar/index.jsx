import React, { useState } from "react";
import { Link } from "react-router-dom";
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
  QUESTIONNAIRES_CONTRACTTOPICS,
  QUESTIONNAIRES_CONTRACTTYPESSUBTYPES,
  QUESTIONNAIRES_DEFAULTAGREEMENTPLANS,
  QUESTIONNAIRES_ROUTELOCATIONS,
  QUESTIONNAIRES_INTERNALSTRUCTURE,
  QUESTIONNAIRES_FIELD,
  QUESTIONNAIRES_WELL,
  QUESTIONNAIRES_BARREL,
  QUESTIONNAIRES_BUDGETCOMPONENTS,
  QUESTIONNAIRES_DEPARTMENTS,
  QUESTIONNAIRES_PENTIONS,
  QUESTIONNAIRES_PROJECTS,
  QUESTIONNAIRES_CUSTOMERS,
  QUESTIONNAIRES_INVENTORYBRANDS,
  QUESTIONNAIRES_INVENTORYCATEGORIES,
  QUESTIONNAIRES_INVENTORYMODELS,
  QUESTIONNAIRES_INVENTORYPACKAGETYPES,
  QUESTIONNAIRES_INVENTORYTECHNICALDETAILS,
  QUESTIONNAIRES_VENDORCATEGORIES,
  QUESTIONNAIRES_ATTESTATIONS,
} from "../../utils/path";

import { SearchIcon } from "../../assets/icons";
import text from "../../translations/index.json";
import { useLang } from "../../hooks/useLang";

const { Sider } = Layout;

const QuestionnairesSidebar = ({ selectedKey, allowed = [] }) => {
  const lang = useLang();
  const t = text?.[lang]?.pages?.questionnaires;
  const [searchQuery, setSearchQuery] = useState("");

  const items = [
    {
      key: "topic",
      label: t?.titles?.topics,
      link: QUESTIONNAIRES_TOPIC,
    },
    {
      key: "subtopic",
      label: t?.titles?.subtopics,
      link: QUESTIONNAIRES_SUBTOPIC,
    },
    {
      key: "executionRules",
      label: t?.titles?.executionRules,
      link: QUESTIONNAIRES_EXECUTION_RULES,
    },
    {
      key: "document-recieve-methods",
      label: t?.titles?.receptionWays,
      link: QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
    },
    {
      key: "documentType",
      label: t?.titles?.documentTypes,
      link: QUESTIONNAIRES_DOCUMENT_TYPES,
    },
    {
      key: "country",
      label: t?.titles?.countries,
      link: QUESTIONNAIRES_COUNTRIES,
    },
    {
      key: "organization",
      label: t?.titles?.organizations,
      link: QUESTIONNAIRES_ORGANIZATIONS,
    },
    {
      key: "structure",
      label: t?.titles?.structures,
      link: QUESTIONNAIRES_STRUCTURES,
    },
    {
      key: "application_form",
      label: t?.titles?.appealForms,
      link: QUESTIONNAIRES_APPLICATION_FORMS,
    },
    {
      key: "document_whom",
      label: t?.titles?.persons,
      link: QUESTIONNAIRES_DOCUMENT_WHOM,
    },
    {
      key: "margin_note_texts",
      label: t?.titles?.marginNoteTexts,
      link: QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
    },
    {
      key: "brands",
      label: t?.titles?.brands,
      link: QUESTIONNAIRES_BRANDS,
    },
    {
      key: "chassis-types",
      label: t?.titles?.chassisTypes,
      link: QUESTIONNAIRES_CHASSIS_TYPES,
    },
    {
      key: "engine-types",
      label: t?.titles?.engineTypes,
      link: QUESTIONNAIRES_ENGINE_TYPES,
    },
    {
      key: "gearbox-types",
      label: t?.titles?.gearbox,
      link: QUESTIONNAIRES_GEARBOX_TYPES,
    },
    {
      key: "issued-authorities",
      label: t?.titles?.issuedAuthorities,
      link: QUESTIONNAIRES_ISSUED_AUTHORITIES,
    },
    {
      key: "models",
      label: t?.titles?.models,
      link: QUESTIONNAIRES_MODELS,
    },
    {
      key: "ownership-types",
      label: t?.titles?.ownershipTypes,
      link: QUESTIONNAIRES_OWNERSHIP_TYPES,
    },
    {
      key: "transmitter-types",
      label: t?.titles?.driveTypes,
      link: QUESTIONNAIRES_TRANSMITTER_TYPES,
    },
    {
      key: "vehicle-types",
      label: t?.titles?.vehicleTypes,
      link: QUESTIONNAIRES_VEHICLE_TYPES,
    },
    {
      key: "colors",
      label: t?.titles?.colors,
      link: QUESTIONNAIRES_COLORS,
    },
    {
      key: "academic-degrees",
      label: t?.titles?.academicDegrees,
      link: QUESTIONNAIRES_ACADEMIC_DEGREES,
    },
    {
      key: "disability-statuses",
      label: t?.titles?.disabilityStatuses,
      link: QUESTIONNAIRES_DISABILITY_STATUSES,
    },
    {
      key: "honorary-titles",
      label: t?.titles?.honoraryTitles,
      link: QUESTIONNAIRES_HONORARY_TITLES,
    },
    {
      key: "military-staffs",
      label: t?.titles?.militaryStaffs,
      link: QUESTIONNAIRES_MILITARY_STAFFS,
    },
    {
      key: "military-categories",
      label: t?.titles?.militaryCategories,
      link: QUESTIONNAIRES_MILITARY_CATEGORIES,
    },
    {
      key: "military-ranks",
      label: t?.titles?.militaryRanks,
      link: QUESTIONNAIRES_MILITARY_RANKS,
    },
    {
      key: "military-groups",
      label: t?.titles?.militaryGroups,
      link: QUESTIONNAIRES_MILITARY_GROUPS,
    },
    {
      key: "general-structure-statuses",
      label: t?.titles?.generalStructureStatuses,
      link: QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES,
    },
    {
      key: "work-schedules",
      label: t?.titles?.workSchedules,
      link: QUESTIONNAIRES_WORK_SCHEDULES,
    },
    {
      key: "specializations",
      label: t?.titles?.specializations,
      link: QUESTIONNAIRES_SPECIALIZATIONS,
    },
    {
      key: "war-participants",
      label: t?.titles?.warParticipants,
      link: QUESTIONNAIRES_WAR_PARTICIPANTS,
    },
    {
      key: "general-structure-types",
      label: t?.titles?.generalStructureTypes,
      link: QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES,
    },
    {
      key: "education-institutions",
      label: t?.titles?.educationInstitutions,
      link: QUESTIONNAIRES_EDUCATION_INSTITUTIONS,
    },
    {
      key: "education-payments",
      label: t?.titles?.educationPayments,
      link: QUESTIONNAIRES_EDUCATION_PAYMENTS,
    },
    {
      key: "education-levels",
      label: t?.titles?.educationLevels,
      link: QUESTIONNAIRES_EDUCATION_LEVELS,
    },
    {
      key: "reprimand-types",
      label: t?.titles?.reprimandTypes,
      link: QUESTIONNAIRES_REPRIMAND_TYPES,
    },
    {
      key: "special-days",
      label: t?.titles?.specialDays,
      link: QUESTIONNAIRES_SPECIAL_DAYS,
    },
    {
      key: "areas",
      label: t?.titles?.areas,
      link: QUESTIONNAIRES_AREAS,
    },
    {
      key: "categories",
      label: t?.titles?.categories,
      link: QUESTIONNAIRES_CATEGORIES,
    },
    {
      key: "companies",
      label: t?.titles?.companies,
      link: QUESTIONNAIRES_COMPANIES,
    },
    {
      key: "halls",
      label: t?.titles?.halls,
      link: QUESTIONNAIRES_HALLS,
    },
    {
      key: "positions",
      label: t?.titles?.positions,
      link: QUESTIONNAIRES_POSITIONS,
    },
    {
      key: "driving-categories",
      label: t?.titles?.drivingCategories,
      link: QUESTIONNAIRES_DRIVING_CATEGORIES,
    },
    {
      key: "employee-configurations",
      label: t?.titles?.staffSettings,
      link: QUESTIONNAIRES_EMPLOYEE_CONFIGURATIONS,
    },
    {
      key: "contragent-types",
      label: t?.titles?.contractParty,
      link: QUESTIONNAIRES_CONTRAGENTTYPES,
    },
    {
      key: "contract-types",
      label: t?.titles?.contractType,
      link: QUESTIONNAIRES_CONTRACTTYPES,
    },
    {
      key: "contract-currencies",
      label: t?.titles?.currencies,
      link: QUESTIONNAIRES_CONTRACTCURRENCIES,
    },
    {
      key: "orders",
      label: t?.titles?.orderType,
      link: QUESTIONNAIRES_ORDERS,
    },
    {
      key: "work-modes",
      label: t?.titles?.workMode,
      link: QUESTIONNAIRES_WORK_MODES,
    },
    {
      key: "vehicle-categories",
      label: t?.titles?.transportTypes,
      link: QUESTIONNAIRES_VEHICLE_CATEGORIES,
    },
    {
      key: "chemicals",
      label: t?.titles?.chemicals,
      link: QUESTIONNAIRES_CHEMICALS,
    },

    {
      key: "repair-types",
      label: t?.titles?.repairTypes,
      link: QUESTIONNAIRES_REPAIR_TYPES,
    },
    {
      key: "detail-parts",
      label: t?.titles?.spareParts,
      link: QUESTIONNAIRES_DETAIL_PARTS,
    },
    {
      key: "measurement-types",
      label: t?.titles?.measurementUnits,
      link: QUESTIONNAIRES_MEASUREMENT_TYPES,
    },
    {
      key: "repairment-work-types",
      label: t?.titles?.repairWorkTypes,
      link: QUESTIONNAIRES_REPAIRMENT_WORK_TYPES,
    },
    {
      key: "penalty-types",
      label: t?.titles?.penaltyTypes,
      link: QUESTIONNAIRES_PENALTY_TYPES,
    },
    {
      key: "crush-reasons",
      label: t?.titles?.crashReasons,
      link: QUESTIONNAIRES_CRUSH_REASONS,
    },
    {
      key: "insurance-types",
      label: t?.titles?.insuranceTypes,
      link: QUESTIONNAIRES_INSURANCE_TYPES,
    },
    {
      key: "extra-services",
      label: t?.titles?.extraServices,
      link: QUESTIONNAIRES_EXTRA_SERVICES,
    },
    {
      key: "fuel-types",
      label: t?.titles?.fuelTypes,
      link: QUESTIONNAIRES_FUEL_TYPES,
    },
    {
      key: "oil-fields",
      label: t?.titles?.oilCompanies,
      link: QUESTIONNAIRES_OIL_FIELDS,
    },

    {
      key: "vehicle-groups",
      label: t?.titles?.vehicleGroups,
      link: QUESTIONNAIRES_VEHICLE_GROUPS,
    },

    {
      key: "owners", //delete the "/" at the start of string
      label: t?.titles?.owner,
      link: QUESTIONNAIRES_OWNERS,
    },
    // ---- generated sidebar item by questionnaireGenerator: Owners ----

    {
      key: "contracttopics", //delete the "/" at the start of string
      label: t?.titles?.contractTopics,
      link: QUESTIONNAIRES_CONTRACTTOPICS,
    },
    // ---- generated sidebar item by questionnaireGenerator: ContractTopics ----

    {
      key: "subtypes", //delete the "/" at the start of string
      label: t?.titles?.contractSubject,
      link: QUESTIONNAIRES_CONTRACTTYPESSUBTYPES,
    },
    // ---- generated sidebar item by questionnaireGenerator: ContractTypesSubtypes ----

    {
      key: "defaultagreementplans", //delete the "/" at the start of string
      label: t?.titles?.defaultAgreementPlans,
      link: QUESTIONNAIRES_DEFAULTAGREEMENTPLANS,
    },
    // ---- generated sidebar item by questionnaireGenerator: DefaultAgreementPlans ----

    {
      key: "routelocations", //delete the "/" at the start of string
      label: t?.titles?.routeLocations,
      link: QUESTIONNAIRES_ROUTELOCATIONS,
    },
    // ---- generated sidebar item by questionnaireGenerator: RouteLocations ----

    {
      key: "internalstructures", //delete the "/" at the start of string
      label: t?.titles?.templateStructures,
      link: QUESTIONNAIRES_INTERNALSTRUCTURE,
    },
    // ---- generated sidebar item by questionnaireGenerator: InternalStructure ----

    {
      key: "fields", //delete the "/" at the start of string
      label: t?.titles?.areas,
      link: QUESTIONNAIRES_FIELD,
    },
    // ---- generated sidebar item by questionnaireGenerator: Field ----

    {
      key: "wells", //delete the "/" at the start of string
      label: t?.titles?.well,
      link: QUESTIONNAIRES_WELL,
    },
    // ---- generated sidebar item by questionnaireGenerator: Well ----

    {
      key: "barrels", //delete the "/" at the start of string
      label: t?.titles?.tank,
      link: QUESTIONNAIRES_BARREL,
    },
    // ---- generated sidebar item by questionnaireGenerator: Barrel ----

    {
      key: "budget-components", //delete the "/" at the start of string
      label: t?.titles?.budgetComponents,
      link: QUESTIONNAIRES_BUDGETCOMPONENTS,
    },
    // ---- generated sidebar item by questionnaireGenerator: BudgetComponents ----

    {
      key: "departments", //delete the "/" at the start of string
      label: t?.titles?.departments,
      link: QUESTIONNAIRES_DEPARTMENTS,
    },
    // ---- generated sidebar item by questionnaireGenerator: Departments ----

    {
      key: "pentions", //delete the "/" at the start of string
      label: t?.titles?.pensionType,
      link: QUESTIONNAIRES_PENTIONS,
    },
    // ---- generated sidebar item by questionnaireGenerator: Pentions ----

    {
      key: "projects", //delete the "/" at the start of string
      label: t?.titles?.projects,
      link: QUESTIONNAIRES_PROJECTS,
    },
    // ---- generated sidebar item by questionnaireGenerator: Projects ----

    {
      key: "customers", //delete the "/" at the start of string
      label: t?.titles?.customers,
      link: QUESTIONNAIRES_CUSTOMERS,
    },
    // ---- generated sidebar item by questionnaireGenerator: Customers ----

    {
      key: "inventoryBrands", //delete the "/" at the start of string
      label: t?.titles?.inventoryBrands,
      link: QUESTIONNAIRES_INVENTORYBRANDS,
    },
    // ---- generated sidebar item by questionnaireGenerator: InventoryBrands ----

    {
      key: "inventoryCategories", //delete the "/" at the start of string
      label: t?.titles?.inventoryCategories,
      link: QUESTIONNAIRES_INVENTORYCATEGORIES,
    },
    // ---- generated sidebar item by questionnaireGenerator: InventoryCategories ----

    {
      key: "inventoryModels", //delete the "/" at the start of string
      label: t?.titles?.inventoryModels,
      link: QUESTIONNAIRES_INVENTORYMODELS,
    },
    // ---- generated sidebar item by questionnaireGenerator: InventoryModels ----

    {
      key: "inventoryPackageTypes", //delete the "/" at the start of string
      label: t?.titles?.inventoryPackageTypes,
      link: QUESTIONNAIRES_INVENTORYPACKAGETYPES,
    },
    // ---- generated sidebar item by questionnaireGenerator: inventoryPackageTypes ----

    {
      key: "inventoryTechnicalDetails", //delete the "/" at the start of string
      label: t?.titles?.characteristics,
      link: QUESTIONNAIRES_INVENTORYTECHNICALDETAILS,
    },
    // ---- generated sidebar item by questionnaireGenerator: InventoryTechnicalDetails ----

    {
      key: "vendorCategories", //delete the "/" at the start of string
      label: t?.titles?.vendorCategories,
      link: QUESTIONNAIRES_VENDORCATEGORIES,
    },
    // ---- generated sidebar item by questionnaireGenerator: VendorCategories ----

    {
      key: "attestations", //delete the "/" at the start of string
      label: t?.titles?.attestations,
      link: QUESTIONNAIRES_ATTESTATIONS,
    },
    // ---- generated sidebar item by questionnaireGenerator: Attestations ----
  ];

  const sortedItems = items.sort((a, b) =>
    (a.label || "").localeCompare(b.label || "", lang),
  );

  const isAllowAll =
    allowed === "*" || (Array.isArray(allowed) && allowed.includes("*"));

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
        item.children.some((child) => child.key === selectedKey),
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
        <h2>{t?.titles?.questionnaires}</h2>
      </div>
      <div className={style.search}>
        <Input
          onChange={(e) => setSearchQuery(e?.target?.value)}
          placeholder={t?.common?.search}
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
