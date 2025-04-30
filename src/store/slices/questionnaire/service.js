import { queryString } from "../../../helpers/querySearch";
import api from "../../../utils/axios";

class Services {
  static getTopics = async (size, page, query, visibility, appealtypes) => {
    const response = await api.get(
      `/topics/${size}/page/${page}?visibility=${visibility}&appealtypes=${appealtypes}&name=${query?.name}`
    );
    return response?.data;
  };
  static getTopicsAll = async (visibility, appealtypes) => {
    const response = await api.get(
      `/topics?visibility=${visibility}&appealtypes=${appealtypes}`
    );
    return response?.data;
  };
  static addTopic = async (value) => {
    const response = await api.post("/topics", value);
    return response?.data;
  };

  static editTopic = async (data) => {
    const response = await api.put(`/topics/${data?.id}`, data);
    return response?.data;
  };

  static deleteTopic = async (id) => {
    const response = await api.delete(`/topics/${id}`);
    return response?.data;
  };

  static topicVisibility = async (data) => {
    const response = await api.patch(
      `/topics/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };

  /*Subtopics */
  static getSubtopics = async (
    size,
    page,
    topicId,
    query,
    visibility,
    appealtypes
  ) => {
    const response = await api.get(
      `/topics/${topicId}/subtopics/${size}/page/${page}?visibility=${visibility}&appealtypes=${appealtypes}&name=${query.name}`
    );
    return response?.data;
  };
  static getSubtopicsAll = async (visibility, topicid, appealtypes) => {
    const response = await api.get(
      `/topics/${topicid}/subtopics?visibility=${visibility}&appealtypes=${appealtypes}`
    );
    return response?.data;
  };
  static addSubtopic = async (value) => {
    const response = await api.post("/topics/subtopics", value);
    return response?.data;
  };

  static editSubtopic = async (data) => {
    const response = await api.put(`/topics/subtopics/${data?.id}`, data);
    return response?.data;
  };

  static deleteSubtopic = async (id) => {
    const response = await api.delete(`/topics/subtopics/${id}`);
    return response?.data;
  };

  static subtopicVisibility = async (data) => {
    const response = await api.patch(
      `/topics/subtopics/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };

  /*Execution Rules */

  static getExecutionRules = async (size, page, query, visibility) => {
    const response = await api.get(
      `/executionrules/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getExecutionRulesAll = async (visibility) => {
    const response = await api.get(`/executionrules?visibility=${visibility}`);
    return response?.data;
  };
  static addExecutionRule = async (value) => {
    const response = await api.post(`/executionrules`, value);
    return response?.data;
  };

  static editExecutionRule = async (value) => {
    const response = await api.put(`/executionrules/${value?.id}`, value);
    return response?.data;
  };

  static deleteExecutionRule = async (id) => {
    const response = await api.delete(`/executionrules/${id}`);
    return response?.data;
  };

  static executionRuleVisibility = async (data) => {
    const response = await api.patch(
      `/executionrules/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };

  /*Document Recieve Methods */

  static getDocumentRecieveMethods = async (size, page, query, visibility) => {
    const response = await api.get(
      `/documentreceivemethods/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getDocumentRecieveMethodsAll = async (visibility) => {
    const response = await api.get(
      `/documentreceivemethods?visibility=${visibility}`
    );
    return response?.data;
  };
  static addDocumentRecieveMethod = async (value) => {
    const response = await api.post(`/documentreceivemethods`, value);
    return response?.data;
  };

  static editDocumentRecieveMethod = async (value) => {
    const response = await api.put(
      `/documentreceivemethods/${value?.id}`,
      value
    );
    return response?.data;
  };

  static deleteDocumentRecieveMethod = async (id) => {
    const response = await api.delete(`/documentreceivemethods/${id}`);
    return response?.data;
  };
  static documentRecieveMethodVisibility = async (data) => {
    const response = await api.patch(
      `/documentreceivemethods/${data?.id}/visibility/${data?.checked}/`
    );
    return response?.data;
  };

  /* Document Types */

  static getDocumentTypes = async (size, page, query, visibility, category) => {
    const response = await api.get(
      `/documenttypes/${size}/page/${page}?visibility=${visibility}&category=${category}&name=${query?.name}`
    );
    return response?.data;
  };
  static getDocumentTypesAllOne = async (visibility, category) => {
    const response = await api.get(
      `/documenttypes?visibility=${visibility}&category=1`
    );
    return response?.data;
  };
  static getDocumentTypesAllTwo = async (visibility, category) => {
    const response = await api.get(
      `/documenttypes?visibility=${visibility}&category=2`
    );
    return response?.data;
  };
  static addDocumentTypes = async (value) => {
    const response = await api.post(`/documenttypes`, value);
    return response?.data;
  };

  static editDocumentTypes = async (value) => {
    const response = await api.put(`/documenttypes/${value?.id}`, value);
    return response?.data;
  };

  static deleteDocumentTypes = async (id) => {
    const response = await api.delete(`/documenttypes/${id}`);
    return response?.data;
  };
  static documentTypesVisibility = async (data) => {
    const response = await api.patch(
      `/documenttypes/${data?.id}/visibility/${data?.checked}/`
    );
    return response?.data;
  };

  /*Countries */
  static getCountries = async (size, page, query, visibility) => {
    const response = await api.get(
      `/countries/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response;
  };
  static getCountriesAll = async (data) => {
    const response = await api.get(`/countries?visibility=${data?.visibility}`);
    return response;
  };
  static addCountry = async (value) => {
    const response = await api.post("/countries", value);
    return response?.data;
  };

  static editCountry = async (value) => {
    const response = await api.put(`/countries/${value?.id}`, value);
    return response?.data;
  };

  static countryVisibility = async (data) => {
    const response = await api.patch(
      `/countries/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };

  static deleteCountry = async (id) => {
    const response = await api.delete(`/countries/${id}`);
    return response?.data;
  };
  /*Streets */
  // static getStreets = async (size, page, query, visibility) => {
  //   const response = await api.get(
  //     `/regions/${size}/page/${page}?types=6&visibility=${visibility}&name=${query.name}`
  //   );
  //   return response?.data;
  // };

  // static streetVisibility = async (data) => {
  //   const response = await api.patch(
  //     `/regions/${data?.id}/visibility/${data?.checked}?type=6`
  //   );
  //   return response?.data;
  // };

  // static addStreet = async (value) => {
  //   const response = await api.post(`/regions`, value);
  //   return response?.data;
  // };

  // static edit = async (data) => {
  //   const response = await api.put(`/regions/${data?.id}`, data);
  //   return response?.data;
  // };

  // static delete = async (id) => {
  //   const response = await api.delete(`/regions/${id}`);
  //   return response?.data;
  // };
  /* Organizations */
  static getOrganizations = async (size, page, query, visibility) => {
    const queryStr = queryString(query);
    const response = await api.get(
      `/organisations/${size}/page/${page}?visibility=${visibility}&${queryStr} `
    );
    return response;
  };

  static addOrganization = async (value) => {
    const response = await api.post("/organisations", value);
    return response?.data;
  };

  static editOrganization = async (data) => {
    const response = await api.put(`/organisations/${data?.id}`, data);
    return response?.data;
  };

  static deleteOrganization = async (id) => {
    const response = await api.delete(`/organisations/${id}`);
    return response?.data;
  };

  static organizationVisibility = async (data) => {
    const response = await api.patch(
      `/organisations/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };
  /*Structures*/
  static getStructures = async (size, page, query, visibility) => {
    const response = await api.get(
      `/structures/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };

  static addStructure = async (value) => {
    const response = await api.post("/structures", value);
    return response?.data;
  };

  static editStructure = async (data) => {
    const response = await api.put(`/structures/${data?.id}`, data);
    return response?.data;
  };

  static deleteStructure = async (id) => {
    const response = await api.delete(`/structures/${id}`);
    return response?.data;
  };

  static structureVisibility = async (data) => {
    const response = await api.patch(
      `/structures/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };
  /*Application forms */
  static getApplicationForms = async (size, page, query, visibility) => {
    const response = await api.get(
      `/applicationforms/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getApplicationFormsAll = async (visibility) => {
    const response = await api.get(
      `/applicationforms?visibility=${visibility}`
    );
    return response?.data;
  };
  static addApplicationForm = async (value) => {
    const response = await api.post("/applicationforms", value);
    return response?.data;
  };

  static editApplicationForm = async (data) => {
    const response = await api.put(`/applicationforms/${data?.id}`, data);
    return response?.data;
  };

  static deleteApplicationForm = async (id) => {
    const response = await api.delete(`/applicationforms/${id}`);
    return response?.data;
  };

  static applicationFormVisibility = async (data) => {
    const response = await api.patch(
      `/applicationforms/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };

  /*Document Whom */
  static getDocumentWhom = async (size, page, query, visibility, types) => {
    const queryStr = queryString(query);
    const response = await api.get(
      `/documentwhomaddresses/${size}/page/${page}?visibility=${visibility}&types=${types}&${queryStr}`
    );
    return response?.data;
  };
  static getDocumentWhomAll = async (visibility, type) => {
    const response = await api.get(
      `/documentwhomaddresses?visibility=${visibility}&type=${type}`
    );
    return response?.data;
  };
  static getDocumentWhomAll1 = async (visibility) => {
    const response = await api.get(
      `/documentwhomaddresses?visibility=${visibility}&types=1`
    );
    return response?.data;
  };
  static addDocumentWhom = async (value) => {
    const response = await api.post("/documentwhomaddresses", value);
    return response?.data;
  };

  static editDocumentWhom = async (data) => {
    const response = await api.put(`/documentwhomaddresses/${data?.id}`, data);
    return response?.data;
  };

  static deleteDocumentWhom = async (id) => {
    const response = await api.delete(`/documentwhomaddresses/${id}`);
    return response?.data;
  };

  static documentWhomVisibility = async (data) => {
    const response = await api.patch(
      `/documentwhomaddresses/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };
  /*marginNoteTexts */
  static getMarginNoteText = async (size, page, query, visibility) => {
    const queryStr = queryString(query);
    const response = await api.get(
      `/documentdirectiontexts/${size}/page/${page}?visibility=${visibility}&${queryStr}`
    );
    return response?.data;
  };
  static addMarginNoteText = async (value) => {
    const response = await api.post("/documentdirectiontexts", value);
    return response?.data;
  };

  static editMarginNoteText = async (data) => {
    const response = await api.put(`/documentdirectiontexts/${data?.id}`, data);
    return response?.data;
  };

  static deleteMarginNoteText = async (id) => {
    const response = await api.delete(`/documentdirectiontexts/${id}`);
    return response?.data;
  };

  static marginNoteTextVisibility = async (data) => {
    const response = await api.patch(
      `/documentdirectiontexts/${data?.id}`,
      data
    );
    return response?.data;
  };
  /* // */
  static getDeliveryMethod = async (size, page, query, visibility) => {
    const response = await api.get(
      `/shipmentforms/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getDeliveryMethodAll = async (visibility) => {
    const response = await api.get(`/shipmentforms?visibility=${visibility}`);
    return response?.data;
  };
  static addDeliveryMethod = async (value) => {
    const response = await api.post("/shipmentforms", value);
    return response?.data;
  };

  static editDeliveryMethod = async (data) => {
    const response = await api.put(`/shipmentforms/${data?.id}`, data);
    return response?.data;
  };

  static deleteDeliveryMethod = async (id) => {
    const response = await api.delete(`/shipmentforms/${id}`);
    return response?.data;
  };

  static deliveryMethodVisibility = async (data) => {
    const response = await api.patch(
      `/shipmentforms/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };
  static getGeneralStructuresAll = async () => {
    const response = await api.get(
      `/generalstructures?iswithoutpeople=true&visibility=nondeleted`
    );
    return response?.data;
  };
}
export default Services;
