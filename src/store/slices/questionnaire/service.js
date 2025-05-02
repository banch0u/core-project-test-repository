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
      `/documentreceivemethods/${data?.id}/visibility/${data?.checked}`
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
      `/documenttypes/${data?.id}/visibility/${data?.checked}`
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
  static getBrands = async (size, page, query, visibility) => {
    const response = await api.get(
      `/brands/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getBrandsAll = async (visibility) => {
    const response = await api.get(
      `/brands?visibility=${visibility}`
    );
    return response?.data;
  };
  static addBrand = async (value) => {
    const response = await api.post(`/brands`, value);
    return response?.data;
  };

  static editBrand = async (value) => {
    const response = await api.put(
      `/brands/${value?.id}`,
      value
    );
    return response?.data;
  };

  static deleteBrand = async (id) => {
    const response = await api.delete(`/brands/${id}`);
    return response?.data;
  };
  static brandVisibility = async (data) => {
    const response = await api.patch(
      `/brands/${data?.id}/visibility/${data?.checked}`
    );
    return response?.data;
  };
  // 🛠 chassistypes
  static getChassiTypes = async (size, page, query, visibility) => {
    const response = await api.get(`/chassistypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getChassiTypesAll = async (visibility) => {
    const response = await api.get(`/chassistypes?visibility=${visibility}`);
    return response?.data;
  };
  static addChassisType = async (value) => api.post(`/chassistypes`, value).then(r => r.data);
  static editChassisType = async (value) => api.put(`/chassistypes/${value?.id}`, value).then(r => r.data);
  static deleteChassisType = async (id) => api.delete(`/chassistypes/${id}`).then(r => r.data);
  static chassisTypeVisibility = async (data) => api.patch(`/chassistypes/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 🎨 colors
  static getColor = async (size, page, query, visibility) => {
    const response = await api.get(`/colors/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getColorAll = async (visibility) => api.get(`/colors?visibility=${visibility}`).then(r => r.data);
  static addColor = async (value) => api.post(`/colors`, value).then(r => r.data);
  static editColor = async (value) => api.put(`/colors/${value?.id}`, value).then(r => r.data);
  static deleteColor = async (id) => api.delete(`/colors/${id}`).then(r => r.data);
  static colorVisibility = async (data) => api.patch(`/colors/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 🔧 enginetypes
  static getEnginetype = async (size, page, query, visibility) => {
    const response = await api.get(`/enginetypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getEnginetypeAll = async (visibility) => api.get(`/enginetypes?visibility=${visibility}`).then(r => r.data);
  static addEnginetype = async (value) => api.post(`/enginetypes`, value).then(r => r.data);
  static editEnginetype = async (value) => api.put(`/enginetypes/${value?.id}`, value).then(r => r.data);
  static deleteEnginetype = async (id) => api.delete(`/enginetypes/${id}`).then(r => r.data);
  static enginetypeVisibility = async (data) => api.patch(`/enginetypes/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // ⚙️ gearboxtypes
  static getGearboxtype = async (size, page, query, visibility) => {
    const response = await api.get(`/gearboxtypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getGearboxtypeAll = async (visibility) => api.get(`/gearboxtypes?visibility=${visibility}`).then(r => r.data);
  static addGearboxtype = async (value) => api.post(`/gearboxtypes`, value).then(r => r.data);
  static editGearboxtype = async (value) => api.put(`/gearboxtypes/${value?.id}`, value).then(r => r.data);
  static deleteGearboxtype = async (id) => api.delete(`/gearboxtypes/${id}`).then(r => r.data);
  static gearboxtypeVisibility = async (data) => api.patch(`/gearboxtypes/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 🏛 issuedauthorities
  static getIssuedauthorities = async (size, page, query, visibility) => {
    const response = await api.get(`/issuedauthorities/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getIssuedauthoritiesAll = async (visibility) => api.get(`/issuedauthorities?visibility=${visibility}`).then(r => r.data);
  static addIssuedauthorities = async (value) => api.post(`/issuedauthorities`, value).then(r => r.data);
  static editIssuedauthorities = async (value) => api.put(`/issuedauthorities/${value?.id}`, value).then(r => r.data);
  static deleteIssuedauthorities = async (id) => api.delete(`/issuedauthorities/${id}`).then(r => r.data);
  static issuedauthoritiesVisibility = async (data) => api.patch(`/issuedauthorities/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 🚗 models
  static getModel = async (size, page, query, brands, visibility) => {
    const response = await api.get(`/models/${size}/page/${page}?visibility=${visibility}&name=${query?.name}&brands=${brands}`);
    return response?.data;
  };
  static getModelAll = async (visibility, brands) => api.get(`/models?visibility=${visibility}&brands=${brands}`).then(r => r.data);
  static addModel = async (value) => api.post(`/models`, value).then(r => r.data);
  static editModel = async (value) => api.put(`/models/${value?.id}`, value).then(r => r.data);
  static deleteModel = async (id) => api.delete(`/models/${id}`).then(r => r.data);
  static modelsVisibility = async (data) => api.patch(`/models/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 📄 ownershiptypes
  static getOwnershiptype = async (size, page, query, visibility) => {
    const response = await api.get(`/ownershiptypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getOwnershiptypeAll = async (visibility) => api.get(`/ownershiptypes?visibility=${visibility}`).then(r => r.data);
  static addOwnershiptype = async (value) => api.post(`/ownershiptypes`, value).then(r => r.data);
  static editOwnershiptype = async (value) => api.put(`/ownershiptypes/${value?.id}`, value).then(r => r.data);
  static deleteOwnershiptype = async (id) => api.delete(`/ownershiptypes/${id}`).then(r => r.data);
  static ownershiptypesVisibility = async (data) => api.patch(`/ownershiptypes/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 🏢 organisationrecords
  static getOrganisationrecords = async (size, page, query, visibility) => {
    const response = await api.get(`/organisationrecords/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getOrganisationrecordsAll = async (visibility) => api.get(`/organisationrecords?visibility=${visibility}`).then(r => r.data);
  static addOrganisationrecords = async (value) => api.post(`/organisationrecords`, value).then(r => r.data);
  static editOrganisationrecords = async (value) => api.put(`/organisationrecords/${value?.id}`, value).then(r => r.data);
  static deleteOrganisationrecords = async (id) => api.delete(`/organisationrecords/${id}`).then(r => r.data);
  static organisationrecordsVisibility = async (data) => api.patch(`/organisationrecords/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 📡 transmittertypes
  static getTransmittertypes = async (size, page, query, visibility) => {
    const response = await api.get(`/transmittertypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getTransmittertypesAll = async (visibility) => api.get(`/transmittertypes?visibility=${visibility}`).then(r => r.data);
  static addTransmittertypes = async (value) => api.post(`/transmittertypes`, value).then(r => r.data);
  static editTransmittertypes = async (value) => api.put(`/transmittertypes/${value?.id}`, value).then(r => r.data);
  static deleteTransmittertypes = async (id) => api.delete(`/transmittertypes/${id}`).then(r => r.data);
  static transmittertypesVisibility = async (data) => api.patch(`/transmittertypes/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 🚙 vehicles
  static getVehicles = async (size, page, query, visibility) => {
    const response = await api.get(`/vehicles/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getVehiclesAll = async (visibility) => api.get(`/vehicles?visibility=${visibility}`).then(r => r.data);
  static addVehicles = async (value) => api.post(`/vehicles`, value).then(r => r.data);
  static editVehicles = async (value) => api.put(`/vehicles/${value?.id}`, value).then(r => r.data);
  static deleteVehicles = async (id) => api.delete(`/vehicles/${id}`).then(r => r.data);
  static vehiclesVisibility = async (data) => api.patch(`/vehicles/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 🚘 vehicletypes
  static getVehicletypes = async (size, page, query, visibility) => {
    const response = await api.get(`/vehicletypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getVehicletypesAll = async (visibility) => api.get(`/vehicletypes?visibility=${visibility}`).then(r => r.data);
  static addVehicletypes = async (value) => api.post(`/vehicletypes`, value).then(r => r.data);
  static editVehicletypes = async (value) => api.put(`/vehicletypes/${value?.id}`, value).then(r => r.data);
  static deleteVehicletypes = async (id) => api.delete(`/vehicletypes/${id}`).then(r => r.data);
  static vehicletypesVisibility = async (data) => api.patch(`/vehicletypes/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

  // 📋 vrcs
  static getVrcs = async (size, page, query, visibility) => {
    const response = await api.get(`/vrcs/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`);
    return response?.data;
  };
  static getVrcsAll = async (visibility) => api.get(`/vrcs?visibility=${visibility}`).then(r => r.data);
  static addVrcs = async (value) => api.post(`/vrcs`, value).then(r => r.data);
  static editVrcs = async (value) => api.put(`/vrcs/${value?.id}`, value).then(r => r.data);
  static deleteVrcs = async (id) => api.delete(`/vrcs/${id}`).then(r => r.data);
  static vrcsVisibility = async (data) => api.patch(`/vrcs/${data?.id}/visibility/${data?.checked}`).then(r => r.data);

}
export default Services;
