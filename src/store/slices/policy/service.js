import api from "../../../utils/axios";

class Services {
  static checkPolicy = async (policy) => {
    try {
      const response = await api.post(`/profile/policycheck`, {
        policy: policy,
      });

      if (response?.status === 204) {
        return true;
      } else if (response?.status === 404) {
        return false;
      }
      return false;
    } catch (error) {
      if (error.response?.status === 404) {
        return false;
      }
      throw error;
    }
  };

  static checkPolicies = async (policies) => {
    const response = await api.post(`/profile/policiescheck`, {
      policies: policies,
    });

    // expected shape: { data: [{ name, hasAccess }], statusCode, isSuccess }
    return response?.data;
  };
}

export default Services;