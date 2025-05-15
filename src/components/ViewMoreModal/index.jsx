import { Modal } from "antd";
import React from "react";
import { useSelector } from "react-redux";

const ViewMoreModal = ({ children, width, onCancel, isEditing }) => {
  const { viewMoreModalVisible } = useSelector((state) => state.global);

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
      open={viewMoreModalVisible}
      onCancel={onCancel}
    >
      {children}
    </Modal>
  );
};

export default ViewMoreModal;
