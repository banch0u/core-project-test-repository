import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import style from "../Questionnaires.module.scss";
import { Form, Input, Layout, Select as AntdSelect } from "antd";
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
  addField,
  deleteField,
  editField,
  fieldVisibility,
  getField,
} from "../../../store/slices/questionnaire";
import Select from "../../../components/Select";
import { typeENUM } from "../../../helpers/enums";
const { Content } = Layout;
const { Item } = Form;
const { Option } = AntdSelect;
const QuestionnairesFieldContent = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-extra-services")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-extra-services"))
      : 20,
  );
  const [query, setQuery] = useState({ name: "" });

  const { loading, fieldsRender } = useSelector((state) => state.global);

  const fields = useSelector((state) => state.questionnaire.fields);

  const paginationLength = setPaginationLength(fields?.count, fields?.size);
  const onSubmit = useCallback(
    async (data) => {
      dispatch(addField({ ...data }));
    },
    [dispatch],
  );
  const onEdit = useCallback(
    (id, record) => {
      console.log(record);
      const data = {
        id: id,
        name: record?.name,
        type: record?.type,
      };
      dispatch(editField(data));
    },
    [dispatch],
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(fieldVisibility(data_));
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
  const idFinder = (id) => {
    return typeENUM.find((item) => item.id === id)?.text;
  };

  let data = [];
  if (fields?.items) {
    data = fields?.items?.map((dataObj, i) => ({
      num: fields?.size * fields?.page + i + 1 - fields?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      isActive: dataObj?.isActive,
      className: "rowClassName1",
      typeText: idFinder(dataObj.type.id),
      type: dataObj.type.id,
    }));
  }
  const columns = useMemo(
    () => getStreetColumns(onEditClick, onDelete, onStatusChange, dispatch),
    [onEditClick, onDelete, onStatusChange, dispatch],
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
    dispatch(getField(data));
  }, [dispatch, page, fieldsRender, size, query]);
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-extra-services",
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
              {" "}
              <PlusIcon /> Soraqça əlavə et
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
              <h2>Sahələr</h2>
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
              title={"Yeni soraqça yaratma"}
              titleEdit={"Soraqça redaktə etmə"}
              okText={"Yadda saxla"}
              cancelText={"Bağla"}
              onSubmit={onSubmit}
              onEdit={onEdit}
              className={"absolute"}
              centered={false}>
              <Item
                className={style.label}
                rules={[{ required: true, message: "" }]}
                name="name"
                label="Ad">
                <Input className={style.modal_input} type={"text"} />
              </Item>
              <Item
                className={style.label}
                rules={[{ required: true, message: "" }]}
                name="type"
                label="Tip">
                <Select>
                  <Option value={1}>Mədən</Option>
                  <Option value={2}>Quyu</Option>
                </Select>
              </Item>
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteField(id))}
                onCancel={() => dispatch(setDeleteModalVisible(false))}
                value={"Soraqçanı"}
              />
            </DeleteModal>
            <ViewModal onCancel={closeOnViewModal} width={695}>
              {<Success onClick={closeOnViewModal} value={"Soraqça"} />}
            </ViewModal>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default QuestionnairesFieldContent;
