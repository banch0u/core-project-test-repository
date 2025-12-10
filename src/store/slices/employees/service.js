import api from "../../../utils/axios";

class Services {
  static getTransportEmployeesAll = async () => {
    const response = await api.get(`/employees/transport`);
    return response?.data;
  };
  static getExecutiveMembersAll = async () => {
    const response = await api.get(`/permissions/executiveMembers`);
    return response?.data;
  };
}

export default Services;
