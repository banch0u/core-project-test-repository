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
    const response = await api.get(`/brands?visibility=${visibility}`);
    return response?.data;
  };
  static addBrand = async (value) => {
    const response = await api.post(`/brands`, value);
    return response?.data;
  };

  static editBrand = async (value) => {
    const response = await api.put(`/brands/${value?.id}`, value);
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
    const response = await api.get(
      `/chassistypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getChassiTypesAll = async (visibility) => {
    const response = await api.get(`/chassistypes?visibility=${visibility}`);
    return response?.data;
  };
  static addChassisType = async (value) =>
    api.post(`/chassistypes`, value).then((r) => r.data);
  static editChassisType = async (value) =>
    api.put(`/chassistypes/${value?.id}`, value).then((r) => r.data);
  static deleteChassisType = async (id) =>
    api.delete(`/chassistypes/${id}`).then((r) => r.data);
  static chassisTypeVisibility = async (data) =>
    api
      .patch(`/chassistypes/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 🎨 colors
  static getColor = async (size, page, query, visibility) => {
    const response = await api.get(
      `/colors/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getColorAll = async (visibility) =>
    api.get(`/colors?visibility=${visibility}`).then((r) => r.data);
  static addColor = async (value) =>
    api.post(`/colors`, value).then((r) => r.data);
  static editColor = async (value) =>
    api.put(`/colors/${value?.id}`, value).then((r) => r.data);
  static deleteColor = async (id) =>
    api.delete(`/colors/${id}`).then((r) => r.data);
  static colorVisibility = async (data) =>
    api
      .patch(`/colors/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 🔧 enginetypes
  static getEnginetype = async (size, page, query, visibility) => {
    const response = await api.get(
      `/enginetypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getEnginetypeAll = async (visibility) =>
    api.get(`/enginetypes?visibility=${visibility}`).then((r) => r.data);
  static addEnginetype = async (value) =>
    api.post(`/enginetypes`, value).then((r) => r.data);
  static editEnginetype = async (value) =>
    api.put(`/enginetypes/${value?.id}`, value).then((r) => r.data);
  static deleteEnginetype = async (id) =>
    api.delete(`/enginetypes/${id}`).then((r) => r.data);
  static enginetypeVisibility = async (data) =>
    api
      .patch(`/enginetypes/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // ⚙️ gearboxtypes
  static getGearboxtype = async (size, page, query, visibility) => {
    const response = await api.get(
      `/gearboxtypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getGearboxtypeAll = async (visibility) =>
    api.get(`/gearboxtypes?visibility=${visibility}`).then((r) => r.data);
  static addGearboxtype = async (value) =>
    api.post(`/gearboxtypes`, value).then((r) => r.data);
  static editGearboxtype = async (value) =>
    api.put(`/gearboxtypes/${value?.id}`, value).then((r) => r.data);
  static deleteGearboxtype = async (id) =>
    api.delete(`/gearboxtypes/${id}`).then((r) => r.data);
  static gearboxtypeVisibility = async (data) =>
    api
      .patch(`/gearboxtypes/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 🏛 issuedauthorities
  static getIssuedauthorities = async (size, page, query, visibility) => {
    const response = await api.get(
      `/issuedauthorities/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getIssuedauthoritiesAll = async (visibility) =>
    api.get(`/issuedauthorities?visibility=${visibility}`).then((r) => r.data);
  static addIssuedauthorities = async (value) =>
    api.post(`/issuedauthorities`, value).then((r) => r.data);
  static editIssuedauthorities = async (value) =>
    api.put(`/issuedauthorities/${value?.id}`, value).then((r) => r.data);
  static deleteIssuedauthorities = async (id) =>
    api.delete(`/issuedauthorities/${id}`).then((r) => r.data);
  static issuedauthoritiesVisibility = async (data) =>
    api
      .patch(`/issuedauthorities/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 🚗 models
  static getModel = async (size, page, query, brands, visibility) => {
    const response = await api.get(
      `/models/${size}/page/${page}?visibility=${visibility}&name=${query?.name}&brands=${brands}`
    );
    return response?.data;
  };
  static getModelAll = async (visibility, brands) =>
    api
      .get(`/models?visibility=${visibility}&brands=${brands}`)
      .then((r) => r.data);
  static addModel = async (value) =>
    api.post(`/models`, value).then((r) => r.data);
  static editModel = async (value) =>
    api.put(`/models/${value?.id}`, value).then((r) => r.data);
  static deleteModel = async (id) =>
    api.delete(`/models/${id}`).then((r) => r.data);
  static modelsVisibility = async (data) =>
    api
      .patch(`/models/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 📄 ownershiptypes
  static getOwnershiptype = async (size, page, query, visibility) => {
    const response = await api.get(
      `/ownershiptypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getOwnershiptypeAll = async (visibility) =>
    api.get(`/ownershiptypes?visibility=${visibility}`).then((r) => r.data);
  static addOwnershiptype = async (value) =>
    api.post(`/ownershiptypes`, value).then((r) => r.data);
  static editOwnershiptype = async (value) =>
    api.put(`/ownershiptypes/${value?.id}`, value).then((r) => r.data);
  static deleteOwnershiptype = async (id) =>
    api.delete(`/ownershiptypes/${id}`).then((r) => r.data);
  static ownershiptypesVisibility = async (data) =>
    api
      .patch(`/ownershiptypes/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 🏢 organisationrecords
  static getOrganisationrecords = async (size, page, query, visibility) => {
    const response = await api.get(
      `/organisationrecords/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getOrganisationrecordsAll = async (visibility) =>
    api
      .get(`/organisationrecords?visibility=${visibility}`)
      .then((r) => r.data);
  static addOrganisationrecords = async (value) =>
    api.post(`/organisationrecords`, value).then((r) => r.data);
  static editOrganisationrecords = async (value) =>
    api.put(`/organisationrecords/${value?.id}`, value).then((r) => r.data);
  static deleteOrganisationrecords = async (id) =>
    api.delete(`/organisationrecords/${id}`).then((r) => r.data);
  static organisationrecordsVisibility = async (data) =>
    api
      .patch(`/organisationrecords/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 📡 transmittertypes
  static getTransmittertypes = async (size, page, query, visibility) => {
    const response = await api.get(
      `/transmittertypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getTransmittertypesAll = async (visibility) =>
    api.get(`/transmittertypes?visibility=${visibility}`).then((r) => r.data);
  static addTransmittertypes = async (value) =>
    api.post(`/transmittertypes`, value).then((r) => r.data);
  static editTransmittertypes = async (value) =>
    api.put(`/transmittertypes/${value?.id}`, value).then((r) => r.data);
  static deleteTransmittertypes = async (id) =>
    api.delete(`/transmittertypes/${id}`).then((r) => r.data);
  static transmittertypesVisibility = async (data) =>
    api
      .patch(`/transmittertypes/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 🚙 vehicles
  static getVehicles = async (size, page, query, visibility) => {
    const response = await api.get(
      `/vehicles/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getVehiclesAll = async (visibility) =>
    api.get(`/vehicles?visibility=${visibility}`).then((r) => r.data);
  static addVehicles = async (value) =>
    api.post(`/vehicles`, value).then((r) => r.data);
  static editVehicles = async (value) =>
    api.put(`/vehicles/${value?.id}`, value).then((r) => r.data);
  static deleteVehicles = async (id) =>
    api.delete(`/vehicles/${id}`).then((r) => r.data);
  static vehiclesVisibility = async (data) =>
    api
      .patch(`/vehicles/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 🚘 vehicletypes
  static getVehicletypes = async (size, page, query, visibility) => {
    const response = await api.get(
      `/vehicletypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getVehicletypesAll = async (visibility) =>
    api.get(`/vehicletypes?visibility=${visibility}`).then((r) => r.data);
  static addVehicletypes = async (value) =>
    api.post(`/vehicletypes`, value).then((r) => r.data);
  static editVehicletypes = async (value) =>
    api.put(`/vehicletypes/${value?.id}`, value).then((r) => r.data);
  static deleteVehicletypes = async (id) =>
    api.delete(`/vehicletypes/${id}`).then((r) => r.data);
  static vehicletypesVisibility = async (data) =>
    api
      .patch(`/vehicletypes/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  // 📋 vrcs
  static getVrcs = async (size, page, query, visibility) => {
    const response = await api.get(
      `/vrcs/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
    return response?.data;
  };
  static getVrcsAll = async (visibility) =>
    api.get(`/vrcs?visibility=${visibility}`).then((r) => r.data);
  static addVrcs = async (value) =>
    api.post(`/vrcs`, value).then((r) => r.data);
  static editVrcs = async (value) =>
    api.put(`/vrcs/${value?.id}`, value).then((r) => r.data);
  static deleteVrcs = async (id) =>
    api.delete(`/vrcs/${id}`).then((r) => r.data);
  static vrcsVisibility = async (data) =>
    api
      .patch(`/vrcs/${data?.id}/visibility/${data?.checked}`)
      .then((r) => r.data);

  static getAcademicdegrees = async (size, page, query, visibility) =>
    api.get(
      `/academicdegrees/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getAcademicdegreesAll = async (visibility) =>
    api.get(`/academicdegrees?visibility=${visibility}`);
  static addAcademicdegrees = async (value) =>
    api.post(`/academicdegrees`, value);
  static editAcademicdegrees = async (value) =>
    api.put(`/academicdegrees/${value?.id}`, value);
  static deleteAcademicdegrees = async (id) =>
    api.delete(`/academicdegrees/${id}`);
  static academicdegreesVisibility = async (data) =>
    api.patch(`/academicdegrees/${data?.id}/visibility/${data?.checked}`);

  static getDisabilitystatuses = async (size, page, query, visibility) =>
    api.get(
      `/disabilitystatuses/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getDisabilitystatusesAll = async (visibility) =>
    api.get(`/disabilitystatuses?visibility=${visibility}`);
  static addDisabilitystatuses = async (value) =>
    api.post(`/disabilitystatuses`, value);
  static editDisabilitystatuses = async (value) =>
    api.put(`/disabilitystatuses/${value?.id}`, value);
  static deleteDisabilitystatuses = async (id) =>
    api.delete(`/disabilitystatuses/${id}`);
  static disabilitystatusesVisibility = async (data) =>
    api.patch(`/disabilitystatuses/${data?.id}/visibility/${data?.checked}`);

  static getHonorarytitles = async (size, page, query, visibility) =>
    api.get(
      `/honorarytitles/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getHonorarytitlesAll = async (visibility) =>
    api.get(`/honorarytitles?visibility=${visibility}`);
  static addHonorarytitles = async (value) =>
    api.post(`/honorarytitles`, value);
  static editHonorarytitles = async (value) =>
    api.put(`/honorarytitles/${value?.id}`, value);
  static deleteHonorarytitles = async (id) =>
    api.delete(`/honorarytitles/${id}`);
  static honorarytitlesVisibility = async (data) =>
    api.patch(`/honorarytitles/${data?.id}/visibility/${data?.checked}`);

  static getMilitarystaffs = async (size, page, query, visibility) =>
    api.get(
      `/militaryStaffs/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getMilitarystaffsAll = async (visibility) =>
    api.get(`/militaryStaffs?visibility=${visibility}`);
  static addMilitarystaffs = async (value) =>
    api.post(`/militaryStaffs`, value);
  static editMilitarystaffs = async (value) =>
    api.put(`/militaryStaffs/${value?.id}`, value);
  static deleteMilitarystaffs = async (id) =>
    api.delete(`/militaryStaffs/${id}`);
  static militaryStaffsVisibility = async (data) =>
    api.patch(`/militaryStaffs/${data?.id}/visibility/${data?.checked}`);

  static getMilitarycategories = async (size, page, query, visibility) =>
    api.get(
      `/militaryCategories/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getMilitarycategoriesAll = async (visibility) =>
    api.get(`/militaryCategories?visibility=${visibility}`);
  static addMilitarycategories = async (value) =>
    api.post(`/militaryCategories`, value);
  static editMilitarycategories = async (value) =>
    api.put(`/militaryCategories/${value?.id}`, value);
  static deleteMilitarycategories = async (id) =>
    api.delete(`/militaryCategories/${id}`);
  static militaryCategoriesVisibility = async (data) =>
    api.patch(`/militaryCategories/${data?.id}/visibility/${data?.checked}`);

  static getMilitaryranks = async (size, page, query, visibility) =>
    api.get(
      `/militaryranks/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getMilitaryranksAll = async (visibility) =>
    api.get(`/militaryranks?visibility=${visibility}`);
  static addMilitaryranks = async (value) => api.post(`/militaryranks`, value);
  static editMilitaryranks = async (value) =>
    api.put(`/militaryranks/${value?.id}`, value);
  static deleteMilitaryranks = async (id) => api.delete(`/militaryranks/${id}`);
  static militaryranksVisibility = async (data) =>
    api.patch(`/militaryranks/${data?.id}/visibility/${data?.checked}`);

  static getMilitarygroups = async (size, page, query, visibility) =>
    api.get(
      `/militarygroups/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getMilitarygroupsAll = async (visibility) =>
    api.get(`/militarygroups?visibility=${visibility}`);
  static addMilitarygroups = async (value) =>
    api.post(`/militarygroups`, value);
  static editMilitarygroups = async (value) =>
    api.put(`/militarygroups/${value?.id}`, value);
  static deleteMilitarygroups = async (id) =>
    api.delete(`/militarygroups/${id}`);
  static militarygroupsVisibility = async (data) =>
    api.patch(`/militarygroups/${data?.id}/visibility/${data?.checked}`);

  static getGeneralstructurestatuses = async (size, page, query, visibility) =>
    api.get(
      `/generalstructurestatuses/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getGeneralstructurestatusesAll = async (visibility) =>
    api.get(`/generalstructurestatuses?visibility=${visibility}`);
  static addGeneralstructurestatuses = async (value) =>
    api.post(`/generalstructurestatuses`, value);
  static editGeneralstructurestatuses = async (value) =>
    api.put(`/generalstructurestatuses/${value?.id}`, value);
  static deleteGeneralstructurestatuses = async (id) =>
    api.delete(`/generalstructurestatuses/${id}`);
  static generalstructurestatusesVisibility = async (data) =>
    api.patch(
      `/generalstructurestatuses/${data?.id}/visibility/${data?.checked}`
    );

  static getWorkschedules = async (size, page, query, visibility) =>
    api.get(
      `/workschedules/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getWorkschedulesAll = async (visibility) =>
    api.get(`/workschedules?visibility=${visibility}`);
  static addWorkschedules = async (value) => api.post(`/workschedules`, value);
  static editWorkschedules = async (value) =>
    api.put(`/workschedules/${value?.id}`, value);
  static deleteWorkschedules = async (id) => api.delete(`/workschedules/${id}`);
  static workschedulesVisibility = async (data) =>
    api.patch(`/workschedules/${data?.id}/visibility/${data?.checked}`);

  static getSpecializations = async (size, page, query, visibility) =>
    api.get(
      `/specializations/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getSpecializationsAll = async (visibility) =>
    api.get(`/specializations?visibility=${visibility}`);
  static addSpecializations = async (value) =>
    api.post(`/specializations`, value);
  static editSpecializations = async (value) =>
    api.put(`/specializations/${value?.id}`, value);
  static deleteSpecializations = async (id) =>
    api.delete(`/specializations/${id}`);
  static specializationsVisibility = async (data) =>
    api.patch(`/specializations/${data?.id}/visibility/${data?.checked}`);

  static getWarparticipants = async (size, page, query, visibility) =>
    api.get(
      `/warparticipants/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getWarparticipantsAll = async (visibility) =>
    api.get(`/warparticipants?visibility=${visibility}`);
  static addWarparticipants = async (value) =>
    api.post(`/warparticipants`, value);
  static editWarparticipants = async (value) =>
    api.put(`/warparticipants/${value?.id}`, value);
  static deleteWarparticipants = async (id) =>
    api.delete(`/warparticipants/${id}`);
  static warparticipantsVisibility = async (data) =>
    api.patch(`/warparticipants/${data?.id}/visibility/${data?.checked}`);

  static getGeneralstructuretypes = async (size, page, query, visibility) =>
    api.get(
      `/generalstructuretypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getGeneralstructuretypesAll = async (visibility) =>
    api.get(`/generalstructuretypes?visibility=${visibility}`);
  static addGeneralstructuretypes = async (value) =>
    api.post(`/generalstructuretypes`, value);
  static editGeneralstructuretypes = async (value) =>
    api.put(`/generalstructuretypes/${value?.id}`, value);
  static deleteGeneralstructuretypes = async (id) =>
    api.delete(`/generalstructuretypes/${id}`);
  static generalstructuretypesVisibility = async (data) =>
    api.patch(`/generalstructuretypes/${data?.id}/visibility/${data?.checked}`);

  static getEducationinstitutions = async (size, page, query, visibility) =>
    api.get(
      `/educationinstitutions/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getEducationinstitutionsAll = async (visibility) =>
    api.get(`/educationinstitutions?visibility=${visibility}`);
  static addEducationinstitutions = async (value) =>
    api.post(`/educationinstitutions`, value);
  static editEducationinstitutions = async (value) =>
    api.put(`/educationinstitutions/${value?.id}`, value);
  static deleteEducationinstitutions = async (id) =>
    api.delete(`/educationinstitutions/${id}`);
  static educationinstitutionsVisibility = async (data) =>
    api.patch(`/educationinstitutions/${data?.id}/visibility/${data?.checked}`);

  static getEducationpayments = async (size, page, query, visibility) =>
    api.get(
      `/educationPayments/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getEducationpaymentsAll = async (visibility) =>
    api.get(`/educationPayments?visibility=${visibility}`);
  static addEducationpayments = async (value) =>
    api.post(`/educationPayments`, value);
  static editEducationpayments = async (value) =>
    api.put(`/educationPayments/${value?.id}`, value);
  static deleteEducationpayments = async (id) =>
    api.delete(`/educationPayments/${id}`);
  static educationPaymentsVisibility = async (data) =>
    api.patch(`/educationPayments/${data?.id}/visibility/${data?.checked}`);

  static getEducationlevels = async (size, page, query, visibility) =>
    api.get(
      `/educationlevels/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getEducationlevelsAll = async (visibility) =>
    api.get(`/educationlevels?visibility=${visibility}`);
  static addEducationlevels = async (value) =>
    api.post(`/educationlevels`, value);
  static editEducationlevels = async (value) =>
    api.put(`/educationlevels/${value?.id}`, value);
  static deleteEducationlevels = async (id) =>
    api.delete(`/educationlevels/${id}`);
  static educationlevelsVisibility = async (data) =>
    api.patch(`/educationlevels/${data?.id}/visibility/${data?.checked}`);

  static getReprimandtypes = async (size, page, query, visibility) =>
    api.get(
      `/reprimandTypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getReprimandtypesAll = async (visibility) =>
    api.get(`/reprimandTypes?visibility=${visibility}`);
  static addReprimandtypes = async (value) =>
    api.post(`/reprimandTypes`, value);
  static editReprimandtypes = async (value) =>
    api.put(`/reprimandTypes/${value?.id}`, value);
  static deleteReprimandtypes = async (id) =>
    api.delete(`/reprimandTypes/${id}`);
  static reprimandTypesVisibility = async (data) =>
    api.patch(`/reprimandTypes/${data?.id}/visibility/${data?.checked}`);

  static getSpecialdays = async (size, page, query, visibility) =>
    api.get(
      `/specialdays/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  static getSpecialdaysAll = async (visibility) =>
    api.get(`/specialdays?visibility=${visibility}`);
  static addSpecialdays = async (value) => api.post(`/specialdays`, value);
  static editSpecialdays = async (value) =>
    api.put(`/specialdays/${value?.id}`, value);
  static deleteSpecialdays = async (id) => api.delete(`/specialdays/${id}`);
  static specialdaysVisibility = async (data) =>
    api.patch(`/specialdays/${data?.id}/visibility/${data?.checked}`);

  static getCategories = async (size, page, query, visibility) => {
    return await api.get(
      `/categories/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getCategoriesAll = async (visibility) => {
    return await api.get(`/categories?visibility=${visibility}`);
  };
  static addCategories = async (value) => {
    return await api.post(`/categories`, value);
  };
  static editCategories = async (value) => {
    return await api.put(`/categories/${value?.id}`, value);
  };
  static deleteCategories = async (id) => {
    return await api.delete(`/categories/${id}`);
  };
  static categoriesVisibility = async (data) => {
    return await api.patch(
      `/categories/${data?.id}/visibility/${data?.checked}`
    );
  };

  static getRegions = async (size, page, query, visibility) => {
    return await api.get(
      `/regions/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getRegionsAll = async (visibility) => {
    return await api.get(`/regions?visibility=${visibility}`);
  };
  static treeSelect = async () => {
    const response = await api.get(`/regions/${21}/page/${1}`);
    return response?.data;
  };
  static addRegions = async (value) => {
    return await api.post(`/regions`, value);
  };
  static editRegions = async (value) => {
    return await api.put(`/regions/${value?.id}`, value);
  };
  static deleteRegions = async (id) => {
    return await api.delete(`/regions/${id}`);
  };
  static regionsVisibility = async (data) => {
    return await api.patch(`/regions/${data?.id}/visibility/${data?.checked}`);
  };

  static getAreas = async (size, page, query, visibility) => {
    return await api.get(
      `/areas/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getAreasAll = async (visibility) => {
    return await api.get(`/areas?visibility=${visibility}`);
  };
  static addAreas = async (value) => {
    return await api.post(`/areas`, value);
  };
  static editAreas = async (value) => {
    return await api.put(`/areas/${value?.id}`, value);
  };
  static deleteAreas = async (id) => {
    return await api.delete(`/areas/${id}`);
  };
  static areasVisibility = async (data) => {
    return await api.patch(`/areas/${data?.id}/visibility/${data?.checked}`);
  };

  static getCompanies = async (size, page, query, visibility) => {
    return await api.get(
      `/companies/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getCompaniesAll = async (visibility) => {
    return await api.get(`/companies?visibility=${visibility}`);
  };
  static addCompanies = async (value) => {
    return await api.post(`/companies`, value);
  };
  static editCompanies = async (value) => {
    return await api.put(`/companies/${value?.id}`, value);
  };
  static deleteCompanies = async (id) => {
    return await api.delete(`/companies/${id}`);
  };
  static companiesVisibility = async (data) => {
    return await api.patch(
      `/companies/${data?.id}/visibility/${data?.checked}`
    );
  };

  static getPositions = async (size, page, query, visibility) => {
    return await api.get(
      `/positions/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getPositionsAll = async (visibility) => {
    return await api.get(`/positions?visibility=${visibility}`);
  };
  static addPositions = async (value) => {
    return await api.post(`/positions`, value);
  };
  static editPositions = async (value) => {
    return await api.put(`/positions/${value?.id}`, value);
  };
  static deletePositions = async (id) => {
    return await api.delete(`/positions/${id}`);
  };
  static positionsVisibility = async (data) => {
    return await api.patch(
      `/positions/${data?.id}/visibility/${data?.checked}`
    );
  };

  static getHalls = async (size, page, query, visibility) => {
    return await api.get(
      `/halls/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getHallsAll = async (visibility) => {
    return await api.get(`/halls?visibility=${visibility}`);
  };
  static addHalls = async (value) => {
    return await api.post(`/halls`, value);
  };
  static editHalls = async (value) => {
    return await api.put(`/halls/${value?.id}`, value);
  };
  static deleteHalls = async (id) => {
    return await api.delete(`/halls/${id}`);
  };
  static hallsVisibility = async (data) => {
    return await api.patch(`/halls/${data?.id}/visibility/${data?.checked}`);
  };
  static getDrivingcategories = async (size, page, query, visibility) => {
    return await api.get(
      `/drivingcategories/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getDrivingcategoriesAll = async (visibility) => {
    return await api.get(`/drivingcategories?visibility=${visibility}`);
  };
  static addDrivingcategories = async (value) => {
    return await api.post(`/drivingcategories`, value);
  };
  static editDrivingcategories = async (value) => {
    return await api.put(`/drivingcategories/${value?.id}`, value);
  };
  static deleteDrivingcategories = async (id) => {
    return await api.delete(`/drivingcategories/${id}`);
  };
  static drivingcategoriesVisibility = async (data) => {
    return await api.patch(
      `/drivingcategories/${data?.id}/visibility/${data?.checked}`
    );
  };

  static getEmployeeConfigurations = async (size, page, query, visibility) => {
    return await api.get(
      `/employeeconfigurations/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getEmployeeConfigurationsAll = async (visibility) => {
    return await api.get(`/employeeconfigurations?visibility=${visibility}`);
  };
  static addEmployeeConfigurations = async (data) => {
    console.log(data);
    return await api.post(`/employeeconfigurations`, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  static editEmployeeConfigurations = async (value) => {
    return await api.put(`/employeeconfigurations/${value?.id}`, value);
  };
  static deleteEmployeeConfigurations = async (id) => {
    return await api.delete(`/employeeconfigurations/${id}`);
  };
  static employeeConfigurationsVisibility = async (data) => {
    return await api.patch(
      `/employeeconfigurations/${data?.id}/visibility/${data?.checked}`
    );
  };
  static getContragenttypes = async (size, page, query, visibility) => {
    return await api.get(
      `/contragenttypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getContragenttypesAll = async (visibility) => {
    return await api.get(`/contragenttypes?visibility=${visibility}`);
  };
  static addContragenttypes = async (data) => {
    return await api.post(`/contragenttypes`, data, {
      headers: { "Content-Type": "application/json" },
    });
  };
  static editContragenttypes = async (value) => {
    return await api.put(`/contragenttypes/${value?.id}`, value);
  };
  static deleteContragenttypes = async (id) => {
    return await api.delete(`/contragenttypes/${id}`);
  };
  static contragenttypesVisibility = async (data) => {
    return await api.patch(
      `/contragenttypes/${data?.id}/visibility/${data?.checked}`
    );
  };

  // Contracttypes
  static getContracttypes = async (size, page, query, visibility) => {
    return await api.get(
      `/contracttypes/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getContracttypesAll = async (visibility) => {
    return await api.get(`/contracttypes?visibility=${visibility}`);
  };
  static addContracttypes = async (data) => {
    return await api.post(`/contracttypes`, data, {
      headers: { "Content-Type": "application/json" },
    });
  };
  static editContracttypes = async (value) => {
    return await api.put(`/contracttypes/${value?.id}`, value);
  };
  static deleteContracttypes = async (id) => {
    return await api.delete(`/contracttypes/${id}`);
  };
  static contracttypesVisibility = async (data) => {
    return await api.patch(
      `/contracttypes/${data?.id}/visibility/${data?.checked}`
    );
  };

  // Contractcurrencies
  static getContractcurrencies = async (size, page, query, visibility) => {
    return await api.get(
      `/contractcurrencies/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getContractcurrenciesAll = async (visibility) => {
    return await api.get(`/contractcurrencies?visibility=${visibility}`);
  };
  static addContractcurrencies = async (data) => {
    return await api.post(`/contractcurrencies`, data, {
      headers: { "Content-Type": "application/json" },
    });
  };
  static editContractcurrencies = async (value) => {
    return await api.put(`/contractcurrencies/${value?.id}`, value);
  };
  static deleteContractcurrencies = async (id) => {
    return await api.delete(`/contractcurrencies/${id}`);
  };
  static contractcurrenciesVisibility = async (data) => {
    return await api.patch(
      `/contractcurrencies/${data?.id}/visibility/${data?.checked}`
    );
  };

  // Orders
  static getOrders = async (size, page, query, visibility) => {
    return await api.get(
      `/orders/${size}/page/${page}?visibility=${visibility}&name=${query?.name}`
    );
  };
  static getOrdersAll = async (visibility) => {
    return await api.get(`/orders?visibility=${visibility}`);
  };
  static addOrders = async (data) => {
    return await api.post(`/orders`, data, {
      headers: { "Content-Type": "application/json" },
    });
  };
  static editOrders = async (value) => {
    return await api.put(`/orders/${value?.id}`, value);
  };
  static deleteOrders = async (id) => {
    return await api.delete(`/orders/${id}`);
  };
  static ordersVisibility = async (data) => {
    return await api.patch(
      `/orders/${data?.id}/visibility/${data?.checked}`
    );
  };
}
export default Services;
