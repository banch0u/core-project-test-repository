// hooks/useNotification.js
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { infoMessageBottomRight } from "../utils/message";

const useNotification = () => {
  const [notifications, setNotifications] = useState(() => {
    // localStorage'dan bildirimi başlat
    const savedNotifications = localStorage.getItem("notifications");
    return savedNotifications ? JSON.parse(savedNotifications) : [];
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    let baseUrl;
    if (window.location.hostname === "localhost") {

      baseUrl = process.env.REACT_APP_ROOT;
    } else {
      baseUrl = window.location.origin;
    }
    if (!token) {
      console.error("Token tapılmadı!");
      return;
    }

    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}/notify?token=${token}`, {
        transport:
          signalR.HttpTransportType.WebSockets,
        withCredentials: false,
        skipNegotiation: true,
      })
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection
      .start()
      .then(() => {
        console.log("SignalR bağlantısı quruldu.");
        connection.on("receive", (message) => {
          console.log("Yeni bildiriş:", message);
          infoMessageBottomRight(message);
        });
      })
      .catch((err) => console.error("SignalR bağlantısı qurula bilmədi:", err));

    return () => {
      connection.stop();
      console.log("SignalR bağlantısı bağlandı.");
    };
  }, []);

  return notifications;
};

export default useNotification;
