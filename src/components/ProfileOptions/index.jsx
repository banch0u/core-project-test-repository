import React, { useEffect, useState, useRef } from "react";
import {
  Badge,
  Dropdown,
  Tooltip,
  Modal,
  Form,
  Input,
  Select as AntdSelect,
} from "antd";
import { SunOutlined } from "@ant-design/icons";
import style from "./index.module.scss";

import { useDispatch, useSelector } from "react-redux";
import {
  changePassword,
  getProfileInfo,
  scopes,
} from "../../store/slices/auth";
import {
  ChangePasswordIcon,
  LogOutIcon,
  MoonIcon,
  NotificationBell,
  SettingsCogIcon,
} from "../../assets/icons";
import { getNotifications } from "../../store/slices/notification";
import NotificationDropdown from "../NotificationDropdown";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATH } from "../../utils/path";
import Button from "../Button";
import Select from "../Select";
const { Option } = AntdSelect;
import { useLang } from "../../hooks/useLang";
import text from "../../translations/index.json";

const ProfileOptions = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const lang = useLang();
  const profileInfo = useSelector((state) => state.auth.profileInfo);
  const { notificationsRender } = useSelector((state) => state.global);
  const { scopesData } = useSelector((state) => state.auth);
  const loginType = useSelector((state) => state.auth.loginType);
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const [size, setSize] = useState(20);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const dropdownRef = useRef(null);

  // 🔥 Password modal state
  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [form] = Form.useForm();

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
      }}
      data-no-invert-1>
      <div className={style.icon_overlay}>
        <NotificationBell />
      </div>
    </Badge>
  );

  // --------------------------
  // 🔥 PASSWORD MODAL LOGIC
  // --------------------------
  const openPasswordModal = () => {
    setPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    form.resetFields();
    setPasswordModalOpen(false);
  };

  const handlePasswordSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const data = {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword,
        };

        dispatch(changePassword(data))
          .unwrap()
          .then((res) => {
            // 🔥 If backend returned 204 No Content → logout
            if (res?.status === 204) {
              closePasswordModal();
              handleLogout();
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  };

  // --------------------------

  return (
    <div className={style.profile}>
      <Select
        className={style.lang_select}
        popupClassName={style.lang_select_dropdown}
        suffixIcon={null}
        allowClear={false}
        showSearch={false}
        onChange={(val) => {
          localStorage.setItem("lang", val);
        }}
        value={lang}>
        <Option value="az">AZ</Option>
        <Option value="en">EN</Option>
        <Option value="ru">RU</Option>
      </Select>
      <Dropdown
        overlay={
          <NotificationDropdown
            size={size}
            page={page}
            setSize={setSize}
            setPage={setPage}
            lang={lang}
            text={text}
          />
        }
        trigger={["click"]}
        placement="bottomRight"
        overlayClassName={style.notificationDropdown}>
        <Tooltip title={text?.[lang]?.pages?.header?.notifications?.title}>
          <button data-no-invert className={style.button}>
            <NotificationIcon />
          </button>
        </Tooltip>
      </Dropdown>

      <Tooltip
        title={
          theme === "dark"
            ? text?.[lang]?.pages?.header?.lightMode
            : text?.[lang]?.pages?.header?.darkMode
        }>
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
              <Link className={style.menuItem} to={`${rootUrl}/settings`}>
                <SettingsCogIcon />
                <span>{text?.[lang]?.pages?.header?.settings}</span>
              </Link>
            )}

            {/* 🔥 CHANGE PASSWORD BUTTON */}
            {loginType === 0 ? (
              <div className={style.menuItem} onClick={openPasswordModal}>
                <ChangePasswordIcon />
                <span>
                  {text?.[lang]?.pages?.header?.changePassword?.title}
                </span>
              </div>
            ) : null}

            <div className={style.menuItem} onClick={handleLogout}>
              <LogOutIcon />
              <span className={style.logoutText}>
                {text?.[lang]?.pages?.header?.logOut}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* --------------------------
          🔥 PASSWORD MODAL UI
      -------------------------- */}
      <Modal
        open={isPasswordModalOpen}
        onCancel={closePasswordModal}
        footer={null}
        centered
        title={text?.[lang]?.pages?.header?.changePassword?.title}>
        <Form form={form} layout="vertical">
          <Form.Item
            label={text?.[lang]?.pages?.header?.changePassword?.oldPassword}
            name="currentPassword"
            rules={[{ required: true, message: "" }]}>
            <Input.Password style={{ height: "48px" }} />
          </Form.Item>
          <Form.Item
            label={text?.[lang]?.pages?.header?.changePassword?.newPassword}
            name="newPassword"
            rules={[
              { required: true, message: "" },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) return Promise.resolve();

                  const errors = [];

                  if (value.length < 8) {
                    errors.push(
                      text?.[lang]?.pages?.header?.changePassword?.hints
                        ?.passwordLength
                    );
                  }
                  if (!/[A-Z]/.test(value)) {
                    errors.push(
                      text?.[lang]?.pages?.header?.changePassword?.hints
                        ?.passwordUppercase
                    );
                  }
                  if (!/[a-z]/.test(value)) {
                    errors.push(
                      text?.[lang]?.pages?.header?.changePassword?.hints
                        ?.passwordLowercase
                    );
                  }
                  if (!/[0-9]/.test(value)) {
                    errors.push(
                      text?.[lang]?.pages?.header?.changePassword?.hints
                        ?.passwordDigit
                    );
                  }
                  if (!/[!@#$%^&*]/.test(value)) {
                    errors.push(
                      text?.[lang]?.pages?.header?.changePassword?.hints
                        ?.passwordSpecialChar
                    );
                  }

                  if (value && getFieldValue("currentPassword") === value) {
                    errors.push(
                      text?.[lang]?.pages?.header?.changePassword?.hints
                        ?.passwordDifferent
                    );
                  }

                  // 🔥 Return each message as its own Error → AntD shows them line by line
                  return errors.length
                    ? Promise.reject(errors.map((msg) => new Error(msg)))
                    : Promise.resolve();
                },
              }),
            ]}>
            <Input.Password style={{ height: "48px" }} />
          </Form.Item>

          <Form.Item
            label={
              text?.[lang]?.pages?.header?.changePassword
                ?.newPasswordConfirmation
            }
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    text?.[lang]?.pages?.header?.changePassword?.hints
                      ?.passwordMismatch
                  );
                },
              }),
            ]}>
            <Input.Password style={{ height: "48px" }} />
          </Form.Item>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              marginTop: "20px",
            }}>
            <Button
              className={style.cancelBtn}
              onClick={closePasswordModal}
              color="white">
              {text?.[lang]?.pages?.common?.cancel}
            </Button>

            <Button
              className={style.confirmBtn}
              onClick={handlePasswordSubmit}
              color="green">
              {text?.[lang]?.pages?.common?.confirm}
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileOptions;
