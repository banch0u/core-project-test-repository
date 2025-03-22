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

  const projects = ["", "Sənəd dövriyyəsi", "Kadrlar sistemi", "Müqavilələr", "Şəxsi kabinet"]
  let parsedValue;

  try {
    parsedValue = JSON.parse(value);
  } catch (e) {
    console.error('Failed to parse notification value:', e);
    parsedValue = { Text: value || "Bildiriş" };
  }
  const handleClick = () => {
    switch (parsedValue.Project) {
      case 1:
        window.location = `${window.location.origin}/docflow/document-circulation/unread-docs`
        break;
      case 2:
        window.location = `${window.location.origin}/hr/hr`
        break;
      case 3:
        window.location = `${window.location.origin}/contracts/unread-contract`
        break;
      case 4:
        window.location = `${window.location.origin}/accounts/private`
        break;
      default:
        break;
    }
  };
  return notification.info({
    message: projects[parsedValue.Project],
    description: parsedValue.Text || "Bildiriş",
    placement: "bottomRight",
    onClick: handleClick,
    style: { cursor: "pointer" },
  });
};