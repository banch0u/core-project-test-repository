import React, { useEffect, useState, useCallback } from "react";
import style from "./index.module.scss";
import { entryData } from "./constant";

import { Link } from "react-router-dom";
import { getProfileInfo, scopes } from "../../store/slices/auth";
import { useSelector, useDispatch } from "react-redux";
import {
  DsgLogo,
  SettingsCogIcon,
  ConstructionRibbon,
} from "../../assets/icons";
import { SETTINGS_PERMISSIONS } from "../../utils/path";
import { getCompanyInfo } from "../../store/slices/companyInfo";
import api from "../../utils/axios";

const Platform = () => {
  const dispatch = useDispatch();
  const { scopesData } = useSelector((state) => state.auth);
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);

  const [imageSrc, setImageSrc] = useState(null);

  let rootUrl;
  if (window.location.hostname === "localhost") {
    rootUrl = "http://localhost:" + window.location.port;
  } else {
    rootUrl = window.location.origin;
  }

  const getBase64FromURL = useCallback(async (url) => {
    try {
      const res = await api.get(url);
      return res?.data;
    } catch (err) {
      console.error("Error loading logo:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    dispatch(scopes());
    dispatch(getProfileInfo());
    dispatch(getCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    const fetchLogo = async () => {
      if (companyInfo?.[0]?.filePath) {
        const base64 = await getBase64FromURL(companyInfo[0].filePath);
        setImageSrc(base64);
      }
    };
    fetchLogo();
  }, [companyInfo, getBase64FromURL]);

  return (
    <div className={style.platform}>
      <div className={style.logo}>
        {imageSrc ? (
          <img src={imageSrc} alt="Company Logo" />
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
            if (
              item.construction &&
              window.location.hostname.includes("intranet")
            ) {
              return null;
            }

            const isPrivate = item.scopes === "account";

            const ItemContent = (
              <>
                {item?.icon}
                <div data-no-invert>{item?.value}</div>
              </>
            );

            return (
              <div className={style.itemWrapper} key={item?.id}>
                {item?.construction && (
                  <span>
                    <ConstructionRibbon />
                  </span>
                )}
                {scopesData === "*" || isPrivate ? (
                  <Link to={item?.pathname}>{ItemContent}</Link>
                ) : !scopesData?.includes(item.scopes) ? (
                  <div className={style.disableMenu}>{ItemContent}</div>
                ) : (
                  <Link to={item?.pathname}>{ItemContent}</Link>
                )}
              </div>
            );
          })}
        </div>
      </div>
      <div className={style.settings_button} data-no-invert-2>
        {scopesData === "*" ? (
          <Link to={`${rootUrl}/docflow${SETTINGS_PERMISSIONS}`}>
            <SettingsCogIcon />
            <div data-no-invert>Tənzimləmələr</div>
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default Platform;
