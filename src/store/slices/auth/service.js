import api from "../../../utils/axios";


class AuthServices {
  static login = async (formdata) => {
    const response = await api.post("/profile/signin", formdata);
    return response?.data;
  };

  static refreshToken = async (token) => {
    const response = await api.post("/profile/refresh-token", token);

    return response?.data;
  };
  static getProfileInfo = async () => {
    const response = await api.get("/profile/info");
    return response?.data;
  };
}

export default AuthServices;
