import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import ProfileOptions from "../../components/ProfileOptions";
import AppSelect from "./AppSelect";
import { useDispatch } from "react-redux";
import { getLoginType } from "../../store/slices/auth";
import { getCompanyInfo } from "../../store/slices/companyInfo";
import { useSelector } from "react-redux";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch();
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);
  const updateTheme = () => {
    const newTheme = localStorage.getItem("theme") || "light";
    setTheme(newTheme);
  };

  useEffect(() => {
    window.addEventListener("themeChange", updateTheme);
    return () => window.removeEventListener("themeChange", updateTheme);
  }, []);
  useEffect(() => {
    dispatch(getLoginType());
    dispatch(getCompanyInfo());
  }, [dispatch]);
  return (
    <header className={style.header} data-no-invert>
      <AppSelect mainPage={companyInfo?.[0]?.mainPage} />
      <ProfileOptions />
    </header>
  );
};

export default Header;
