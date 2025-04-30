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
import QuestionnairesStreetsContent from "../pages/Questionnnaires/QuestionnairesStreetsContent";
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
  QUESTIONNAIRES_STREETS,
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
  SETTINGS_QUESTIONNAIRES_STREETS,
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
} from "../utils/path";
import QuestionnairesEngineTypesContent from "../pages/Questionnnaires/QuestionnairesEngineTypesContent";
import QuestionnairesGearboxTypesContent from "../pages/Questionnnaires/QuestionnairesGearboxTypesContent";
import QuestionnairesModelsContent from "../pages/Questionnnaires/QuestionnairesModelsContent";
import QuestionnairesOwnershipTypesContent from "../pages/Questionnnaires/QuestionnairesOwnershipTypesContent";
import QuestionnairesTransmitterTypesContent from "../pages/Questionnnaires/QuestionnairesTransmitterTypesContent";
import QuestionnairesVehicleTypesContent from "../pages/Questionnnaires/QuestionnairesVehicleTypesContent";
import QuestionnairesIssuedAuthoritiesContent from "../pages/Questionnnaires/QuestionnairesIssuedAuthoritiesContent";

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
          path={QUESTIONNAIRES_STREETS}
          element={<QuestionnairesStreetsContent />}
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
          path={SETTINGS_QUESTIONNAIRES_STREETS}
          element={<QuestionnairesStreetsContent />}
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
      </Route>
    </>
  );
};
