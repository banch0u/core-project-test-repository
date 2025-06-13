import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import style from "./index.module.scss";
import { Layout, Menu } from "antd";
import { DsgLogo, DsgLogoEmblem } from "../../assets/icons";
import { PLATFORM_PATH } from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import { getCompanyInfo } from "../../store/slices/companyInfo";
import api from "../../utils/axios";

const { Sider } = Layout;

const Sidebar = ({ items = [] }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);

  const [collapsed, setCollapsed] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark"
  );

  const handleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    Cookies.set("sidebarCollapsed", newState, { expires: 7 });
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
    const sidebarState = Cookies.get("sidebarCollapsed") === "true";
    setCollapsed(sidebarState);

    dispatch(getCompanyInfo());
  }, [dispatch]);
  useEffect(() => {
    const fetchLogo = async () => {
      if (companyInfo?.[0]?.filePath) {
        const base64 = await getBase64FromURL(companyInfo[0].filePath);
        setImageSrc(base64);
      }
    };
    fetchLogo();
  }, [companyInfo, getBase64FromURL]);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDark(localStorage.getItem("theme") === "dark");
    };
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  const selectedKey = items
    .flatMap((item) => (item.children ? item.children : item))
    .find((item) => location.pathname.includes(item.key))?.key;

  return (
    <Sider
      width={287}
      collapsible
      collapsed={collapsed}
      collapsedWidth={64}
      trigger={null}
      className={style.sidebar}>
      <div className="sideBar">
        <Menu
          mode="inline"
          items={items}
          selectedKeys={[selectedKey]}
          className={style.menu}
        />
      </div>

      <Link to={PLATFORM_PATH} className={style.buttons}>
        {collapsed ? (
          <DsgLogoEmblem />
        ) : imageSrc ? (
          <img src={imageSrc} alt="Company Logo" />
        ) : isDark ? (
          <DsgLogo dark />
        ) : (
          <DsgLogo />
        )}
      </Link>

      <div
        data-no-invert
        className={style.collapseButton}
        onClick={handleCollapse}>
        {collapsed ? "->" : "<-"}
      </div>
    </Sider>
  );
};

export default Sidebar;
