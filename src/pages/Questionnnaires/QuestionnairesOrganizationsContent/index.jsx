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
  addOrganization,
  deleteOrganization,
  editOrganization,
  getOrganizations,
  organizationVisibility,
} from "../../../store/slices/questionnaire";
import { MaskedInput } from "antd-5-mask-input";
const { Content } = Layout;
const { Item } = Form;
const QuestionnairesOrganizationsContent = () => {
  const [innerW, setInnerW] = useState(210);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-organizations")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-organizations"))
      : 20
  );
  const [query, setQuery] = useState({ name: "" });
  const { loading, organizationRender } = useSelector((state) => state.global);

  const organizations = useSelector(
    (state) => state.questionnaire.organizations
  );

  const paginationLength = setPaginationLength(
    organizations?.count,
    organizations?.size
  );
  const onSubmit = useCallback(
    async (data) => {
      dispatch(addOrganization(data));
    },
    [dispatch]
  );
  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
        voen: record?.voen,
        address: record?.address,
        shortName: record?.shortName,
        email: record?.email,
        phone: record?.phone,
      };
      dispatch(editOrganization(data));
    },
    [dispatch]
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(organizationVisibility(data_));
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
  if (organizations?.items) {
    data = organizations?.items?.map((dataObj, i) => ({
      num:
        organizations?.size * organizations?.page + i + 1 - organizations?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      voen: dataObj?.voen,
      address: dataObj?.address,
      shortName: dataObj?.shortName,
      email: dataObj?.email,
      phone: dataObj?.phone,
      isActive: dataObj?.isActive,
      className: "rowClassName1",
    }));
  }
  const columns = useMemo(
    () => getStreetColumns(onEditClick, onDelete, onStatusChange, dispatch),
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
    dispatch(getOrganizations(data));
  }, [dispatch, page, organizationRender, size, query]);
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-organizations",
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
              <h2>Təşkilatlar</h2>
              <div className={style.buttons}>
                {/* <Input
                  // onKeyDown={(e) => handleKeyDown(e)}
                  placeholder="Axtar"
                  className={style.search}
                  suffix={
                    <div className={style.search_icon}>
                      <SearchIcon />
                    </div>
                  }
                /> */}
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
                name={"shortName"}
                label={"Qısa ad"}>
                <Input className={style.modal_input} />
              </Item>
              <Item
                rules={[
                  { required: false, message: "" },
                  { min: 3, message: "Ən azından 3 simvol olmalıdır" },
                ]}
                name={"address"}
                label={"Ünvan"}>
                <Input className={style.modal_input} />
              </Item>
              <Item
                rules={[
                  { required: false, message: "" },
                  { min: 3, message: "Ən azından 3 simvol olmalıdır" },
                ]}
                name={"voen"}
                label={"VÖEN"}>
                <Input type={"number"} className={style.modal_input} />
              </Item>
              <Item
                rules={[
                  { required: false, message: "" },
                  { min: 3, message: "Ən azından 3 simvol olmalıdır" },
                ]}
                name={"email"}
                label={"Elektron poçt ünvanı"}>
                <Input type={"email"} className={style.modal_input} />
              </Item>
              <Item
                name={"phone"}
                label={"Əlaqə nömrəsi"}
                rules={[
                  {
                    required: false,
                    pattern: /^\+[0-9]{12}$/,
                    message: "",
                  },
                ]}>
                <MaskedInput
                  type={"text"}
                  mask={"+000000000000"}
                  className={style.modal_input}
                />
              </Item>
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteOrganization(id))}
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

export default QuestionnairesOrganizationsContent;
