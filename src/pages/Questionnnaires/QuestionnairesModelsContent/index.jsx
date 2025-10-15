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
  addModel,
  deleteModel,
  editModel,
  getBrandsAll,
  getDrivingcategoriesAll,
  getModel,
  getVehicleCategoriesAll,
  modelsVisibility,
} from "../../../store/slices/questionnaire";
import Select from "../../../components/Select";

const { Content } = Layout;
const { Item } = Form;
const { Option } = AntdSelect;
const QuestionnairesModelsContent = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-models")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-models"))
      : 20
  );
  const [brandSelect, setBrandSelect] = useState(null);
  const [query, setQuery] = useState({ name: "" });
  const { loading, modelRender } = useSelector((state) => state.global);

  const model = useSelector((state) => state.questionnaire.model);
  const brandsAll = useSelector((state) => state.questionnaire.brandsAll);
  const drivingcategoriesAll = useSelector(
    (state) => state.questionnaire.drivingcategoriesAll
  );
  const vehicleCategoriesAll = useSelector(
    (state) => state.questionnaire.vehicleCategoriesAll
  );
  console.log(vehicleCategoriesAll);
  const paginationLength = setPaginationLength(model?.count, model?.size);

  const onSubmit = useCallback(
    async (data) => {
      const category = drivingcategoriesAll?.find(
        (item) => item.id === data.drivingLicenceCategoryId
      );
      const drivingLicenceCategoryName = category?.name || "";

      dispatch(
        addModel({
          ...data,
          brandId: brandSelect,
          drivingLicenceCategoryName,
        })
      );
    },
    [dispatch, brandSelect, drivingcategoriesAll]
  );
  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
        brandId: brandSelect,
        drivingLicenceCategoryId: record?.drivingLicenceCategoryId,
        vehicleCategoryId: record?.vehicleCategoryId,
      };
      const category = drivingcategoriesAll?.find(
        (item) => item.id === data.drivingLicenceCategoryId
      );
      const categoryName = category?.name || "";

      dispatch(
        editModel({ ...data, drivingLicenceCategoryName: categoryName })
      );
    },
    [dispatch, brandSelect]
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(modelsVisibility(data_));
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
  if (model?.items) {
    data = model?.items?.map((dataObj, i) => ({
      num: model?.size * model?.page + i + 1 - model?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      drivingLicenceCategory: dataObj?.drivingLicenceCategory?.text,
      drivingLicenceCategoryId: dataObj?.drivingLicenceCategory?.id,
      vehicleCategory: dataObj?.vehicleCategory?.text,
      vehicleCategoryId: dataObj?.vehicleCategory?.id,
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
        drivingcategoriesAll,
        vehicleCategoriesAll,
        dispatch
      ),
    [
      onEditClick,
      onDelete,
      onStatusChange,
      drivingcategoriesAll,
      vehicleCategoriesAll,
      dispatch,
    ]
  );
  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => col.dataIndex)
  );
  useEffect(() => {
    if (brandsAll) {
      setBrandSelect(brandsAll?.[0]?.id);
    }
  }, [brandsAll]);
  useEffect(() => {
    dispatch(getBrandsAll({ visibility: "nondeleted" }));
    dispatch(getDrivingcategoriesAll("nondeleted"));
    dispatch(getVehicleCategoriesAll({ visibility: "nondeleted" }));
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
      brands: brandSelect,
      query: query,
      visibility: "nondeleted",
    };
    if (brandSelect !== null) {
      dispatch(getModel(data));
    }
  }, [dispatch, page, modelRender, brandSelect, query, size]);
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-models",
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
              <h2>Modellər</h2>
              <div className={style.buttons}>
                <Select
                  size="sm"
                  width={200}
                  allowClear={false}
                  value={brandSelect}
                  defaultValue={""}
                  onChange={(value) => {
                    setBrandSelect(value);
                  }}>
                  {brandsAll?.map((item) => (
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
              <Item
                rules={[{ required: true, message: "" }]}
                name={"drivingLicenceCategoryId"}
                label={"Sürücü kateqoriyası"}>
                <Select>
                  {drivingcategoriesAll?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item
                rules={[{ required: true, message: "" }]}
                name={"vehicleCategoryId"}
                label={"Nəqliyyat növü"}>
                <Select>
                  {vehicleCategoriesAll?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {item.name}
                    </Option>
                  ))}
                </Select>
              </Item>
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteModel(id))}
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

export default QuestionnairesModelsContent;
