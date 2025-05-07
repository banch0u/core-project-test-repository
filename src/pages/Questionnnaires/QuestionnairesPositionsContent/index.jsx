import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import style from "../Questionnaires.module.scss";
import { Checkbox, Form, Input, Layout, Select } from "antd";
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
  addPositions,
  deletePositions,
  positionsVisibility,
  editPositions,
  getPositions,
  getPositionsAll,
  getCategoriesAll,
} from "../../../store/slices/questionnaire";
import api from "../../../utils/axios";
import dayjs from "dayjs";

const { Content } = Layout;
const { Item } = Form;
const QuestionnairesDocumentTypeContent = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-document-type")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-document-type"))
      : 20
  );
  const [query, setQuery] = useState({ name: "" });

  const { loading, positionsRender } = useSelector((state) => state.global);

  const positions = useSelector((state) => state.questionnaire.positions);
  const positionsAll = useSelector((state) => state.questionnaire.positionsAll);
  const categoriesAll = useSelector(
    (state) => state.questionnaire.categoriesAll
  );
  const positionOption = useMemo(
    () =>
      positionsAll?.map((item) => ({
        value: item.id,
        label: item?.name,
      })) || [],
    [positionsAll]
  );
  const categoryOption = useMemo(() => {
    return categoriesAll?.map((item) => ({
      label: item?.name,
      value: item?.id,
    }));
  }, [categoriesAll]);
  const paginationLength = setPaginationLength(
    positions?.count,
    positions?.size
  );

  const onSubmit = useCallback(
    async (data) => {
      dispatch(addPositions({ ...data }));
    },
    [dispatch]
  );
  const formatDateforYear = (date) => {
    return dayjs(date).format("YYYY-MM-DD");
  };
  const onEdit = useCallback(
    async (id, record) => {
      const response = await api.get(`/positions/${id}`);
      const updatedPayload = {
        id: id,
        categoryId: record?.categoryId,
        name: record?.name,
        hasDegree: record?.hasDegree,
        ...(record?.from && { from: Number(record.from) }),
        ...(record?.to && { to: Number(record.to) }),
        createdBy: response?.data?.data?.createdBy?.text,
        lastModifiedBy: response?.data?.data?.lastModifiedBy?.text,
        createdAt: formatDateforYear(response?.data?.data?.createdAt),
        lastModifiedAt: formatDateforYear(response.data?.data?.lastModifiedAt),
      };

      dispatch(editPositions(updatedPayload));
    },
    [dispatch]
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(positionsVisibility(data_));
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
  const handleSearch = (value) => {
    setQuery({ name: value });
    setPage(1);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
    }
  };
  const handleColumnToggle = (checked, dataIndex) => {
    setSelectedColumns((prevSelected) => {
      if (checked) {
        return [...prevSelected, dataIndex];
      } else {
        return prevSelected.filter((col) => col !== dataIndex);
      }
    });
  };
  const getById = (array, id) => {
    return array?.find((item) => item.value === id);
  };
  console.log(categoryOption);
  let data = [];
  if (positions?.items) {
    data = positions?.items?.map((dataObj, i) => ({
      num: positions?.size * positions?.page + i + 1 - positions?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      categoryId: getById(categoryOption, dataObj?.categoryId)?.label,
      categoryIdValue: dataObj?.categoryId,
      hasDegree: dataObj?.hasDegree,
      from: dataObj?.from,
      to: dataObj?.to,
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
        positionOption,
        categoryOption
      ),
    [
      onEditClick,
      onDelete,
      onStatusChange,
      dispatch,
      positionOption,
      categoryOption,
    ]
  );

  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => col.dataIndex)
  );
  useEffect(() => {
    dispatch(getCategoriesAll({ visibility: "onlyactive" }));
    dispatch(getPositionsAll({ visibility: "onlyactive" }));
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
    };
    dispatch(getPositions(data));
  }, [dispatch, page, positionsRender, size, query]);
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-document-type",
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
              <h2>Vəzifələr</h2>
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
                label="Vəzifə">
                <Input className={style.modal_input} type="text" />
              </Item>

              <Item
                name="categoryId"
                label="Kateqoriya"
                className={style.modal_input}>
                <Select
                  className={style.modal_input}
                  options={categoryOption}
                />
              </Item>

              <Item
                className={style.label}
                name="hasDegree"
                valuePropName="checked">
                <Checkbox style={{ marginTop: "25px" }}>Dərəcəsi var</Checkbox>
              </Item>

              <Form.Item
                shouldUpdate={(prev, curr) =>
                  prev.hasDegree !== curr.hasDegree
                }>
                {({ getFieldValue }) =>
                  getFieldValue("hasDegree") ? (
                    <div style={{ display: "flex", gap: "20px" }}>
                      <Item
                        className={style.label}
                        name="from"
                        label="From"
                        rules={[
                          {
                            required: true,
                            message: "",
                          },
                          {
                            validator(_, value) {
                              if (
                                value === undefined ||
                                value === null ||
                                value === ""
                              ) {
                                return Promise.reject("");
                              }
                              if (Number(value) <= 0) {
                                return Promise.reject("");
                              }
                              return Promise.resolve();
                            },
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              const toValue = getFieldValue("to");
                              if (
                                value !== undefined &&
                                toValue !== undefined &&
                                Number(value) >= Number(toValue)
                              ) {
                                return Promise.reject("");
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}>
                        <Input type="number" className={style.modal_input} />
                      </Item>

                      <Item
                        className={style.label}
                        name="to"
                        label="To"
                        rules={[
                          {
                            required: true,
                            message: "",
                          },
                          {
                            validator(_, value) {
                              if (
                                value === undefined ||
                                value === null ||
                                value === ""
                              ) {
                                return Promise.reject("");
                              }
                              if (Number(value) <= 0) {
                                return Promise.reject("");
                              }
                              return Promise.resolve();
                            },
                          },
                          ({ getFieldValue }) => ({
                            validator(_, value) {
                              const fromValue = getFieldValue("from");
                              if (
                                value !== undefined &&
                                fromValue !== undefined &&
                                Number(value) <= Number(fromValue)
                              ) {
                                return Promise.reject("");
                              }
                              return Promise.resolve();
                            },
                          }),
                        ]}>
                        <Input type="number" className={style.modal_input} />
                      </Item>
                    </div>
                  ) : null
                }
              </Form.Item>
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deletePositions(id))}
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

export default QuestionnairesDocumentTypeContent;
