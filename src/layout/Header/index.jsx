import React, { useEffect, useState, useCallback } from "react";
import style from "./index.module.scss";
import { DsgLogo } from "../../assets/icons";
import ProfileOptions from "../../components/ProfileOptions";
import { Link } from "react-router-dom";
import { PLATFORM_PATH } from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo } from "../../store/slices/companyInfo";
import api from "../../utils/axios";

const Header = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [imageSrc, setImageSrc] = useState(null);
  const dispatch = useDispatch();
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);

  const updateTheme = () => {
    const newTheme = localStorage.getItem("theme") || "light";
    setTheme(newTheme);
  };

  const getBase64FromURL = useCallback(async (url) => {
    try {
      const res = await api.get(url);
      return res?.data;
    } catch (err) {
      console.error("Error loading logo:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    dispatch(getCompanyInfo());
    window.addEventListener("themeChange", updateTheme);
    return () => window.removeEventListener("themeChange", updateTheme);
  }, [dispatch]);

  useEffect(() => {
    const fetchImage = async () => {
      if (companyInfo?.[0]?.filePath) {
        const base64 = await getBase64FromURL(companyInfo[0].filePath);
        setImageSrc(base64);
      }
    };

    fetchImage();
  }, [companyInfo, getBase64FromURL]);

  return (
    <header className={style.header}>
      <Link to={PLATFORM_PATH}>
        {imageSrc ? (
          <img src={imageSrc} alt="Company Logo" />
        ) : theme === "dark" ? (
          <DsgLogo dark />
        ) : (
          <DsgLogo />
        )}
      </Link>
      <ProfileOptions />
    </header>
  );
};

export default Header;
