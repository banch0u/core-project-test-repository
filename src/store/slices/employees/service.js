import api from "../../../utils/axios";

class Services {
  static getTransportEmployeesAll = async () => {
    const response = await api.get(`/employees/transport`);
    return response?.data;
  };
}

export default Services;
