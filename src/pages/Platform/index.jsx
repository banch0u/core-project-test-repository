import React, { useEffect } from "react";
import style from "./index.module.scss";
import { entryData } from "./constant";

import { Link } from "react-router-dom";
import { getProfileInfo, scopes } from "../../store/slices/auth";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { DsgLogo, SettingsCogIcon, UserIcon } from "../../assets/icons";
import { SETTINGS_PERMISSIONS } from "../../utils/path";
import Logo from "../../assets/balakhaniLogo.png";
const Platform = () => {
  const dispatch = useDispatch();
  let rootUrl;
  if (window.location.hostname === "localhost") {
    rootUrl = "http://localhost:" + window.location.port;
  } else {
    rootUrl = window.location.origin;
  }
  const { scopesData } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(scopes());
    dispatch(getProfileInfo());
  }, []);

  return (
    <div className={style.platform}>
      <div className={style.logo}>
        {rootUrl.includes("balakhanioc") ? (
          <img src={Logo} alt="" />
        ) : localStorage.getItem("theme") === "dark" ? (
          <DsgLogo dark={true} />
        ) : (
          <DsgLogo />
        )}
      </div>
      <div className={style.buttons}>
        <h2 className={style.title}>Data Platform</h2>
        <div className={style.links}>
          {entryData?.map((item) => {
            if (scopesData === "*") {
              return (
                <Link to={item?.pathname} key={item?.id}>
                  {item?.icon}
                  <div data-no-invert>{item?.value}</div>
                </Link>
              );
            } else {
              if (!scopesData?.includes(item.scopes)) {
                return (
                  <div className={style.disableMenu} key={item?.id}>
                    {item?.icon}
                    <div data-no-invert>{item?.value}</div>
                  </div>
                );
              } else {
                return (
                  <Link to={item?.pathname} key={item?.id}>
                    {item?.icon}
                    <div data-no-invert>{item?.value}</div>
                  </Link>
                );
              }
            }
          })}
          <Link to={`${rootUrl}/accounts/private`}>
            <UserIcon />
            <div data-no-invert>Şəxsi kabinet</div>
          </Link>
        </div>
      </div>
      <div className={style.settings_button} data-no-invert-2>
        {scopesData === "*" ? (
          <Link to={`${rootUrl}/docflow/${SETTINGS_PERMISSIONS}`}>
            <SettingsCogIcon />
            <div data-no-invert>Tənzimləmələr</div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Platform;
