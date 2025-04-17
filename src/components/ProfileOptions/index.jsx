import React, { useEffect, useState, useRef } from "react";
import { Badge, Dropdown, Tooltip } from "antd";
import { SunOutlined } from "@ant-design/icons";
import style from "./index.module.scss";

import { useDispatch, useSelector } from "react-redux";
import { getProfileInfo, scopes } from "../../store/slices/auth";
import {
  LogOutIcon,
  MoonIcon,
  NotificationBell,
  SettingsCogIcon,
} from "../../assets/icons";
import { getNotifications } from "../../store/slices/notification";
import NotificationDropdown from "../NotificationDropdown";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATH, SETTINGS_PERMISSIONS } from "../../utils/path";

const ProfileOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const profileInfo = useSelector((state) => state.auth.profileInfo);
  const { notificationsRender } = useSelector((state) => state.global);
  const { scopesData } = useSelector((state) => state.auth);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );

  const [size, setSize] = useState(20);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const dropdownRef = useRef(null); // for click outside

  useEffect(() => {
    dispatch(scopes());
    dispatch(getProfileInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNotifications({ size, page }));
  }, [dispatch, size, page, notificationsRender]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.dispatchEvent(new Event("themeChange"));
  };

  const toggleAccordion = () => setOpen(!open);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    navigate(LOGIN_PATH);
  };

  let rootUrl;
  if (window.location.hostname === "localhost") {
    rootUrl = "http://localhost:" + window.location.port;
  } else {
    rootUrl = window.location.origin;
  }

  const NotificationIcon = () => (
    <Badge
      count={notifications?.notReadenCount}
      style={{
        fontSize: "10px",
        height: "16px",
        minWidth: "16px",
        lineHeight: "16px",
        padding: "0 4px",
      }}>
      <div className={style.icon_overlay} data-no-invert>
        <NotificationBell />
      </div>
    </Badge>
  );

  return (
    <div className={style.profile}>
      <Dropdown
        overlay={
          <NotificationDropdown
            size={size}
            page={page}
            setSize={setSize}
            setPage={setPage}
          />
        }
        trigger={["click"]}
        placement="bottomRight"
        overlayClassName={style.notificationDropdown}>
        <Tooltip title={"Bildirişlər"}>
          <button data-no-invert className={style.button}>
            <NotificationIcon />
          </button>
        </Tooltip>
      </Dropdown>

      <Tooltip title={theme === "dark" ? "Gündüz modu" : "Gecə modu"}>
        <button onClick={toggleTheme} data-no-invert className={style.button}>
          <div className={style.icon_overlay} data-no-invert>
            {theme === "dark" ? (
              <div data-no-invert>
                <SunOutlined style={{ color: "#035FB5" }} />
              </div>
            ) : (
              <MoonIcon />
            )}
          </div>
        </button>
      </Tooltip>

      <div className={style.profile} ref={dropdownRef}>
        <div
          className={style.profileHeader}
          style={{ borderRadius: open ? "8px 8px 0px 0px" : "8px" }}
          onClick={toggleAccordion}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <div className={style.pp}>{profileInfo?.name?.[0]}</div>
            <div className={style.name}>
              {profileInfo?.name} {profileInfo?.surname}
            </div>
          </div>
          <div className={`${style.arrow} ${open ? style.open : ""}`} />
        </div>

        {open && (
          <div className={style.profileDropdown}>
            {scopesData === "*" && (
              <Link
                className={style.menuItem}
                to={`${rootUrl}/docflow${SETTINGS_PERMISSIONS}`}>
                <SettingsCogIcon />
                <span>Tənzimləmələr</span>
              </Link>
            )}
            <div className={style.menuItem} onClick={handleLogout}>
              <LogOutIcon />
              <span className={style.logoutText}>Çıxış et</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileOptions;
