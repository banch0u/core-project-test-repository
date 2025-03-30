import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  readNotification,
  readNotificationAll,
} from "../../store/slices/notification";
import { Button, List, Tooltip, Typography } from "antd";
import { CheckOutlined, EyeOutlined, SettingOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import NotificationSettingsContent from "../NotificationSettingsContent";
import FormModal from "../FormModal";

const NotificationDropdown = ({ size, page, setSize, setPage }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(); // ⬅️ Modal ref
  const contentRef = useRef(); // ⬅️ NotificationSettingsContent ref

  const notifications = useSelector(
    (state) => state.notification.notifications
  );

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

  const handleRead = (id) => dispatch(readNotification({ id }));

  const handleReadAll = () => dispatch(readNotificationAll());

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
    setPage(1);
  };

  const onOpenModal = () => {
    contentRef?.current?.refresh?.(); // ⬅️ Trigger getNotificationSettings()
    modalRef?.current?.open?.(); // ⬅️ Open modal
  };
  const onCloseModal = () => {
    modalRef?.current?.close?.(); // ⬅️ Open modal
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
              onClick={onOpenModal}
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
                  item.isReaden ? style.read : style.unread
                }`}
                actions={[
                  !item.isReaden && (
                    <Tooltip title="Oxu">
                      <Button
                        size="small"
                        type="link"
                        icon={<EyeOutlined />}
                        onClick={() => handleRead(item.id)}
                      />
                    </Tooltip>
                  ),
                ]}>
                <List.Item.Meta
                  title={
                    <div
                      onClick={() =>
                        handleNotificationClick(item.text, item.id)
                      }
                      style={{ cursor: "pointer" }}>
                      {projects[parsed.Project] || "Bildiriş"}
                    </div>
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

      <FormModal ref={modalRef} width={695} showButtons={false}>
        <NotificationSettingsContent ref={contentRef} onClose={onCloseModal} />
      </FormModal>
    </>
  );
};

export default NotificationDropdown;
