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
  getInternalStructureAll,
} from "../../../store/slices/questionnaire";
import { getContractUsersAll } from "../../../store/slices/employees";
import Select from "../../../components/Select";
import Input from "../../../components/Input";

const { Content } = Layout;
const { Item } = Form;
const { Option } = AntdSelect;

/**
 * Helpers
 */
const toNumSafe = (v) =>
  v === null || v === undefined || v === "" ? NaN : Number(v);

const deriveFlowPriorityFromRank = (rank) => {
  const r = toNumSafe(rank);
  if (Number.isNaN(r)) return undefined;
  if (r === -1 || r === 0 || r === 1 || r === 2) return r;
  if (r >= 3) return 3;
  return undefined;
};

/**
 * ✅ EDIT NORMALIZATION (flowPriority-first)
 */
const normalizeForEdit = (row) => {
  const fpNum = toNumSafe(row?.flowPriority);

  if (!Number.isNaN(fpNum) && [-1, 0, 1, 2, 3].includes(fpNum)) {
    if (fpNum === 3) {
      const rankNum = toNumSafe(row?.rank);
      return {
        ...row,
        flowPriority: 3,
        rank: Number.isNaN(rankNum) ? undefined : rankNum,
      };
    }
    return { ...row, flowPriority: fpNum, rank: undefined };
  }

  const rankNum = toNumSafe(row?.rank);

  if (Number.isNaN(rankNum)) {
    const fp = row?.flowPriority;
    return {
      ...row,
      flowPriority:
        fp === -1 || fp === 0 || fp === 1 || fp === 2 || fp === 3
          ? fp
          : undefined,
      rank: undefined,
    };
  }

  if (rankNum === -1) return { ...row, flowPriority: -1, rank: undefined };
  if (rankNum === 0 || rankNum === 1 || rankNum === 2)
    return { ...row, flowPriority: rankNum, rank: undefined };

  return { ...row, flowPriority: 3, rank: rankNum };
};

/**
 * ✅ PAYLOAD BUILD (SEND BOTH rank + flowPriority)
 */
const buildPayloadFromForm = (id, values) => {
  const flowPriority = Number(values?.flowPriority);

  const base = {
    ...(id ? { id } : {}),
    responsiblePersonId: values?.responsiblePersonId,
    internalStructureId: values?.internalStructureId, // ✅ will come from top select
    flowPriority,
  };

  if (flowPriority === -1) return { ...base, rank: -1 };
  if (flowPriority === 0 || flowPriority === 1 || flowPriority === 2)
    return { ...base, rank: flowPriority };

  return { ...base, rank: Number(values?.rank) };
};

const resolveRankFromValues = (values) => {
  const fp = Number(values?.flowPriority);
  if (fp === -1) return -1;
  if (fp === 0 || fp === 1 || fp === 2) return fp;
  return Number(values?.rank);
};

// ✅ for priority labels (only 0/1 unique now; 2 can be multiple)
const PRIORITY_LABEL = {
  0: "Sənəd yaradan",
  1: "Birinci baxan",
};

const QuestionnairesDefaultAgreementPlansContent = () => {
  const [innerW, setInnerW] = useState(null);

  // ✅ modal ref
  const modalRef = useRef();

  // ✅ capture FormModal's internal antd form so we can set field errors on submit
  const modalFormRef = useRef(null);

  // ✅ default internalStructure init only once
  const didInitInternalStructure = useRef(false);

  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-defaultagreementplans")
      ? JSON.parse(
          Cookies.get("pagination-size-questionnaire-defaultagreementplans"),
        )
      : 20,
  );

  // ✅ query will get internalStructureId default after internalStructureAll loads
  const [query, setQuery] = useState({ name: "" });

  const { loading, DefaultAgreementPlansRender } = useSelector(
    (state) => state.global,
  );

  const DefaultAgreementPlans = useSelector(
    (state) => state.questionnaire.defaultAgreementPlans,
  );

  const DefaultAgreementPlansAll = useSelector(
    (state) => state.questionnaire.defaultAgreementPlansAll,
  );

  const internalStructureAll = useSelector(
    (state) => state.questionnaire.internalStructureAll,
  );

  const contractUsersAll = useSelector(
    (state) => state.employees.contractUsersAll,
  );

  const [editingRecord, setEditingRecord] = useState(null);

  const paginationLength = setPaginationLength(
    DefaultAgreementPlans?.count,
    DefaultAgreementPlans?.size,
  );

  // ✅ build table data (current page)
  const data = useMemo(() => {
    if (!DefaultAgreementPlans?.items) return [];
    return DefaultAgreementPlans.items.map((dataObj, i) => ({
      num:
        DefaultAgreementPlans?.size * DefaultAgreementPlans?.page +
        i +
        1 -
        DefaultAgreementPlans?.size,
      id: dataObj?.id,
      responsiblePerson: dataObj?.responsiblePerson?.fullName,
      responsiblePersonId: dataObj?.responsiblePerson?.id,
      flowPriority: dataObj?.flowPriority,
      rank: dataObj?.rank,
      internalStructure: dataObj?.internalStructure?.text,
      internalStructureId: dataObj?.internalStructure?.id,
      className: "rowClassName1",
    }));
  }, [DefaultAgreementPlans]);

  /**
   * ✅ rows used for validation:
   * - prefer DefaultAgreementPlansAll if exists (covers all pages)
   * - fallback to current page `data`
   */
  const rowsForValidation = useMemo(() => {
    const list =
      Array.isArray(DefaultAgreementPlansAll) && DefaultAgreementPlansAll.length
        ? DefaultAgreementPlansAll
        : data;

    if (list === data) return data;

    return list.map((item) => {
      const rank = item?.rank;
      const fp =
        item?.flowPriority ??
        item?.flowpriority ??
        deriveFlowPriorityFromRank(rank);

      return {
        id: item?.id,
        responsiblePersonId:
          item?.responsiblePersonId ?? item?.responsiblePerson?.id,
        internalStructureId:
          item?.internalStructureId ?? item?.internalStructure?.id,
        rank,
        flowPriority: fp,
      };
    });
  }, [DefaultAgreementPlansAll, data]);

  // ✅ IMPORTANT: Filter should not wipe internalStructureId; merge patches into query
  const setQueryMerge = useCallback((patchOrUpdater) => {
    setQuery((prev) => {
      const patch =
        typeof patchOrUpdater === "function"
          ? patchOrUpdater(prev)
          : patchOrUpdater;
      return { ...prev, ...(patch || {}) };
    });
  }, []);

  // ✅ top select change => set query.internalStructureId
  const handleInternalStructureChange = useCallback((value) => {
    setPage(1);
    setQuery((prev) => ({
      ...prev,
      internalStructureId: value,
    }));
  }, []);

  // ✅ set default internalStructureId = internalStructureAll[0].id (ONLY ONCE)
  useEffect(() => {
    if (didInitInternalStructure.current) return;

    const firstId = internalStructureAll?.[0]?.id;
    if (firstId !== undefined && firstId !== null) {
      didInitInternalStructure.current = true;
      setPage(1);
      setQuery((prev) => ({ ...prev, internalStructureId: firstId }));
    }
  }, [internalStructureAll]);

  // ✅ window width once
  useEffect(() => {
    if (window.innerWidth >= 1900) setInnerW(210);
    else setInnerW(155);
  }, []);

  // ✅ fetch lists separately
  useEffect(() => {
    dispatch(getDefaultAgreementPlansAll({ visibility: "onlyactive" }));
    dispatch(getInternalStructureAll("onlyactive"));
  }, [dispatch, DefaultAgreementPlansRender]);

  // ✅ NOW fetch paged data ONLY when internalStructureId exists
  useEffect(() => {
    if (
      query?.internalStructureId === undefined ||
      query?.internalStructureId === null
    )
      return;

    const req = {
      page,
      size,
      query,
      visibility: "nondeleted",
    };

    dispatch(getDefaultAgreementPlans(req));
  }, [dispatch, page, size, query, DefaultAgreementPlansRender]);

  useEffect(() => {
    dispatch(getContractUsersAll());
  }, [dispatch]);

  // ✅ throw helper: duplicate same person in same structure
  const throwDuplicateError = useCallback(() => {
    const errMsg = "Bu məsul şəxs bu struktur üçün artıq təyin olunub!";

    if (modalFormRef.current) {
      modalFormRef.current.setFields([
        { name: "responsiblePersonId", errors: [errMsg] },
      ]);
    }

    throw new Error(errMsg);
  }, []);

  // ✅ throw helper: priority already taken in this internalStructure (ONLY for 0/1 now)
  const throwPriorityTakenError = useCallback((priority01) => {
    const label = PRIORITY_LABEL?.[priority01] || `Prioritet ${priority01}`;
    const errMsg = `Bu strukturda artıq "${label}" prioriteti təyin olunub!`;

    if (modalFormRef.current) {
      modalFormRef.current.setFields([
        { name: "flowPriority", errors: [errMsg] },
      ]);
    }

    throw new Error(errMsg);
  }, []);

  // ✅ validation 1: same person cannot be in same structure twice
  const hasDuplicatePersonInStructure = useCallback(
    (personId, structureId, ignoreId) => {
      if (!personId || !structureId) return false;

      const p = Number(personId);
      const s = Number(structureId);

      return rowsForValidation.some((row) => {
        if (ignoreId && Number(row?.id) === Number(ignoreId)) return false;
        return (
          Number(row?.responsiblePersonId) === p &&
          Number(row?.internalStructureId) === s
        );
      });
    },
    [rowsForValidation],
  );

  /**
   * ✅ validation 2 (UPDATED):
   * each internalStructure can have ONLY ONE flowPriority 0/1
   * ✅ flowPriority (or rank) = 2 can be MULTIPLE
   * flowPriority 3 can be multiple
   */
  const hasPriority01TakenInStructure = useCallback(
    (structureId, priority01, ignoreId) => {
      if (!structureId && structureId !== 0) return false;

      const s = Number(structureId);
      const p = Number(priority01);

      if (!(p === 0 || p === 1)) return false;

      return rowsForValidation.some((row) => {
        if (ignoreId && Number(row?.id) === Number(ignoreId)) return false;

        const rowFp = toNumSafe(
          row?.flowPriority ?? deriveFlowPriorityFromRank(row?.rank),
        );

        return Number(row?.internalStructureId) === s && rowFp === p;
      });
    },
    [rowsForValidation],
  );

  const onSubmit = useCallback(
    async (values) => {
      const fpCandidate = Number(values?.flowPriority);
      resolveRankFromValues(values);

      const internalStructureId = query?.internalStructureId;

      // ✅ 1) block duplicate person+structure (structure comes from top select)
      if (
        hasDuplicatePersonInStructure(
          values?.responsiblePersonId,
          internalStructureId,
          null,
        )
      ) {
        throwDuplicateError();
      }

      // ✅ 2) block if flowPriority 0/1 already exists in this structure
      if (fpCandidate === 0 || fpCandidate === 1) {
        if (
          hasPriority01TakenInStructure(internalStructureId, fpCandidate, null)
        ) {
          throwPriorityTakenError(fpCandidate);
        }
      }

      // ✅ inject internalStructureId from top select into payload
      const payload = buildPayloadFromForm(null, {
        ...values,
        internalStructureId,
      });

      dispatch(addDefaultAgreementPlans(payload));
      setEditingRecord(null);
    },
    [
      dispatch,
      query?.internalStructureId,
      hasDuplicatePersonInStructure,
      hasPriority01TakenInStructure,
      throwDuplicateError,
      throwPriorityTakenError,
    ],
  );

  const onEdit = useCallback(
    async (editId, values) => {
      const fpCandidate = Number(values?.flowPriority);
      resolveRankFromValues(values);

      const internalStructureId = query?.internalStructureId;

      // ✅ 1) block duplicate person+structure (ignore self)
      if (
        hasDuplicatePersonInStructure(
          values?.responsiblePersonId,
          internalStructureId,
          editId,
        )
      ) {
        throwDuplicateError();
      }

      // ✅ 2) block if flowPriority 0/1 already exists in this structure (ignore self)
      if (fpCandidate === 0 || fpCandidate === 1) {
        if (
          hasPriority01TakenInStructure(
            internalStructureId,
            fpCandidate,
            editId,
          )
        ) {
          throwPriorityTakenError(fpCandidate);
        }
      }

      // ✅ inject internalStructureId from top select into payload
      const payload = buildPayloadFromForm(editId, {
        ...values,
        internalStructureId,
      });

      dispatch(editDefaultAgreementPlans(payload));
      setEditingRecord(null);
    },
    [
      dispatch,
      query?.internalStructureId,
      hasDuplicatePersonInStructure,
      hasPriority01TakenInStructure,
      throwDuplicateError,
      throwPriorityTakenError,
    ],
  );

  const closeOnViewModal = useCallback(() => {
    dispatch(setViewModalVisible(false));
  }, [dispatch]);

  const onClickModal = () => {
    setEditingRecord(null);
    modalRef?.current?.open();
  };

  // ✅ when clicking edit, also sync top select to that row's structure
  const onEditClick = useCallback(
    (row) => {
      const normalized = normalizeForEdit(row);

      const rowStructureId = normalized?.internalStructureId;
      if (
        rowStructureId !== undefined &&
        rowStructureId !== null &&
        rowStructureId !== query?.internalStructureId
      ) {
        setPage(1);
        setQuery((prev) => ({ ...prev, internalStructureId: rowStructureId }));
      }

      setEditingRecord(normalized);
      modalRef?.current?.setEdit(normalized);
    },
    [query?.internalStructureId],
  );

  const onDelete = useCallback((deleteId) => {
    setId(deleteId);
  }, []);

  const columns = useMemo(
    () => getStreetColumns(onEditClick, onDelete, dispatch),
    [onEditClick, onDelete, dispatch],
  );

  const [selectedColumns, setSelectedColumns] = useState(
    columns.map((col) => col.dataIndex),
  );

  const handleColumnToggle = (checked, dataIndex) => {
    setSelectedColumns((prevSelected) => {
      if (checked) return [...prevSelected, dataIndex];
      return prevSelected.filter((col) => col !== dataIndex);
    });
  };

  const updateSize = (newSize) => {
    setSize(newSize);
    Cookies.set(
      "pagination-size-questionnaire-defaultagreementplans",
      JSON.stringify(newSize),
      { expires: 7 },
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
              setQuery={setQueryMerge} // ✅ merge (doesn't remove internalStructureId)
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
                <Select
                  width={250}
                  size="sm"
                  value={query?.internalStructureId ?? undefined}
                  onChange={handleInternalStructureChange}>
                  {internalStructureAll?.map((item) => (
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
              ref={modalRef}
              customForm={(f) => {
                modalFormRef.current = f;
              }}
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
                name={"responsiblePersonId"}
                label={"Məsul şəxs"}
                rules={[{ required: true, message: "" }]}>
                <Select size="md">
                  {contractUsersAll?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.firstName} ${item.lastName} ${item.patronymic}`}
                    </Option>
                  ))}
                </Select>
              </Item>

              <Item
                name="flowPriority"
                label="Dövriyyə prioriteti"
                rules={[{ required: true, message: "" }]}>
                <Select size="md">
                  <Option value={0}>Sənəd yaradan</Option>
                  <Option value={1}>Birinci baxan</Option>
                  <Option value={2}>İkinci baxan</Option>
                  <Option value={3}>Digər baxanlar</Option>
                </Select>
              </Item>

              {/* ✅ show Rank ONLY if flowPriority === 3 */}
              <Item
                noStyle
                shouldUpdate={(prev, cur) =>
                  prev.flowPriority !== cur.flowPriority
                }>
                {({ getFieldValue }) => {
                  const flowPriority = getFieldValue("flowPriority");
                  if (flowPriority !== 3) return null;

                  return (
                    <Item
                      preserve={false}
                      name="rank"
                      label="Qrup №"
                      rules={[
                        { required: true, message: "" },
                        {
                          validator: async (_, value) => {
                            if (
                              value === undefined ||
                              value === null ||
                              value === ""
                            )
                              throw new Error("");

                            const numericValue = Number(value);
                            if (Number.isNaN(numericValue)) throw new Error("");

                            if (numericValue < 3) {
                              throw new Error("Qrup № 3-dən kiçik ola bilməz!");
                            }

                            return true;
                          },
                        },
                      ]}>
                      <Input type="number" size="md" />
                    </Item>
                  );
                }}
              </Item>

              {/* ✅ REMOVED: Şablon struktur (internalStructureId) field from modal */}
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
