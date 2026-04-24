import React, { useEffect, useState } from "react";
import style from "./index.module.scss";
import ProfileOptions from "../../components/ProfileOptions";
import AppSelect from "./AppSelect";
import { useDispatch, useSelector } from "react-redux";
import { getLoginType } from "../../store/slices/auth";
import { getCompanyInfo } from "../../store/slices/companyInfo";
import LicenseWatermark from "../../components/LicenseWatermark/LicenseWatermark";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const dispatch = useDispatch();

  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);

  const pathname = window.location.pathname;

  useEffect(() => {
    const handler = () => setTheme(localStorage.getItem("theme") || "light");

    window.addEventListener("themeChange", handler);
    return () => window.removeEventListener("themeChange", handler);
  }, []);

  useEffect(() => {
    dispatch(getLoginType());
    dispatch(getCompanyInfo());
  }, [dispatch]);

  return (
    <header className={style.header} data-no-invert>
      <LicenseWatermark companyInfo={companyInfo} pathname={pathname} />
      <AppSelect mainPage={companyInfo?.[0]?.mainPage} />
      <ProfileOptions />
    </header>
  );
};

export default Header;
