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
  academicdegreesRender: false,
  disabilitystatusesRender: false,
  honorarytitlesRender: false,
  militaryStaffsRender: false,
  militaryCategoriesRender: false,
  militaryranksRender: false,
  militarygroupsRender: false,
  generalstructurestatusesRender: false,
  workschedulesRender: false,
  specializationsRender: false,
  warparticipantsRender: false,
  generalstructuretypesRender: false,
  educationinstitutionsRender: false,
  educationPaymentsRender: false,
  educationlevelsRender: false,
  reprimandTypesRender: false,
  specialdaysRender: false,
  categoriesRender: false,
  regionsRender: false,
  areasRender: false,
  companiesRender: false,
  positionsRender: false,
  hallsRender: false,
  drivingcategoriesRender: false,
  employeeConfigurationsRender: false,
  contractcurrenciesRender: false,
  ordersRender: false,
  contragenttypesRender: false,
  contracttypesRender: false,
  workModesRender: false,
  vehicleCategoriesRender: false,
  chemicalsRender: false,
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
    setAcademicdegreesRender: (state, { payload }) => {
      state.academicdegreesRender = payload;
    },
    setDisabilitystatusesRender: (state, { payload }) => {
      state.disabilitystatusesRender = payload;
    },
    setHonorarytitlesRender: (state, { payload }) => {
      state.honorarytitlesRender = payload;
    },
    setMilitarystaffsRender: (state, { payload }) => {
      state.militaryStaffsRender = payload;
    },
    setMilitarycategoriesRender: (state, { payload }) => {
      state.militaryCategoriesRender = payload;
    },
    setMilitaryranksRender: (state, { payload }) => {
      state.militaryranksRender = payload;
    },
    setMilitarygroupsRender: (state, { payload }) => {
      state.militarygroupsRender = payload;
    },
    setGeneralstructurestatusesRender: (state, { payload }) => {
      state.generalstructurestatusesRender = payload;
    },
    setWorkschedulesRender: (state, { payload }) => {
      state.workschedulesRender = payload;
    },
    setSpecializationsRender: (state, { payload }) => {
      state.specializationsRender = payload;
    },
    setWarparticipantsRender: (state, { payload }) => {
      state.warparticipantsRender = payload;
    },
    setGeneralstructuretypesRender: (state, { payload }) => {
      state.generalstructuretypesRender = payload;
    },
    setEducationinstitutionsRender: (state, { payload }) => {
      state.educationinstitutionsRender = payload;
    },
    setEducationpaymentsRender: (state, { payload }) => {
      state.educationPaymentsRender = payload;
    },
    setEducationlevelsRender: (state, { payload }) => {
      state.educationlevelsRender = payload;
    },
    setReprimandtypesRender: (state, { payload }) => {
      state.reprimandTypesRender = payload;
    },
    setSpecialdaysRender: (state, { payload }) => {
      state.specialdaysRender = payload;
    },
    setCategoriesRender: (state, { payload }) => {
      state.categoriesRender = payload;
    },
    setRegionsRender: (state, { payload }) => {
      state.regionsRender = payload;
    },
    setAreasRender: (state, { payload }) => {
      state.areasRender = payload;
    },
    setCompaniesRender: (state, { payload }) => {
      state.companiesRender = payload;
    },
    setPositionsRender: (state, { payload }) => {
      state.positionsRender = payload;
    },
    setHallsRender: (state, { payload }) => {
      state.hallsRender = payload;
    },
    setDrivingcategoriesRender: (state, { payload }) => {
      state.drivingcategoriesRender = payload;
    },
    setEmployeeConfigurationsRender: (state, { payload }) => {
      state.employeeConfigurationsRender = payload;
    },
    setContracttypesRender: (state, { payload }) => {
      state.contracttypesRender = payload;
    },
    setContragenttypesRender: (state, { payload }) => {
      state.contragenttypesRender = payload;
    },
    setOrdersRender: (state, { payload }) => {
      state.ordersRender = payload;
    },
    setContractcurrenciesRender: (state, { payload }) => {
      state.contractcurrenciesRender = payload;
    },
    setWorkModesRender: (state, { payload }) => {
      state.workModesRender = payload;
    },
    setVehicleCategoriesRender: (state, { payload }) => {
      state.vehicleCategoriesRender = payload;
    },
    setChemicalsRender: (state, { payload }) => {
      state.chemicalsRender = payload;
    },
  },
});

export const {
  setLoading,
  setNotificationsRender,
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
  setVrcRender,
  setAcademicdegreesRender,
  setDisabilitystatusesRender,
  setHonorarytitlesRender,
  setMilitarystaffsRender,
  setMilitarycategoriesRender,
  setMilitaryranksRender,
  setMilitarygroupsRender,
  setGeneralstructurestatusesRender,
  setWorkschedulesRender,
  setSpecializationsRender,
  setWarparticipantsRender,
  setGeneralstructuretypesRender,
  setEducationinstitutionsRender,
  setEducationpaymentsRender,
  setEducationlevelsRender,
  setReprimandtypesRender,
  setSpecialdaysRender,
  setCategoriesRender,
  setRegionsRender,
  setAreasRender,
  setCompaniesRender,
  setPositionsRender,
  setHallsRender,
  setDrivingcategoriesRender,
  setEmployeeConfigurationsRender,
  setContracttypesRender,
  setContragenttypesRender,
  setOrdersRender,
  setContractcurrenciesRender,
  setWorkModesRender,
  setVehicleCategoriesRender,
  setChemicalsRender

} = global.actions;
