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
  addSubtopic,
  deleteSubtopic,
  editSubtopic,
  getSubtopics,
  getTopicsAll,
  subtopicVisibility,
} from "../../../store/slices/questionnaire";

const { Content } = Layout;
const { Item } = Form;
const { Option } = AntdSelect;
const QuestionnairesTopicContent = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-subtopic")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-subtopic"))
      : 20
  );
  const [subtopicSelect, setSubtopicSelect] = useState(null);
  const [query, setQuery] = useState({ name: "" });
  const [typeSelect, setTypeSelect] = useState(1);
  const { loading, subtopicsRender } = useSelector((state) => state.global);
  const subtopics = useSelector((state) => state.questionnaire.subtopics);
  const topicsAll = useSelector((state) => state.questionnaire.topicsAll);
  const paginationLength = setPaginationLength(
    subtopics?.count,
    subtopics?.size
  );
  const onSubmit = useCallback(
    async (data) => {
      dispatch(
        addSubtopic({
          ...data,
          topicId: subtopicSelect,
          appealtype: typeSelect,
        })
      );
    },
    [dispatch, subtopicSelect]
  );
  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
        topicId: subtopicSelect,
        appealtype: typeSelect,
      };
      dispatch(editSubtopic(data));
    },
    [dispatch, subtopicSelect, typeSelect]
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

  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(subtopicVisibility(data_));
    },
    [dispatch]
  );
  const handleSearch = (value) => {
    setQuery({ name: value });
    setPage(1);
  };

  let data = [];
  if (subtopics?.items) {
    data = subtopics?.items?.map((dataObj, i) => ({
      num: subtopics?.size * subtopics?.page + i + 1 - subtopics?.size,
      id: dataObj?.id,
      name: dataObj?.name,
      isActive: dataObj?.isActive,
      className: "rowClassName1",
    }));
  }

  const columns = useMemo(
    () => getStreetColumns(onEditClick, onDelete, onStatusChange, dispatch),
    [onEditClick, onDelete, onStatusChange, dispatch]
  );
  const handleColumnToggle = (checked, dataIndex) => {
    setSelectedColumns((prevSelected) => {
      if (checked) {
        return [...prevSelected, dataIndex];
      } else {
        return prevSelected.filter((col) => col !== dataIndex);
      }
    });
  };

  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => col.dataIndex)
  );
  useEffect(() => {
    if (topicsAll) {
      setSubtopicSelect(topicsAll?.[0]?.id);
    }
  }, [topicsAll]);
  useEffect(() => {
    dispatch(
      getTopicsAll({ visibility: "nondeleted", appealtypes: typeSelect })
    );
  }, [dispatch, typeSelect]);
  useEffect(() => {
    if (window.innerWidth >= 1900) {
      setInnerW(210);
    } else {
      setInnerW(155);
    }
    const data = {
      page: page,
      size: size,
      topicId: subtopicSelect,
      query: query,
      visibility: "nondeleted",
      appealtypes: typeSelect,
    };
    if (subtopicSelect !== null) {
      dispatch(getSubtopics(data));
    }
  }, [
    dispatch,
    page,
    subtopicsRender,
    size,
    subtopicSelect,
    query,
    typeSelect,
  ]);
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-subtopic",
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
              <h2>Alt mövzular</h2>
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
                  <Option value={1}>Təşkilat</Option>
                  <Option value={2}>Vətəndaş</Option>
                </Select>
                <Select
                  size="sm"
                  width={200}
                  allowClear={false}
                  value={subtopicSelect}
                  defaultValue={""}
                  onChange={(value) => {
                    setSubtopicSelect(value);
                  }}>
                  {topicsAll?.map((item) => (
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
                onDelete={() => dispatch(deleteSubtopic(id))}
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

export default QuestionnairesTopicContent;
