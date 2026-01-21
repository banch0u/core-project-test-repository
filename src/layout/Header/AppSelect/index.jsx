import React, { useMemo, useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Collapse } from "antd";
import { RightOutlined, SettingOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import { useEntryData } from "../../../pages/Platform/constant";
import Portal from "../../Portal";

const { Panel } = Collapse;

// ✅ handles both absolute ("http://localhost:3004/contracts/...") and relative ("/contracts/...")
const getPathnameFromAny = (value) => {
  if (!value) return "";
  try {
    return new URL(value, window.location.origin).pathname || "";
  } catch {
    return String(value);
  }
};

const getFirstSegment = (value) => {
  const pathname = getPathnameFromAny(value);
  return (pathname.split("/")[1] || "").trim();
};

const AppSelect = ({ mainPage }) => {
  const location = useLocation();
  const { scopesData } = useSelector((state) => state.auth);

  const entryData = useEntryData();

  const accordionRef = useRef(null);
  const dropdownRef = useRef(null);

  const [activeKey, setActiveKey] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({});

  const isDisabled = !!mainPage;

  const filteredOptions = useMemo(() => {
    return (entryData || []).filter(
      (item) =>
        item.scopes === "account" ||
        scopesData === "*" ||
        scopesData?.includes(item.scopes)
    );
  }, [entryData, scopesData]);

  // ✅ IMPORTANT: use real browser path so basename won't hide "/contracts"
  const baseSegment = useMemo(() => {
    // dependency uses location.pathname to re-run on route changes
    return getFirstSegment(window.location.pathname || location.pathname || "");
  }, [location.pathname]);

  const active = useMemo(() => {
    // match by first segment (contracts, hr, docflow, settings...)
    const found = filteredOptions.find(
      (opt) => getFirstSegment(opt.pathname) === baseSegment
    );
    return found || null;
  }, [filteredOptions, baseSegment]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDisabled) return;

      if (
        accordionRef.current &&
        !accordionRef.current.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setActiveKey([]);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDisabled]);

  useEffect(() => {
    if (isDisabled) return;

    if (activeKey.length > 0 && accordionRef.current) {
      const rect = accordionRef.current.getBoundingClientRect();
      setDropdownStyle({
        position: "absolute",
        top: rect.bottom + window.scrollY + 4,
        left: rect.left + window.scrollX,
        width: rect.width,
        zIndex: 9999,
      });
    }
  }, [activeKey, isDisabled]);

  useEffect(() => {
    if (isDisabled) setActiveKey([]);
  }, [isDisabled]);

  return (
    <div ref={accordionRef}>
      <Collapse
        bordered={false}
        activeKey={isDisabled ? [] : activeKey}
        onChange={(key) => {
          if (isDisabled) return;
          setActiveKey(key);
        }}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <div data-no-invert>
            <RightOutlined
              style={{
                transform: `rotate(${!isDisabled && isActive ? 270 : 90}deg)`,
                transition: "transform 0.2s ease",
                color: "white",
                fontSize: "14px",
                opacity: isDisabled ? 0.5 : 1,
                cursor: isDisabled ? "not-allowed" : "pointer",
              }}
            />
          </div>
        )}
        className={style.accordion}>
        <Panel
          header={
            <div
              className={style.accordionHeader}
              style={{
                opacity: isDisabled ? 0.8 : 1,
                cursor: isDisabled ? "default" : "pointer",
              }}>
              {baseSegment === "settings" ? (
                <>
                  <div>
                    <SettingOutlined />
                  </div>
                  <span>Tənzimləmələr</span>
                </>
              ) : (
                <>
                  <div>{active?.icon}</div>
                  <span>{active?.value}</span>
                </>
              )}
            </div>
          }
          key="1"
        />
      </Collapse>

      {!isDisabled && activeKey.length > 0 && (
        <Portal>
          <div
            data-no-invert
            ref={dropdownRef}
            className={style.accordionBody}
            style={dropdownStyle}>
            {filteredOptions
              .filter((opt) => getFirstSegment(opt.pathname) !== baseSegment)
              .map((option) => (
                <a
                  key={option.id}
                  href={option.pathname}
                  className={`${style.accordionOption} ${
                    getFirstSegment(option.pathname) === baseSegment
                      ? style.selected
                      : ""
                  }`}>
                  {option.icon}
                  <span>{option.value}</span>
                </a>
              ))}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default AppSelect;
