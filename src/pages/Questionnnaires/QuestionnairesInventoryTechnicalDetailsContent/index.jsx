import React from "react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Cookies from "js-cookie";
import style from "../Questionnaires.module.scss";
import { Form, Input, Layout } from "antd";
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
  addInventoryTechnicalDetails,
  deleteInventoryTechnicalDetails,
  editInventoryTechnicalDetails,
  getInventoryTechnicalDetails,
  inventoryTechnicalDetailsVisibility,
} from "../../../store/slices/questionnaire";
import CategoryTreeSelect from "../../../components/CategoryTreeSelect";

const { Content } = Layout;
const { Item } = Form;
const QuestionnairesInventoryTechnicalDetailsContent = () => {
  const [innerW, setInnerW] = useState(null);
  const [categorySelect, setCategorySelect] = useState(null);

  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-inventorytechnicaldetails")
      ? JSON.parse(
          Cookies.get(
            "pagination-size-questionnaire-inventorytechnicaldetails",
          ),
        )
      : 20,
  );
  const [query, setQuery] = useState({ name: "" });
  const { loading, InventoryTechnicalDetailsRender } = useSelector(
    (state) => state.global,
  );

  const InventoryTechnicalDetails = useSelector(
    (state) => state.questionnaire.inventoryTechnicalDetails,
  );
  const inventoryCategoriesAll = useSelector(
    (state) => state.questionnaire.inventoryCategoriesAll,
  );
  const paginationLength = setPaginationLength(
    InventoryTechnicalDetails?.count,
    InventoryTechnicalDetails?.size,
  );

  const onSubmit = useCallback(
    async (data) => {
      dispatch(
        addInventoryTechnicalDetails({
          ...data,
          inventoryCategoryId: categorySelect,
        }),
      );
    },

    [dispatch, categorySelect],
  );
  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
        inventoryCategoryId: categorySelect,
      };
      dispatch(editInventoryTechnicalDetails(data));
    },
    [dispatch, categorySelect],
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(inventoryTechnicalDetailsVisibility(data_));
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
  if (InventoryTechnicalDetails?.items) {
    data = InventoryTechnicalDetails?.items?.map((dataObj, i) => ({
      num:
        InventoryTechnicalDetails?.size * InventoryTechnicalDetails?.page +
        i +
        1 -
        InventoryTechnicalDetails?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      isActive: dataObj?.isActive,
      inventoryCategory: dataObj?.inventoryCategory,
      className: "rowClassName1",
    }));
  }
  const columns = useMemo(
    () =>
      getStreetColumns(
        onEditClick,
        onDelete,
        onStatusChange,
        categorySelect,
        dispatch,
      ),
    [onEditClick, onDelete, onStatusChange, categorySelect, dispatch],
  );
  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => col.dataIndex),
  );
  useEffect(() => {
    if (inventoryCategoriesAll) {
      setCategorySelect(inventoryCategoriesAll?.[0]?.id);
    }
  }, [inventoryCategoriesAll]);
  useEffect(() => {
    if (window.innerWidth >= 1900) {
      setInnerW(210);
    } else {
      setInnerW(155);
    }
    const data = {
      page: page,
      size: size,
      inventoryCategoryId: categorySelect,
      query: query,
      visibility: "nondeleted",
    };
    if (categorySelect !== null) {
      dispatch(getInventoryTechnicalDetails(data));
    }
  }, [
    dispatch,
    page,
    InventoryTechnicalDetailsRender,
    query,
    size,
    categorySelect,
  ]);
  const updateSize = (newSize) => {
    setSize(newSize);
    Cookies.set(
      "pagination-size-questionnaire-inventorytechnicaldetails",
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
              <h2>Xarakteristikalar</h2>
              <div className={style.buttons}>
                <ColSort
                  columns={columns}
                  selectedColumns={selectedColumns}
                  handleColumnToggle={handleColumnToggle}
                />
                <CategoryTreeSelect
                  style={{ width: 200 }}
                  allowClear={false}
                  value={categorySelect}
                  defaultValue={""}
                  onChange={(value) => {
                    setCategorySelect(value);
                  }}
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
                onDelete={() =>
                  dispatch(
                    deleteInventoryTechnicalDetails({
                      id,
                      category: categorySelect,
                    }),
                  )
                }
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

export default QuestionnairesInventoryTechnicalDetailsContent;
