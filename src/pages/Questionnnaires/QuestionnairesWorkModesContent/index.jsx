import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import style from "../Questionnaires.module.scss";
import { Form, Layout } from "antd";
import { PlusIcon } from "../../../assets/icons";
import FormModal from "../../../components/FormModal";
import { useDispatch, useSelector } from "react-redux";
import Delete from "../../../components/Delete/Delete";
import DeleteModal from "../../../components/DeleteModal/DeleteModal";
import Success from "../../../components/Success/Success";
import {
  setDeleteModalVisible,
  setViewModalVisible,
} from "../../../store/slices/global";
import ViewModal from "../../../components/ViewModal";
import { getStreetColumns } from "./constant";

import Pagination from "../../../components/Pagination";
import ColSort from "../../../components/ColSort";
import { setPaginationLength } from "../../../helpers/paginationLength";
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import Table from "../../../components/Table";
import Filter from "../../../components/Filter";
import {
  addWorkModes,
  deleteWorkModes,
  editWorkModes,
  getWorkModes,
  workModesVisibility,
} from "../../../store/slices/questionnaire";
import Input from "../../../components/Input";
import text from "../../../translations/index.json";
import { useLang } from "../../../hooks/useLang";

const { Content } = Layout;
const { Item } = Form;
const QuestionnairesWorkModesContent = () => {
  const lang = useLang();
  const t = text?.[lang]?.pages?.questionnaires;
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-work-modes")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-work-modes"))
      : 20,
  );
  const [query, setQuery] = useState({ name: "" });
  const { loading, workModesRender } = useSelector((state) => state.global);

  const workModes = useSelector((state) => state.questionnaire.workModes);
  const paginationLength = setPaginationLength(
    workModes?.count,
    workModes?.size,
  );

  const onSubmit = useCallback(
    async (data) => {
      dispatch(addWorkModes(data));
    },
    [dispatch],
  );
  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
        fullname: record?.fullname,
        modeValue: record?.modeValue,
      };
      dispatch(editWorkModes(data));
    },
    [dispatch],
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(workModesVisibility(data_));
    },
    [dispatch],
  );
  const closeOnViewModal = useCallback(() => {
    dispatch(setViewModalVisible(false));
  }, [dispatch]);
  const onClickModal = () => {
    ref?.current?.open();
  };
  const onEditClick = useCallback((data) => {
    ref?.current?.setEdit(data);
  }, []);
  const onDelete = useCallback((id) => {
    setId(id);
  }, []);
  const handleColumnToggle = (checked, dataIndex) => {
    setSelectedColumns((prevSelected) => {
      if (checked) {
        return [...prevSelected, dataIndex];
      } else {
        return prevSelected.filter((col) => col !== dataIndex);
      }
    });
  };

  let data = [];
  if (workModes?.items) {
    data = workModes?.items?.map((dataObj, i) => ({
      num: workModes?.size * workModes?.page + i + 1 - workModes?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      fullname: dataObj?.fullname,
      modeValue: dataObj?.modeValue,
      isActive: dataObj?.isActive,
      className: "rowClassName1",
    }));
  }
  const columns = useMemo(
    () => getStreetColumns(t, onEditClick, onDelete, onStatusChange, dispatch),
    [t, onEditClick, onDelete, onStatusChange, dispatch],
  );
  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => col.dataIndex),
  );
  useEffect(() => {
    if (window.innerWidth >= 1900) {
      setInnerW(210);
    } else {
      setInnerW(155);
    }
    const data = {
      page: page,
      size: size,
      query: query,
      visibility: "nondeleted",
    };
    dispatch(getWorkModes(data));
  }, [dispatch, page, workModesRender, query, size]);
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-work-modes",
      JSON.stringify(newSize),
      {
        expires: 7,
      },
    ); // Save to cookies
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Layout className={style.layout}>
        <Content className={style.content}>
          <header className={style.header}>
            <Button onClick={onClickModal} color="green">
              <PlusIcon /> {t?.common?.addQuestionnaire}
            </Button>
            <Filter
              columns={columns}
              selectedColumns={selectedColumns}
              setQuery={setQuery}
              disabledElementCount={3}
              setPage={setPage}
            />
          </header>
        </Content>
        <Layout className={style.layout1}>
          <Content className={style.content}>
            <div className={style.table_header}>
              <h2>{t?.titles?.workMode}</h2>
              <div className={style.buttons}>
                <ColSort
                  columns={columns}
                  selectedColumns={selectedColumns}
                  handleColumnToggle={handleColumnToggle}
                />
              </div>
            </div>
            <div className="bigTable">
              <Table
                selectedColumns={selectedColumns}
                innerW={innerW}
                dataSource={data}
                columns={columns}
                disableDrag={true}
              />
            </div>
            <div className={style.pagination}>
              <Pagination
                size={size}
                setSize={updateSize}
                total={paginationLength}
                page={page}
                onChange={setPage}
              />
            </div>
            <FormModal
              ref={ref}
              width={454}
              title={t?.common?.createQuestionnaire}
              titleEdit={t?.common?.editQuestionnaire}
              okText={t?.common?.save}
              cancelText={t?.common?.close}
              onSubmit={onSubmit}
              onEdit={onEdit}
              className={"absolute"}
              centered={false}>
              <Item
                rules={[{ required: true, message: "" }]}
                name={"name"}
                label={t?.fields?.name}>
                <Input />
              </Item>
              <Item
                rules={[{ required: true, message: "" }]}
                name={"fullname"}
                label={t?.fields?.fullName}>
                <Input />
              </Item>
              <Item
                rules={[{ required: true, message: "" }]}
                name={"modeValue"}
                label={t?.fields?.modeValue}>
                <Input
                  type="number"
                  // className={style.modal_input}
                />
              </Item>
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteWorkModes(id))}
                onCancel={() => dispatch(setDeleteModalVisible(false))}
                value={t?.common?.questionnaireAcc}
              />
            </DeleteModal>
            <ViewModal onCancel={closeOnViewModal} width={695}>
              {<Success onClick={closeOnViewModal} value={t?.common?.questionnaire} />}
            </ViewModal>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default QuestionnairesWorkModesContent;
