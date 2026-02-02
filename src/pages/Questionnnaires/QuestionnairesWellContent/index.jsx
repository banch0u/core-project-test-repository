import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import style from "../Questionnaires.module.scss";
import { Form, Input, Layout, Select as AntdSelect} from "antd";
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
  addWell,
  deleteWell,
  editWell,
  getFieldsAll,
  getWell,
  wellVisibility,

} from "../../../store/slices/questionnaire";
import { typeENUM } from "../../../helpers/enums";
import Select from "../../../components/Select";
const {Option} = AntdSelect;
const { Content } = Layout;
const { Item } = Form;
const QuestionnairesWellContent = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-extra-services")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-extra-services"))
      : 20
  );
  const [query, setQuery] = useState({ name: "" });

  const { loading, wellRender } = useSelector((state) => state.global);

  const well = useSelector(
    (state) => state.questionnaire.well
  );
  const fieldsAll = useSelector(
    (state) => state.questionnaire.fieldsAll
  );
  console.log("well",well)
  const paginationLength = setPaginationLength(
    well?.count,
    well?.size
  );
  const onSubmit = useCallback(
    async (data) => {
      dispatch(addWell({ ...data }));
    },
    [dispatch]
  );
  const onEdit = useCallback(
    (id, record) => {
      console.log(record);
      const data = {
        id: id,
        name: record?.name,
      };
      dispatch(editWell(data));
    },
    [dispatch]
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(wellVisibility(data_));
    },
    [dispatch]
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
    return typeENUM.find(item => item.id === id)?.text;
  };
  let data = [];
  if (well?.items) {
    data = well?.items?.map((dataObj, i) => ({
      num:
        well?.size * well?.page + i + 1 - well?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      isActive: dataObj?.isActive,
      className: "rowClassName1",
      fieldName: dataObj.fieldName
    }));
  }
  const columns = useMemo(
    () =>
      getStreetColumns(
        onEditClick,
        onDelete,
        onStatusChange,

        dispatch
      ),
    [onEditClick, onDelete, onStatusChange, dispatch]
  );

  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => col.dataIndex)
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
    dispatch(getWell(data));
  }, [dispatch, page, wellRender, size, query]);
  useEffect(()=>{
      dispatch(getFieldsAll("onlyactive"))
    },[dispatch])
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-extra-services",
      JSON.stringify(newSize),
      {
        expires: 7,
      }
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
              <h2>Quyu</h2>
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
              <Item className={style.label}
                rules={[{ required: true, message: "" }]}
                name="fieldId"
                label="Sahə">
                  <Select>
                    {fieldsAll?.map((item)=>(
                      <Option value={item.id} key={item.id}>{item.name}</Option>
                    ))}
                  </Select>
              </Item>
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteWell(id))}
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

export default QuestionnairesWellContent;
