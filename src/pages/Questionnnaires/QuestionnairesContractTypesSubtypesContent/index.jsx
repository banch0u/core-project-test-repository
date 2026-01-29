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
  addContractTypesSubtypes,
  deleteContractTypesSubtypes,
  editContractTypesSubtypes,
  getContractTypesSubtypes,
  contractTypesSubtypesVisibility,
  getContracttypesAll,
} from "../../../store/slices/questionnaire";
import Select from "../../../components/Select";

const { Content } = Layout;
const { Item } = Form;
const { Option } = AntdSelect;
const QuestionnairesContractTypesSubtypesContent = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-contracttypessubtypes")
      ? JSON.parse(
          Cookies.get("pagination-size-questionnaire-contracttypessubtypes"),
        )
      : 20,
  );
  const [query, setQuery] = useState({ name: "" });
  const [subtopicSelect, setSubtopicSelect] = useState(null);
  const { loading, ContractTypesSubtypesRender } = useSelector(
    (state) => state.global,
  );
  const contracttypesAll = useSelector(
    (state) => state.questionnaire.contracttypesAll,
  );
  const ContractTypesSubtypes = useSelector(
    (state) => state.questionnaire.contractTypesSubtypes,
  );
  const paginationLength = setPaginationLength(
    ContractTypesSubtypes?.count,
    ContractTypesSubtypes?.size,
  );

  const onSubmit = useCallback(
    async (data) => {
      dispatch(
        addContractTypesSubtypes({
          ...data,
          contractTypeId: subtopicSelect,
        }),
      );
    },
    [dispatch, subtopicSelect],
  );
  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
        contractTypeId: subtopicSelect,
      };
      dispatch(editContractTypesSubtypes(data));
    },
    [dispatch, subtopicSelect],
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(contractTypesSubtypesVisibility(data_));
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
  if (ContractTypesSubtypes?.items) {
    data = ContractTypesSubtypes?.items?.map((dataObj, i) => ({
      num:
        ContractTypesSubtypes?.size * ContractTypesSubtypes?.page +
        i +
        1 -
        ContractTypesSubtypes?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      isActive: dataObj?.isActive,
      className: "rowClassName1",
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
    if (contracttypesAll) {
      setSubtopicSelect(contracttypesAll?.[0]?.id);
    }
  }, [contracttypesAll]);
  useEffect(() => {
    dispatch(getContracttypesAll("nondeleted"));
  }, [dispatch]);
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
      contractTypeId: subtopicSelect,
    };
    if (subtopicSelect !== null) {
      dispatch(getContractTypesSubtypes(data));
    }
  }, [
    dispatch,
    page,
    ContractTypesSubtypesRender,
    query,
    size,
    subtopicSelect,
  ]);
  const updateSize = (newSize) => {
    setSize(newSize);
    Cookies.set(
      "pagination-size-questionnaire-contracttypessubtypes",
      JSON.stringify(newSize),
      {
        expires: 7,
      },
    );
  };

  return (
    <>
      {loading ? <Loading /> : null}
      <Layout className={style.layout}>
        <Content className={style.content}>
          <header className={style.header}>
            <Button onClick={onClickModal} color="green">
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
              <h2>Müqavilənin predmeti</h2>
              <div className={style.buttons}>
                <Select
                  size="sm"
                  width={200}
                  allowClear={false}
                  value={subtopicSelect}
                  defaultValue={""}
                  onChange={(value) => {
                    setSubtopicSelect(value);
                  }}>
                  {contracttypesAll?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
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
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteContractTypesSubtypes(id))}
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

export default QuestionnairesContractTypesSubtypesContent;
