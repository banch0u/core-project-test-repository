import React, {
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
} from "react";
import { Form, Switch, Typography, Row, Col, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  editNotificationSettings,
  getNotificationSettings,
} from "../../store/slices/notification";
import { useLocation } from "react-router-dom";
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
  const location = useLocation();

  const initialValues = useSelector(
    (state) => state.notification.notificationSettings
  );
  console.log(initialValues);
  const getDefaultProjectFromPath = (path) => {
    if (path.includes("/contract")) return "contractSettings";
    return "docFlowSettings";
  };

  const [selectedProject, setSelectedProject] = useState(() =>
    getDefaultProjectFromPath(location.pathname)
  );
  const [allValues, setAllValues] = useState({});

  useImperativeHandle(ref, () => ({
    refresh: () => {
      const projectFromPath = getDefaultProjectFromPath(location.pathname);
      setSelectedProject(projectFromPath);
      dispatch(getNotificationSettings());
    },
  }));

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
    const updated = structuredClone(allValues);
    let target = updated;

    namePath.forEach((key, i) => {
      if (i === namePath.length - 1) {
        target[key] = checked;
      } else {
        target = target[key];
      }
    });

    // Toggle all child switches if general toggle is used
    if (
      namePath[0] === "generalSettings" &&
      (namePath[1] === "internalIsActive" || namePath[1] === "emailIsActive")
    ) {
      const typeToChange =
        namePath[1] === "internalIsActive"
          ? "internalSettings"
          : "emailSettings";

      Object.keys(projectOptions).forEach((projectKey) => {
        if (!updated[projectKey]) updated[projectKey] = {};
        if (!updated[projectKey][typeToChange])
          updated[projectKey][typeToChange] = {};

        projectOptions[projectKey].keys.forEach((key) => {
          updated[projectKey][typeToChange][key] = checked;
        });
      });
    }

    // If any child switch is turned ON → set general ON
    if (
      namePath.length === 3 &&
      (namePath[1] === "internalSettings" || namePath[1] === "emailSettings") &&
      checked === true
    ) {
      const generalKey =
        namePath[1] === "internalSettings"
          ? "internalIsActive"
          : "emailIsActive";

      if (!updated.generalSettings) updated.generalSettings = {};
      updated.generalSettings[generalKey] = true;
    }

    // If child turned OFF → check if all children are OFF → turn OFF general
    if (
      namePath.length === 3 &&
      (namePath[1] === "internalSettings" || namePath[1] === "emailSettings")
    ) {
      const type = namePath[1];
      const generalKey =
        type === "internalSettings" ? "internalIsActive" : "emailIsActive";

      let anyOn = false;

      Object.keys(projectOptions).forEach((projectKey) => {
        const settings = updated[projectKey]?.[type] || {};
        for (const key of projectOptions[projectKey].keys) {
          if (settings[key]) {
            anyOn = true;
            break;
          }
        }
      });

      if (!anyOn) {
        if (!updated.generalSettings) updated.generalSettings = {};
        updated.generalSettings[generalKey] = false;
      }
    }

    setAllValues(updated);
    form.setFieldsValue(updated);
  };

  const renderSwitches = (type) => {
    return projectOptions[selectedProject].keys.map((key) => (
      <Col span={6} key={`${selectedProject}-${type}-${key}`}>
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
      dispatch(editNotificationSettings(data));
      props?.onClose?.();
    },
    [dispatch, props]
  );

  return (
    <div className={style.settingsWrapper}>
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
      <Row gutter={[24, 24]}>{renderSwitches("internalSettings")}</Row>

      <Text className={style.settingGroupTitle}>Email</Text>
      <Row gutter={[24, 24]}>{renderSwitches("emailSettings")}</Row>

      <div className={style.next_buttons_}>
        <Button
          onClick={(e) => {
            props?.onClose?.();
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
