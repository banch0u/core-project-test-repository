import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import style from "../Questionnaires.module.scss";
import { Form, Input, Layout, TreeSelect } from "antd";
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
import Button from "../../../components/Button";
import Loading from "../../../components/Loading";
import Table from "../../../components/Table";

import {
  addInventoryCategories,
  deleteInventoryCategories,
  editInventoryCategories,
  getInventoryCategories,
  inventoryCategoriesVisibility,
} from "../../../store/slices/questionnaire";

import { getStreetColumns } from "./constant";

const { Content } = Layout;
const { Item } = Form;

const QuestionnairesInventoryCategoriesContent = () => {
  const dispatch = useDispatch();
  const ref = useRef();

  const [id, setId] = useState(null);
  const [innerW, setInnerW] = useState(160);

  const { loading, InventoryCategoriesRender } = useSelector(
    (state) => state.global,
  );

  const InventoryCategories = useSelector(
    (state) => state.questionnaire.inventoryCategories,
  );

  // ✅ BUILD TREE WITH LEVEL
  const buildTree = (list) => {
    const map = {};
    const roots = [];

    list.forEach((item, index) => {
      map[item.id] = {
        key: item.id,
        id: item.id,
        name: item.name,
        code: item.code,
        parentId: item.parentId,
        isActive: item.isActive,
        // num: index + 1,
        children: [],
        level: 0,
        className: "rowClassName1",
      };
    });

    list.forEach((item) => {
      if (item.parentId) {
        const parent = map[item.parentId];
        if (parent) {
          map[item.id].level = parent.level + 1;
          parent.children.push(map[item.id]);
        }
      } else {
        roots.push(map[item.id]);
      }
    });

    return roots;
  };

  const treeData = useMemo(() => {
    return buildTree(InventoryCategories?.items || []);
  }, [InventoryCategories]);

  // ✅ MAX DEPTH
  const getMaxDepth = (nodes) => {
    let max = 0;

    const traverse = (arr, level = 0) => {
      arr.forEach((node) => {
        if (level > max) max = level;
        if (node.children?.length) {
          traverse(node.children, level + 1);
        }
      });
    };

    traverse(nodes);
    return max;
  };

  const maxDepth = useMemo(() => getMaxDepth(treeData), [treeData]);

  const dynamicNumWidth = useMemo(() => {
    const base = 40;
    const perLevel = 20;
    return base + maxDepth * perLevel;
  }, [maxDepth]);

  // ✅ TreeSelect
  const treeSelectData = useMemo(() => {
    const convert = (nodes) =>
      nodes.map((node) => ({
        title: node.name,
        value: node.id,
        children: convert(node.children || []),
      }));

    return convert(treeData);
  }, [treeData]);

  // ✅ ACTIONS
  const onSubmit = useCallback(
    (data) => dispatch(addInventoryCategories(data)),
    [dispatch],
  );

  const onEdit = useCallback(
    (id, record) =>
      dispatch(
        editInventoryCategories({
          id,
          name: record.name,
          code: record.code,
          parentId: record.parentId,
        }),
      ),
    [dispatch],
  );

  const onEditClick = useCallback((data) => {
    ref.current.setEdit(data);
  }, []);

  const onDelete = useCallback((id) => {
    setId(id);
  }, []);

  const onStatusChange = useCallback(
    (data, checked) =>
      dispatch(
        inventoryCategoriesVisibility({
          id: data?.id,
          checked,
        }),
      ),
    [dispatch],
  );

  // ✅ COLUMNS
  const columns = useMemo(
    () =>
      getStreetColumns(
        onEditClick,
        onDelete,
        onStatusChange,
        dispatch,
        innerW,
        dynamicNumWidth,
      ),
    [onEditClick, onDelete, onStatusChange, dispatch, innerW, dynamicNumWidth],
  );

  // ✅ FETCH
  useEffect(() => {
    setInnerW(window.innerWidth >= 1900 ? 210 : 155);

    dispatch(
      getInventoryCategories({
        page: 1,
        size: 99999,
        visibility: "nondeleted",
      }),
    );
  }, [dispatch, InventoryCategoriesRender]);

  return (
    <>
      {loading && <Loading />}

      <Layout className={style.layout}>
        <Content className={style.content}>
          <header className={style.header}>
            <Button onClick={() => ref.current.open()} color="green">
              <PlusIcon /> Kateqoriya əlavə et
            </Button>
          </header>
        </Content>

        <Layout className={style.layout1}>
          <Content className={style.content}>
            <div className={style.table_header}>
              <h2>Kateqoriyalar (Mal-materiallar)</h2>
            </div>

            <div className="bigTable">
              <Table
                dataSource={treeData}
                columns={columns}
                disableDrag={true}
              />
            </div>

            {/* MODAL */}
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
                name="name"
                label="Ad"
                rules={[
                  { required: true, message: "" },
                  { min: 3, message: "Ən az 3 simvol" },
                ]}>
                <Input className={style.modal_input} />
              </Item>

              <Item name="code" label="Kod">
                <Input className={style.modal_input} />
              </Item>

              <Item name="parentId" label="Üst kateqoriya">
                <TreeSelect
                  allowClear
                  treeData={treeSelectData}
                  placeholder=""
                  className={style.modal_input}
                />
              </Item>
            </FormModal>

            {/* DELETE */}
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteInventoryCategories(id))}
                onCancel={() => dispatch(setDeleteModalVisible(false))}
                value={"Kateqoriyanı"}
              />
            </DeleteModal>

            {/* SUCCESS */}
            <ViewModal
              onCancel={() => dispatch(setViewModalVisible(false))}
              width={695}>
              <Success
                onClick={() => dispatch(setViewModalVisible(false))}
                value={"Kateqoriya"}
              />
            </ViewModal>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default QuestionnairesInventoryCategoriesContent;
