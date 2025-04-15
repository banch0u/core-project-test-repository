import React, { useEffect, useCallback, useState } from "react";
import style from "./index.module.scss";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { DsgLogo } from "../../assets/icons";
import Loading from "../../components/Loading";
import { login } from "../../store/slices/auth";
import { useDispatch, useSelector } from "react-redux";
import AsanImza from "../../assets/icons/AsanImza.png";
import Sima from "../../assets/icons/Sima.png";
import Ldap from "../../assets/icons/Ldap.png";
import { getCompanyInfo } from "../../store/slices/companyInfo";
import api from "../../utils/axios"; // 💡 Make sure this points to your axios instance

const { Item: Label, useForm } = Form;
const { Password } = Input;

const Login = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loading = useSelector((state) => state.global.loading);
  const companyInfo = useSelector((state) => state.companyInfo.companyInfo);

  const [imageSrc, setImageSrc] = useState(null);

  const loginValue = useCallback(
    (formdata) => {
      const data = {
        formdata: formdata,
        navigate: navigate,
      };
      dispatch(login(data));
    },
    [dispatch, navigate]
  );

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
    dispatch(getCompanyInfo());
  }, [dispatch]);

  useEffect(() => {
    const fetchImage = async () => {
      if (companyInfo?.[0]?.filePath) {
        const base64 = await getBase64FromURL(companyInfo[0].filePath);
        setImageSrc(base64);
      }
    };

    fetchImage();
  }, [companyInfo, getBase64FromURL]);

  if (loading) return <Loading />;

  return (
    <div className={style.login}>
      <div className={style.logo}>
        {imageSrc ? (
          <img src={imageSrc} alt="Company Logo" />
        ) : localStorage.getItem("theme") === "dark" ? (
          <DsgLogo dark={true} />
        ) : (
          <DsgLogo />
        )}
      </div>
      <Form
        className={style.form}
        form={form}
        onFinish={loginValue}
        layout="vertical"
        requiredMark={false}>
        <h2 className={style.title}>Daxil ol</h2>
        <div className={style.control}>
          <Label
            name="username"
            rules={[{ required: true, message: "" }]}
            style={{ marginBottom: "20px" }}>
            <Input
              type="text"
              placeholder="İstifadəçi adı"
              className={style.control_input}
            />
          </Label>
        </div>
        <div className={style.control}>
          <Label
            name="password"
            rules={[{ required: true, message: "" }]}
            style={{ marginBottom: "4px" }}>
            <Password
              style={{ padding: 0 }}
              placeholder="Şifrə"
              className={style.control_input}
            />
          </Label>
        </div>
        <Link to={""}>Şifrəni unuttdun?</Link>
        <div className={style.button}>
          <div className={style.border} data-no-invert>
            <button type="submit">Daxil Ol</button>
          </div>
        </div>
        <div className={style.alternative_login}>
          <div>
            <div className={style.background}>
              <img src={AsanImza} alt="asan_imza" />
            </div>
            <h3>Asan imza</h3>
          </div>
          <div>
            <div className={style.background}>
              <img src={Sima} alt="sima" />
            </div>
            <h3>E-İmza</h3>
          </div>
          <div>
            <div className={style.background}>
              <img src={Ldap} alt="ldap" />
            </div>
            <h3>Ldap</h3>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default Login;
