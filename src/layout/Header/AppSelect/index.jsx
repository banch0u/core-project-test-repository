import React, { useMemo, useRef, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Collapse } from "antd";
import { RightOutlined } from "@ant-design/icons";
import style from "./index.module.scss";
import { entryData } from "../../../pages/Platform/constant";

const { Panel } = Collapse;

const AppSelect = () => {
  const location = useLocation();
  const { scopesData } = useSelector((state) => state.auth);

  const accordionRef = useRef(null);
  const [activeKey, setActiveKey] = useState([]); // manage open/close state

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
      filteredOptions[0]
    );
  }, [filteredOptions, baseSegment]);

  // ✨ Outside click listener
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (accordionRef.current && !accordionRef.current.contains(e.target)) {
        setActiveKey([]); // collapse if clicked outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
              <div>{active?.icon}</div>
              <span>{active?.value}</span>
            </div>
          }
          key="1">
          <div className={style.accordionBody}>
            {filteredOptions
              .filter((opt) => opt.pathname !== active?.pathname)
              .map((option) => (
                <a
                  key={option.id}
                  href={option.pathname}
                  className={style.accordionOption}>
                  {option.icon}
                  <span>{option.value}</span>
                </a>
              ))}
          </div>
        </Panel>
      </Collapse>
    </div>
  );
};

export default AppSelect;
