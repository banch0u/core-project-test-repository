import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import style from "./index.module.scss";
import { Layout, Menu, Input } from "antd";

import {
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_APPLICATION_FORMS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_COUNTRIES,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_TYPES,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_WHOM,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_EXECUTION_RULES,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_ORGANIZATIONS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_STREETS,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_STRUCTURES,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_SUBTOPIC,
  DOCUMENT_CIRCULATION_QUESTIONNAIRES_TOPIC,
  SETTINGS_QUESTIONNAIRES_APPLICATION_FORMS,
  SETTINGS_QUESTIONNAIRES_COUNTRIES,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_TYPES,
  SETTINGS_QUESTIONNAIRES_DOCUMENT_WHOM,
  SETTINGS_QUESTIONNAIRES_EXECUTION_RULES,
  SETTINGS_QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
  SETTINGS_QUESTIONNAIRES_ORGANIZATIONS,
  SETTINGS_QUESTIONNAIRES_STREETS,
  SETTINGS_QUESTIONNAIRES_STRUCTURES,
  SETTINGS_QUESTIONNAIRES_SUBTOPIC,
  SETTINGS_QUESTIONNAIRES_TOPIC,
} from "../../utils/path";

import { SearchIcon } from "../../assets/icons";

const { Sider } = Layout;
const { SubMenu } = Menu;

const QuestionnairesSidebar = ({ selectedKey, allowed = [] }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const mainPath = `/${location.pathname.split("/")[1]}`;

  const items = [
    {
      key: "topic",
      label: "Mövzular",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_TOPIC
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_TOPIC,
    },
    {
      key: "subtopic",
      label: "Alt mövzular",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_SUBTOPIC
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_SUBTOPIC,
    },
    {
      key: "executionRules",
      label: "İcra qaydaları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_EXECUTION_RULES
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_EXECUTION_RULES,
    },
    {
      key: "document-recieve-methods",
      label: "Daxil olma yolları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_RECIEVE_METHODS,
    },
    {
      key: "documentType",
      label: "Sənəd Növləri",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_DOCUMENT_TYPES
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_TYPES,
    },
    {
      key: "country",
      label: "Ölkələr",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_COUNTRIES
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_COUNTRIES,
    },
    {
      key: "street",
      label: "Küçələr",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_STREETS
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_STREETS,
    },
    {
      key: "organization",
      label: "Təşkilatlar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_ORGANIZATIONS
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_ORGANIZATIONS,
    },
    {
      key: "structure",
      label: "Strukturlar",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_STRUCTURES
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_STRUCTURES,
    },
    {
      key: "application_form",
      label: "Müraciət formaları",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_APPLICATION_FORMS
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_APPLICATION_FORMS,
    },
    {
      key: "document_whom",
      label: "Şəxslər",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_DOCUMENT_WHOM
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_DOCUMENT_WHOM,
    },
    {
      key: "margin_note_texts",
      label: "Dərkənar mətni",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_MARGIN_NOTE_TEXTS
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
    },
    {
      key: "brands",
      label: "Brendlər",
      link:
        mainPath === "/settings"
          ? SETTINGS_QUESTIONNAIRES_MARGIN_NOTE_TEXTS
          : DOCUMENT_CIRCULATION_QUESTIONNAIRES_MARGIN_NOTE_TEXTS,
    },
  ];

  const sortedItems = items.sort((a, b) => a.label.localeCompare(b.label));

  const filteredItems = sortedItems.filter(
    (item) =>
      item.label.toLowerCase().includes(searchQuery.toLowerCase()) &&
      allowed[item.key] // ✅ Check if allowed true
  );

  const defaultOpenKeys = items
    .filter(
      (item) =>
        item.children &&
        item.children.some((child) => child.key === selectedKey)
    )
    .map((item) => item.key);

  const renderMenuItems = (items) =>
    items.map((item) => (
      <Menu.Item key={item.key} icon={item.icon}>
        <Link to={item.link}>{item.label}</Link>
      </Menu.Item>
    ));

  return (
    <Sider width={256} className={style.sidebar}>
      <div className={style.logo}>
        <h2>Soraqçalar</h2>
      </div>
      <div className={style.search}>
        <Input
          onChange={(e) => setSearchQuery(e?.target?.value)}
          placeholder="Axtar"
          className={style.search_input}
          suffix={
            <div className={style.search_icon}>
              <SearchIcon />
            </div>
          }
        />
      </div>
      <div
        className="questionnaires_menu"
        style={{
          overflowY: "auto",
          maxHeight: "calc(100vh - 325px)",
        }}>
        <Menu
          defaultSelectedKeys={[selectedKey]}
          defaultOpenKeys={defaultOpenKeys}
          className={style.menu}>
          {renderMenuItems(filteredItems)}
        </Menu>
      </div>
    </Sider>
  );
};

export default QuestionnairesSidebar;
