import React from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import QuestionnairesSidebar from "../QuestionnairesSidebar";
import style from "./index.module.scss";
const { Content } = Layout;

const QuestionnairesLayout = ({ allowed }) => {
  return (
    <Layout className={style.layout}>
      <QuestionnairesSidebar allowed={allowed} />
      <Content className={style.content}>
        <Outlet />
      </Content>
    </Layout>
  );
};

export default QuestionnairesLayout;
