import { useEffect, useState } from "react";

const LANG_KEY = "lang";
const DEFAULT_LANG = "az";

const getLang = () => localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

// localStorage is patched once and every useLang instance subscribes to it.
// Patching per instance broke when components unmounted out of order: an unmounting
// child restored a setItem that predated its parent's patch, so the parent stopped updating.
const listeners = new Set();
let patched = false;

const notify = (value) => listeners.forEach((listener) => listener(value || DEFAULT_LANG));

const patchStorage = () => {
  if (patched) return;
  patched = true;

  const origSetItem = localStorage.setItem.bind(localStorage);
  const origRemoveItem = localStorage.removeItem.bind(localStorage);

  localStorage.setItem = (key, value) => {
    origSetItem(key, value);
    if (key === LANG_KEY) notify(value);
  };

  localStorage.removeItem = (key) => {
    origRemoveItem(key);
    if (key === LANG_KEY) notify(DEFAULT_LANG);
  };

  window.addEventListener("storage", (e) => {
    if (e.key === LANG_KEY) notify(e.newValue);
  });
};

export function useLang() {
  const [lang, setLang] = useState(getLang);

  useEffect(() => {
    patchStorage();
    setLang(getLang());
    listeners.add(setLang);
    return () => {
      listeners.delete(setLang);
    };
  }, []);

  return lang;
}
