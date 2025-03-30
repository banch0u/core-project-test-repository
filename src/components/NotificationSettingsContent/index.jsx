import React, { useCallback, useEffect, useState } from "react";
import { Form, Switch, Typography, Row, Col, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editNotificationSettings,
  getNotificationSettings,
} from "../../store/slices/notification";
import style from "./index.module.scss";
import Button from "../Button";

const { Title, Text } = Typography;
const { Option } = Select;

const labels = {
  internalIsActive: "Daxili bildirişlər",
  emailIsActive: "Email bildirişləri",
  visa: "Viza üçün",
  sign: "İmza üçün",
  reject: "İmtina üçün",
  print: "Çap üçün",
};

const projectOptions = {
  docFlowSettings: {
    label: "Sənəd Dövriyyəsi",
    keys: ["visa", "sign", "reject", "print"],
  },
  contractSettings: {
    label: "Müqavilələr",
    keys: ["visa", "sign", "reject"],
  },
};

const NotificationSettingsContent = React.forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const initialValues = useSelector(
    (state) => state.notification.notificationSettings
  );

  const [selectedProject, setSelectedProject] = useState("docFlowSettings");
  const [allValues, setAllValues] = useState({});

  useEffect(() => {
    dispatch(getNotificationSettings());
  }, [dispatch]);

  useEffect(() => {
    if (initialValues) {
      setAllValues(initialValues);
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  const handleSwitchChange = (namePath, checked) => {
    const updated = { ...allValues };
    let target = updated;

    namePath.forEach((key, i) => {
      if (i === namePath.length - 1) {
        target[key] = checked;
      } else {
        target[key] = { ...target[key] };
        target = target[key];
      }
    });

    setAllValues(updated);
    form.setFieldsValue(updated);
  };

  const renderSwitches = (type) => {
    return projectOptions[selectedProject].keys.map((key) => (
      <Col span={12} key={`${selectedProject}-${type}-${key}`}>
        <Form.Item
          className={style.inlineSwitch}
          label={<span className={style.formLabel}>{labels[key]}</span>}>
          <Switch
            checked={allValues?.[selectedProject]?.[type]?.[key] ?? false}
            onChange={(checked) =>
              handleSwitchChange([selectedProject, type, key], checked)
            }
          />
        </Form.Item>
      </Col>
    ));
  };
  const onSubmit = useCallback(
    (data) => {
      console.log(data, "ew");
      dispatch(editNotificationSettings(data));
    },
    [dispatch]
  );
  return (
    <div className={style.settingsWrapper}>
      {/* General Settings */}
      <Title level={5} className={style.sectionTitle}>
        Ümumi Bildiriş Ayarları
      </Title>
      <Row gutter={[40, 0]}>
        <Col span={12}>
          <Form.Item
            className={style.inlineSwitch}
            label={
              <span className={style.formLabel}>{labels.internalIsActive}</span>
            }>
            <Switch
              checked={allValues?.generalSettings?.internalIsActive ?? false}
              onChange={(checked) =>
                handleSwitchChange(
                  ["generalSettings", "internalIsActive"],
                  checked
                )
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            className={style.inlineSwitch}
            label={
              <span className={style.formLabel}>{labels.emailIsActive}</span>
            }>
            <Switch
              checked={allValues?.generalSettings?.emailIsActive ?? false}
              onChange={(checked) =>
                handleSwitchChange(
                  ["generalSettings", "emailIsActive"],
                  checked
                )
              }
            />
          </Form.Item>
        </Col>
      </Row>

      {/* Project Selector */}
      <Form.Item label="">
        <Select
          value={selectedProject}
          onChange={(val) => setSelectedProject(val)}
          className={style.modal_select}>
          {Object.entries(projectOptions).map(([key, { label }]) => (
            <Option key={key} value={key}>
              {label}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Text className={style.settingGroupTitle}>Daxili</Text>
      <Row gutter={[40, 0]}>{renderSwitches("internalSettings")}</Row>

      <Text className={style.settingGroupTitle}>Email</Text>
      <Row gutter={[40, 0]}>{renderSwitches("emailSettings")}</Row>

      <div className={style.next_buttons_}>
        <Button
          onClick={(e) => {
            ref?.current?.close?.();
            e.preventDefault();
          }}
          color={"white"}>
          Ləğv et
        </Button>
        <Button color="green" onClick={() => onSubmit(allValues)}>
          Yadda saxla
        </Button>
      </div>
    </div>
  );
});

export default NotificationSettingsContent;
