import api from "../../../utils/axios";

class Services {
  static getNotifications = async (size, page) => {
    const response = await api.get(
      `/NotificationDetails/${size}/page/${page}`
    );
    return response?.data;
  };
  static readNotification = async (data) => {
    const response = await api.put(`/NotificationDetails`, data);
    return response?.data;
  };
  static readNotificationAll = async () => {
    const response = await api.put(`/NotificationDetails/ReadAll`, { id: "" });
    return response?.data;
  };
  static checkNotification = async () => {
    const response = await api.get(`/notificationusersettings/check`);
    return response?.data;
  };
  static getNotificationSettings = async () => {
    const response = await api.get(`/notificationusersettings`);
    return response?.data;
  };
  static editNotificationSettings = async (data) => {
    const response = await api.put(`/notificationusersettings`, data);
    return response?.data;
  };
}

export default Services;
