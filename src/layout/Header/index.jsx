import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import ProfileOptions from "../../components/ProfileOptions";
import AppSelect from "./AppSelect";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const updateTheme = () => {
    const newTheme = localStorage.getItem("theme") || "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    window.addEventListener("themeChange", updateTheme);
    return () => window.removeEventListener("themeChange", updateTheme);
  }, []);

  return (
    <header className={style.header} data-no-invert>
      <AppSelect />
      <ProfileOptions />
    </header>
  );
};

export default Header;
