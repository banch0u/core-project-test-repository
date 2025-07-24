import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Services from "./service";
import {
  setApplicationFormsRender,
  setCountryRender,
  setDeleteModalVisible,
  setDeliveryMethodRender,
  setDocumentRecieveMethodsRender,
  setDocumentTypesRender,
  setDocumentWhomRender,
  setExecutionRulesRender,
  setLoading,
  setMarginNoteTextRender,
  setOrganizationRender,
  setStructureRender,
  setSubtopicsRender,
  setTopicsRender,
  setViewModalVisible,
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
  setChemicalsRender,
  setRepairtypesRender,
  setDetailpartsRender,
  setMeasurementtypesRender,
  setRepairmentWorkTypesRender
} from "../global";
import { errorMessage } from "../../../utils/message";

const initialState = {
  questionnaires: [],
};

export const getTopics = createAsyncThunk(
  "/getTopics",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getTopics(
        data.size,
        data?.page,
        data?.query,
        data?.visibility,
        data?.appealtypes
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getTopicsAll = createAsyncThunk(
  "/getTopicsAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getTopicsAll(
        data?.visibility,
        data?.appealtypes
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteTopic = createAsyncThunk(
  "/deleteTopic",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteTopic(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setTopicsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addTopic = createAsyncThunk(
  "/addTopic",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addTopic(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setTopicsRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editTopic = createAsyncThunk(
  "/editTopic",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editTopic(data);
      dispatch(setLoading(false));
      dispatch(setTopicsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const topicVisibility = createAsyncThunk(
  "/topicVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.topicVisibility(data);
      dispatch(setLoading(false));
      dispatch(setTopicsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getSubtopics = createAsyncThunk(
  "/getSubtopics",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getSubtopics(
        data.size,
        data?.page,
        data?.topicId,
        data?.query,
        data?.visibility,
        data?.appealtypes
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getSubtopicsAll = createAsyncThunk(
  "/getSubtopicsAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getSubtopicsAll(
        data?.visibility,
        data?.topicId,
        data?.appealtypes
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteSubtopic = createAsyncThunk(
  "/deleteSubtopic",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteSubtopic(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setSubtopicsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addSubtopic = createAsyncThunk(
  "/addSubtopic",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addSubtopic(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setSubtopicsRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editSubtopic = createAsyncThunk(
  "/editSubtopic",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editSubtopic(data);
      dispatch(setLoading(false));
      dispatch(setSubtopicsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const subtopicVisibility = createAsyncThunk(
  "/subtopicVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.subtopicVisibility(data);
      dispatch(setLoading(false));
      dispatch(setSubtopicsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getExecutionRules = createAsyncThunk(
  "/getExecutionRules",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getExecutionRules(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getExecutionRulesAll = createAsyncThunk(
  "/getExecutionRulesAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getExecutionRulesAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteExecutionRule = createAsyncThunk(
  "/deleteExecutionRule",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteExecutionRule(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setExecutionRulesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addExecutionRule = createAsyncThunk(
  "/addExecutionRule",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addExecutionRule(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setExecutionRulesRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editExecutionRule = createAsyncThunk(
  "/editExecutionRule",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editExecutionRule(data);
      dispatch(setLoading(false));
      dispatch(setExecutionRulesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const executionRuleVisibility = createAsyncThunk(
  "/executionRuleVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.executionRuleVisibility(data);
      dispatch(setLoading(false));
      dispatch(setExecutionRulesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDocumentRecieveMethods = createAsyncThunk(
  "/getDocumentRecieveMethods",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDocumentRecieveMethods(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDocumentRecieveMethodsAll = createAsyncThunk(
  "/getDocumentRecieveMethodsAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDocumentRecieveMethodsAll(
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteDocumentRecieveMethod = createAsyncThunk(
  "/deleteDocumentRecieveMethod",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteDocumentRecieveMethod(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setDocumentRecieveMethodsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addDocumentRecieveMethod = createAsyncThunk(
  "/addDocumentRecieveMethod",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addDocumentRecieveMethod(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setDocumentRecieveMethodsRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editDocumentRecieveMethod = createAsyncThunk(
  "/editDocumentRecieveMethod",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editDocumentRecieveMethod(data);
      dispatch(setLoading(false));
      dispatch(setDocumentRecieveMethodsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const documentRecieveMethodVisibility = createAsyncThunk(
  "/documentRecieveMethodVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.documentRecieveMethodVisibility(data);
      dispatch(setLoading(false));
      dispatch(setDocumentRecieveMethodsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getDocumentTypes = createAsyncThunk(
  "/getDocumentTypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDocumentTypes(
        data.size,
        data?.page,
        data?.query,
        data?.visibility,
        data?.category
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDocumentTypesAllOne = createAsyncThunk(
  "/getDocumentTypesAllOne",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDocumentTypesAllOne(
        data?.visibility,
        data?.category
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDocumentTypesAllTwo = createAsyncThunk(
  "/getDocumentTypesAllTwo",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDocumentTypesAllTwo(
        data?.visibility,
        data?.category
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteDocumentTypes = createAsyncThunk(
  "/deleteDocumentTypes",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteDocumentTypes(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setDocumentTypesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addDocumentTypes = createAsyncThunk(
  "/addDocumentTypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addDocumentTypes(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setDocumentTypesRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editDocumentTypes = createAsyncThunk(
  "/editDocumentTypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editDocumentTypes(data);
      dispatch(setLoading(false));
      dispatch(setDocumentTypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const documentTypesVisibility = createAsyncThunk(
  "/documentTypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.documentTypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setDocumentTypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getCountries = createAsyncThunk(
  "/getCountries",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getCountries(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage();
      dispatch(setLoading(false));
    }
  }
);
export const getCountriesAll = createAsyncThunk(
  "/getCountriesAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getCountriesAll(data);
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage();
      dispatch(setLoading(false));
    }
  }
);

export const addCountry = createAsyncThunk(
  "/addCountry",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addCountry(data);
      dispatch(setLoading(false));
      dispatch(setCountryRender((prev) => !prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const editCountry = createAsyncThunk(
  "/editCountry",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editCountry(data);
      dispatch(setLoading(false));
      dispatch(setCountryRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const countryVisibility = createAsyncThunk(
  "/countryVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.countryVisibility(data);
      dispatch(setLoading(false));
      dispatch(setCountryRender((prev) => !prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const deleteCountry = createAsyncThunk(
  "/deleteCountry",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteCountry(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setCountryRender((prev) => !prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
      dispatch(setDeleteModalVisible(false));
    }
  }
);

// export const getStreets = createAsyncThunk(
//   "/getStreets",
//   async (data, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       const response = await Services.getStreets(
//         data?.size,
//         data?.page,
//         data?.query,
//         data?.visibility
//       );
//       dispatch(setLoading(false));
//       return response?.data;
//     } catch (error) {
//       errorMessage();
//       dispatch(setLoading(false));
//     }
//   }
// );

// export const addStreet = createAsyncThunk(
//   "/addStreet",
//   async (data, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       await Services.addStreet(data);
//       dispatch(setLoading(false));
//       dispatch(setViewModalVisible(true));
//       dispatch(setStreetRender((prev) => !prev));
//     } catch (error) {
//       dispatch(setLoading(false));
//       errorMessage();
//     }
//   }
// );

// export const editStreet = createAsyncThunk(
//   "/editStreet",
//   async (data, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       await Services.edit(data);
//       dispatch(setLoading(false));
//       dispatch(setStreetRender((prev) => !prev));
//     } catch (error) {
//       dispatch(setLoading(false));
//       errorMessage();
//     }
//   }
// );

// export const streetVisibility = createAsyncThunk(
//   "/streetVisibility",
//   async (data, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       await Services.streetVisibility(data);
//       dispatch(setLoading(false));
//       dispatch(setStreetRender((prev) => !prev));
//     } catch (error) {
//       dispatch(setLoading(false));
//       errorMessage();
//     }
//   }
// );

// export const deleteStreet = createAsyncThunk(
//   "/deleteStreet",
//   async (id, { dispatch }) => {
//     try {
//       dispatch(setLoading(true));
//       await Services.delete(id);
//       dispatch(setLoading(false));
//       dispatch(setDeleteModalVisible(false));
//       dispatch(setStreetRender((prev) => !prev));
//     } catch (error) {
//       dispatch(setLoading(false));
//       dispatch(setDeleteModalVisible(false));
//       errorMessage();
//     }
//   }
// );

export const getOrganizations = createAsyncThunk(
  "/getOrganizations",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getOrganizations(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage();
      dispatch(setLoading(false));
    }
  }
);

export const organizationVisibility = createAsyncThunk(
  "/organizationVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.organizationVisibility(data);
      dispatch(setLoading(false));
      dispatch(setOrganizationRender((prev) => prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const addOrganization = createAsyncThunk(
  "/addOrganization",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addOrganization(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setOrganizationRender((prev) => !prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const editOrganization = createAsyncThunk(
  "/editOrganization",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.editOrganization(data);
      dispatch(setLoading(false));
      dispatch(setOrganizationRender((prev) => prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const deleteOrganization = createAsyncThunk(
  "/deleteOrganization",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteOrganization(id);
      dispatch(setLoading(false));
      dispatch(setOrganizationRender((prev) => !prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const getStructures = createAsyncThunk(
  "/getStructures",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getStructures(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage();
    }
  }
);

export const addStructure = createAsyncThunk(
  "/addStructure",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addStructure(data);
      dispatch(setLoading(false));
      dispatch(setStructureRender((prev) => !prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const editStructure = createAsyncThunk(
  "/editStructure",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editStructure(data);
      dispatch(setLoading(false));
      dispatch(setStructureRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const deleteStructure = createAsyncThunk(
  "/deleteStructure",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteStructure(id);
      dispatch(setLoading(false));
      dispatch(setStructureRender((prev) => !prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const structureVisibility = createAsyncThunk(
  "/structureVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.structureVisibility(data);
      dispatch(setLoading(false));
      dispatch(setStructureRender((prev) => !prev));
    } catch (error) {
      dispatch(setLoading(false));
      errorMessage();
    }
  }
);

export const getApplicationForms = createAsyncThunk(
  "/getApplicationForms",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getApplicationForms(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getApplicationFormsAll = createAsyncThunk(
  "/getApplicationFormsAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getApplicationFormsAll(
        data?.visibility,
        data?.appealtypes
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteApplicationForm = createAsyncThunk(
  "/deleteApplicationForm",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteApplicationForm(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setApplicationFormsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addApplicationForm = createAsyncThunk(
  "/addApplicationForm",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addApplicationForm(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setApplicationFormsRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editApplicationForm = createAsyncThunk(
  "/editApplicationForm",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editApplicationForm(data);
      dispatch(setLoading(false));
      dispatch(setApplicationFormsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const applicationFormVisibility = createAsyncThunk(
  "/applicationFormVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.applicationFormVisibility(data);
      dispatch(setLoading(false));
      dispatch(setApplicationFormsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
/* */
export const getDocumentWhom = createAsyncThunk(
  "/getDocumentWhom",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDocumentWhom(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility,
        data?.types
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDocumentWhomAll = createAsyncThunk(
  "/getDocumentWhomAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDocumentWhomAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteDocumentWhom = createAsyncThunk(
  "/deleteDocumentWhom",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteDocumentWhom(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setDocumentWhomRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addDocumentWhom = createAsyncThunk(
  "/addDocumentWhom",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addDocumentWhom(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setDocumentWhomRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editDocumentWhom = createAsyncThunk(
  "/editDocumentWhom",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editDocumentWhom(data);
      dispatch(setLoading(false));
      dispatch(setDocumentWhomRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const documentWhomVisibility = createAsyncThunk(
  "/documentWhomVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.documentWhomVisibility(data);
      dispatch(setLoading(false));
      dispatch(setDocumentWhomRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

/* */
export const getMarginNoteText = createAsyncThunk(
  "/getMarginNoteText",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMarginNoteText(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteMarginNoteText = createAsyncThunk(
  "/deleteMarginNoteText",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteMarginNoteText(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setMarginNoteTextRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addMarginNoteText = createAsyncThunk(
  "/addMarginNoteText",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addMarginNoteText(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setMarginNoteTextRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editMarginNoteText = createAsyncThunk(
  "/editMarginNoteText",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editMarginNoteText(data);
      dispatch(setLoading(false));
      dispatch(setMarginNoteTextRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const marginNoteTextVisibility = createAsyncThunk(
  "/marginNoteTextVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.marginNoteTextVisibility(data);
      dispatch(setLoading(false));
      dispatch(setMarginNoteTextRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
/* */
export const getDeliveryMethod = createAsyncThunk(
  "/getDeliveryMethod",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDeliveryMethod(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDeliveryMethodAll = createAsyncThunk(
  "/getDeliveryMethodAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDeliveryMethodAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteDeliveryMethod = createAsyncThunk(
  "/deleteDeliveryMethod",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteDeliveryMethod(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setDeliveryMethodRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addDeliveryMethod = createAsyncThunk(
  "/addDeliveryMethod",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addDeliveryMethod(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setDeliveryMethodRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editDeliveryMethod = createAsyncThunk(
  "/editDeliveryMethod",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editDeliveryMethod(data);
      dispatch(setLoading(false));
      dispatch(setDeliveryMethodRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deliveryMethodVisibility = createAsyncThunk(
  "/deliveryMethodVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.deliveryMethodVisibility(data);
      dispatch(setLoading(false));
      dispatch(setDeliveryMethodRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getGeneralStructuresAll = createAsyncThunk(
  "/getGeneralStructuresAll",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getGeneralStructuresAll();
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getBrands = createAsyncThunk(
  "/getBrands",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getBrands(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getBrandsAll = createAsyncThunk(
  "/getBrandsAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getBrandsAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteBrand = createAsyncThunk(
  "/deleteBrand",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteBrand(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setBrandRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const addBrand = createAsyncThunk(
  "/addBrand",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addBrand(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setBrandRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editBrand = createAsyncThunk(
  "/editBrand",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editBrand(data);
      dispatch(setLoading(false));
      dispatch(setBrandRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const brandVisibility = createAsyncThunk(
  "/brandVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.brandVisibility(data);
      dispatch(setLoading(false));
      dispatch(setBrandRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getChassisTypes = createAsyncThunk(
  "/getChassisTypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getChassiTypes(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error?.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getChassisTypesAll = createAsyncThunk(
  "/getChassisTypesAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getChassiTypesAll(data.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error?.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteChassisType = createAsyncThunk(
  "/deleteChassisType",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteChassisType(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setChassisTypeRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error?.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const addChassisType = createAsyncThunk(
  "/addChassisType",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addChassisType(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setChassisTypeRender((prev) => !prev));
    } catch (error) {
      errorMessage(error?.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const editChassisType = createAsyncThunk(
  "/editChassisType",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editChassisType(data);
      dispatch(setLoading(false));
      dispatch(setChassisTypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error?.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const chassisTypeVisibility = createAsyncThunk(
  "/chassisTypeVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.chassisTypeVisibility(data);
      dispatch(setLoading(false));
      dispatch(setChassisTypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error?.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getColor = createAsyncThunk(
  "/getColor",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getColor(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getColorAll = createAsyncThunk(
  "/getColorAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getColorAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteColor = createAsyncThunk(
  "/deleteColor",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteColor(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setColorRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addColor = createAsyncThunk(
  "/addColor",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addColor(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setColorRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editColor = createAsyncThunk(
  "/editColor",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editColor(data);
      dispatch(setLoading(false));
      dispatch(setColorRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const colorVisibility = createAsyncThunk(
  "/colorVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.colorVisibility(data);
      dispatch(setLoading(false));
      dispatch(setColorRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getEnginetype = createAsyncThunk(
  "/getEnginetype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getEnginetype(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getEnginetypeAll = createAsyncThunk(
  "/getEnginetypeAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getEnginetypeAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteEnginetype = createAsyncThunk(
  "/deleteEnginetype",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteEnginetype(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setEnginetypeRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addEnginetype = createAsyncThunk(
  "/addEnginetype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addEnginetype(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setEnginetypeRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editEnginetype = createAsyncThunk(
  "/editEnginetype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editEnginetype(data);
      dispatch(setLoading(false));
      dispatch(setEnginetypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const enginetypesVisibility = createAsyncThunk(
  "/enginetypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.enginetypeVisibility(data);
      dispatch(setLoading(false));
      dispatch(setEnginetypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getGearboxtype = createAsyncThunk(
  "/getGearboxtype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getGearboxtype(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getGearboxtypeAll = createAsyncThunk(
  "/getGearboxtypeAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getGearboxtypeAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteGearboxtype = createAsyncThunk(
  "/deleteGearboxtype",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteGearboxtype(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setGearboxtypeRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addGearboxtype = createAsyncThunk(
  "/addGearboxtype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addGearboxtype(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setGearboxtypeRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editGearboxtype = createAsyncThunk(
  "/editGearboxtype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editGearboxtype(data);
      dispatch(setLoading(false));
      dispatch(setGearboxtypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const gearboxtypesVisibility = createAsyncThunk(
  "/gearboxtypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.gearboxtypeVisibility(data);
      dispatch(setLoading(false));
      dispatch(setGearboxtypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getIssuedauthoritie = createAsyncThunk(
  "/getIssuedauthoritie",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getIssuedauthorities(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getIssuedauthoritieAll = createAsyncThunk(
  "/getIssuedauthoritieAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getIssuedauthoritiesAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteIssuedauthoritie = createAsyncThunk(
  "/deleteIssuedauthoritie",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteIssuedauthorities(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setIssuedauthoritieRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addIssuedauthoritie = createAsyncThunk(
  "/addIssuedauthoritie",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addIssuedauthorities(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setIssuedauthoritieRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editIssuedauthoritie = createAsyncThunk(
  "/editIssuedauthoritie",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editIssuedauthorities(data);
      dispatch(setLoading(false));
      dispatch(setIssuedauthoritieRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const issuedauthoritiesVisibility = createAsyncThunk(
  "/issuedauthoritiesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.issuedauthoritiesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setIssuedauthoritieRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getModel = createAsyncThunk(
  "/getModel",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getModel(
        data.size,
        data?.page,
        data?.query,
        data?.brands,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getModelAll = createAsyncThunk(
  "/getModelAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getModelAll(
        data?.visibility,
        data?.brands
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteModel = createAsyncThunk(
  "/deleteModel",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteModel(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setModelRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addModel = createAsyncThunk(
  "/addModel",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addModel(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setModelRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editModel = createAsyncThunk(
  "/editModel",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editModel(data);
      dispatch(setLoading(false));
      dispatch(setModelRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const modelsVisibility = createAsyncThunk(
  "/modelsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.modelsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setModelRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getOwnershiptype = createAsyncThunk(
  "/getOwnershiptype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getOwnershiptype(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getOwnershiptypeAll = createAsyncThunk(
  "/getOwnershiptypeAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getOwnershiptypeAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteOwnershiptype = createAsyncThunk(
  "/deleteOwnershiptype",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteOwnershiptype(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setOwnershiptypeRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addOwnershiptype = createAsyncThunk(
  "/addOwnershiptype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addOwnershiptype(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setOwnershiptypeRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editOwnershiptype = createAsyncThunk(
  "/editOwnershiptype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editOwnershiptype(data);
      dispatch(setLoading(false));
      dispatch(setOwnershiptypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const ownershiptypesVisibility = createAsyncThunk(
  "/ownershiptypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.ownershiptypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setOwnershiptypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getOrganisationrecord = createAsyncThunk(
  "/getOrganisationrecord",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getOrganisationrecord(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getOrganisationrecordAll = createAsyncThunk(
  "/getOrganisationrecordAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getOrganisationrecordAll(
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteOrganisationrecord = createAsyncThunk(
  "/deleteOrganisationrecord",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteOrganisationrecord(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setOrganisationrecordRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addOrganisationrecord = createAsyncThunk(
  "/addOrganisationrecord",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addOrganisationrecord(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setOrganisationrecordRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editOrganisationrecord = createAsyncThunk(
  "/editOrganisationrecord",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editOrganisationrecord(data);
      dispatch(setLoading(false));
      dispatch(setOrganisationrecordRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const organisationrecordsVisibility = createAsyncThunk(
  "/organisationrecordsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.organisationrecordsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setOrganisationrecordRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getTransmittertype = createAsyncThunk(
  "/getTransmittertype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getTransmittertypes(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getTransmittertypeAll = createAsyncThunk(
  "/getTransmittertypeAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getTransmittertypesAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteTransmittertype = createAsyncThunk(
  "/deleteTransmittertype",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteTransmittertypes(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setTransmittertypeRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addTransmittertype = createAsyncThunk(
  "/addTransmittertype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addTransmittertypes(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setTransmittertypeRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editTransmittertype = createAsyncThunk(
  "/editTransmittertype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editTransmittertypes(data);
      dispatch(setLoading(false));
      dispatch(setTransmittertypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const transmittertypesVisibility = createAsyncThunk(
  "/transmittertypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.transmittertypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setTransmittertypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getVehicle = createAsyncThunk(
  "/getVehicle",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getVehicle(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getVehicleAll = createAsyncThunk(
  "/getVehicleAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getVehicleAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteVehicle = createAsyncThunk(
  "/deleteVehicle",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteVehicle(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setVehicleRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addVehicle = createAsyncThunk(
  "/addVehicle",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addVehicle(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setVehicleRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editVehicle = createAsyncThunk(
  "/editVehicle",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editVehicle(data);
      dispatch(setLoading(false));
      dispatch(setVehicleRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const vehiclesVisibility = createAsyncThunk(
  "/vehiclesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.vehiclesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setVehicleRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getVehicletype = createAsyncThunk(
  "/getVehicletype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getVehicletypes(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getVehicletypeAll = createAsyncThunk(
  "/getVehicletypeAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getVehicletypesAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteVehicletype = createAsyncThunk(
  "/deleteVehicletype",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteVehicletypes(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setVehicletypeRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addVehicletype = createAsyncThunk(
  "/addVehicletype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addVehicletypes(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setVehicletypeRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editVehicletype = createAsyncThunk(
  "/editVehicletype",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editVehicletypes(data);
      dispatch(setLoading(false));
      dispatch(setVehicletypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const vehicletypesVisibility = createAsyncThunk(
  "/vehicletypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.vehicletypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setVehicletypeRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getVrc = createAsyncThunk(
  "/getVrc",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getVrc(
        data.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getVrcAll = createAsyncThunk(
  "/getVrcAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getVrcAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteVrc = createAsyncThunk(
  "/deleteVrc",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteVrc(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setVrcRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addVrc = createAsyncThunk(
  "/addVrc",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addVrc(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setVrcRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editVrc = createAsyncThunk(
  "/editVrc",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editVrc(data);
      dispatch(setLoading(false));
      dispatch(setVrcRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const vrcsVisibility = createAsyncThunk(
  "/vrcsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.vrcsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setVrcRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getAcademicdegrees = createAsyncThunk(
  "/getAcademicdegrees",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getAcademicdegrees(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getAcademicdegreesAll = createAsyncThunk(
  "/getAcademicdegreesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getAcademicdegreesAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addAcademicdegrees = createAsyncThunk(
  "/addAcademicdegrees",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addAcademicdegrees(data);
      dispatch(setLoading(false));
      dispatch(setAcademicdegreesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editAcademicdegrees = createAsyncThunk(
  "/editAcademicdegrees",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editAcademicdegrees(data);
      dispatch(setLoading(false));
      dispatch(setAcademicdegreesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteAcademicdegrees = createAsyncThunk(
  "/deleteAcademicdegrees",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteAcademicdegrees(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setAcademicdegreesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const academicdegreesVisibility = createAsyncThunk(
  "/academicdegreesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.academicdegreesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setAcademicdegreesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getDisabilitystatuses = createAsyncThunk(
  "/getDisabilitystatuses",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDisabilitystatuses(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDisabilitystatusesAll = createAsyncThunk(
  "/getDisabilitystatusesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDisabilitystatusesAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addDisabilitystatuses = createAsyncThunk(
  "/addDisabilitystatuses",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addDisabilitystatuses(data);
      dispatch(setLoading(false));
      dispatch(setDisabilitystatusesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editDisabilitystatuses = createAsyncThunk(
  "/editDisabilitystatuses",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editDisabilitystatuses(data);
      dispatch(setLoading(false));
      dispatch(setDisabilitystatusesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteDisabilitystatuses = createAsyncThunk(
  "/deleteDisabilitystatuses",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteDisabilitystatuses(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setDisabilitystatusesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const disabilitystatusesVisibility = createAsyncThunk(
  "/disabilitystatusesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.disabilitystatusesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setDisabilitystatusesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getHonorarytitles = createAsyncThunk(
  "/getHonorarytitles",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getHonorarytitles(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getHonorarytitlesAll = createAsyncThunk(
  "/getHonorarytitlesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getHonorarytitlesAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addHonorarytitles = createAsyncThunk(
  "/addHonorarytitles",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addHonorarytitles(data);
      dispatch(setLoading(false));
      dispatch(setHonorarytitlesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editHonorarytitles = createAsyncThunk(
  "/editHonorarytitles",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editHonorarytitles(data);
      dispatch(setLoading(false));
      dispatch(setHonorarytitlesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteHonorarytitles = createAsyncThunk(
  "/deleteHonorarytitles",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteHonorarytitles(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setHonorarytitlesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const honorarytitlesVisibility = createAsyncThunk(
  "/honorarytitlesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.honorarytitlesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setHonorarytitlesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getMilitarystaffs = createAsyncThunk(
  "/getMilitarystaffs",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMilitarystaffs(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getMilitarystaffsAll = createAsyncThunk(
  "/getMilitarystaffsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMilitarystaffsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addMilitarystaffs = createAsyncThunk(
  "/addMilitarystaffs",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addMilitarystaffs(data);
      dispatch(setLoading(false));
      dispatch(setMilitarystaffsRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editMilitarystaffs = createAsyncThunk(
  "/editMilitarystaffs",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editMilitarystaffs(data);
      dispatch(setLoading(false));
      dispatch(setMilitarystaffsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteMilitarystaffs = createAsyncThunk(
  "/deleteMilitarystaffs",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteMilitarystaffs(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setMilitarystaffsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const militaryStaffsVisibility = createAsyncThunk(
  "/militaryStaffsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.militaryStaffsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setMilitarystaffsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getMilitarycategories = createAsyncThunk(
  "/getMilitarycategories",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMilitarycategories(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getMilitarycategoriesAll = createAsyncThunk(
  "/getMilitarycategoriesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMilitarycategoriesAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addMilitarycategories = createAsyncThunk(
  "/addMilitarycategories",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addMilitarycategories(data);
      dispatch(setLoading(false));
      dispatch(setMilitarycategoriesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editMilitarycategories = createAsyncThunk(
  "/editMilitarycategories",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editMilitarycategories(data);
      dispatch(setLoading(false));
      dispatch(setMilitarycategoriesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteMilitarycategories = createAsyncThunk(
  "/deleteMilitarycategories",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteMilitarycategories(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setMilitarycategoriesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const militaryCategoriesVisibility = createAsyncThunk(
  "/militaryCategoriesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.militaryCategoriesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setMilitarycategoriesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getMilitaryranks = createAsyncThunk(
  "/getMilitaryranks",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMilitaryranks(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getMilitaryranksAll = createAsyncThunk(
  "/getMilitaryranksAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMilitaryranksAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addMilitaryranks = createAsyncThunk(
  "/addMilitaryranks",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addMilitaryranks(data);
      dispatch(setLoading(false));
      dispatch(setMilitaryranksRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editMilitaryranks = createAsyncThunk(
  "/editMilitaryranks",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editMilitaryranks(data);
      dispatch(setLoading(false));
      dispatch(setMilitaryranksRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteMilitaryranks = createAsyncThunk(
  "/deleteMilitaryranks",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteMilitaryranks(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setMilitaryranksRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const militaryranksVisibility = createAsyncThunk(
  "/militaryranksVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.militaryranksVisibility(data);
      dispatch(setLoading(false));
      dispatch(setMilitaryranksRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getMilitarygroups = createAsyncThunk(
  "/getMilitarygroups",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMilitarygroups(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getMilitarygroupsAll = createAsyncThunk(
  "/getMilitarygroupsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMilitarygroupsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addMilitarygroups = createAsyncThunk(
  "/addMilitarygroups",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addMilitarygroups(data);
      dispatch(setLoading(false));
      dispatch(setMilitarygroupsRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editMilitarygroups = createAsyncThunk(
  "/editMilitarygroups",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editMilitarygroups(data);
      dispatch(setLoading(false));
      dispatch(setMilitarygroupsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteMilitarygroups = createAsyncThunk(
  "/deleteMilitarygroups",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteMilitarygroups(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setMilitarygroupsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const militarygroupsVisibility = createAsyncThunk(
  "/militarygroupsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.militarygroupsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setMilitarygroupsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getGeneralstructurestatuses = createAsyncThunk(
  "/getGeneralstructurestatuses",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getGeneralstructurestatuses(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getGeneralstructurestatusesAll = createAsyncThunk(
  "/getGeneralstructurestatusesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getGeneralstructurestatusesAll(
        visibility
      );
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addGeneralstructurestatuses = createAsyncThunk(
  "/addGeneralstructurestatuses",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addGeneralstructurestatuses(data);
      dispatch(setLoading(false));
      dispatch(setGeneralstructurestatusesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editGeneralstructurestatuses = createAsyncThunk(
  "/editGeneralstructurestatuses",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editGeneralstructurestatuses(data);
      dispatch(setLoading(false));
      dispatch(setGeneralstructurestatusesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteGeneralstructurestatuses = createAsyncThunk(
  "/deleteGeneralstructurestatuses",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteGeneralstructurestatuses(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setGeneralstructurestatusesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const generalstructurestatusesVisibility = createAsyncThunk(
  "/generalstructurestatusesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.generalstructurestatusesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setGeneralstructurestatusesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getWorkschedules = createAsyncThunk(
  "/getWorkschedules",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getWorkschedules(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getWorkschedulesAll = createAsyncThunk(
  "/getWorkschedulesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getWorkschedulesAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addWorkschedules = createAsyncThunk(
  "/addWorkschedules",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addWorkschedules(data);
      dispatch(setLoading(false));
      dispatch(setWorkschedulesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editWorkschedules = createAsyncThunk(
  "/editWorkschedules",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editWorkschedules(data);
      dispatch(setLoading(false));
      dispatch(setWorkschedulesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteWorkschedules = createAsyncThunk(
  "/deleteWorkschedules",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteWorkschedules(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setWorkschedulesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const workschedulesVisibility = createAsyncThunk(
  "/workschedulesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.workschedulesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setWorkschedulesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getSpecializations = createAsyncThunk(
  "/getSpecializations",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getSpecializations(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getSpecializationsAll = createAsyncThunk(
  "/getSpecializationsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getSpecializationsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addSpecializations = createAsyncThunk(
  "/addSpecializations",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addSpecializations(data);
      dispatch(setLoading(false));
      dispatch(setSpecializationsRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editSpecializations = createAsyncThunk(
  "/editSpecializations",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editSpecializations(data);
      dispatch(setLoading(false));
      dispatch(setSpecializationsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteSpecializations = createAsyncThunk(
  "/deleteSpecializations",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteSpecializations(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setSpecializationsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const specializationsVisibility = createAsyncThunk(
  "/specializationsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.specializationsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setSpecializationsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getWarparticipants = createAsyncThunk(
  "/getWarparticipants",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getWarparticipants(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getWarparticipantsAll = createAsyncThunk(
  "/getWarparticipantsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getWarparticipantsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addWarparticipants = createAsyncThunk(
  "/addWarparticipants",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addWarparticipants(data);
      dispatch(setLoading(false));
      dispatch(setWarparticipantsRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editWarparticipants = createAsyncThunk(
  "/editWarparticipants",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editWarparticipants(data);
      dispatch(setLoading(false));
      dispatch(setWarparticipantsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteWarparticipants = createAsyncThunk(
  "/deleteWarparticipants",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteWarparticipants(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setWarparticipantsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const warparticipantsVisibility = createAsyncThunk(
  "/warparticipantsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.warparticipantsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setWarparticipantsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getGeneralstructuretypes = createAsyncThunk(
  "/getGeneralstructuretypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getGeneralstructuretypes(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getGeneralstructuretypesAll = createAsyncThunk(
  "/getGeneralstructuretypesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getGeneralstructuretypesAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addGeneralstructuretypes = createAsyncThunk(
  "/addGeneralstructuretypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addGeneralstructuretypes(data);
      dispatch(setLoading(false));
      dispatch(setGeneralstructuretypesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editGeneralstructuretypes = createAsyncThunk(
  "/editGeneralstructuretypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editGeneralstructuretypes(data);
      dispatch(setLoading(false));
      dispatch(setGeneralstructuretypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteGeneralstructuretypes = createAsyncThunk(
  "/deleteGeneralstructuretypes",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteGeneralstructuretypes(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setGeneralstructuretypesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const generalstructuretypesVisibility = createAsyncThunk(
  "/generalstructuretypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.generalstructuretypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setGeneralstructuretypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getEducationinstitutions = createAsyncThunk(
  "/getEducationinstitutions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getEducationinstitutions(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getEducationinstitutionsAll = createAsyncThunk(
  "/getEducationinstitutionsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getEducationinstitutionsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addEducationinstitutions = createAsyncThunk(
  "/addEducationinstitutions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addEducationinstitutions(data);
      dispatch(setLoading(false));
      dispatch(setEducationinstitutionsRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editEducationinstitutions = createAsyncThunk(
  "/editEducationinstitutions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editEducationinstitutions(data);
      dispatch(setLoading(false));
      dispatch(setEducationinstitutionsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteEducationinstitutions = createAsyncThunk(
  "/deleteEducationinstitutions",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteEducationinstitutions(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setEducationinstitutionsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const educationinstitutionsVisibility = createAsyncThunk(
  "/educationinstitutionsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.educationinstitutionsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setEducationinstitutionsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getEducationpayments = createAsyncThunk(
  "/getEducationpayments",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getEducationpayments(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getEducationpaymentsAll = createAsyncThunk(
  "/getEducationpaymentsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getEducationpaymentsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addEducationpayments = createAsyncThunk(
  "/addEducationpayments",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addEducationpayments(data);
      dispatch(setLoading(false));
      dispatch(setEducationpaymentsRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editEducationpayments = createAsyncThunk(
  "/editEducationpayments",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editEducationpayments(data);
      dispatch(setLoading(false));
      dispatch(setEducationpaymentsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteEducationpayments = createAsyncThunk(
  "/deleteEducationpayments",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteEducationpayments(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setEducationpaymentsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const educationPaymentsVisibility = createAsyncThunk(
  "/educationPaymentsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.educationPaymentsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setEducationpaymentsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getEducationlevels = createAsyncThunk(
  "/getEducationlevels",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getEducationlevels(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getEducationlevelsAll = createAsyncThunk(
  "/getEducationlevelsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getEducationlevelsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addEducationlevels = createAsyncThunk(
  "/addEducationlevels",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addEducationlevels(data);
      dispatch(setLoading(false));
      dispatch(setEducationlevelsRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editEducationlevels = createAsyncThunk(
  "/editEducationlevels",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editEducationlevels(data);
      dispatch(setLoading(false));
      dispatch(setEducationlevelsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteEducationlevels = createAsyncThunk(
  "/deleteEducationlevels",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteEducationlevels(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setEducationlevelsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const educationlevelsVisibility = createAsyncThunk(
  "/educationlevelsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.educationlevelsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setEducationlevelsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getReprimandtypes = createAsyncThunk(
  "/getReprimandtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getReprimandtypes(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getReprimandtypesAll = createAsyncThunk(
  "/getReprimandtypesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getReprimandtypesAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addReprimandtypes = createAsyncThunk(
  "/addReprimandtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addReprimandtypes(data);
      dispatch(setLoading(false));
      dispatch(setReprimandtypesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editReprimandtypes = createAsyncThunk(
  "/editReprimandtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editReprimandtypes(data);
      dispatch(setLoading(false));
      dispatch(setReprimandtypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteReprimandtypes = createAsyncThunk(
  "/deleteReprimandtypes",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteReprimandtypes(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setReprimandtypesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const reprimandTypesVisibility = createAsyncThunk(
  "/reprimandTypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.reprimandTypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setReprimandtypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getSpecialdays = createAsyncThunk(
  "/getSpecialdays",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getSpecialdays(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getSpecialdaysAll = createAsyncThunk(
  "/getSpecialdaysAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getSpecialdaysAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const addSpecialdays = createAsyncThunk(
  "/addSpecialdays",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addSpecialdays(data);
      dispatch(setLoading(false));
      dispatch(setSpecialdaysRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const editSpecialdays = createAsyncThunk(
  "/editSpecialdays",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editSpecialdays(data);
      dispatch(setLoading(false));
      dispatch(setSpecialdaysRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const deleteSpecialdays = createAsyncThunk(
  "/deleteSpecialdays",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteSpecialdays(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setSpecialdaysRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const specialdaysVisibility = createAsyncThunk(
  "/specialdaysVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.specialdaysVisibility(data);
      dispatch(setLoading(false));
      dispatch(setSpecialdaysRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getCategories = createAsyncThunk(
  "/getCategories",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getCategories(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getCategoriesAll = createAsyncThunk(
  "/getCategoriesAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getCategoriesAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteCategories = createAsyncThunk(
  "/deleteCategories",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteCategories(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setCategoriesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addCategories = createAsyncThunk(
  "/addCategories",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addCategories(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setCategoriesRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editCategories = createAsyncThunk(
  "/editCategories",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editCategories(data);
      dispatch(setLoading(false));
      dispatch(setCategoriesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const categoriesVisibility = createAsyncThunk(
  "/categoriesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.categoriesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setCategoriesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getRegions = createAsyncThunk(
  "/getRegions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getRegions(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getRegionsAll = createAsyncThunk(
  "/getRegionsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getRegionsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getRegionsChildren = createAsyncThunk(
  "/getRegionsChildren",
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getRegionsChildren();
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage();
      dispatch(setLoading(false));
    }
  }
);
export const deleteRegions = createAsyncThunk(
  "/deleteRegions",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteRegions(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setRegionsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addRegions = createAsyncThunk(
  "/addRegions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addRegions(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setRegionsRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editRegions = createAsyncThunk(
  "/editRegions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editRegions(data);
      dispatch(setLoading(false));
      dispatch(setRegionsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const regionsVisibility = createAsyncThunk(
  "/regionsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.regionsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setRegionsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getAreas = createAsyncThunk(
  "/getAreas",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getAreas(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getAreasAll = createAsyncThunk(
  "/getAreasAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getAreasAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteAreas = createAsyncThunk(
  "/deleteAreas",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteAreas(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setAreasRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addAreas = createAsyncThunk(
  "/addAreas",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addAreas(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setAreasRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editAreas = createAsyncThunk(
  "/editAreas",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editAreas(data);
      dispatch(setLoading(false));
      dispatch(setAreasRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const areasVisibility = createAsyncThunk(
  "/areasVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.areasVisibility(data);
      dispatch(setLoading(false));
      dispatch(setAreasRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getCompanies = createAsyncThunk(
  "/getCompanies",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getCompanies(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getCompaniesAll = createAsyncThunk(
  "/getCompaniesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getCompaniesAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteCompanies = createAsyncThunk(
  "/deleteCompanies",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteCompanies(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setCompaniesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addCompanies = createAsyncThunk(
  "/addCompanies",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addCompanies(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setCompaniesRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editCompanies = createAsyncThunk(
  "/editCompanies",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editCompanies(data);
      dispatch(setLoading(false));
      dispatch(setCompaniesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const companiesVisibility = createAsyncThunk(
  "/companiesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.companiesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setCompaniesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getPositions = createAsyncThunk(
  "/getPositions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getPositions(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getPositionsAll = createAsyncThunk(
  "/getPositionsAll",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getPositionsAll(data?.visibility);
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deletePositions = createAsyncThunk(
  "/deletePositions",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deletePositions(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setPositionsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addPositions = createAsyncThunk(
  "/addPositions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addPositions(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setPositionsRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editPositions = createAsyncThunk(
  "/editPositions",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editPositions(data);
      dispatch(setLoading(false));
      dispatch(setPositionsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const positionsVisibility = createAsyncThunk(
  "/positionsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.positionsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setPositionsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getHalls = createAsyncThunk(
  "/getHalls",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getHalls(
        data?.size,
        data?.page,
        data?.query,
        data?.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const getHallsAll = createAsyncThunk(
  "/getHallsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getHallsAll(visibility);
      dispatch(setLoading(false));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteHalls = createAsyncThunk(
  "/deleteHalls",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteHalls(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setHallsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const addHalls = createAsyncThunk(
  "/addHalls",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addHalls(data);
      dispatch(setLoading(false));
      dispatch(setViewModalVisible(true));
      dispatch(setHallsRender((prev) => !prev));
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const editHalls = createAsyncThunk(
  "/editHalls",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editHalls(data);
      dispatch(setLoading(false));
      dispatch(setHallsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);

export const hallsVisibility = createAsyncThunk(
  "/hallsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.hallsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setHallsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response.data.message);
      dispatch(setLoading(false));
    }
  }
);
export const getDrivingcategories = createAsyncThunk("/getDrivingcategories", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getDrivingcategories(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getDrivingcategoriesAll = createAsyncThunk("/getDrivingcategoriesAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getDrivingcategoriesAll(visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addDrivingcategories = createAsyncThunk("/addDrivingcategories", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addDrivingcategories(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setDrivingcategoriesRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editDrivingcategories = createAsyncThunk("/editDrivingcategories", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editDrivingcategories(data);
    dispatch(setLoading(false));
    dispatch(setDrivingcategoriesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteDrivingcategories = createAsyncThunk("/deleteDrivingcategories", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteDrivingcategories(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setDrivingcategoriesRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const drivingcategoriesVisibility = createAsyncThunk("/drivingcategoriesVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.drivingcategoriesVisibility(data);
    dispatch(setLoading(false));
    dispatch(setDrivingcategoriesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getContractcurrencies = createAsyncThunk("/getContractcurrencies", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getContractcurrencies(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getContractcurrenciesAll = createAsyncThunk("/getContractcurrenciesAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getContractcurrenciesAll(visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addContractcurrencies = createAsyncThunk("/addContractcurrencies", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addContractcurrencies(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setContractcurrenciesRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editContractcurrencies = createAsyncThunk("/editContractcurrencies", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editContractcurrencies(data);
    dispatch(setLoading(false));
    dispatch(setContractcurrenciesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteContractcurrencies = createAsyncThunk("/deleteContractcurrencies", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteContractcurrencies(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setContractcurrenciesRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const contractcurrenciesVisibility = createAsyncThunk("/contractcurrenciesVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.contractcurrenciesVisibility(data);
    dispatch(setLoading(false));
    dispatch(setContractcurrenciesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

// Orders

export const getOrders = createAsyncThunk("/getOrders", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getOrders(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getOrdersAll = createAsyncThunk("/getOrdersAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getOrdersAll(visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addOrders = createAsyncThunk("/addOrders", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addOrders(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setOrdersRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editOrders = createAsyncThunk("/editOrders", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editOrders(data);
    dispatch(setLoading(false));
    dispatch(setOrdersRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteOrders = createAsyncThunk("/deleteOrders", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteOrders(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setOrdersRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const ordersVisibility = createAsyncThunk("/ordersVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.ordersVisibility(data);
    dispatch(setLoading(false));
    dispatch(setOrdersRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getContragenttypes = createAsyncThunk("/getContragenttypes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getContragenttypes(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getContragenttypesAll = createAsyncThunk("/getContragenttypesAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getContragenttypesAll(visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addContragenttypes = createAsyncThunk("/addContragenttypes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addContragenttypes(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setContragenttypesRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editContragenttypes = createAsyncThunk("/editContragenttypes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editContragenttypes(data);
    dispatch(setLoading(false));
    dispatch(setContragenttypesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteContragenttypes = createAsyncThunk("/deleteContragenttypes", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteContragenttypes(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setContragenttypesRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const contragenttypesVisibility = createAsyncThunk("/contragenttypesVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.contragenttypesVisibility(data);
    dispatch(setLoading(false));
    dispatch(setContragenttypesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

// Contracttypes
export const getContracttypes = createAsyncThunk("/getContracttypes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getContracttypes(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getContracttypesAll = createAsyncThunk("/getContracttypesAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getContracttypesAll(visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addContracttypes = createAsyncThunk("/addContracttypes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addContracttypes(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setContracttypesRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editContracttypes = createAsyncThunk("/editContracttypes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editContracttypes(data);
    dispatch(setLoading(false));
    dispatch(setContracttypesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteContracttypes = createAsyncThunk("/deleteContracttypes", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteContracttypes(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setContracttypesRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const contracttypesVisibility = createAsyncThunk("/contracttypesVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.contracttypesVisibility(data);
    dispatch(setLoading(false));
    dispatch(setContracttypesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});


export const getEmployeeConfigurations = createAsyncThunk("/getEmployeeConfigurations", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getEmployeeConfigurations(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getEmployeeConfigurationsAll = createAsyncThunk("/getEmployeeConfigurationsAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getEmployeeConfigurationsAll(visibility?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addEmployeeConfigurations = createAsyncThunk("/addEmployeeConfigurations", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addEmployeeConfigurations(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setEmployeeConfigurationsRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editEmployeeConfigurations = createAsyncThunk("/editEmployeeConfigurations", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editEmployeeConfigurations(data);
    dispatch(setLoading(false));
    dispatch(setEmployeeConfigurationsRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteEmployeeConfigurations = createAsyncThunk("/deleteEmployeeConfigurations", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteEmployeeConfigurations(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setEmployeeConfigurationsRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const employeeConfigurationsVisibility = createAsyncThunk("/employeeConfigurationsVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.employeeConfigurationsVisibility(data);
    dispatch(setLoading(false));
    dispatch(setEmployeeConfigurationsRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});


export const getWorkModes = createAsyncThunk("/getWorkModes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getWorkModes(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getWorkModesAll = createAsyncThunk("/getWorkModesAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getWorkModesAll(visibility?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addWorkModes = createAsyncThunk("/addWorkModes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addWorkModes(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setWorkModesRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editWorkModes = createAsyncThunk("/editWorkModes", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editWorkModes(data);
    dispatch(setLoading(false));
    dispatch(setWorkModesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteWorkModes = createAsyncThunk("/deleteWorkModes", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteWorkModes(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setWorkModesRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const workModesVisibility = createAsyncThunk("/workModesVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.workModesVisibility(data);
    dispatch(setLoading(false));
    dispatch(setWorkModesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});


export const getVehicleCategories = createAsyncThunk("/getVehicleCategories", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getVehicleCategories(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getVehicleCategoriesAll = createAsyncThunk("/getVehicleCategoriesAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getVehicleCategoriesAll(visibility?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addVehicleCategories = createAsyncThunk("/addVehicleCategories", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addVehicleCategories(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setVehicleCategoriesRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editVehicleCategories = createAsyncThunk("/editVehicleCategories", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editVehicleCategories(data);
    dispatch(setLoading(false));
    dispatch(setVehicleCategoriesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteVehicleCategories = createAsyncThunk("/deleteVehicleCategories", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteVehicleCategories(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setVehicleCategoriesRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const vehicleCategoriesVisibility = createAsyncThunk("/vehicleCategoriesVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.vehicleCategoriesVisibility(data);
    dispatch(setLoading(false));
    dispatch(setVehicleCategoriesRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getChemicals = createAsyncThunk("/getChemicals", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getChemicals(data?.size, data?.page, data?.query, data?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getChemicalsAll = createAsyncThunk("/getChemicalsAll", async (visibility, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.getChemicalsAll(visibility?.visibility);
    dispatch(setLoading(false));
    return response?.data?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const addChemicals = createAsyncThunk("/addChemicals", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.addChemicals(data);
    dispatch(setLoading(false));
    dispatch(setViewModalVisible(true));
    dispatch(setChemicalsRender(prev => !prev));
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const editChemicals = createAsyncThunk("/editChemicals", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.editChemicals(data);
    dispatch(setLoading(false));
    dispatch(setChemicalsRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const deleteChemicals = createAsyncThunk("/deleteChemicals", async (id, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    await Services.deleteChemicals(id);
    dispatch(setLoading(false));
    dispatch(setDeleteModalVisible(false));
    dispatch(setChemicalsRender(prev => !prev));
  } catch (error) {
    dispatch(setDeleteModalVisible(false));
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const chemicalsVisibility = createAsyncThunk("/chemicalsVisibility", async (data, { dispatch }) => {
  try {
    dispatch(setLoading(true));
    const response = await Services.chemicalsVisibility(data);
    dispatch(setLoading(false));
    dispatch(setChemicalsRender(prev => !prev));
    return response?.data;
  } catch (error) {
    errorMessage(error.response?.data?.message);
    dispatch(setLoading(false));
  }
});

export const getRepairtypes = createAsyncThunk(
  "/getRepairtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getRepairtypes(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getRepairtypesAll = createAsyncThunk(
  "/getRepairtypesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getRepairtypesAll(visibility);
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const addRepairtypes = createAsyncThunk(
  "/addRepairtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addRepairtypes(data);
      dispatch(setLoading(false));
      dispatch(setRepairtypesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const editRepairtypes = createAsyncThunk(
  "/editRepairtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editRepairtypes(data);
      dispatch(setLoading(false));
      dispatch(setRepairtypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteRepairtypes = createAsyncThunk(
  "/deleteRepairtypes",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteRepairtypes(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setRepairtypesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const repairtypesVisibility = createAsyncThunk(
  "/repairtypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.repairtypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setRepairtypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getDetailparts = createAsyncThunk(
  "/getDetailparts",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDetailparts(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getDetailpartsAll = createAsyncThunk(
  "/getDetailpartsAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getDetailpartsAll(visibility);
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const addDetailparts = createAsyncThunk(
  "/addDetailparts",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addDetailparts(data);
      dispatch(setLoading(false));
      dispatch(setDetailpartsRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const editDetailparts = createAsyncThunk(
  "/editDetailparts",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editDetailparts(data);
      dispatch(setLoading(false));
      dispatch(setDetailpartsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteDetailparts = createAsyncThunk(
  "/deleteDetailparts",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteDetailparts(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setDetailpartsRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const detailpartsVisibility = createAsyncThunk(
  "/detailpartsVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.detailpartsVisibility(data);
      dispatch(setLoading(false));
      dispatch(setDetailpartsRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const getMeasurementtypes = createAsyncThunk(
  "/getMeasurementtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMeasurementtypes(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getMeasurementtypesAll = createAsyncThunk(
  "/getMeasurementtypesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getMeasurementtypesAll(visibility);
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const addMeasurementtypes = createAsyncThunk(
  "/addMeasurementtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addMeasurementtypes(data);
      dispatch(setLoading(false));
      dispatch(setMeasurementtypesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const editMeasurementtypes = createAsyncThunk(
  "/editMeasurementtypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editMeasurementtypes(data);
      dispatch(setLoading(false));
      dispatch(setMeasurementtypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteMeasurementtypes = createAsyncThunk(
  "/deleteMeasurementtypes",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteMeasurementtypes(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setMeasurementtypesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const measurementtypesVisibility = createAsyncThunk(
  "/measurementtypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.measurementtypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setMeasurementtypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getRepairmentWorkTypes = createAsyncThunk(
  "/getRepairmentWorkTypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getRepairmentWorkTypes(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const getRepairmentWorkTypesAll = createAsyncThunk(
  "/getRepairmentWorkTypesAll",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.getRepairmentWorkTypesAll(visibility);
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const addRepairmentWorkTypes = createAsyncThunk(
  "/addRepairmentWorkTypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.addRepairmentWorkTypes(data);
      dispatch(setLoading(false));
      dispatch(setRepairmentWorkTypesRender((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const editRepairmentWorkTypes = createAsyncThunk(
  "/editRepairmentWorkTypes",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.editRepairmentWorkTypes(data);
      dispatch(setLoading(false));
      dispatch(setRepairmentWorkTypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const deleteRepairmentWorkTypes = createAsyncThunk(
  "/deleteRepairmentWorkTypes",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.deleteRepairmentWorkTypes(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(setRepairmentWorkTypesRender((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const repairmentWorkTypesVisibility = createAsyncThunk(
  "/repairmentWorkTypesVisibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.repairmentWorkTypesVisibility(data);
      dispatch(setLoading(false));
      dispatch(setRepairmentWorkTypesRender((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const questionnaire = createSlice({
  name: "questionnaire",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getTopics.fulfilled, (state, { payload }) => {
      state.topics = payload;
    });
    builder.addCase(getTopicsAll.fulfilled, (state, { payload }) => {
      state.topicsAll = payload;
    });
    builder.addCase(getSubtopics.fulfilled, (state, { payload }) => {
      state.subtopics = payload;
    });
    builder.addCase(getSubtopicsAll.fulfilled, (state, { payload }) => {
      state.subtopicsAll = payload;
    });
    builder.addCase(getExecutionRules.fulfilled, (state, { payload }) => {
      state.executionRules = payload;
    });
    builder.addCase(getExecutionRulesAll.fulfilled, (state, { payload }) => {
      state.executionRulesAll = payload;
    });
    builder.addCase(
      getDocumentRecieveMethods.fulfilled,
      (state, { payload }) => {
        state.documentRecieveMethods = payload;
      }
    );
    builder.addCase(
      getDocumentRecieveMethodsAll.fulfilled,
      (state, { payload }) => {
        state.documentRecieveMethodsAll = payload;
      }
    );
    builder.addCase(getDocumentTypes.fulfilled, (state, { payload }) => {
      state.documentTypes = payload;
    });
    builder.addCase(getDocumentTypesAllOne.fulfilled, (state, { payload }) => {
      state.documentTypesAllOne = payload;
    });
    builder.addCase(getDocumentTypesAllTwo.fulfilled, (state, { payload }) => {
      state.documentTypesAllTwo = payload;
    });
    builder.addCase(getCountries.fulfilled, (state, { payload }) => {
      state.countries = payload;
    });
    builder.addCase(getCountriesAll.fulfilled, (state, { payload }) => {
      state.countriesAll = payload;
    });
    builder.addCase(getOrganizations.fulfilled, (state, { payload }) => {
      state.organizations = payload;
    });
    builder.addCase(getStructures.fulfilled, (state, { payload }) => {
      state.structures = payload;
    });
    builder.addCase(getApplicationForms.fulfilled, (state, { payload }) => {
      state.applicationForms = payload;
    });
    builder.addCase(getApplicationFormsAll.fulfilled, (state, { payload }) => {
      state.applicationFormsAll = payload;
    });
    builder.addCase(getDocumentWhom.fulfilled, (state, { payload }) => {
      state.documentWhom = payload;
    });
    builder.addCase(getDocumentWhomAll.fulfilled, (state, { payload }) => {
      state.documentWhomAll = payload;
    });
    builder.addCase(getMarginNoteText.fulfilled, (state, { payload }) => {
      state.marginNoteText = payload;
    });
    builder.addCase(getDeliveryMethod.fulfilled, (state, { payload }) => {
      state.deliveryMethod = payload;
    });
    builder.addCase(getDeliveryMethodAll.fulfilled, (state, { payload }) => {
      state.deliveryMethodAll = payload;
    });
    builder.addCase(getGeneralStructuresAll.fulfilled, (state, { payload }) => {
      state.generalStructuresAll = payload;
    });
    builder.addCase(getBrands.fulfilled, (state, { payload }) => {
      state.brands = payload;
    });
    builder.addCase(getBrandsAll.fulfilled, (state, { payload }) => {
      state.brandsAll = payload;
    });
    builder.addCase(getChassisTypes.fulfilled, (state, { payload }) => {
      state.chassisTypes = payload;
    });
    builder.addCase(getChassisTypesAll.fulfilled, (state, { payload }) => {
      state.chassisTypesAll = payload;
    });

    builder.addCase(getColor.fulfilled, (state, { payload }) => {
      state.color = payload;
    });
    builder.addCase(getColorAll.fulfilled, (state, { payload }) => {
      state.colorAll = payload;
    });

    builder.addCase(getEnginetype.fulfilled, (state, { payload }) => {
      state.enginetype = payload;
    });
    builder.addCase(getEnginetypeAll.fulfilled, (state, { payload }) => {
      state.enginetypeAll = payload;
    });

    builder.addCase(getGearboxtype.fulfilled, (state, { payload }) => {
      state.gearboxtype = payload;
    });
    builder.addCase(getGearboxtypeAll.fulfilled, (state, { payload }) => {
      state.gearboxtypeAll = payload;
    });

    builder.addCase(getIssuedauthoritie.fulfilled, (state, { payload }) => {
      state.issuedauthoritie = payload;
    });
    builder.addCase(getIssuedauthoritieAll.fulfilled, (state, { payload }) => {
      state.issuedauthoritieAll = payload;
    });

    builder.addCase(getModel.fulfilled, (state, { payload }) => {
      state.model = payload;
    });
    builder.addCase(getModelAll.fulfilled, (state, { payload }) => {
      state.modelAll = payload;
    });

    builder.addCase(getOwnershiptype.fulfilled, (state, { payload }) => {
      state.ownershiptype = payload;
    });
    builder.addCase(getOwnershiptypeAll.fulfilled, (state, { payload }) => {
      state.ownershiptypeAll = payload;
    });

    builder.addCase(getOrganisationrecord.fulfilled, (state, { payload }) => {
      state.organisationrecord = payload;
    });
    builder.addCase(
      getOrganisationrecordAll.fulfilled,
      (state, { payload }) => {
        state.organisationrecordAll = payload;
      }
    );

    builder.addCase(getTransmittertype.fulfilled, (state, { payload }) => {
      state.transmittertype = payload;
    });
    builder.addCase(getTransmittertypeAll.fulfilled, (state, { payload }) => {
      state.transmittertypeAll = payload;
    });

    builder.addCase(getVehicle.fulfilled, (state, { payload }) => {
      state.vehicle = payload;
    });
    builder.addCase(getVehicleAll.fulfilled, (state, { payload }) => {
      state.vehicleAll = payload;
    });

    builder.addCase(getVehicletype.fulfilled, (state, { payload }) => {
      state.vehicletype = payload;
    });
    builder.addCase(getVehicletypeAll.fulfilled, (state, { payload }) => {
      state.vehicletypeAll = payload;
    });

    builder.addCase(getVrc.fulfilled, (state, { payload }) => {
      state.vrc = payload;
    });
    builder.addCase(getVrcAll.fulfilled, (state, { payload }) => {
      state.vrcAll = payload;
    });
    builder.addCase(getAcademicdegrees.fulfilled, (state, { payload }) => {
      state.academicdegrees = payload;
    });
    builder.addCase(getAcademicdegreesAll.fulfilled, (state, { payload }) => {
      state.academicdegreesAll = payload;
    });
    builder.addCase(getDisabilitystatuses.fulfilled, (state, { payload }) => {
      state.disabilitystatuses = payload;
    });
    builder.addCase(
      getDisabilitystatusesAll.fulfilled,
      (state, { payload }) => {
        state.disabilitystatusesAll = payload;
      }
    );
    builder.addCase(getHonorarytitles.fulfilled, (state, { payload }) => {
      state.honorarytitles = payload;
    });
    builder.addCase(getHonorarytitlesAll.fulfilled, (state, { payload }) => {
      state.honorarytitlesAll = payload;
    });
    builder.addCase(getMilitarystaffs.fulfilled, (state, { payload }) => {
      state.militaryStaffs = payload;
    });
    builder.addCase(getMilitarystaffsAll.fulfilled, (state, { payload }) => {
      state.militaryStaffsAll = payload;
    });
    builder.addCase(getMilitarycategories.fulfilled, (state, { payload }) => {
      state.militaryCategories = payload;
    });
    builder.addCase(
      getMilitarycategoriesAll.fulfilled,
      (state, { payload }) => {
        state.militaryCategoriesAll = payload;
      }
    );
    builder.addCase(getMilitaryranks.fulfilled, (state, { payload }) => {
      state.militaryranks = payload;
    });
    builder.addCase(getMilitaryranksAll.fulfilled, (state, { payload }) => {
      state.militaryranksAll = payload;
    });
    builder.addCase(getMilitarygroups.fulfilled, (state, { payload }) => {
      state.militarygroups = payload;
    });
    builder.addCase(getMilitarygroupsAll.fulfilled, (state, { payload }) => {
      state.militarygroupsAll = payload;
    });
    builder.addCase(
      getGeneralstructurestatuses.fulfilled,
      (state, { payload }) => {
        state.generalstructurestatuses = payload;
      }
    );
    builder.addCase(
      getGeneralstructurestatusesAll.fulfilled,
      (state, { payload }) => {
        state.generalstructurestatusesAll = payload;
      }
    );
    builder.addCase(getWorkschedules.fulfilled, (state, { payload }) => {
      state.workschedules = payload;
    });
    builder.addCase(getWorkschedulesAll.fulfilled, (state, { payload }) => {
      state.workschedulesAll = payload;
    });
    builder.addCase(getSpecializations.fulfilled, (state, { payload }) => {
      state.specializations = payload;
    });
    builder.addCase(getSpecializationsAll.fulfilled, (state, { payload }) => {
      state.specializationsAll = payload;
    });
    builder.addCase(getWarparticipants.fulfilled, (state, { payload }) => {
      state.warparticipants = payload;
    });
    builder.addCase(getWarparticipantsAll.fulfilled, (state, { payload }) => {
      state.warparticipantsAll = payload;
    });
    builder.addCase(
      getGeneralstructuretypes.fulfilled,
      (state, { payload }) => {
        state.generalstructuretypes = payload;
      }
    );
    builder.addCase(
      getGeneralstructuretypesAll.fulfilled,
      (state, { payload }) => {
        state.generalstructuretypesAll = payload;
      }
    );
    builder.addCase(
      getEducationinstitutions.fulfilled,
      (state, { payload }) => {
        state.educationinstitutions = payload;
      }
    );
    builder.addCase(
      getEducationinstitutionsAll.fulfilled,
      (state, { payload }) => {
        state.educationinstitutionsAll = payload;
      }
    );
    builder.addCase(getEducationpayments.fulfilled, (state, { payload }) => {
      state.educationPayments = payload;
    });
    builder.addCase(getEducationpaymentsAll.fulfilled, (state, { payload }) => {
      state.educationPaymentsAll = payload;
    });
    builder.addCase(getEducationlevels.fulfilled, (state, { payload }) => {
      state.educationlevels = payload;
    });
    builder.addCase(getEducationlevelsAll.fulfilled, (state, { payload }) => {
      state.educationlevelsAll = payload;
    });
    builder.addCase(getReprimandtypes.fulfilled, (state, { payload }) => {
      state.reprimandTypes = payload;
    });
    builder.addCase(getReprimandtypesAll.fulfilled, (state, { payload }) => {
      state.reprimandTypesAll = payload;
    });
    builder.addCase(getSpecialdays.fulfilled, (state, { payload }) => {
      state.specialdays = payload;
    });
    builder.addCase(getSpecialdaysAll.fulfilled, (state, { payload }) => {
      state.specialdaysAll = payload;
    });
    builder.addCase(getCategories.fulfilled, (state, { payload }) => {
      state.categories = payload;
    });
    builder.addCase(getCategoriesAll.fulfilled, (state, { payload }) => {
      state.categoriesAll = payload;
    });
    builder.addCase(getRegions.fulfilled, (state, { payload }) => {
      state.regions = payload;
    });
    builder.addCase(getRegionsAll.fulfilled, (state, { payload }) => {
      state.regionsAll = payload;
    });
    builder.addCase(getRegionsChildren.fulfilled, (state, { payload }) => {
      state.regionChildren = payload;
    });
    builder.addCase(getAreas.fulfilled, (state, { payload }) => {
      state.areas = payload;
    });
    builder.addCase(getAreasAll.fulfilled, (state, { payload }) => {
      state.areasAll = payload;
    });
    builder.addCase(getCompanies.fulfilled, (state, { payload }) => {
      state.companies = payload;
    });
    builder.addCase(getCompaniesAll.fulfilled, (state, { payload }) => {
      state.companiesAll = payload;
    });
    builder.addCase(getPositions.fulfilled, (state, { payload }) => {
      state.positions = payload;
    });
    builder.addCase(getPositionsAll.fulfilled, (state, { payload }) => {
      state.positionsAll = payload;
    });
    builder.addCase(getHalls.fulfilled, (state, { payload }) => {
      state.halls = payload;
    });
    builder.addCase(getHallsAll.fulfilled, (state, { payload }) => {
      state.hallsAll = payload;
    });
    builder.addCase(getEmployeeConfigurations.fulfilled, (state, { payload }) => {
      state.employeeConfigurations = payload;
    });
    builder.addCase(getEmployeeConfigurationsAll.fulfilled, (state, { payload }) => {
      state.employeeConfigurationsAll = payload;
    });
    builder.addCase(getContragenttypes.fulfilled, (state, { payload }) => {
      state.contragenttypes = payload;
    });
    builder.addCase(getContragenttypesAll.fulfilled, (state, { payload }) => {
      state.contragenttypesAll = payload;
    });

    builder.addCase(getContracttypes.fulfilled, (state, { payload }) => {
      state.contracttypes = payload;
    });
    builder.addCase(getContracttypesAll.fulfilled, (state, { payload }) => {
      state.contracttypesAll = payload;
    });

    builder.addCase(getContractcurrencies.fulfilled, (state, { payload }) => {
      state.contractcurrencies = payload;
    });
    builder.addCase(getContractcurrenciesAll.fulfilled, (state, { payload }) => {
      state.contractcurrenciesAll = payload;
    });

    builder.addCase(getOrders.fulfilled, (state, { payload }) => {
      state.orders = payload;
    });
    builder.addCase(getOrdersAll.fulfilled, (state, { payload }) => {
      state.ordersAll = payload;
    });
    builder.addCase(getDrivingcategoriesAll.fulfilled, (state, { payload }) => {
      state.drivingcategoriesAll = payload;
    });
    builder.addCase(getWorkModes.fulfilled, (state, { payload }) => {
      state.workModes = payload;
    });
    builder.addCase(getWorkModesAll.fulfilled, (state, { payload }) => {
      state.workModesAll = payload;
    });
    builder.addCase(getVehicleCategories.fulfilled, (state, { payload }) => {
      state.vehicleCategories = payload;
    });
    builder.addCase(getVehicleCategoriesAll.fulfilled, (state, { payload }) => {
      state.vehicleCategoriesAll = payload;
    });
    builder.addCase(getChemicals.fulfilled, (state, { payload }) => {
      state.chemicals = payload;
    });
    builder.addCase(getChemicalsAll.fulfilled, (state, { payload }) => {
      state.chemicalsAll = payload;
    });
    builder.addCase(getRepairtypes.fulfilled, (state, { payload }) => {
      state.repairtypes = payload;
    });
    builder.addCase(getRepairtypesAll.fulfilled, (state, { payload }) => {
      state.repairtypesAll = payload;
    });

    builder.addCase(getDetailparts.fulfilled, (state, { payload }) => {
      state.detailparts = payload;
    });
    builder.addCase(getDetailpartsAll.fulfilled, (state, { payload }) => {
      state.detailpartsAll = payload;
    });

    builder.addCase(getMeasurementtypes.fulfilled, (state, { payload }) => {
      state.measurementtypes = payload;
    });
    builder.addCase(getMeasurementtypesAll.fulfilled, (state, { payload }) => {
      state.measurementtypesAll = payload;
    });

    builder.addCase(getRepairmentWorkTypes.fulfilled, (state, { payload }) => {
      state.repairmentWorkTypes = payload;
    });
    builder.addCase(getRepairmentWorkTypesAll.fulfilled, (state, { payload }) => {
      state.repairmentWorkTypesAll = payload;
    });
  },
});

export const { setPage } = questionnaire.actions;
