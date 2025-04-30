import { Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const ViewModal = ({ children, width, onCancel, isEditing }) => {
  const { viewModalVisible } = useSelector((state) => state.global);

  return (
    <Modal
      centered
      okButtonProps={{
        style: { display: "none" },
      }}
      cancelButtonProps={{
        style: { display: "none" },
      }}
      width={width}
      open={viewModalVisible}
      onCancel={onCancel}>
      {children}
    </Modal>
  );
};

export default ViewModal;
