import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";
import { infoMessageBottomRight } from "../utils/message";
import { setNotificationsRender } from "../store/slices/global";
import store from "../store/store"; // ⬅️ Import your Redux store explicitly

const useNotification = () => {
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
        transport: signalR.HttpTransportType.WebSockets,
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
          store.dispatch(setNotificationsRender());
          infoMessageBottomRight(message);
        });
      })
      .catch((err) => console.error("SignalR bağlantısı qurula bilmədi:", err));

    return () => {
      connection.stop();
      console.log("SignalR bağlantısı bağlandı.");
    };
  }, []);

};

export default useNotification;
