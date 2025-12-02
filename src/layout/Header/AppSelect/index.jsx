import React, { useMemo, useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Collapse } from "antd";
import { RightOutlined, SettingOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import { entryData } from "../../../pages/Platform/constant";
import Portal from "../../Portal";

const { Panel } = Collapse;

const AppSelect = () => {
  const location = useLocation();
  const { scopesData } = useSelector((state) => state.auth);

  const accordionRef = useRef(null);
  const dropdownRef = useRef(null);
  const [activeKey, setActiveKey] = useState([]);
  const [dropdownStyle, setDropdownStyle] = useState({});

  const filteredOptions = useMemo(() => {
    return entryData.filter(
      (item) =>
        item.scopes === "account" ||
        scopesData === "*" ||
        scopesData?.includes(item.scopes)
    );
  }, [scopesData]);
  const baseSegment = useMemo(() => {
    return window.location.pathname.split("/")[1];
  }, [location.pathname]);

  const active = useMemo(() => {
    return (
      filteredOptions.find((opt) => opt.pathname.includes(`/${baseSegment}`)) ||
      null
    );
  }, [filteredOptions, baseSegment]);

  useEffect(() => {
    const handleClickOutside = (e) => {
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
  }, []);

  useEffect(() => {
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
  }, [activeKey]);

  return (
    <div ref={accordionRef}>
      <Collapse
        bordered={false}
        activeKey={activeKey}
        onChange={(key) => setActiveKey(key)}
        expandIconPosition="end"
        expandIcon={({ isActive }) => (
          <div data-no-invert>
            <RightOutlined
              style={{
                transform: `rotate(${isActive ? 270 : 90}deg)`,
                transition: "transform 0.2s ease",
                color: "white",
                fontSize: "14px",
              }}
            />
          </div>
        )}
        className={style.accordion}>
        <Panel
          header={
            <div className={style.accordionHeader}>
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

      {activeKey.length > 0 && (
        <Portal>
          <div
            data-no-invert
            ref={dropdownRef}
            className={style.accordionBody}
            style={dropdownStyle}>
            {filteredOptions
              .filter((opt) => opt.pathname !== active?.pathname)
              .map((option) => (
                <a
                  key={option.id}
                  href={option.pathname}
                  className={`${style.accordionOption} ${
                    baseSegment === option.pathname.split("/")[1]
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
