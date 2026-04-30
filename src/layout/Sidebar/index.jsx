import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import style from "./index.module.scss";
import { Layout, Menu } from "antd";
import { DsgLogo, DsgLogoEmblem } from "../../assets/icons";
import { PLATFORM_PATH } from "../../utils/path";
import { useDispatch, useSelector } from "react-redux";
import api from "../../utils/axios";

const { Sider } = Layout;

const Sidebar = ({ items = [] }) => {
  const location = useLocation();
  const dispatch = useDispatch();
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);

  const [collapsed, setCollapsed] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [isDark, setIsDark] = useState(
    localStorage.getItem("theme") === "dark",
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
  }, [dispatch]);

  useEffect(() => {
    const fetchLogo = async () => {
      const filePath =
        companyInfo?.[0]?.filePath || companyInfo?.data?.[0]?.filePath;
      if (filePath) {
        const base64 = await getBase64FromURL(filePath);
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

  // ✅ if mainPage exists -> logo should NOT be a link
  const hasMainPage = useMemo(() => {
    return !!(companyInfo?.[0]?.mainPage || companyInfo?.data?.[0]?.mainPage);
  }, [companyInfo]);

  // --- FIX: compute selectedKey by exact segment match OR full-path prefix match, prefer the longest match
  const flatItems = useMemo(() => {
    const flatten = (arr) =>
      arr.flatMap((it) => (it?.children?.length ? flatten(it.children) : [it]));
    return flatten(items || []);
  }, [items]);

  const selectedKey = useMemo(() => {
    const rawPath = location.pathname || "/";
    const path = rawPath.replace(/\/+$/, "");

    const normalize = (s) => (typeof s === "string" ? s.trim() : "");
    const candidates = flatItems
      .map((it) => normalize(it?.key))
      .filter(Boolean);

    const isMatch = (key) => {
      if (key.startsWith("/")) {
        const nk = key.replace(/\/+$/, "");
        return path === nk || path.startsWith(nk + "/");
      }

      // Match if:
      // - exact:   /questionnaires
      // - child:   /questionnaires/inventoryBrands         (endsWith + more after)
      // - nested:  /budgets/questionnaires/budget-components
      return (
        path === `/${key}` || // exact
        path.endsWith(`/${key}`) || // ends with key (no children)
        path.includes(`/${key}/`) // 👈 key appears mid-path (has children)
      );
    };

    const matches = candidates
      .filter(isMatch)
      .sort((a, b) => b.length - a.length); // longest = most specific wins

    return matches[0];
  }, [location.pathname, flatItems]);

  // ✅ choose wrapper element (Link or div)
  const LogoWrapper = hasMainPage ? "div" : Link;
  const logoWrapperProps = hasMainPage
    ? { className: style.buttons }
    : { to: PLATFORM_PATH, className: style.buttons };

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
          selectedKeys={selectedKey ? [selectedKey] : []}
          className={style.menu}
        />
      </div>

      <LogoWrapper {...logoWrapperProps}>
        {collapsed ? (
          <div className={style.emblem}>
            <DsgLogoEmblem />
          </div>
        ) : imageSrc ? (
          <img src={imageSrc} alt="Company Logo" />
        ) : isDark ? (
          <DsgLogo dark />
        ) : (
          <DsgLogo />
        )}
      </LogoWrapper>

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
