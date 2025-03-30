import React, { useCallback, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readNotification,
  readNotificationAll,
} from "../../store/slices/notification";
import { Button, Form, List, Typography } from "antd";
import { CheckOutlined, EyeOutlined, SettingOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import style from "./index.module.scss";
import NotificationSettingsContent from "../NotificationSettingsContent";
import FormModal from "../FormModal";

const NotificationDropdown = ({ size, page, setSize, setPage }) => {
  const dispatch = useDispatch();
  const ref = useRef();
  const notifications = useSelector(
    (state) => state.notification.notifications
  );
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const notReadenCount = notifications?.notReadenCount;
  const totalCount = notifications?.totalCount;
  const items = notifications?.notifications?.items || [];

  const hasMore = items.length < totalCount;

  const projects = [
    "",
    "Sənəd dövriyyəsi",
    "Kadrlar sistemi",
    "Müqavilələr",
    "Şəxsi kabinet",
  ];

  const parseNotification = (value) => {
    try {
      return JSON.parse(value);
    } catch (e) {
      console.error("Invalid JSON in notification:", value);
      return { Text: value };
    }
  };

  const onOpenModal = () => {
    ref?.current?.open();
  };
  const handleRead = (id) => {
    return dispatch(readNotification({ id }));
  };

  const handleReadAll = () => {
    dispatch(readNotificationAll());
  };

  const handleNotificationClick = async (value, id) => {
    const parsed = parseNotification(value);
    await handleRead(id);

    const redirectByProject = {
      1: "/docflow/document-circulation/unread-docs",
      2: "/hr/hr",
      3: "/contracts/unread-contract",
      4: "/accounts/private",
    };

    const url = redirectByProject[parsed.Project];
    if (url) {
      window.location.href = `${window.location.origin}${url}`;
    }
  };

  const handleLoadMore = () => {
    const newSize = size + 20;
    setSize(newSize);
    setPage(1); // always use page 1 when growing size
  };

  return (
    <>
      <div className={style.dropdownWrapper}>
        <div className={style.header}>
          <Typography.Text strong>Bildirişlər ({totalCount})</Typography.Text>
          <div className={style.headerActions}>
            {notReadenCount > 0 && (
              <Button
                size="small"
                icon={<CheckOutlined />}
                onClick={handleReadAll}
                type="text">
                Hamısını oxu
              </Button>
            )}
            <Button
              size="small"
              icon={<SettingOutlined />}
              type="text"
              onClick={() => onOpenModal()}
            />
          </div>
        </div>

        <List
          dataSource={items}
          locale={{ emptyText: "Bildiriş yoxdur" }}
          renderItem={(item) => {
            const parsed = parseNotification(item.text);
            return (
              <List.Item
                className={`${style.notificationItem} ${
                  !item.read ? style.unread : ""
                }`}
                actions={[
                  !item.read && (
                    <Button
                      size="small"
                      type="link"
                      icon={<EyeOutlined />}
                      onClick={() => handleRead(item.id)}
                    />
                  ),
                ]}>
                <List.Item.Meta
                  title={
                    <span
                      onClick={() =>
                        handleNotificationClick(item.text, item.id)
                      }
                      style={{ cursor: "pointer" }}>
                      {projects[parsed.Project] || "Bildiriş"}
                    </span>
                  }
                  description={
                    <div
                      className={style.ellipsisText}
                      onClick={() =>
                        handleNotificationClick(item.text, item.id)
                      }
                      style={{ cursor: "pointer" }}>
                      {parsed.Text || "Bildiriş"}
                    </div>
                  }
                />
              </List.Item>
            );
          }}
        />

        {hasMore && (
          <div className={style.loadMore}>
            <Button size="small" type="text" onClick={handleLoadMore}>
              Daha çox göstər
            </Button>
          </div>
        )}
      </div>
      <FormModal ref={ref} width={695} showButtons={false}>
        <NotificationSettingsContent ref={ref} />
      </FormModal>
    </>
  );
};

export default NotificationDropdown;
