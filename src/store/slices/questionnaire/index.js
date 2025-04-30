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
  },
});

export const { setPage } = questionnaire.actions;
