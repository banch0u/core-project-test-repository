import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  notificationsRender: false,
  viewModalVisible: false,
  viewMoreModalVisible: false,
  deleteModalVisible: false,
  topicsRender: false,
  subtopicsRender: false,
  executionRulesRender: false,
  documentRecieveMethodsRender: false,
  documentTypesRender: false,
  countryRender: false,
  organizationRender: false,
  structureRender: false,
  applicationFormRender: false,
  documentWhomRender: false,
  marginNoteTextRender: false,
  deliveryMethodRender: false,
  brandRender: false,
  chassisTypeRender: false,
  colorRender: false,
  enginetypeRender: false,
  gearboxtypeRender: false,
  issuedauthoritieRender: false,
  modelRender: false,
  ownershiptypeRender: false,
  organisationrecordRender: false,
  transmittertypeRender: false,
  vehicleRender: false,
  vehicletypeRender: false,
  vrcRender: false,
};

export const global = createSlice({
  name: "global",
  initialState,
  reducers: {
    setLoading: (state, { payload }) => {
      state.loading = payload;
    },
    setNotificationsRender(state) {
      state.notificationsRender = !state.notificationsRender;
    },
    setViewModalVisible: (state, { payload }) => {
      state.viewModalVisible = payload;
    },
    setViewMoreModalVisible: (state, { payload }) => {
      state.viewMoreModalVisible = payload;
    },
    setDeleteModalVisible: (state, { payload }) => {
      state.deleteModalVisible = payload;
    },
    setTopicsRender: (state, { payload }) => {
      state.topicsRender = payload;
    },
    setSubtopicsRender: (state, { payload }) => {
      state.subtopicsRender = payload;
    },
    setExecutionRulesRender: (state, { payload }) => {
      state.executionRulesRender = payload;
    },
    setDocumentRecieveMethodsRender: (state, { payload }) => {
      state.documentRecieveMethodsRender = payload;
    },
    setDocumentTypesRender: (state, { payload }) => {
      state.documentTypesRender = payload;
    },
    setCountryRender: (state, { payload }) => {
      state.countryRender = payload;
    },
    setOrganizationRender: (state, { payload }) => {
      state.organizationRender = payload;
    },
    setStructureRender: (state, { payload }) => {
      state.structureRender = payload;
    },
    setApplicationFormsRender: (state, { payload }) => {
      state.applicationFormRender = payload;
    },
    setDocumentWhomRender: (state, { payload }) => {
      state.documentWhomRender = payload;
    },
    setMarginNoteTextRender: (state, { payload }) => {
      state.marginNoteTextRender = payload;
    },
    setDeliveryMethodRender: (state, { payload }) => {
      state.deliveryMethodRender = payload;
    },
    setBrandRender: (state, { payload }) => {
      state.brandRender = payload;
    },
    setChassisTypeRender: (state, { payload }) => {
      state.chassisTypeRender = payload;
    },
    setColorRender: (state, { payload }) => {
      state.colorRender = payload;
    },
    setEnginetypeRender: (state, { payload }) => {
      state.enginetypeRender = payload;
    },
    setGearboxtypeRender: (state, { payload }) => {
      state.gearboxtypeRender = payload;
    },
    setIssuedauthoritieRender: (state, { payload }) => {
      state.issuedauthoritieRender = payload;
    },
    setModelRender: (state, { payload }) => {
      state.modelRender = payload;
    },
    setOwnershiptypeRender: (state, { payload }) => {
      state.ownershiptypeRender = payload;
    },
    setOrganisationrecordRender: (state, { payload }) => {
      state.organisationrecordRender = payload;
    },
    setTransmittertypeRender: (state, { payload }) => {
      state.transmittertypeRender = payload;
    },
    setVehicleRender: (state, { payload }) => {
      state.vehicleRender = payload;
    },
    setVehicletypeRender: (state, { payload }) => {
      state.vehicletypeRender = payload;
    },
    setVrcRender: (state, { payload }) => {
      state.vrcRender = payload;
    },

  },
});

export const { setLoading, setNotificationsRender,
  setViewModalVisible,
  setViewMoreModalVisible,
  setDeleteModalVisible,
  setTopicsRender,
  setPaginationSize,
  setSubtopicsRender,
  setExecutionRulesRender,
  setSubtopicSelect,
  setDocumentRecieveMethodsRender,
  setSubtopicSelectDisabled,
  setDocumentTypesRender,
  setCountryRender,
  setOrganizationRender,
  setStructureRender,
  setApplicationFormsRender,
  setDocumentWhomRender,
  setMarginNoteTextRender,
  setDeliveryMethodRender,
  setBrandRender,
  setChassisTypeRender,
  setColorRender,
  setEnginetypeRender,
  setGearboxtypeRender,
  setIssuedauthoritieRender,
  setModelRender,
  setOwnershiptypeRender,
  setOrganisationrecordRender,
  setTransmittertypeRender,
  setVehicleRender,
  setVehicletypeRender,
  setVrcRender
} = global.actions;
