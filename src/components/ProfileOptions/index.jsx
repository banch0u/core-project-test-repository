import React, { useEffect, useState } from "react";
import { Badge, Dropdown, Menu, Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import { BellOutlined } from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileInfo, scopes } from "../../store/slices/auth";
import { entryData } from "../../pages/Platform/constant";
import { CategoryIcon, UserIcon } from "../../assets/icons";
import { getNotifications } from "../../store/slices/notification";
import NotificationDropdown from "../NotificationDropdown";

const ProfileOptions = () => {
  const dispatch = useDispatch();
  const { scopesData } = useSelector((state) => state.auth);
  const profileInfo = useSelector((state) => state.auth.profileInfo);
  const { notificationsRender } = useSelector((state) => state.global);
  const [size, setSize] = useState(20);
  const [page, setPage] = useState(1);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    window.dispatchEvent(new Event("themeChange"));
  };
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
      <BellOutlined style={{ fontSize: "20px" }} />
    </Badge>
  );
  useEffect(() => {
    dispatch(scopes());
    dispatch(getProfileInfo());
  }, [dispatch]);
  useEffect(() => {
    dispatch(getNotifications({ size, page }));
  }, [dispatch, size, page, notificationsRender]);

  const rootUrl = window.location.origin;

  const menu1 = (
    <Menu>
      <div className={style.links}>
        {entryData?.map((item) =>
          scopesData === "*" || scopesData?.includes(item.scopes) ? (
            <Link to={item?.pathname} key={item?.id}>
              {item?.icon}
              {item?.value}
            </Link>
          ) : (
            <div className={style.disableMenu} key={item?.id}>
              {item?.icon}
              {item?.value}
            </div>
          )
        )}
        <Link to={`${rootUrl}/accounts`}>
          <UserIcon />
          Şəxsi kabinet
        </Link>
      </div>
    </Menu>
  );
  return (
    <div className={style.profile}>
      <Tooltip title={theme === "dark" ? "Gündüz modu" : "Gecə modu"}>
        <button onClick={toggleTheme} data-no-invert className={style.button}>
          {theme === "dark" ? <SunOutlined /> : <MoonOutlined />}
        </button>
      </Tooltip>
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
      <Dropdown overlay={menu1} trigger={["click"]}>
        <div className={style.category} data-no-invert-1>
          <CategoryIcon />
        </div>
      </Dropdown>
      <div className={style.dropdown}>
        <div className={style.pp} data-no-invert>
          {profileInfo?.name[0]}
        </div>
        <div>
          <div className={style.name}>
            {profileInfo?.name} {profileInfo?.surname}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOptions;
