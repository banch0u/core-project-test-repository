const fs = require("fs");
const path = require("path");

const questionnaireName = "Miyau";
const constantColumnName = "Miyau";
const endpointName = "/miyau"

const boilerplateTemplate = `import React from "react";
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
  add${questionnaireName},
  delete${questionnaireName},
  edit${questionnaireName},
  get${questionnaireName},
  ${questionnaireName}Visibility,
} from "../../../store/slices/questionnaire";

const { Content } = Layout;
const { Item } = Form;
const Questionnaires${questionnaireName}Content = () => {
  const [innerW, setInnerW] = useState(null);
  const ref = useRef();
  const dispatch = useDispatch();
  const [id, setId] = useState(0);
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(
    Cookies.get("pagination-size-questionnaire-${questionnaireName.toLowerCase()}")
      ? JSON.parse(Cookies.get("pagination-size-questionnaire-${questionnaireName.toLowerCase()}"))
      : 20
  );
  const [query, setQuery] = useState({ name: "" });
  const { loading, ${questionnaireName}Render } = useSelector((state) => state.global);

  const ${questionnaireName} = useSelector(
    (state) => state.questionnaire.${questionnaireName}
  );
  const paginationLength = setPaginationLength(
    ${questionnaireName}?.count,
    ${questionnaireName}?.size
  );

  const onSubmit = useCallback(
    async (data) => {
      dispatch(add${questionnaireName}(data));
    },
    [dispatch]
  );
  const onEdit = useCallback(
    (id, record) => {
      const data = {
        id: id,
        name: record?.name,
      };
      dispatch(edit${questionnaireName}(data));
    },
    [dispatch]
  );
  const onStatusChange = useCallback(
    (data, checked) => {
      const data_ = {
        id: data?.id,
        checked: checked,
      };
      dispatch(${questionnaireName}Visibility(data_));
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
  if (${questionnaireName}?.items) {
    data = ${questionnaireName}?.items?.map((dataObj, i) => ({
      num:
        ${questionnaireName}?.size * ${questionnaireName}?.page + i + 1 - ${questionnaireName}?.size,
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
    dispatch(get${questionnaireName}(data));
  }, [dispatch, page, ${questionnaireName}Render, query, size]);
  const updateSize = (newSize) => {
    setSize(newSize); // Update state
    Cookies.set(
      "pagination-size-questionnaire-${questionnaireName.toLowerCase()}",
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
              <h2>Mülkiyyət növü</h2>
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
                onDelete={() => dispatch(delete${questionnaireName}(id))}
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

export default Questionnaires${questionnaireName}Content;
`;
const constantBoilerplateTemplate = `import * as React from "react";
import { Switch, Tooltip } from "antd";
import style from "../Questionnaires.module.scss";
import { setDeleteModalVisible } from "../../../store/slices/global";
import { DeleteIconQ, EditIcon } from "../../../assets/icons";

export const getStreetColumns = (
  onEditClick,
  onDelete,
  onStatusChange,
  dispatch,
  innerW
) => [
    {
      title: "№",
      dataIndex: "num",
      showCheckbox: false,
      ellipsis: true,
      width: 35,
    },
    {
      title: "${constantColumnName}",
      dataIndex: "name",
      width: innerW,
      disabled: true,
      ellipsis: true,
    },
    {
      title: "Status",
      key: "status",
      disabled: true,

      filter: false,
      render: (data) => (
        <Tooltip placement="top" title="Statusu dəyiş">
          <Switch
            size="medium"
            checked={data?.isActive}
            onChange={(checked) => onStatusChange(data, checked, dispatch)}
          />
        </Tooltip>
      ),
    },
    {
      title: "",
      key: "actions",
      showCheckbox: false,
      width: 80,
      render: (data) => (
        <>
          <div className={style.number}>
            <div className={style.actions}>
              <div onClick={() => onEditClick(data)}>
                <EditIcon />
              </div>
              <div
                onClick={() => {
                  onDelete(data?.id);
                  dispatch(setDeleteModalVisible(true));
                }}
              >
                <DeleteIconQ />
              </div>
            </div>
          </div>
        </>
      ),
    },
  ];
`

const sliceBoilerplateTemplate = `\n\n// ---- generated by questionnaireGenerator: ${questionnaireName} ----\nexport const get${questionnaireName} = createAsyncThunk(
  "/get${questionnaireName}",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.get${questionnaireName}(
        data.size,
        data.page,
        data.query,
        data.visibility
      );
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const get${questionnaireName}All = createAsyncThunk(
  "/get${questionnaireName}All",
  async (visibility, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.get${questionnaireName}All(visibility);
      dispatch(setLoading(false));
      return response?.data?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const add${questionnaireName} = createAsyncThunk(
  "/add${questionnaireName}",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.add${questionnaireName}(data);
      dispatch(setLoading(false));
      dispatch(set${questionnaireName}Render((prev) => !prev));
      dispatch(setViewModalVisible(true));
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);
export const edit${questionnaireName} = createAsyncThunk(
  "/edit${questionnaireName}",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.edit${questionnaireName}(data);
      dispatch(setLoading(false));
      dispatch(set${questionnaireName}Render((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const delete${questionnaireName} = createAsyncThunk(
  "/delete${questionnaireName}",
  async (id, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      await Services.delete${questionnaireName}(id);
      dispatch(setLoading(false));
      dispatch(setDeleteModalVisible(false));
      dispatch(set${questionnaireName}Render((prev) => !prev));
    } catch (error) {
      dispatch(setDeleteModalVisible(false));
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

export const ${questionnaireName}Visibility = createAsyncThunk(
  "${questionnaireName}Visibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.${questionnaireName}Visibility(data);
      dispatch(setLoading(false));
      dispatch(set${questionnaireName}Render((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

// ... edit, delete, visibility thunks omitted for brevity ...
// ---- end generated ----\n`;

const servicesBoilerplateTemplate = `
  // ---- generated by questionnaireGenerator: ${questionnaireName} ----
  static get${questionnaireName} = async (size, page, query, visibility) => {
    const response = await api.get(\`${endpointName}/\${size}/page/\${page}?visibility=\${visibility}&name=\${query?.name}\`);
    return response?.data;
  };
  static get${questionnaireName}All = async (visibility) => {
    const response = await api.get(\`${endpointName}?visibility=\${visibility}\`);
    return response?.data;
  };
  static add${questionnaireName} = async (value) => {
    const response = await api.post("${endpointName}", value);
    return response?.data;
  };
  static edit${questionnaireName} = async (data) => {
    const response = await api.put(\`${endpointName}/\${data?.id}\`, data);
    return response?.data;
  };
  static delete${questionnaireName} = async (id) => {
    const response = await api.delete(\`${endpointName}/\${id}\`);
    return response?.data;
  };
  static ${questionnaireName}Visibility = async (data) => {
    const response = await api.patch(\`${endpointName}/\${data?.id}/visibility/\${data?.checked}\`);
    return response?.data;
  };
  // ---- end generated ----
`;

function findRepoRoot(startDir) {
  let dir = path.resolve(startDir);
  const root = path.parse(dir).root;
  while (true) {
    const pkg = path.join(dir, "package.json");
    if (fs.existsSync(pkg)) return dir;
    if (dir === root) return null;
    dir = path.dirname(dir);
  }
}

function locateQuestionnaireSlice(repoRoot) {
  const candidates = [
    path.join(repoRoot, "src", "store", "slices", "questionnaire", "index.js"),
    path.join(repoRoot, "src", "store", "slices", "questionnaire", "index.jsx"),
    path.join(repoRoot, "src", "store", "slices", "questionnaire.js"),
    path.join(repoRoot, "src", "store", "slices", "questionnaire", "index.ts"),
    path.join(repoRoot, "src", "store", "slices", "questionnaire", "index.tsx"),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return null;
}

function locateQuestionnaireService(repoRoot) {
  const candidates = [
    path.join(repoRoot, "src", "store", "slices", "questionnaire", "service.js"),
    path.join(repoRoot, "src", "store", "slices", "questionnaire", "services.js"),
    path.join(repoRoot, "src", "services", "questionnaire.js"),
    path.join(repoRoot, "src", "services", "questionnaire", "index.js"),
    path.join(repoRoot, "src", "services", "questionnaire", "service.js"),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return null;
}

function locateGlobalSlice(repoRoot) {
  const candidates = [
    path.join(repoRoot, "src", "store", "slices", "global", "index.js"),
    path.join(repoRoot, "src", "store", "slices", "global", "index.jsx"),
    path.join(repoRoot, "src", "store", "slices", "global.js"),
    path.join(repoRoot, "src", "store", "slices", "global", "index.ts"),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return null;
}

function insertIntoClassBody(content, classNamePatterns, insertionText, marker) {
  if (marker && content.includes(marker)) return { updated: content, inserted: false, reason: "marker_present" };
  for (const pattern of classNamePatterns) {
    const regex = new RegExp(`class\\s+${pattern}\\s*\\{`, "m");
    const match = content.match(regex);
    if (match) {
      const classStartIdx = match.index;
      const openBraceIdx = content.indexOf("{", classStartIdx);
      if (openBraceIdx === -1) continue;
      let depth = 0;
      let endIdx = -1;
      for (let i = openBraceIdx; i < content.length; i++) {
        const ch = content[i];
        if (ch === "{") depth++;
        else if (ch === "}") {
          depth--;
          if (depth === 0) { endIdx = i; break; }
        }
      }
      if (endIdx === -1) continue;
      const newContent = content.slice(0, endIdx) + "\n" + insertionText + "\n" + content.slice(endIdx);
      return { updated: newContent, inserted: true, reason: "inserted_in_class", classPattern: pattern };
    }
  }
  return { updated: content, inserted: false, reason: "class_not_found" };
}

try {
  console.log("process.cwd():", process.cwd());
  console.log("__dirname (script dir):", __dirname);

  let repoRoot = findRepoRoot(__dirname) || findRepoRoot(process.cwd());
  if (!repoRoot) {
    console.warn("package.json not found — falling back to process.cwd()");
    repoRoot = process.cwd();
  }
  console.log("repoRoot:", repoRoot);

  // 1) create target folder + component + constant
  const targetFolder = path.join(repoRoot, "src", "pages", "Questionnaires", `Questionnaires${questionnaireName}Content`);
  fs.mkdirSync(targetFolder, { recursive: true });
  const componentPath = path.join(targetFolder, `Questionnaires${questionnaireName}Content.jsx`);
  fs.writeFileSync(componentPath, boilerplateTemplate, "utf8");
  const constantPath = path.join(targetFolder, "constant.js");
  fs.writeFileSync(constantPath, constantBoilerplateTemplate, "utf8");
  console.log("Component and constant created:", componentPath, constantPath);

  // 2) update questionnaire slice
  const slicePath = locateQuestionnaireSlice(repoRoot);
  if (!slicePath) {
    console.warn("questionnaire slice file not found — skipping slice update.");
  } else {
    let sliceContent = fs.readFileSync(slicePath, "utf8");

    if (!/\bServices\b/.test(sliceContent)) {
      const servicesImportGuess = `import Services from "../../../services/questionnaire";\n`;
      sliceContent = servicesImportGuess + sliceContent;
      console.log("Added Services import to slice (verify path):", slicePath);
    }
    if (!/createAsyncThunk/.test(sliceContent)) {
      sliceContent = `import { createAsyncThunk } from "@reduxjs/toolkit";\n` + sliceContent;
      console.log("Added createAsyncThunk import to slice.");
    }

    // add set{questionnaireName}Render to global import
    const newRenderNames = [`set${questionnaireName}Render`];
    const globalImportRegex = /import\s*\{\s*([^}]+)\}\s*from\s*['"]([^'"]*\/slices\/global|[^'"]*\/global)['"];?/m;
    const globalImportMatch = sliceContent.match(globalImportRegex);
    if (globalImportMatch) {
      const fullImport = globalImportMatch[0];
      const importedNames = globalImportMatch[1];
      const modulePath = globalImportMatch[2];
      const existingNames = importedNames.split(",").map(n => n.trim()).filter(Boolean);
      const toAdd = newRenderNames.filter(n => !existingNames.includes(n));
      if (toAdd.length) {
        const merged = existingNames.concat(toAdd).join(", ");
        sliceContent = sliceContent.replace(fullImport, `import { ${merged} } from "${modulePath}";`);
        console.log("Added render import name(s) to existing global import:", toAdd.join(", "));
      } else {
        console.log("Render import already present in global import.");
      }
    } else {
      sliceContent = `import { ${newRenderNames.join(", ")} } from "../../../store/slices/global";\n` + sliceContent;
      console.log("Added new global import for render actions (verify path).");
    }

    // Insert thunks before createSlice declaration
    const createSliceRegex = /export\s+const\s+questionnaire\s*=\s*createSlice\s*\(\s*\{/m;
    if (!sliceContent.includes(`// ---- generated by questionnaireGenerator: ${questionnaireName} ----`)) {
      if (createSliceRegex.test(sliceContent)) {
        const match = sliceContent.match(createSliceRegex);
        const insertIdx = match.index;
        sliceContent = sliceContent.slice(0, insertIdx) + sliceBoilerplateTemplate + "\n" + sliceContent.slice(insertIdx);
        console.log("Inserted slice thunks before createSlice declaration.");
      } else {
        const exportDefaultIdx = sliceContent.search(/export\s+default/);
        if (exportDefaultIdx !== -1) {
          sliceContent = sliceContent.slice(0, exportDefaultIdx) + sliceBoilerplateTemplate + sliceContent.slice(exportDefaultIdx);
          console.log("createSlice not found: inserted thunks before export default.");
        } else {
          sliceContent += "\n" + sliceBoilerplateTemplate;
          console.log("createSlice not found: appended thunks to end.");
        }
      }
    } else {
      console.log("Slice thunks already present — skipping insertion.");
    }

    // Insert reducers into extraReducers builder block
    const reducerLines = `
    // ---- generated reducers for ${questionnaireName} ----
    builder.addCase(get${questionnaireName}.fulfilled, (state, { payload }) => {
      state.${questionnaireName} = payload;
    });
    builder.addCase(get${questionnaireName}All.fulfilled, (state, { payload }) => {
      state.${questionnaireName}All = payload;
    });
    // ---- end generated reducers ----
    `;

    const extraReducersRegex = /extraReducers\s*:\s*\(?\s*builder\s*\)?\s*=>\s*{?/m;
    const extraMatch = sliceContent.match(extraReducersRegex);
    if (extraMatch) {
      const startIdx = extraMatch.index;
      const arrowIdx = sliceContent.indexOf("=>", startIdx);
      const firstBraceIdx = sliceContent.indexOf("{", arrowIdx);
      if (firstBraceIdx === -1) {
        sliceContent += "\n" + reducerLines;
        console.warn("Couldn't find opening brace for extraReducers — appended reducers at file end.");
      } else {
        let depth = 0;
        let endIdx = -1;
        for (let i = firstBraceIdx; i < sliceContent.length; i++) {
          const ch = sliceContent[i];
          if (ch === "{") depth++;
          else if (ch === "}") {
            depth--;
            if (depth === 0) { endIdx = i; break; }
          }
        }
        if (endIdx === -1) {
          sliceContent += "\n" + reducerLines;
          console.warn("Couldn't find matching closing brace for extraReducers — appended reducers at file end.");
        } else {
          sliceContent = sliceContent.slice(0, endIdx) + reducerLines + sliceContent.slice(endIdx);
          console.log("Inserted reducers into extraReducers block.");
        }
      }
    } else {
      sliceContent += "\n" + reducerLines;
      console.warn("No extraReducers found — appended reducers to file end.");
    }

    fs.writeFileSync(slicePath, sliceContent, "utf8");
    console.log("Updated slice file:", slicePath);
  }

  // 3) update service file: insert into Services class or append
  const servicePath = locateQuestionnaireService(repoRoot);
  if (!servicePath) {
    console.warn("Questionnaire service file not found in common locations — skipping service insertion.");
  } else {
    console.log("Found service file at:", servicePath);
    let svcContent = fs.readFileSync(servicePath, "utf8");
    const marker = `// ---- generated by questionnaireGenerator: ${questionnaireName} ----`;
    const classCandidates = ["Services", "QuestionnaireServices", "QuestionnaireService", "service", "ServicesClass"];
    const result = insertIntoClassBody(svcContent, classCandidates, servicesBoilerplateTemplate, marker);
    if (result.inserted) {
      svcContent = result.updated;
      fs.writeFileSync(servicePath, svcContent, "utf8");
      console.log(`Inserted service methods into class (${result.classPattern}) in:`, servicePath);
    } else {
      if (result.reason === "marker_present") {
        console.log("Service methods for this questionnaire already present in service file — skipping insertion.");
      } else if (result.reason === "class_not_found") {
        if (!svcContent.includes(marker)) {
          svcContent += "\n" + servicesBoilerplateTemplate;
          fs.writeFileSync(servicePath, svcContent, "utf8");
          console.warn("Could not find a Services class — appended service methods to the end of the file. Please move them into the class manually.");
        } else {
          console.log("Marker already present — no action taken.");
        }
      } else {
        console.warn("Service insertion was not performed; reason:", result.reason);
      }
    }
    console.log("Service update finished:", servicePath);
  }

  // 4) update global slice (add ownersRender flag, reducer and export)
  const globalPath = locateGlobalSlice(repoRoot);
  if (!globalPath) {
    console.warn("Global slice file not found — please add setOwnersRender manually to src/store/slices/global.");
  } else {
    console.log("Found global slice file at:", globalPath);
    let globalContent = fs.readFileSync(globalPath, "utf8");

    // 4.a add ownersRender to initialState
    if (!/ownersRender\s*:/.test(globalContent)) {
      // prefer inserting after topicsRender if exists
      if (/topicsRender\s*:\s*false,?/.test(globalContent)) {
        globalContent = globalContent.replace(/(topicsRender\s*:\s*false,?)/, `$1\n  ownersRender: false,`);
        console.log("Inserted ownersRender after topicsRender.");
      } else {
        // fallback: insert right after initialState opening brace
        globalContent = globalContent.replace(/const\s+initialState\s*=\s*{/, `const initialState = {\n  ownersRender: false,`);
        console.log("Inserted ownersRender near initialState opening (fallback).");
      }
    } else {
      console.log("ownersRender already present in initialState.");
    }

    // 4.b add reducer setOwnersRender inside reducers
    if (!/setOwnersRender\s*:/.test(globalContent) && !/setOwnersRender\(/.test(globalContent)) {
      // try to find setSubtopicsRender reducer and insert after it
      if (/setSubtopicsRender\s*:\s*\(state,\s*\{\s*payload\s*\}\)\s*=>\s*{/.test(globalContent) ||
        /setSubtopicsRender\s*\:\s*\(state,\s*\{/.test(globalContent)) {
        // insert after setSubtopicsRender reducer block closing brace
        // find location of "setSubtopicsRender: (state, { payload }) => { ... }," block end
        const subRegex = /setSubtopicsRender\s*:\s*\(state[^\{]*\{[^\}]*\}\s*\)\s*=>\s*\{[\s\S]*?\},?/m;
        const m = globalContent.match(subRegex);
        if (m && m.index !== undefined) {
          const insertPos = m.index + m[0].length;
          const insertText = `\n    setOwnersRender: (state, { payload }) => {\n      state.ownersRender = payload;\n    },`;
          globalContent = globalContent.slice(0, insertPos) + insertText + globalContent.slice(insertPos);
          console.log("Inserted setOwnersRender reducer after setSubtopicsRender (approx).");
        } else {
          // fallback: insert near top of reducers block
          globalContent = globalContent.replace(/reducers\s*:\s*{/, `reducers: {\n    setOwnersRender: (state, { payload }) => {\n      state.ownersRender = payload;\n    },`);
          console.log("Inserted setOwnersRender reducer near reducers start (fallback).");
        }
      } else {
        // fallback insertion near reducers start
        globalContent = globalContent.replace(/reducers\s*:\s*{/, `reducers: {\n    setOwnersRender: (state, { payload }) => {\n      state.ownersRender = payload;\n    },`);
        console.log("Inserted setOwnersRender reducer near reducers start (fallback2).");
      }
    } else {
      console.log("setOwnersRender reducer already present.");
    }

    // 4.c add setOwnersRender to exported actions
    if (!/setOwnersRender\b/.test(globalContent)) {
      // find the export const { ... } = global.actions;
      const exportRegex = /export\s+const\s*\{\s*([\s\S]*?)\}\s*=\s*global\.actions\s*;/m;
      const exportMatch = globalContent.match(exportRegex);
      if (exportMatch) {
        const full = exportMatch[0];
        const inner = exportMatch[1];
        // place setOwnersRender near setSubtopicsRender if present
        if (/setSubtopicsRender/.test(inner)) {
          const newInner = inner.replace(/(setSubtopicsRender\s*,?)/, `$1\n  setOwnersRender,`);
          const newExport = `export const { ${newInner} } = global.actions;`;
          globalContent = globalContent.replace(full, newExport);
          console.log("Added setOwnersRender to exported actions near setSubtopicsRender.");
        } else {
          // append to beginning of list
          const newExport = `export const { setOwnersRender, ${inner} } = global.actions;`;
          globalContent = globalContent.replace(full, newExport);
          console.log("Prepended setOwnersRender to exported actions (fallback).");
        }
      } else {
        // fallback: append a new export at end
        globalContent += `\nexport const { setOwnersRender } = global.actions;\n`;
        console.log("Could not find export destructure — appended a new export for setOwnersRender (fallback).");
      }
    } else {
      console.log("setOwnersRender already present in exported actions.");
    }

    fs.writeFileSync(globalPath, globalContent, "utf8");
    console.log("Updated global slice file:", globalPath);
  }

  console.log("=== All done. Please review modified files for import paths and naming. ===");
} catch (err) {
  console.error("Error:", err && err.stack ? err.stack : err);
  process.exit(1);
}