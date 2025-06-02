import React from "react";
import { Route } from "react-router-dom";
import QuestionnairesLayout from "../layout/QuestionnairesLayout";
import Questionnnaires from "../pages/Questionnnaires";

import QuestionnairesTopicContent from "../pages/Questionnnaires/QuestionnairesTopicContent";
import QuestionnairesSubtopicContent from "../pages/Questionnnaires/QuestionnairesSubtopicContent";
import QuestionnairesExecutionRulesContent from "../pages/Questionnnaires/QuestionnairesExecutionRulesContent";
import QuestionnairesDocumentRecieveMethodsContent from "../pages/Questionnnaires/QuestionnairesDocumentRecieveMethodsContent";
import QuestionnairesDocumentTypeContent from "../pages/Questionnnaires/QuestionnairesDocumentTypeContent";
import QuestionnairesCountriesContent from "../pages/Questionnnaires/QuestionnairesCountriesContent";
import QuestionnairesOrganizationsContent from "../pages/Questionnnaires/QuestionnairesOrganizationsContent";
import QuestionnairesStructuresContent from "../pages/Questionnnaires/QuestionnairesStructuresContent";
import QuestionnairesApplicationFormContent from "../pages/Questionnnaires/QuestionnairesApplicationFormContent";
import QuestionnairesDocumentWhomContent from "../pages/Questionnnaires/QuestionnairesDocumentWhomContent";
import QuestionnairesMarginNoteTextsContent from "../pages/Questionnnaires/QuestionnairesMarginNoteTextsContent";

import QuestionnairesBrandsContent from "../pages/Questionnnaires/QuestionnairesBrandsContent";
import QuestionnairesChassisTypesContent from "../pages/Questionnnaires/QuestionnairesChassisTypesContent";
import QuestionnairesColorsContent from "../pages/Questionnnaires/QuestionnairesColorsContent";
import {
  QUESTIONNAIRES_TOPIC,
  QUESTIONNAIRES_SUBTOPIC,
  QUESTIONNAIRES_EXECUTION_RULES,
  QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
  QUESTIONNAIRES_DOCUMENT_TYPES,
  QUESTIONNAIRES_COUNTRIES,
  QUESTIONNAIRES_ORGANIZATIONS,
  QUESTIONNAIRES_STRUCTURES,
  QUESTIONNAIRES_APPLICATION_FORMS,
  QUESTIONNAIRES_DOCUMENT_WHOM,
  QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
  QUESTIONNAIRES_BRANDS,
  QUESTIONNAIRES_CHASSIS_TYPES,
  SETTINGS_QUESTIONNAIRES_TOPIC,
  SETTINGS_QUESTIONNAIRES_SUBTOPIC,
  SETTINGS_QUESTIONNAIRES_EXECUTION_RULES,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_TYPES,
  SETTINGS_QUESTIONNAIRES_COUNTRIES,
  SETTINGS_QUESTIONNAIRES_ORGANIZATIONS,
  SETTINGS_QUESTIONNAIRES_STRUCTURES,
  SETTINGS_QUESTIONNAIRES_APPLICATION_FORMS,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_WHOM,
  SETTINGS_QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
  QUESTIONNAIRES_COLORS,
  QUESTIONNAIRES_ENGINE_TYPES,
  QUESTIONNAIRES_GEARBOX_TYPES,
  QUESTIONNAIRES_ISSUED_AUTHORITIES,
  QUESTIONNAIRES_MODELS,
  QUESTIONNAIRES_OWNERSHIP_TYPES,
  QUESTIONNAIRES_TRANSMITTER_TYPES,
  QUESTIONNAIRES_VEHICLE_TYPES,
  SETTINGS_QUESTIONNAIRES_BRANDS,
  SETTINGS_QUESTIONNAIRES_CHASSISTYPES,
  SETTINGS_QUESTIONNAIRES_COLORS,
  SETTINGS_QUESTIONNAIRES_ENGINETYPES,
  SETTINGS_QUESTIONNAIRES_GEARBOXTYPES,
  SETTINGS_QUESTIONNAIRES_ISSUEDAUTHORITIES,
  SETTINGS_QUESTIONNAIRES_MODELS,
  SETTINGS_QUESTIONNAIRES_OWNERSHIPTYPES,
  SETTINGS_QUESTIONNAIRES_TRANSMITTERTYPES,
  SETTINGS_QUESTIONNAIRES_VEHICLETYPES,
  QUESTIONNAIRES_ACADEMIC_DEGREES,
  QUESTIONNAIRES_DISABILITY_STATUSES,
  QUESTIONNAIRES_HONORARY_TITLES,
  QUESTIONNAIRES_MILITARY_STAFFS,
  QUESTIONNAIRES_MILITARY_CATEGORIES,
  QUESTIONNAIRES_MILITARY_RANKS,
  QUESTIONNAIRES_MILITARY_GROUPS,
  QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES,
  QUESTIONNAIRES_WORK_SCHEDULES,
  QUESTIONNAIRES_SPECIALIZATIONS,
  QUESTIONNAIRES_WAR_PARTICIPANTS,
  QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES,
  QUESTIONNAIRES_EDUCATION_INSTITUTIONS,
  QUESTIONNAIRES_EDUCATION_PAYMENTS,
  QUESTIONNAIRES_EDUCATION_LEVELS,
  QUESTIONNAIRES_REPRIMAND_TYPES,
  QUESTIONNAIRES_SPECIAL_DAYS,
  SETTINGS_QUESTIONNAIRES_ACADEMIC_DEGREES,
  SETTINGS_QUESTIONNAIRES_DISABILITY_STATUSES,
  SETTINGS_QUESTIONNAIRES_HONORARY_TITLES,
  SETTINGS_QUESTIONNAIRES_MILITARY_STAFFS,
  SETTINGS_QUESTIONNAIRES_MILITARY_CATEGORIES,
  SETTINGS_QUESTIONNAIRES_MILITARY_RANKS,
  SETTINGS_QUESTIONNAIRES_MILITARY_GROUPS,
  SETTINGS_QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES,
  SETTINGS_QUESTIONNAIRES_WORK_SCHEDULES,
  SETTINGS_QUESTIONNAIRES_SPECIALIZATIONS,
  SETTINGS_QUESTIONNAIRES_WAR_PARTICIPANTS,
  SETTINGS_QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES,
  SETTINGS_QUESTIONNAIRES_EDUCATION_INSTITUTIONS,
  SETTINGS_QUESTIONNAIRES_EDUCATION_PAYMENTS,
  SETTINGS_QUESTIONNAIRES_EDUCATION_LEVELS,
  SETTINGS_QUESTIONNAIRES_REPRIMAND_TYPES,
  SETTINGS_QUESTIONNAIRES_SPECIAL_DAYS,
  QUESTIONNAIRES_CATEGORIES,
  QUESTIONNAIRES_REGIONS,
  QUESTIONNAIRES_AREAS,
  QUESTIONNAIRES_COMPANIES,
  QUESTIONNAIRES_POSITIONS,
  QUESTIONNAIRES_HALLS,
  SETTINGS_QUESTIONNAIRES_CATEGORIES,
  SETTINGS_QUESTIONNAIRES_REGIONS,
  SETTINGS_QUESTIONNAIRES_AREAS,
  SETTINGS_QUESTIONNAIRES_COMPANIES,
  SETTINGS_QUESTIONNAIRES_POSITIONS,
  SETTINGS_QUESTIONNAIRES_HALLS,
  QUESTIONNAIRES_DRIVING_CATEGORIES,
  SETTINGS_QUESTIONNAIRES_DRIVING_CATEGORIES,
  QUESTIONNAIRES_EMPLOYEE_CONFIGURATIONS,
  SETTINGS_EMPLOYEE_CONFIGURATIONS,
  QUESTIONNAIRES_CONTRAGENTTYPES,
  QUESTIONNAIRES_CONTRACTTYPES,
  QUESTIONNAIRES_CONTRACTCURRENCIES,
  QUESTIONNAIRES_ORDERS,
  SETTINGS_QUESTIONNAIRES_CONTRAGENTTYPES,
  SETTINGS_QUESTIONNAIRES_CONTRACTTYPES,
  SETTINGS_QUESTIONNAIRES_CONTRACTCURRENCIES,
  SETTINGS_QUESTIONNAIRES_ORDERS,
} from "../utils/path";
import QuestionnairesEngineTypesContent from "../pages/Questionnnaires/QuestionnairesEngineTypesContent";
import QuestionnairesGearboxTypesContent from "../pages/Questionnnaires/QuestionnairesGearboxTypesContent";
import QuestionnairesModelsContent from "../pages/Questionnnaires/QuestionnairesModelsContent";
import QuestionnairesOwnershipTypesContent from "../pages/Questionnnaires/QuestionnairesOwnershipTypesContent";
import QuestionnairesTransmitterTypesContent from "../pages/Questionnnaires/QuestionnairesTransmitterTypesContent";
import QuestionnairesVehicleTypesContent from "../pages/Questionnnaires/QuestionnairesVehicleTypesContent";
import QuestionnairesIssuedAuthoritiesContent from "../pages/Questionnnaires/QuestionnairesIssuedAuthoritiesContent";
import QuestionnairesAcademicdegreesContent from "../pages/Questionnnaires/QuestionnairesAcademicdegreesContent";
import QuestionnairesDisabilitystatusesContent from "../pages/Questionnnaires/QuestionnairesDisabilitystatusesContent";
import QuestionnairesHonorarytitlesContent from "../pages/Questionnnaires/QuestionnairesHonorarytitlesContent";
import QuestionnairesMilitarystaffsContent from "../pages/Questionnnaires/QuestionnairesMilitarystaffsContent";
import QuestionnairesMilitarycategoriesContent from "../pages/Questionnnaires/QuestionnairesMilitarycategoriesContent";
import QuestionnairesMilitaryranksContent from "../pages/Questionnnaires/QuestionnairesMilitaryranksContent";
import QuestionnairesMilitarygroupsContent from "../pages/Questionnnaires/QuestionnairesMilitarygroupsContent";
import QuestionnairesGeneralstructurestatusesContent from "../pages/Questionnnaires/QuestionnairesGeneralstructurestatusesContent";
import QuestionnairesWorkschedulesContent from "../pages/Questionnnaires/QuestionnairesWorkschedulesContent";
import QuestionnairesSpecializationsContent from "../pages/Questionnnaires/QuestionnairesSpecializationsContent";
import QuestionnairesWarparticipantsContent from "../pages/Questionnnaires/QuestionnairesWarparticipantsContent";
import QuestionnairesGeneralstructuretypesContent from "../pages/Questionnnaires/QuestionnairesGeneralstructuretypesContent";
import QuestionnairesEducationinstitutionsContent from "../pages/Questionnnaires/QuestionnairesEducationinstitutionsContent";
import QuestionnairesEducationpaymentsContent from "../pages/Questionnnaires/QuestionnairesEducationpaymentsContent";
import QuestionnairesEducationlevelsContent from "../pages/Questionnnaires/QuestionnairesEducationlevelsContent";
import QuestionnairesReprimandtypesContent from "../pages/Questionnnaires/QuestionnairesReprimandtypesContent";
import QuestionnairesSpecialdaysContent from "../pages/Questionnnaires/QuestionnairesSpecialdaysContent";
import QuestionnairesCategoriesContent from "../pages/Questionnnaires/QuestionnairesCategoriesContent";
import QuestionnairesRegionsContent from "../pages/Questionnnaires/QuestionnairesRegionsContent";
import QuestionnairesAreasContent from "../pages/Questionnnaires/QuestionnairesAreasContent";
import QuestionnairesCompaniesContent from "../pages/Questionnnaires/QuestionnairesCompaniesContent";
import QuestionnairesPositionsContent from "../pages/Questionnnaires/QuestionnairesPositionsContent";
import QuestionnairesHallsContent from "../pages/Questionnnaires/QuestionnairesHallsContent";
import QuestionnairesDrivingcategoriesContent from "../pages/Questionnnaires/QuestionnairesDrivingcategoriesContent";
import QuestionnairesEmployeeConfigurations from "../pages/Questionnnaires/QuestionnairesEmployeeConfigurations";
import QuestionnairesContragenttypesContent from "../pages/Questionnnaires/QuestionnairesContragenttypesContent";
import QuestionnairesContracttypesContent from "../pages/Questionnnaires/QuestionnairesContracttypesContent";
import QuestionnairesContractcurrenciesContent from "../pages/Questionnnaires/QuestionnairesContractcurrenciesContent";
import QuestionnairesOrdersContent from "../pages/Questionnnaires/QuestionnairesOrdersContent";

export const questionnairesRoutes = (allowed) => {
  return (
    <>
      {/* Document Circulation Routes */}
      <Route
        path="questionnaires"
        element={<QuestionnairesLayout allowed={allowed} />}>
        <Route index element={<Questionnnaires />} />
        <Route
          path={QUESTIONNAIRES_TOPIC}
          element={<QuestionnairesTopicContent />}
        />
        <Route
          path={QUESTIONNAIRES_SUBTOPIC}
          element={<QuestionnairesSubtopicContent />}
        />
        <Route
          path={QUESTIONNAIRES_EXECUTION_RULES}
          element={<QuestionnairesExecutionRulesContent />}
        />
        <Route
          path={QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS}
          element={<QuestionnairesDocumentRecieveMethodsContent />}
        />
        <Route
          path={QUESTIONNAIRES_DOCUMENT_TYPES}
          element={<QuestionnairesDocumentTypeContent />}
        />
        <Route
          path={QUESTIONNAIRES_COUNTRIES}
          element={<QuestionnairesCountriesContent />}
        />

        <Route
          path={QUESTIONNAIRES_ORGANIZATIONS}
          element={<QuestionnairesOrganizationsContent />}
        />
        <Route
          path={QUESTIONNAIRES_STRUCTURES}
          element={<QuestionnairesStructuresContent />}
        />
        <Route
          path={QUESTIONNAIRES_APPLICATION_FORMS}
          element={<QuestionnairesApplicationFormContent />}
        />
        <Route
          path={QUESTIONNAIRES_DOCUMENT_WHOM}
          element={<QuestionnairesDocumentWhomContent />}
        />
        <Route
          path={QUESTIONNAIRES_MARGIN_NOTE_TEXTS}
          element={<QuestionnairesMarginNoteTextsContent />}
        />
        <Route
          path={QUESTIONNAIRES_BRANDS}
          element={<QuestionnairesBrandsContent />}
        />
        <Route
          path={QUESTIONNAIRES_CHASSIS_TYPES}
          element={<QuestionnairesChassisTypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_COLORS}
          element={<QuestionnairesColorsContent />}
        />

        <Route
          path={QUESTIONNAIRES_ENGINE_TYPES}
          element={<QuestionnairesEngineTypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_GEARBOX_TYPES}
          element={<QuestionnairesGearboxTypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_ISSUED_AUTHORITIES}
          element={<QuestionnairesIssuedAuthoritiesContent />}
        />
        <Route
          path={QUESTIONNAIRES_MODELS}
          element={<QuestionnairesModelsContent />}
        />
        <Route
          path={QUESTIONNAIRES_OWNERSHIP_TYPES}
          element={<QuestionnairesOwnershipTypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_TRANSMITTER_TYPES}
          element={<QuestionnairesTransmitterTypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_VEHICLE_TYPES}
          element={<QuestionnairesVehicleTypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_ACADEMIC_DEGREES}
          element={<QuestionnairesAcademicdegreesContent />}
        />
        <Route
          path={QUESTIONNAIRES_DISABILITY_STATUSES}
          element={<QuestionnairesDisabilitystatusesContent />}
        />
        <Route
          path={QUESTIONNAIRES_HONORARY_TITLES}
          element={<QuestionnairesHonorarytitlesContent />}
        />
        <Route
          path={QUESTIONNAIRES_MILITARY_STAFFS}
          element={<QuestionnairesMilitarystaffsContent />}
        />
        <Route
          path={QUESTIONNAIRES_MILITARY_CATEGORIES}
          element={<QuestionnairesMilitarycategoriesContent />}
        />
        <Route
          path={QUESTIONNAIRES_MILITARY_RANKS}
          element={<QuestionnairesMilitaryranksContent />}
        />
        <Route
          path={QUESTIONNAIRES_MILITARY_GROUPS}
          element={<QuestionnairesMilitarygroupsContent />}
        />
        <Route
          path={QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES}
          element={<QuestionnairesGeneralstructurestatusesContent />}
        />
        <Route
          path={QUESTIONNAIRES_WORK_SCHEDULES}
          element={<QuestionnairesWorkschedulesContent />}
        />
        <Route
          path={QUESTIONNAIRES_SPECIALIZATIONS}
          element={<QuestionnairesSpecializationsContent />}
        />
        <Route
          path={QUESTIONNAIRES_WAR_PARTICIPANTS}
          element={<QuestionnairesWarparticipantsContent />}
        />
        <Route
          path={QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES}
          element={<QuestionnairesGeneralstructuretypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_EDUCATION_INSTITUTIONS}
          element={<QuestionnairesEducationinstitutionsContent />}
        />
        <Route
          path={QUESTIONNAIRES_EDUCATION_PAYMENTS}
          element={<QuestionnairesEducationpaymentsContent />}
        />
        <Route
          path={QUESTIONNAIRES_EDUCATION_LEVELS}
          element={<QuestionnairesEducationlevelsContent />}
        />
        <Route
          path={QUESTIONNAIRES_REPRIMAND_TYPES}
          element={<QuestionnairesReprimandtypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_SPECIAL_DAYS}
          element={<QuestionnairesSpecialdaysContent />}
        />
        <Route
          path={QUESTIONNAIRES_CATEGORIES}
          element={<QuestionnairesCategoriesContent />}
        />
        <Route
          path={QUESTIONNAIRES_REGIONS}
          element={<QuestionnairesRegionsContent />}
        />
        <Route
          path={QUESTIONNAIRES_AREAS}
          element={<QuestionnairesAreasContent />}
        />
        <Route
          path={QUESTIONNAIRES_COMPANIES}
          element={<QuestionnairesCompaniesContent />}
        />
        <Route
          path={QUESTIONNAIRES_POSITIONS}
          element={<QuestionnairesPositionsContent />}
        />
        <Route
          path={QUESTIONNAIRES_HALLS}
          element={<QuestionnairesHallsContent />}
        />
        <Route
          path={QUESTIONNAIRES_DRIVING_CATEGORIES}
          element={<QuestionnairesDrivingcategoriesContent />}
        />
        <Route
          path={QUESTIONNAIRES_EMPLOYEE_CONFIGURATIONS}
          element={<QuestionnairesEmployeeConfigurations />}
        />
        <Route
          path={QUESTIONNAIRES_CONTRAGENTTYPES}
          element={<QuestionnairesContragenttypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_CONTRACTTYPES}
          element={<QuestionnairesContracttypesContent />}
        />
        <Route
          path={QUESTIONNAIRES_CONTRACTCURRENCIES}
          element={<QuestionnairesContractcurrenciesContent />}
        />
        <Route
          path={QUESTIONNAIRES_ORDERS}
          element={<QuestionnairesOrdersContent />}
        />
      </Route>

      {/* Settings Routes */}
      <Route
        path="settings/questionnaires"
        element={<QuestionnairesLayout allowed={allowed} />}>
        <Route index element={<Questionnnaires />} />
        <Route
          path={SETTINGS_QUESTIONNAIRES_TOPIC}
          element={<QuestionnairesTopicContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_SUBTOPIC}
          element={<QuestionnairesSubtopicContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_EXECUTION_RULES}
          element={<QuestionnairesExecutionRulesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS}
          element={<QuestionnairesDocumentRecieveMethodsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_DOCUMENT_TYPES}
          element={<QuestionnairesDocumentTypeContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_COUNTRIES}
          element={<QuestionnairesCountriesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_ORGANIZATIONS}
          element={<QuestionnairesOrganizationsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_STRUCTURES}
          element={<QuestionnairesStructuresContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_APPLICATION_FORMS}
          element={<QuestionnairesApplicationFormContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_DOCUMENT_WHOM}
          element={<QuestionnairesDocumentWhomContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_MARGIN_NOTE_TEXTS}
          element={<QuestionnairesMarginNoteTextsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_BRANDS}
          element={<QuestionnairesBrandsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_CHASSISTYPES}
          element={<QuestionnairesChassisTypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_COLORS}
          element={<QuestionnairesColorsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_ENGINETYPES}
          element={<QuestionnairesEngineTypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_GEARBOXTYPES}
          element={<QuestionnairesGearboxTypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_ISSUEDAUTHORITIES}
          element={<QuestionnairesIssuedAuthoritiesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_MODELS}
          element={<QuestionnairesModelsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_OWNERSHIPTYPES}
          element={<QuestionnairesOwnershipTypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_TRANSMITTERTYPES}
          element={<QuestionnairesTransmitterTypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_VEHICLETYPES}
          element={<QuestionnairesVehicleTypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_ACADEMIC_DEGREES}
          element={<QuestionnairesAcademicdegreesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_DISABILITY_STATUSES}
          element={<QuestionnairesDisabilitystatusesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_HONORARY_TITLES}
          element={<QuestionnairesHonorarytitlesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_MILITARY_STAFFS}
          element={<QuestionnairesMilitarystaffsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_MILITARY_CATEGORIES}
          element={<QuestionnairesMilitarycategoriesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_MILITARY_RANKS}
          element={<QuestionnairesMilitaryranksContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_MILITARY_GROUPS}
          element={<QuestionnairesMilitarygroupsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_GENERAL_STRUCTURE_STATUSES}
          element={<QuestionnairesGeneralstructurestatusesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_WORK_SCHEDULES}
          element={<QuestionnairesWorkschedulesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_SPECIALIZATIONS}
          element={<QuestionnairesSpecializationsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_WAR_PARTICIPANTS}
          element={<QuestionnairesWarparticipantsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_GENERAL_STRUCTURE_TYPES}
          element={<QuestionnairesGeneralstructuretypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_EDUCATION_INSTITUTIONS}
          element={<QuestionnairesEducationinstitutionsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_EDUCATION_PAYMENTS}
          element={<QuestionnairesEducationpaymentsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_EDUCATION_LEVELS}
          element={<QuestionnairesEducationlevelsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_REPRIMAND_TYPES}
          element={<QuestionnairesReprimandtypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_SPECIAL_DAYS}
          element={<QuestionnairesSpecialdaysContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_CATEGORIES}
          element={<QuestionnairesCategoriesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_REGIONS}
          element={<QuestionnairesRegionsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_AREAS}
          element={<QuestionnairesAreasContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_COMPANIES}
          element={<QuestionnairesCompaniesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_POSITIONS}
          element={<QuestionnairesPositionsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_HALLS}
          element={<QuestionnairesHallsContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_DRIVING_CATEGORIES}
          element={<QuestionnairesDrivingcategoriesContent />}
        />
        <Route
          path={SETTINGS_EMPLOYEE_CONFIGURATIONS}
          element={<QuestionnairesEmployeeConfigurations />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_CONTRAGENTTYPES}
          element={<QuestionnairesContragenttypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_CONTRACTTYPES}
          element={<QuestionnairesContracttypesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_CONTRACTCURRENCIES}
          element={<QuestionnairesContractcurrenciesContent />}
        />
        <Route
          path={SETTINGS_QUESTIONNAIRES_ORDERS}
          element={<QuestionnairesOrdersContent />}
        />
      </Route>
    </>
  );
};
