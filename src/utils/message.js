import { notification } from "antd";

const playNotificationSound = async () => {
  const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2575/2575-preview.mp3");
  audio.type = "audio/mpeg"; // Audio format
  audio.preload = "auto";

  setTimeout(() => {
    audio.play().catch((error) => console.error("Audio play failed:", error));
  }, 400);
};


export const errorMessage = ({ value, placeMent }) => {
  return notification.error({
    message: "",
    description: value || "Serverdə problem baş verdi",
    placement: placeMent,
  });
};

export const succesMessage = (value) => {
  return notification.success({
    message: "",
    description: value || "Uğurla tamamlandı",
    placement: "topRight",
  });
};

export const infoMessageBottomRight = (value) => {
  playNotificationSound();
  return notification.info({
    message: "Yeni bildiriş",
    description: value || "Bildiriş",
    placement: "bottomRight",
  });
};
