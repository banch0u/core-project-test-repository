import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import style from "../Questionnaires.module.scss";
import { Form, Layout, Select as AntdSelect } from "antd";
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
  addDefaultAgreementPlans,
  deleteDefaultAgreementPlans,
  editDefaultAgreementPlans,
  getDefaultAgreementPlans,
  getDefaultAgreementPlansAll,
} from "../../../store/slices/questionnaire";
import { getExecutiveMembersAll } from "../../../store/slices/employees";
import Select from "../../../components/Select";
import Input from "../../../components/Input";

const { Content } = Layout;
const { Item } = Form;
const { Option } = AntdSelect;

const QuestionnairesDefaultAgreementPlansContent = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-defaultagreementplans")
      ? JSON.parse(
          Cookies.get("pagination-size-questionnaire-defaultagreementplans")
        )
      : 20
  );
  const [query, setQuery] = useState({ name: "" });

  const { loading, DefaultAgreementPlansRender } = useSelector(
    (state) => state.global
  );

  const DefaultAgreementPlans = useSelector(
    (state) => state.questionnaire.defaultAgreementPlans
  );
  const DefaultAgreementPlansAll = useSelector(
    (state) => state.questionnaire.defaultAgreementPlansAll
  );
  const executiveMemmbersAll = useSelector(
    (state) => state.employees.executiveMembersAll
  );

  // ⭐ NEW — store current editing record (not inside modal)
  const [editingRecord, setEditingRecord] = useState(null);

  const paginationLength = setPaginationLength(
    DefaultAgreementPlans?.count,
    DefaultAgreementPlans?.size
  );

  const onSubmit = useCallback(
    async (data) => {
      dispatch(addDefaultAgreementPlans(data));
      setEditingRecord(null);
    },
    [dispatch]
  );

  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        responsiblePersonId: record?.responsiblePersonId,
        rank: record?.rank,
      };
      dispatch(editDefaultAgreementPlans(data));
      setEditingRecord(null);
    },
    [dispatch]
  );

  const closeOnViewModal = useCallback(() => {
    dispatch(setViewModalVisible(false));
  }, [dispatch]);

  const onClickModal = () => {
    setEditingRecord(null); // RESET
    ref?.current?.open();
  };

  const onEditClick = useCallback((data) => {
    setEditingRecord(data); // ⭐ store editing record
    ref?.current?.setEdit(data); // keep existing modal functionality
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
  if (DefaultAgreementPlans?.items) {
    data = DefaultAgreementPlans?.items?.map((dataObj, i) => ({
      num:
        DefaultAgreementPlans?.size * DefaultAgreementPlans?.page +
        i +
        1 -
        DefaultAgreementPlans?.size,
      id: dataObj?.id,
      responsiblePerson: dataObj?.responsiblePerson.fullName,
      responsiblePersonId: dataObj?.responsiblePerson?.id,
      rank: dataObj?.rank,
      className: "rowClassName1",
    }));
  }

  const columns = useMemo(
    () => getStreetColumns(onEditClick, onDelete, dispatch),
    [onEditClick, onDelete, dispatch]
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
    dispatch(getDefaultAgreementPlans(data));
    dispatch(getDefaultAgreementPlansAll("onlyactive"));
  }, [dispatch, page, DefaultAgreementPlansRender, query, size]);

  useEffect(() => {
    dispatch(getExecutiveMembersAll());
  }, [dispatch]);

  const updateSize = (newSize) => {
    setSize(newSize);
    Cookies.set(
      "pagination-size-questionnaire-defaultagreementplans",
      JSON.stringify(newSize),
      {
        expires: 7,
      }
    );
  };

  const assignedIds = useMemo(() => {
    return DefaultAgreementPlansAll?.map((item) => item.responsiblePerson?.id);
  }, [DefaultAgreementPlansAll]);

  // ⭐ UPDATED — correct filtering with edit support
  const availableExecutiveMembers = useMemo(() => {
    return executiveMemmbersAll?.filter((person) => {
      if (editingRecord && person.id === editingRecord.responsiblePersonId) {
        return true; // allow current person
      }
      return !assignedIds?.includes(person.id);
    });
  }, [executiveMemmbersAll, assignedIds, editingRecord]);

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
              <h2>Şablon razılaşma sxemi</h2>
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
                rules={[{ required: true, message: "" }]}
                name={"responsiblePersonId"}
                label={"Məsul şəxs"}>
                <Select>
                  {availableExecutiveMembers?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.text}
                    </Option>
                  ))}
                </Select>
              </Item>

              <Item
                name="rank"
                label="Qrup №"
                rules={[
                  { required: true, message: "" },
                  {
                    validator: (_, value) => {
                      if (!value) return Promise.resolve();
                      const numericValue = Number(value);

                      if (numericValue !== 1) return Promise.resolve();

                      const existsRank1 = DefaultAgreementPlansAll?.some(
                        (item) =>
                          item.rank === 1 &&
                          (!editingRecord || item.id !== editingRecord.id)
                      );

                      return existsRank1
                        ? Promise.reject("Yalnız bir qrup 1 ola bilər!")
                        : Promise.resolve();
                    },
                  },
                ]}>
                <Input type="number" />
              </Item>
            </FormModal>

            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteDefaultAgreementPlans(id))}
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

export default QuestionnairesDefaultAgreementPlansContent;
