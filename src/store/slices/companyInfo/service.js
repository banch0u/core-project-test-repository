import api from "../../../utils/axios";

class Services {
  static getCompanyInfo = async () => {
    const response = await api.get(`/companyinfos`);
    return response?.data;
  };
}

export default Services;
