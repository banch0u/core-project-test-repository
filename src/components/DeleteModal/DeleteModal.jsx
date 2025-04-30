import { Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";
import style from "./DeleteModal.module.scss";

const DeleteModal = ({ children, width, onCancel }) => {
  const { deleteModalVisible } = useSelector((state) => state.global);

  return (
    <Modal
      open={deleteModalVisible}
      width={width}
      onCancel={onCancel}
      okButtonProps={{
        style: { display: "none" },
      }}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      className={style.absolute}
      closable={false}
    >
      {children}
    </Modal>
  );
};

export default DeleteModal;
