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
  addEmployeeConfigurations,
  // addEmployeeConfigurations,
  deleteEmployeeConfigurations,
  editEmployeeConfigurations,
  employeeConfigurationsVisibility,
  getEmployeeConfigurations,
  getPositionsAll,
} from "../../../store/slices/questionnaire";
import { getTransportEmployeesAll } from "../../../store/slices/employees";
import Select from "../../../components/Select";
const { Option } = AntdSelect;

const { Content } = Layout;
const { Item } = Form;
const QuestionnairesEmployeeConfigurations = () => {
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
  const [typeSelect, setTypeSelect] = useState(1);

  const { loading, employeeConfigurationsRender } = useSelector(
    (state) => state.global
  );

  const employeeConfigurations = useSelector(
    (state) => state.questionnaire.employeeConfigurations
  );
  const transportEmployeesAll = useSelector(
    (state) => state.employees.transportEmployeesAll
  );
  const positionsAll = useSelector((state) => state.questionnaire.positionsAll);
  const paginationLength = setPaginationLength(
    employeeConfigurations?.count,
    employeeConfigurations?.size
  );

  const onSubmit = useCallback(
    async (data_) => {
      const data = {
        ...data_,
        EmployeeIds: (data_.EmployeeIds ?? []).join(","),
        Positions: (data_.Positions ?? []).join(","),
        PersonInChargeForFuelIds: (data_.PersonInChargeForFuelIds ?? []).join(
          ","
        ),
        GeneralStructures: "21,26,202,255",
        OperatingManagerIds: (data_.OperatingManagerIds ?? []).join(","),
      };

      console.log(data);
      dispatch(addEmployeeConfigurations(data));
    },
    [dispatch, typeSelect]
  );

  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
        category: typeSelect,
      };
      dispatch(editEmployeeConfigurations(data));
    },
    [dispatch, typeSelect]
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(employeeConfigurationsVisibility(data_));
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
  let data = [];
  if (employeeConfigurations?.items) {
    data = employeeConfigurations?.items?.map((dataObj, i) => {
      const formatNames = (ids) => {
        if (!Array.isArray(ids)) {
          if (typeof ids === "string") {
            ids = ids.split(",").map((id) => parseInt(id.trim(), 10));
          } else {
            return "";
          }
        }

        return ids
          .map((id) => {
            const person = transportEmployeesAll?.find((p) => p.id === id);
            return person
              ? `${person.name} ${person.surname} ${person.patronymic}`
              : "";
          })
          .filter(Boolean)
          .join(", ");
      };
      const formatPositionNames = (ids) => {
        if (!Array.isArray(ids)) {
          if (typeof ids === "string") {
            ids = ids.split(",").map((id) => parseInt(id.trim(), 10));
          } else {
            return "";
          }
        }

        return ids
          .map((id) => {
            const pos = positionsAll.find((p) => p.id === id);
            return pos ? pos.name : "";
          })
          .filter(Boolean)
          .join(", ");
      };

      return {
        num:
          employeeConfigurations?.size * employeeConfigurations?.page +
          i +
          1 -
          employeeConfigurations?.size,
        id: dataObj?.id,
        EmployeeIds: formatNames(dataObj?.employeeIds),
        GeneralStructures: dataObj?.generalStructures,
        OperatingManagerIds: formatNames(dataObj?.operatingManagerIds),
        PersonInChargeForFuelIds: formatNames(
          dataObj?.personInChargeForFuelIds
        ),
        Positions: formatPositionNames(dataObj?.positions),
        isActive: dataObj?.isActive,
        className: "rowClassName1",
      };
    });
  }

  const columns = useMemo(
    () =>
      getStreetColumns(
        onEditClick,
        onDelete,
        onStatusChange,
        transportEmployeesAll,
        dispatch
      ),
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
      category: typeSelect,
    };
    dispatch(getEmployeeConfigurations(data));
  }, [dispatch, page, employeeConfigurationsRender, typeSelect, size, query]);

  useEffect(() => {
    dispatch(getTransportEmployeesAll());
    dispatch(getPositionsAll({ visibility: "nondeleted" }));
  }, [dispatch]);
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
  // const processDataRecursively = (items) => {
  //   return items?.map((item) => ({
  //     title: item.name,
  //     key: item.id,
  //     value: item.id,
  //     children: item.children ? processDataRecursively(item.children) : [],
  //   }));
  // };
  // const uniqueData = useMemo(() => {
  //   return allGeneralStructures?.reduce((acc, current) => {
  //     const x = acc.find((item) => item.id === current.id);
  //     if (!x) {
  //       acc.push(current);
  //     }
  //     return acc;
  //   }, []);
  // }, [allGeneralStructures]);
  // const generalStructureOption = processDataRecursively(uniqueData);

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
              <h2>Heyyət tənzimləmələri</h2>
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
                name={"EmployeeIds"}
                label={"Heyyət üzvü"}>
                <Select mode={"multiple"}>
                  {transportEmployeesAll?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.name} ${item.surname} ${item.patronymic}, ${item.generalStructureName}, ${item.positionName}`}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item
                rules={[{ required: false, message: "" }]}
                name={"GeneralStructures"}
                label={"Struktur vahidi"}>
                <Select mode={"multiple"}></Select>
              </Item>
              <Item
                rules={[{ required: false, message: "" }]}
                name={"Positions"}
                label={"Vəzifələr"}>
                <Select mode={"multiple"}>
                  {positionsAll?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.name}`}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item
                rules={[{ required: true, message: "" }]}
                name={"PersonInChargeForFuelIds"}
                label={"Məsul şəxs"}>
                <Select mode={"multiple"}>
                  {transportEmployeesAll?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.name} ${item.surname} ${item.patronymic}, ${item.generalStructureName}, ${item.positionName}`}
                    </Option>
                  ))}
                </Select>
              </Item>
              <Item
                rules={[{ required: true, message: "" }]}
                name={"OperatingManagerIds"}
                label={"İstismar şöbəsinin rəisi"}>
                <Select mode={"multiple"}>
                  {transportEmployeesAll?.map((item) => (
                    <Option key={item.id} value={item.id}>
                      {`${item.name} ${item.surname} ${item.patronymic}, ${item.generalStructureName}, ${item.positionName}`}
                    </Option>
                  ))}
                </Select>
              </Item>
            </FormModal>
            <DeleteModal
              onCancel={() => dispatch(setDeleteModalVisible(false))}
              width={280}>
              <Delete
                onDelete={() => dispatch(deleteEmployeeConfigurations(id))}
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

export default QuestionnairesEmployeeConfigurations;
