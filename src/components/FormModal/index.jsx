import { Form, Modal } from "antd";
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useState,
} from "react";
import { useSelector } from "react-redux";
import style from "./index.module.scss";
import Button from "../Button";
const FormModal = (
  {
    okText,
    cancelText,
    title,
    titleEdit,
    children,
    width,
    onSubmit,
    onEdit,
    showButtons = true,
    customForm,
    centered = true,
    className,
    onCloseModal,
    setKey,
    overlayClosable = true,
    closable = true,
  },
  ref
) => {
  const { useForm } = Form;
  const [form] = useForm();
  if (customForm) {
    customForm(form);
  }
  const [isVisible, setIsVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const loading = useSelector((state) => state.global.loading);
  useImperativeHandle(ref, () => ({
    open: () => {
      setIsVisible(true);
      setIsEditing(false);
      form.resetFields();
    },
    close: () => {
      closeModal();
    },
    setEdit: (data) => {
      setIsVisible(true);
      setIsEditing(true);
      form.setFieldsValue(data);
    },
    isEditing: () => {
      return isEditing;
    },
  }));
  const closeModal = () => {
    if (onCloseModal) onCloseModal();
    if (setKey) setKey((prevKey) => prevKey + 1);
    setIsVisible(false);
  };
  const onFormSubmit = useCallback(async () => {
    try {
      const data = form.getFieldsValue();

      if (isEditing && onEdit !== undefined) {
        await onEdit(form.getFieldValue("id"), data);
      } else {
        await onSubmit(data);
      }

      form.resetFields();
      setIsVisible(false);
    } catch (error) {
      console.log(error);
    }
  }, [form, isEditing, onEdit, onSubmit]);

  const onDelete = useCallback((id) => {
    onDelete(id);
  }, []);
  return (
    <Modal
      className={className === "absolute" ? style.absolute : null}
      open={isVisible}
      width={width}
      title={isEditing ? titleEdit : title}
      okText={okText}
      cancelText={cancelText}
      onOk={form.submit}
      onCancel={closeModal}
      maskClosable={overlayClosable}
      closable={closable}
      footer={
        showButtons ? (
          <div className={style.buttons}>
            <Button color="white" onClick={closeModal}>
              {cancelText}
            </Button>
            <Button color="green" onClick={form.submit}>
              {okText}
            </Button>
          </div>
        ) : null
      }
      centered={centered}>
      <Form
        disabled={loading}
        onFinish={onFormSubmit}
        form={form}
        layout="vertical"
        requiredMark={false}>
        {children}
      </Form>
    </Modal>
  );
};

export default forwardRef(FormModal);
