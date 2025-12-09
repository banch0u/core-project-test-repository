import React, { useEffect, useState, useRef } from "react";
import { Badge, Dropdown, Tooltip, Modal, Form, Input } from "antd";
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
              <Link className={style.menuItem} to={`${rootUrl}/settings`}>
                <SettingsCogIcon />
                <span>Tənzimləmələr</span>
              </Link>
            )}

            {/* 🔥 CHANGE PASSWORD BUTTON */}
            <div className={style.menuItem} onClick={openPasswordModal}>
              <ChangePasswordIcon />
              <span>Şifrəni dəyiş</span>
            </div>

            <div className={style.menuItem} onClick={handleLogout}>
              <LogOutIcon />
              <span className={style.logoutText}>Çıxış et</span>
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
        title="Şifrəni dəyiş">
        <Form form={form} layout="vertical">
          <Form.Item
            label="Köhnə şifrə"
            name="currentPassword"
            rules={[{ required: true, message: "" }]}>
            <Input.Password style={{ height: "48px" }} />
          </Form.Item>
          <Form.Item
            label="Yeni şifrə"
            name="newPassword"
            rules={[
              { required: true, message: "" },

              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value) return Promise.resolve();

                  const errors = [];

                  if (value.length < 8) {
                    errors.push("Şifrə ən azı 8 simvoldan ibarət olmalıdır");
                  }
                  if (!/[A-Z]/.test(value)) {
                    errors.push("Şifrə ən azı bir böyük hərf daxil etməlidir");
                  }
                  if (!/[a-z]/.test(value)) {
                    errors.push("Şifrə ən azı bir kiçik hərf daxil etməlidir");
                  }
                  if (!/[0-9]/.test(value)) {
                    errors.push("Şifrə ən azı bir rəqəm daxil etməlidir");
                  }
                  if (!/[!@#$%^&*]/.test(value)) {
                    errors.push(
                      "Şifrə ən azı bir xüsusi simvol daxil etməlidir (!@#$%^&*)"
                    );
                  }

                  if (value && getFieldValue("currentPassword") === value) {
                    errors.push("Yeni şifrə köhnə şifrə ilə eyni ola bilməz!");
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
            label="Yeni şifrənin təsdiqi"
            name="confirmPassword"
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Şifrələr uyğun deyil!");
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
              Geri
            </Button>

            <Button
              className={style.confirmBtn}
              onClick={handlePasswordSubmit}
              color="green">
              Təsdiqlə
            </Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfileOptions;
