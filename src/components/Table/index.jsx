import React, { useState, useEffect } from "react";
import style from "./index.module.scss";
import { Table as AntTable } from "antd";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Cookies from "js-cookie";

const Table = ({
  tableId,
  columns,
  dataSource,
  selectedColumns,
  innerW,
  disableDrag,
  big = false,
  isArchive = false,
  expanded,
}) => {
  const getSavedOrder = (id) => {
    const savedOrder = Cookies.get(`columnOrder_${id}`);
    return savedOrder ? savedOrder.split(",") : null;
  };
  const sortColumns = (cols, order) => {
    if (!order) return cols;
    const orderedCols = cols.filter((col) => order.includes(col.dataIndex));
    const unorderedCols = cols.filter((col) => !order.includes(col.dataIndex));
    return [
      ...orderedCols.sort(
        (a, b) => order.indexOf(a.dataIndex) - order.indexOf(b.dataIndex)
      ),
      ...unorderedCols,
    ];
  };

  // Get initial saved order only if disableDrag is false
  const savedOrder = disableDrag ? null : getSavedOrder(tableId);
  const initialOrderedColumns = sortColumns(
    columns.filter((col) => !col.fixed),
    savedOrder
  );

  const [orderedColumns, setOrderedColumns] = useState(initialOrderedColumns);

  useEffect(() => {
    if (!disableDrag) {
      const savedOrder = getSavedOrder(tableId);
      setOrderedColumns(
        sortColumns(
          columns.filter((col) => !col.fixed),
          savedOrder
        )
      );
    } else {
      setOrderedColumns(columns.filter((col) => !col.fixed));
    }
  }, [tableId, columns, disableDrag]);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedColumns = Array.from(orderedColumns);
    const [removed] = reorderedColumns.splice(result.source.index, 1);
    reorderedColumns.splice(result.destination.index, 0, removed);

    setOrderedColumns(reorderedColumns);
    if (!disableDrag) {
      Cookies.set(
        `columnOrder_${tableId}`,
        reorderedColumns.map((col) => col.dataIndex).join(","),
        { expires: 7 }
      );
    }
  };

  const calculateLeft = (index) => {
    return fixedLeftColumns
      .slice(0, index)
      .reduce((total, col) => total + col.width, 0);
  };

  const calculateRight = (index) => {
    return fixedRightColumns
      .slice(0, index)
      .reduce((total, col) => total + col.width, 0);
  };

  const filteredColumns = (cols) =>
    cols.filter(
      (col) => !selectedColumns || selectedColumns.includes(col.dataIndex)
    );

  const fixedLeftColumns = filteredColumns(
    columns.filter((col) => col.fixed === "left")
  );
  const fixedRightColumns = filteredColumns(
    columns.filter((col) => col.fixed === "right")
  );
  const draggableColumns = filteredColumns(orderedColumns);

  const DraggableHeader = () => (
    <tr>
      {fixedLeftColumns.map((col, index) => (
        <th
          key={col.dataIndex}
          className={style.draggableHeader}
          style={{
            position: "sticky",
            left: calculateLeft(index),
            zIndex: 99999,
            background: "white",
          }}>
          {col.title}
        </th>
      ))}
      {draggableColumns.map((col) => (
        <th
          key={col.dataIndex}
          className={style.draggableHeader}
          style={{
            cursor: disableDrag ? "default" : "move",
          }}>
          {col.title}
        </th>
      ))}
      {fixedRightColumns.map((col, index) => (
        <th
          key={col.dataIndex}
          className={style.draggableHeader}
          style={{
            position: "sticky",
            right: calculateRight(index),
            zIndex: 99999,
            background: "white",
          }}>
          {col.title}
        </th>
      ))}
    </tr>
  );
  const DraggableWrapper = () => (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId={`droppable_${tableId}`} direction="horizontal">
        {(provided) => (
          <tr ref={provided.innerRef} {...provided.droppableProps}>
            {fixedLeftColumns.map((col, index) => (
              <th
                key={col.dataIndex}
                className={style.draggableHeader}
                style={{
                  position: "sticky",
                  left: calculateLeft(index),
                  zIndex: 99,
                  background: "white",
                }}>
                {col.title}
              </th>
            ))}
            {draggableColumns.map((col, index) => (
              <Draggable
                key={col.dataIndex}
                draggableId={`${col.dataIndex}_${tableId}`}
                index={index}>
                {(provided) => (
                  <th
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={style.draggableHeader}
                    style={{
                      ...provided.draggableProps.style,
                      cursor: "move",
                    }}>
                    {col.title}
                  </th>
                )}
              </Draggable>
            ))}
            {fixedRightColumns.map((col, index) => (
              <th
                key={col.dataIndex}
                className={style.draggableHeader}
                style={{
                  position: "sticky",
                  right: calculateRight(index),
                  zIndex: 99,
                  background: "white",
                }}>
                {col.title}
              </th>
            ))}
            {provided.placeholder}
          </tr>
        )}
      </Droppable>
    </DragDropContext>
  );

  const components = {
    header: {
      row: (props) =>
        disableDrag ? (
          <DraggableHeader {...props} columns={columns} />
        ) : (
          <DraggableWrapper {...props} columns={columns} />
        ),
    },
  };

  return (
    <div className={style.table_container}>
      <AntTable
        rowClassName={(record) => record.className}
        columns={[
          ...fixedLeftColumns,
          ...draggableColumns,
          ...fixedRightColumns,
        ]}
        dataSource={dataSource}
        pagination={false}
        components={components}
        scroll={{
          x:
            innerW *
            (Array.isArray(selectedColumns) ? selectedColumns.length - 1 : 0),
          y: !isArchive
            ? `calc(88vh - ${
                window.innerWidth > 1537
                  ? big === true
                    ? "180px"
                    : "260px"
                  : big === true
                  ? "200px"
                  : "280px"
              })`
            : `calc(88vh - ${
                window.innerWidth > 1537
                  ? expanded
                    ? "349px"
                    : "280px"
                  : expanded
                  ? "368px"
                  : "300px"
              })`,
        }}
      />
    </div>
  );
};

export default Table;
