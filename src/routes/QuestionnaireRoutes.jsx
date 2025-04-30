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

import {
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_TOPIC,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_SUBTOPIC,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_EXECUTION_RULES,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_TYPES,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_COUNTRIES,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_STREETS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_ORGANIZATIONS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_STRUCTURES,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_APPLICATION_FORMS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_WHOM,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
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
} from "../utils/path";

export const questionnairesRoutes = (allowed) => {
  return (
    <>
      {/* Document Circulation Routes */}
      <Route
        path="questionnaires"
        element={<QuestionnairesLayout allowed={allowed} />}>
        <Route index element={<Questionnnaires />} />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_TOPIC}
          element={<QuestionnairesTopicContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_SUBTOPIC}
          element={<QuestionnairesSubtopicContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_EXECUTION_RULES}
          element={<QuestionnairesExecutionRulesContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS}
          element={<QuestionnairesDocumentRecieveMethodsContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_TYPES}
          element={<QuestionnairesDocumentTypeContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_COUNTRIES}
          element={<QuestionnairesCountriesContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_STREETS}
          element={<QuestionnairesStreetsContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_ORGANIZATIONS}
          element={<QuestionnairesOrganizationsContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_STRUCTURES}
          element={<QuestionnairesStructuresContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_APPLICATION_FORMS}
          element={<QuestionnairesApplicationFormContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_WHOM}
          element={<QuestionnairesDocumentWhomContent />}
        />
        <Route
          path={DOCUMENT_CIRCULATION_QUESTIONNAIRES_MARGIN_NOTE_TEXTS}
          element={<QuestionnairesMarginNoteTextsContent />}
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
      </Route>
    </>
  );
};
