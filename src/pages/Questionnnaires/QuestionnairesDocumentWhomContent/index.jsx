import Select from "../../../components/Select";
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
  addDocumentWhom,
  deleteTopic,
  documentWhomVisibility,
  editDocumentWhom,
  getDocumentWhom,
  getOrganizationsAll,
} from "../../../store/slices/questionnaire";
const { Content } = Layout;
const { Item } = Form;
const { Option } = AntdSelect;

const QuestionnairesDocumentWhomContent = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-document-whom")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-document-whom"))
      : 20
  );
  const [query, setQuery] = useState({ name: "" });
  const [typeSelect, setTypeSelect] = useState(1);
  const organizationsAll = useSelector(
    (state) => state.questionnaire.organizationsAll
  );
  const { loading, documentWhomRender } = useSelector((state) => state.global);

  const documentWhom = useSelector((state) => state.questionnaire.documentWhom);

  const paginationLength = setPaginationLength(
    documentWhom?.count,
    documentWhom?.size
  );
  const onSubmit = useCallback(
    async (data) => {
      dispatch(
        addDocumentWhom({
          name: data?.name,
          surname: data?.surname,
          patronymic: data?.patronymic,
          organisationId: data?.organisationId,
          positionName: data?.positionName,
        })
      );
    },
    [dispatch]
  );
  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
        surname: record?.surname,
        patronymic: record?.patronymic,
        positionName: record?.positionName,
        organisationId: record?.organisationId,
      };
      dispatch(editDocumentWhom(data));
    },
    [dispatch]
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(documentWhomVisibility(data_));
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

  let data = [];
  if (documentWhom?.items) {
    data = documentWhom?.items?.map((dataObj, i) => ({
      num: documentWhom?.size * documentWhom?.page + i + 1 - documentWhom?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      surname: dataObj?.surname,
      patronymic: dataObj?.patronymic,
      organisationId: dataObj?.organisationId,
      organisationName: organizationsAll?.find(
        (org) => org.id === dataObj?.organisationId
      )?.name,
      positionName: dataObj?.positionName,
      isActive: dataObj?.isActive,
      className: "rowClassName1",
    }));
  }
  const columns = useMemo(
    () =>
      getStreetColumns(
        onEditClick,
        onDelete,
        onStatusChange,
        dispatch,
        organizationsAll
      ),
    [onEditClick, onDelete, onStatusChange, dispatch, organizationsAll]
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
      types: typeSelect,
    };
    dispatch(getDocumentWhom(data));
  }, [dispatch, page, documentWhomRender, size, query, typeSelect]);

  useEffect(() => {
    dispatch(getOrganizationsAll({ visibility: "nondeleted" }));
  }, [dispatch]);
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-document-whom",
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
              <h2>Şəxslər</h2>
              <div className={style.buttons}>
                <Select
                  size="sm"
                  width={200}
                  allowClear={false}
                  value={typeSelect}
                  defaultValue={""}
                  onChange={(value) => {
                    setTypeSelect(value);
                  }}>
                  <Option value={1}>Şəxs</Option>
                  <Option value={2}>Müəssisə</Option>
                </Select>

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
                rules={[
                  { required: true, message: "" },
                  { min: 3, message: "Ən azından 3 simvol olmalıdır" },
                ]}
                name={"name"}
                label={"Ad"}>
                <Input className={style.modal_input} />
              </Item>
              <Item
                rules={[
                  { required: true, message: "" },
                  { min: 3, message: "Ən azından 3 simvol olmalıdır" },
                ]}
                name={"surname"}
                label={"Soyad"}>
                <Input className={style.modal_input} />
              </Item>
              <Item
                rules={[
                  { required: false, message: "" },
                  { min: 3, message: "Ən azından 3 simvol olmalıdır" },
                ]}
                name={"patronymic"}
                label={"Ata Adı"}>
                <Input className={style.modal_input} />
              </Item>
              <Item
                name="organisationId"
                label="Təşkilatın adı"
                rules={[{ required: true, message: "" }]}>
                <Select>
                  {organizationsAll?.map((option) => (
                    <Option key={option.id} value={option.id}>
                      {option.name}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item
                rules={[
                  { required: true, message: "" },
                  { min: 3, message: "Ən azından 3 simvol olmalıdır" },
                ]}
                name={"positionName"}
                label={"Vəzifə"}>
                <Input className={style.modal_input} />
              </Item>
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteTopic(id))}
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

export default QuestionnairesDocumentWhomContent;
