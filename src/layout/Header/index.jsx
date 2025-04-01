import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import { DsgLogo } from "../../assets/icons";
import ProfileOptions from "../../components/ProfileOptions";
import { Link } from "react-router-dom";
import { PLATFORM_PATH } from "../../utils/path";
import Logo from "../../assets/balakhaniLogo.png";

const Header = () => {
  const currentUrl = window.location.href;
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
    <header className={style.header}>
      <Link to={PLATFORM_PATH}>
        {currentUrl.includes("balakhanioc") ? (
          <img src={Logo} alt="Balakhani Logo" />
        ) : theme === "dark" ? (
          <DsgLogo dark={true} />
        ) : (
          <DsgLogo />
        )}
        111
      </Link>
      <ProfileOptions />
    </header>
  );
};

export default Header;
