import { useEffect, useState } from "react";

const LANG_KEY = "lang";
const DEFAULT_LANG = "az";

const getLang = () => localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

export function useLang() {
  const [lang, setLang] = useState(getLang);

  useEffect(() => {
    setLang(getLang());

    const onStorage = (e) => {
      if (e.key === LANG_KEY) setLang(e.newValue || DEFAULT_LANG);
    };
    window.addEventListener("storage", onStorage);

    const origSetItem = localStorage.setItem.bind(localStorage);
    const origRemoveItem = localStorage.removeItem.bind(localStorage);

    localStorage.setItem = (key, value) => {
      origSetItem(key, value);
      if (key === LANG_KEY) setLang(value || DEFAULT_LANG);
    };

    localStorage.removeItem = (key) => {
      origRemoveItem(key);
      if (key === LANG_KEY) setLang(DEFAULT_LANG);
    };

    return () => {
      window.removeEventListener("storage", onStorage);
      localStorage.setItem = origSetItem;
      localStorage.removeItem = origRemoveItem;
    };
  }, []);

  return lang;
}
