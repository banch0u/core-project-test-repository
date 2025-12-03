///////////////////////////////   README   ///////////////////////////////
// IN ORDER TO USE THIS SCRIPT YOU HAVE TO CHANGE DIRECTION INTO
//                 /src/ then execute the script
//////////////////////////////////////////////////////////////////////////

const fs = require("fs");
const path = require("path");

////////// === CONFIG === //////////
const questionnaireName = "ContractTypesSubtypes"; // change as needed
const constantColumnName = "Müqavilə alt növü";
const endpointName = "/contracttypes/subtypes";
///////////////////////////////////

const upperName = questionnaireName.toUpperCase();
const pathConstA = `QUESTIONNAIRES_${upperName}`;

/* ------------------ TEMPLATES ------------------ */
function lowercaseFirstChar(questionnaireName) {
  if (!questionnaireName) return "";
  return questionnaireName.charAt(0).toLowerCase() + questionnaireName.slice(1);
}
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
  ${lowercaseFirstChar(questionnaireName)}Visibility,
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
    (state) => state.questionnaire.${lowercaseFirstChar(questionnaireName)}
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
      dispatch(${lowercaseFirstChar(questionnaireName)}Visibility(data_));
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
    setSize(newSize);
    Cookies.set(
      "pagination-size-questionnaire-${questionnaireName.toLowerCase()}",
      JSON.stringify(newSize),
      {
        expires: 7,
      }
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
              <h2>${constantColumnName}</h2>
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
`;

const sliceBoilerplateTemplate = `
export const get${questionnaireName} = createAsyncThunk(
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
      return response?.data;
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
      return response?.data;
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

export const ${lowercaseFirstChar(questionnaireName)}Visibility = createAsyncThunk(
  "${lowercaseFirstChar(questionnaireName)}Visibility",
  async (data, { dispatch }) => {
    try {
      dispatch(setLoading(true));
      const response = await Services.${lowercaseFirstChar(questionnaireName)}Visibility(data);
      dispatch(setLoading(false));
      dispatch(set${questionnaireName}Render((prev) => !prev));
      return response?.data;
    } catch (error) {
      errorMessage(error.response?.data?.message);
      dispatch(setLoading(false));
    }
  }
);

// ---- end generated ----
`;

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
  static ${lowercaseFirstChar(questionnaireName)}Visibility = async (data) => {
    const response = await api.patch(\`${endpointName}/\${data?.id}/visibility/\${data?.checked}\`);
    return response?.data;
  };
// ---- end generated ----
`;

const pathExportsTemplate = `\n// ---- generated by questionnaireGenerator: ${questionnaireName.toUpperCase()} ----
export const ${pathConstA} = QUESTIONNAIRES + "${endpointName}";
// ---- end generated ----\n`;

/* ------------------ HELPERS ------------------ */

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

function locatePathUtils(repoRoot) {
  const candidates = [
    path.join(repoRoot, "src", "utils", "path.js"),
    path.join(repoRoot, "src", "utils", "paths.js"),
    path.join(repoRoot, "src", "constants", "path.js"),
    path.join(repoRoot, "src", "utils", "path", "index.js"),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return null;
}

function locateRoutesFile(repoRoot) {
  const candidates = [
    path.join(repoRoot, "src", "routes", "QuestionnaireRoutes.jsx"),
    path.join(repoRoot, "src", "routes", "QuestionnaireRoutes.js"),
    path.join(repoRoot, "src", "routes", "questionnaireRoutes.jsx"),
    path.join(repoRoot, "src", "routes", "QuestionnairesRoutes.jsx"),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return null;
}

function locateSidebarFile(repoRoot) {
  const candidates = [
    path.join(repoRoot, "src", "layout", "QuestionnairesSidebar", "index.jsx"),
    path.join(repoRoot, "src", "layout", "QuestionnairesSidebar", "index.js"),
    path.join(repoRoot, "src", "layout", "QuestionnairesSidebar", "Index.jsx"),
    path.join(repoRoot, "src", "layout", "QuestionnairesSidebar", "index.tsx"),
  ];
  for (const p of candidates) if (fs.existsSync(p)) return p;
  return null;
}

/**
 * Insert insertionText into a class body identified by any of the classNamePatterns.
 * Returns { updated, inserted, reason, classPattern }.
 */
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

/**
 * Robust insertRouteIntoParentBlock that works with multiline <Route ...> tags.
 * It finds the parent <Route ... path="parentPath" ...> and inserts insertionText
 * immediately before that parent's closing </Route>.
 *
 * Returns { updated, inserted, reason }.
 */
function insertRouteIntoParentBlock(content, parentPath, insertionText) {
  // find <Route ... path="questionnaires" ... >
  const openTagRegex = new RegExp(`<Route[^>]*path=\\{?["']?${parentPath}["']?\\}?[^>]*>`, "m");

  const openMatch = content.match(openTagRegex);
  if (!openMatch) return { updated: content, inserted: false, reason: "parent_not_found" };

  const openIndex = openMatch.index;
  const openEnd = content.indexOf(">", openIndex);

  // now find the matching closing </Route>
  let depth = 0;
  let closeIndex = -1;

  for (let i = openEnd + 1; i < content.length; i++) {
    if (content.startsWith("<Route", i)) {
      depth++;
    } else if (content.startsWith("</Route>", i)) {
      if (depth === 0) {
        closeIndex = i; // <-- we insert BEFORE this
        break;
      } else {
        depth--;
      }
    }
  }

  if (closeIndex === -1)
    return { updated: content, inserted: false, reason: "closing_not_found" };

  // insert BEFORE the parent's </Route>
  const updated =
    content.slice(0, closeIndex) +
    "\n" +
    insertionText +
    "\n" +
    content.slice(closeIndex);

  return { updated, inserted: true, reason: "ok" };
}


/* ------------------ MAIN ------------------ */

try {
  console.log("=== questionnaireGenerator starting ===");
  const repoRoot = findRepoRoot(__dirname) || findRepoRoot(process.cwd());
  const root = repoRoot || process.cwd();
  console.log("repo root:", root);

  // 1) create component & constant files
  const targetFolder = path.join(root, "src", "pages", "Questionnnaires", `Questionnaires${questionnaireName}Content`);
  fs.mkdirSync(targetFolder, { recursive: true });
  const componentPath = path.join(targetFolder, `index.jsx`);
  fs.writeFileSync(componentPath, boilerplateTemplate, "utf8");
  const constantPath = path.join(targetFolder, "constant.js");
  fs.writeFileSync(constantPath, constantBoilerplateTemplate, "utf8");
  console.log("Created component and constant:", componentPath, constantPath);

  // 2) update questionnaire slice file
  const slicePath = locateQuestionnaireSlice(root);
  if (!slicePath) {
    console.warn("questionnaire slice file not found — skipping slice update.");
  } else {
    console.log("Found questionnaire slice:", slicePath);
    let sliceContent = fs.readFileSync(slicePath, "utf8");

    // Ensure Services import
    if (!/\bServices\b/.test(sliceContent)) {
      const servicesImport = `import Services from "../../../services/questionnaire";\n`;
      sliceContent = servicesImport + sliceContent;
      console.log("Added Services import to slice (verify path).");
    }

    // Ensure createAsyncThunk import
    if (!/createAsyncThunk/.test(sliceContent)) {
      sliceContent = `import { createAsyncThunk } from "@reduxjs/toolkit";\n` + sliceContent;
      console.log("Added createAsyncThunk import to slice.");
    }

    // Add set{Questionnaire}Render import into global import or create new import
    const renderName = `set${questionnaireName}Render`;
    const globalImportRegex = /import\s*\{\s*([^}]+)\}\s*from\s*['"]([^'"]*\/slices\/global|[^'"]*\/global)['"];?/m;
    const globalImportMatch = sliceContent.match(globalImportRegex);
    if (globalImportMatch) {
      const fullImport = globalImportMatch[0];
      const importedNames = globalImportMatch[1];
      const modulePath = globalImportMatch[2];
      const existing = importedNames.split(",").map(n => n.trim()).filter(Boolean);
      if (!existing.includes(renderName)) {
        const merged = existing.concat([renderName]).join(", ");
        sliceContent = sliceContent.replace(fullImport, `import { ${merged} } from "${modulePath}";`);
        console.log(`Added ${renderName} to existing global import.`);
      } else {
        console.log(`${renderName} already present in global import.`);
      }
    } else {
      sliceContent = `import { ${renderName} } from "../../../store/slices/global";\n` + sliceContent;
      console.log(`Added new global import for ${renderName} (verify path).`);
    }

    // Insert slice thunks before createSlice declaration (marker-protected)
    if (!sliceContent.includes(`// ---- generated by questionnaireGenerator: ${questionnaireName} ----`)) {
      const createSliceRegex = /export\s+const\s+questionnaire\s*=\s*createSlice\s*\(\s*\{/m;
      const match = sliceContent.match(createSliceRegex);
      if (match) {
        const idx = match.index;
        sliceContent = sliceContent.slice(0, idx) + sliceBoilerplateTemplate + "\n" + sliceContent.slice(idx);
        console.log("Inserted thunks before createSlice.");
      } else {
        const exportIdx = sliceContent.search(/export\s+default/);
        if (exportIdx !== -1) {
          sliceContent = sliceContent.slice(0, exportIdx) + sliceBoilerplateTemplate + sliceContent.slice(exportIdx);
          console.log("createSlice not found: inserted thunks before export default.");
        } else {
          sliceContent += "\n" + sliceBoilerplateTemplate;
          console.log("createSlice not found: appended thunks to end.");
        }
      }
    } else {
      console.log("Slice thunks already generated — skipping insertion.");
    }

    // Insert reducers into extraReducers builder block
    const reducerLines = `
    // ---- generated reducers for ${questionnaireName} ----
    builder.addCase(get${questionnaireName}.fulfilled, (state, { payload }) => {
      state.${lowercaseFirstChar(questionnaireName)} = payload;
    });
    builder.addCase(get${questionnaireName}All.fulfilled, (state, { payload }) => {
      state.${lowercaseFirstChar(questionnaireName)}All = payload;
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
        console.warn("Couldn't find '{' after extraReducers arrow — appended reducers at file end.");
      } else {
        // find matching closing brace
        let depth = 0;
        let endIdx = -1;
        for (let i = firstBraceIdx; i < sliceContent.length; i++) {
          const ch = sliceContent[i];
          if (ch === "{") depth++;
          else if (ch === "}") {
            depth--;
            if (depth === 0) {
              endIdx = i;
              break;
            }
          }
        }
        if (endIdx === -1) {
          sliceContent += "\n" + reducerLines;
          console.warn("Couldn't find matching closing brace for extraReducers — appended reducers at file end.");
        } else {
          if (!sliceContent.includes(`builder.addCase(get${questionnaireName}.fulfilled`)) {
            sliceContent = sliceContent.slice(0, endIdx) + reducerLines + sliceContent.slice(endIdx);
            console.log("Inserted reducers into extraReducers block.");
          } else {
            console.log("Reducers already present in slice — skipping reducer insertion.");
          }
        }
      }
    } else {
      sliceContent += "\n" + reducerLines;
      console.warn("extraReducers not found — appended reducers at file end.");
    }

    fs.writeFileSync(slicePath, sliceContent, "utf8");
    console.log("Updated slice file:", slicePath);
  } // end slice update

  // 3) update / insert into Services file
  const servicePath = locateQuestionnaireService(root);
  if (!servicePath) {
    console.warn("Questionnaire service file not found — skipping service insertion.");
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
        console.log("Service methods already present in service file — skipping.");
      } else if (result.reason === "class_not_found") {
        if (!svcContent.includes(marker)) {
          svcContent += "\n" + servicesBoilerplateTemplate;
          fs.writeFileSync(servicePath, svcContent, "utf8");
          console.warn("Could not find services class — appended service methods to end of file. Please move them into the class manually.");
        } else {
          console.log("Marker present — no changes made.");
        }
      } else {
        console.warn("Service insertion not performed; reason:", result.reason);
      }
    }
  }

  // 4) update global slice (initialState, reducer, export list)
  const globalPath = locateGlobalSlice(root);
  if (!globalPath) {
    console.warn("Global slice not found — please add set<...>Render manually if needed.");
  } else {
    console.log("Found global slice:", globalPath);
    let globalContent = fs.readFileSync(globalPath, "utf8");

    // 4.a add stateKey to initialState
    const stateKey = `${questionnaireName}Render`;
    if (!new RegExp(`\\b${stateKey}\\s*:`).test(globalContent)) {
      if (/topicsRender\s*:\s*false,?/.test(globalContent)) {
        globalContent = globalContent.replace(/(topicsRender\s*:\s*false,?)/, `$1\n  ${stateKey}: false,`);
        console.log(`Inserted ${stateKey} after topicsRender.`);
      } else if (/notificationsRender\s*:\s*false,?/.test(globalContent)) {
        globalContent = globalContent.replace(/(notificationsRender\s*:\s*false,?)/, `$1\n  ${stateKey}: false,`);
        console.log(`Inserted ${stateKey} after notificationsRender.`);
      } else {
        globalContent = globalContent.replace(/const\s+initialState\s*=\s*{/, `const initialState = {\n  ${stateKey}: false,`);
        console.log(`Inserted ${stateKey} near initialState opening (fallback).`);
      }
    } else {
      console.log(`${stateKey} already exists in initialState.`);
    }

    // 4.b add reducer function
    const reducerName = `set${questionnaireName}Render`;
    if (!new RegExp(`\\b${reducerName}\\b`).test(globalContent)) {
      const reducersStart = globalContent.search(/reducers\s*:\s*{/m);
      if (reducersStart !== -1) {
        const insertPos = globalContent.indexOf("{", reducersStart) + 1;
        const reducerText = `\n    ${reducerName}: (state, { payload }) => {\n      state.${questionnaireName}Render = payload;\n    },\n`;
        globalContent = globalContent.slice(0, insertPos) + reducerText + globalContent.slice(insertPos);
        console.log(`Inserted reducer ${reducerName} into reducers block.`);
      } else {
        globalContent = globalContent.replace(/reducers\s*:\s*{/, `reducers: {\n    ${reducerName}: (state, { payload }) => {\n      state.${questionnaireName}Render = payload;\n    },`);
        console.log(`Inserted reducer ${reducerName} with fallback insertion.`);
      }
    } else {
      console.log(`Reducer ${reducerName} already present.`);
    }

    // 4.c add reducer name into export destructure
    const exportDestructRegex = /export\s+const\s*\{\s*([\s\S]*?)\}\s*=\s*global\.actions\s*;/m;
    const exportMatch = globalContent.match(exportDestructRegex);
    if (exportMatch) {
      const full = exportMatch[0];
      let inner = exportMatch[1];
      const names = inner.split(",").map(n => n.trim()).filter(Boolean);
      if (!names.includes(reducerName)) {
        let insertIndex = names.findIndex(n => /set.*Render$/.test(n));
        if (insertIndex === -1) insertIndex = 0;
        names.splice(insertIndex + 1, 0, reducerName);
        const newInner = names.join(",\n  ");
        const newExport = `export const {\n  ${newInner}\n} = global.actions;`;
        globalContent = globalContent.replace(full, newExport);
        console.log(`Added ${reducerName} to exported global actions.`);
      } else {
        console.log(`${reducerName} already present in exported global.actions.`);
      }
    } else {
      if (!new RegExp(`export\\s+const\\s*\\{[\\s\\S]*${reducerName}[\\s\\S]*\\}\\s*=\\s*global\\.actions`).test(globalContent)) {
        globalContent += `\nexport const { ${reducerName} } = global.actions;\n`;
        console.log(`Appended a new export for ${reducerName} (fallback).`);
      }
    }

    fs.writeFileSync(globalPath, globalContent, "utf8");
    console.log("Updated global slice:", globalPath);
  }

  // 5) update utils/path.js with the route constant (DOCUMENT only)
  const pathUtils = locatePathUtils(root);
  if (!pathUtils) {
    console.warn("utils/path.js not found — skipping path constants insertion.");
  } else {
    console.log("Found path utils file:", pathUtils);
    let pathContent = fs.readFileSync(pathUtils, "utf8");

    const marker = `// ---- generated by questionnaireGenerator: ${questionnaireName.toUpperCase()} ----`;
    if (pathContent.includes(marker)) {
      console.log("Path exports already present in utils/path.js — skipping.");
    } else {
      const insertAfterRegex = /(export\s+const\s+QUESTIONNAIRES\b[^\n]*\n)/m;
      if (insertAfterRegex.test(pathContent)) {
        pathContent = pathContent.replace(insertAfterRegex, `$1${pathExportsTemplate}`);
        console.log("Inserted path exports after QUESTIONNAIRES constant.");
      } else {
        pathContent += "\n" + pathExportsTemplate;
        console.log("Appended path exports to end of utils/path.js (fallback).");
      }
      fs.writeFileSync(pathUtils, pathContent, "utf8");
      console.log("Updated utils/path.js:", pathUtils);
    }
  }

  // 6) update routes/QuestionnaireRoutes.jsx: add component import, add path constants to utils/path named import,
  //    and insert Route entries into Document parent block.
  const routesPath = locateRoutesFile(root);
  if (!routesPath) {
    console.warn("QuestionnaireRoutes.jsx not found — skipping routes changes.");
  } else {
    console.log("Found routes file:", routesPath);
    let routesContent = fs.readFileSync(routesPath, "utf8");

    // 6.a Add the path constants into the named import from "../utils/path"
    const pathImportRegex = /import\s*\{\s*([\s\S]*?)\}\s*from\s*['"]\.\.\/utils\/path['"];?/m;
    const pathImportMatch = routesContent.match(pathImportRegex);
    if (pathImportMatch) {
      const full = pathImportMatch[0];
      const inner = pathImportMatch[1];
      // split names and clean
      const names = inner.split(",").map(n => n.replace(/[\n\r]/g, "").trim()).filter(Boolean);
      let changed = false;
      if (!names.includes(pathConstA)) { names.push(pathConstA); changed = true; }
      if (changed) {
        // preserve multiline formatting
        const hasMultiline = /\n/.test(inner);
        const newInner = hasMultiline ? names.join(",\n  ") : names.join(", ");
        const newImport = `import {\n  ${newInner}\n} from "../utils/path";`;
        routesContent = routesContent.replace(full, newImport);
        console.log("Inserted path constants into ../utils/path named import in routes file.");
      } else {
        console.log("Path constants already present in ../utils/path import — skipping.");
      }
    } else {
      // fallback: add a small named import
      const safeImport = `import { ${pathConstA} } from "../utils/path";\n`;
      // place after first import block
      const firstNonImport = routesContent.indexOf("\n\n");
      if (firstNonImport !== -1 && firstNonImport < 5000) {
        routesContent = routesContent.slice(0, firstNonImport) + "\n" + safeImport + routesContent.slice(firstNonImport);
      } else {
        routesContent = safeImport + routesContent;
      }
      console.log("No ../utils/path named import found — added separate import for path constants.");
    }

    // 6.b add component import (separate import line), marker-protected
    const componentImportLine = `import Questionnaires${questionnaireName}Content from "../pages/Questionnnaires/Questionnaires${questionnaireName}Content";\n`;
    const importMarker = `// ---- generated import by questionnaireGenerator: ${questionnaireName} ----`;
    if (!routesContent.includes(componentImportLine.trim())) {
      // try insert near other Questionnnaires imports
      const pagesImportRegex = /(import\s+[^;]*\.\.\/pages\/Questionnnaires[^;]*;\n)/g;
      let lastMatch;
      while (true) {
        const m = pagesImportRegex.exec(routesContent);
        if (!m) break;
        lastMatch = m;
      }
      if (lastMatch && lastMatch.index !== undefined) {
        const insertPos = lastMatch.index + lastMatch[0].length;
        routesContent = routesContent.slice(0, insertPos) + `\n${componentImportLine}` + routesContent.slice(insertPos);
        routesContent = routesContent.replace(componentImportLine, `${importMarker}\n${componentImportLine}`);
        console.log("Inserted component import near other Questionnnaires imports.");
      } else {
        // fallback: append after top imports
        const firstNonImport = routesContent.indexOf("\n\n");
        if (firstNonImport !== -1 && firstNonImport < 5000) {
          routesContent = routesContent.slice(0, firstNonImport) + `\n${importMarker}\n${componentImportLine}` + routesContent.slice(firstNonImport);
          console.log("Inserted component import near top of routes file (fallback).");
        } else {
          routesContent = `${importMarker}\n${componentImportLine}\n` + routesContent;
          console.log("Prepended component import to routes file (fallback).");
        }
      }
    } else {
      console.log("Component import already present — skipping import insertion.");
    }

    // 6.c Insert Route entry into questionnaires parent
    const routeEntryDocument = `
        <Route 
          path={${pathConstA}} 
          element={<Questionnaires${questionnaireName}Content />} 
        />
`;
    // Insert route into <Route path="questionnaires">
    const resDoc = insertRouteIntoParentBlock(
      routesContent,
      "questionnaires",
      routeEntryDocument
    );

    if (resDoc.inserted) {
      routesContent = resDoc.updated;
      console.log("Inserted questionnaire route inside questionnaires block.");
    } else {
      console.warn("⚠ Could not insert questionnaire route:", resDoc.reason);

      // fallback inserting BEFORE the parent closing </Route>
      const parentClose = routesContent.lastIndexOf("</Route>");
      if (parentClose !== -1) {
        routesContent =
          routesContent.slice(0, parentClose) +
          routeEntryDocument +
          routesContent.slice(parentClose);
        console.log("Fallback inserted questionnaire route before closing </Route>.");
      } else {
        console.warn("⚠ No parent closing </Route> found — appending at bottom.");
        routesContent += "\n" + routeEntryDocument;
      }
    }


    // write back routes file
    fs.writeFileSync(routesPath, routesContent, "utf8");
    console.log("Updated routes file:", routesPath);
  } // end routes update

  // 7) update layout/QuestionnairesSidebar/index.jsx (add import of path constants & append menu item)
  const sidebarPath = locateSidebarFile(root);
  if (!sidebarPath) {
    console.warn("QuestionnairesSidebar not found — skipping sidebar changes.");
  } else {
    console.log("Found sidebar file:", sidebarPath);
    let sidebarContent = fs.readFileSync(sidebarPath, "utf8");

    // Add path constants into the named import from "../../utils/path"
    const sidebarPathImportRegex = /import\s*\{\s*([\s\S]*?)\}\s*from\s*['"]\.\.\/\.\.\/utils\/path['"];?/m;
    const sidebarPathImportMatch = sidebarContent.match(sidebarPathImportRegex);
    if (sidebarPathImportMatch) {
      const full = sidebarPathImportMatch[0];
      const inner = sidebarPathImportMatch[1];
      const names = inner.split(",").map(n => n.replace(/[\n\r]/g, "").trim()).filter(Boolean);
      let changed = false;
      if (!names.includes(pathConstA)) { names.push(pathConstA); changed = true; }
      if (changed) {
        const hasMultiline = /\n/.test(inner);
        const newInner = hasMultiline ? names.join(",\n  ") : names.join(", ");
        const newImport = `import {\n  ${newInner}\n} from "../../utils/path";`;
        sidebarContent = sidebarContent.replace(full, newImport);
        console.log("Inserted sidebar path constants into ../../utils/path named import.");
      } else {
        console.log("Sidebar already has path constants imported — skipping.");
      }
    } else {
      // fallback: add import near top
      const safeImport = `import { ${pathConstA} } from "../../utils/path";\n`;
      const firstNonImport = sidebarContent.indexOf("\n\n");
      if (firstNonImport !== -1 && firstNonImport < 5000) {
        sidebarContent = sidebarContent.slice(0, firstNonImport) + "\n" + safeImport + sidebarContent.slice(firstNonImport);
      } else {
        sidebarContent = safeImport + sidebarContent;
      }
      console.log("Added separate import for sidebar path constants (fallback).");
    }

    // Append the item object into the items array end (marker-protected)
    const sidebarMarker = `// ---- generated sidebar item by questionnaireGenerator: ${questionnaireName} ----`;
    if (!sidebarContent.includes(sidebarMarker)) {
      // find the items = [ ... ] block
      const itemsArrayRegex = /const\s+items\s*=\s*\[\s*([\s\S]*?)\s*\];/m;
      const itemsMatch = sidebarContent.match(itemsArrayRegex);
      const menuObject = `    {\n      key: "${endpointName.replace(/^\//, "")}", //delete the "/" at the start of string \n      label: "${constantColumnName}", \n      link: ${pathConstA}, \n},\n`;
      if (itemsMatch) {
        // insert before closing bracket of the items array
        const startIdx = itemsMatch.index;
        const matchText = itemsMatch[0];
        // insert at end of matchText before closing '];'
        const insertPos = startIdx + matchText.lastIndexOf("]");
        const newContent = sidebarContent.slice(0, insertPos) + "\n" + menuObject + sidebarMarker + "\n" + sidebarContent.slice(insertPos);
        sidebarContent = newContent;
        console.log("Inserted sidebar menu object into items array.");
      } else {
        // fallback: try to find 'const items = [' and append within file near where items is declared
        const itemsStart = sidebarContent.indexOf("const items = [");
        if (itemsStart !== -1) {
          const insertPos = sidebarContent.indexOf("];", itemsStart);
          if (insertPos !== -1) {
            sidebarContent = sidebarContent.slice(0, insertPos) + ",\n" + menuObject + sidebarMarker + "\n" + sidebarContent.slice(insertPos);
            console.log("Fallback inserted sidebar menu object into items array.");
          } else {
            console.warn("Couldn't find end of items array to insert menu object — manual insertion needed.");
          }
        } else {
          console.warn("Couldn't find items array in sidebar file — manual insertion needed.");
        }
      }
    } else {
      console.log("Sidebar menu object marker present — skipping insertion.");
    }

    // write back sidebar file
    fs.writeFileSync(sidebarPath, sidebarContent, "utf8");
    console.log("Updated sidebar file:", sidebarPath);
  }

  console.log("=== Done. Please review the modified files ===");
  console.log(" - component:", componentPath);
  console.log(" - constant:", constantPath);
  if (slicePath) console.log(" - questionnaire slice:", slicePath);
  if (servicePath) console.log(" - questionnaire service:", servicePath);
  if (globalPath) console.log(" - global slice:", globalPath);
  if (pathUtils) console.log(" - utils/path:", pathUtils);
  if (routesPath) console.log(" - routes file:", routesPath);
  if (sidebarPath) console.log(" - sidebar file:", sidebarPath);
  console.log("Review import paths, Unicode names, and run linter/build.");

} catch (err) {
  console.error("Error:", err && err.stack ? err.stack : err);
  process.exit(1);
}
