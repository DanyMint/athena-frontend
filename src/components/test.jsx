import React, { useRef, useState, useEffect } from "react";
import Handsontable from "handsontable";
import { HotTable } from "@handsontable/react";
import "handsontable/dist/handsontable.full.css";
import { registerLanguageDictionary, ruRU } from "handsontable/i18n";
import { registerAllModules } from "handsontable/registry";
import { Button } from "antd";

registerLanguageDictionary(ruRU);
registerAllModules();

const Test = () => {
  // const [mergedCells, setMergedCells] = useState([]);
  // const [cellStyleData, setCellStyleData] = useState([]);

  const hotRef = useRef();
  const [data, setData] = useState([
    ["Заголовок1", "Заголовок2", "Заголовок3", "Заголовок4"],
    ["Заголовок1", "Заголовок2", "Заголовок3", "Заголовок4"],
    ["Заголовок1", "Заголовок2", "Заголовок3", "Заголовок4"],
    ["Заголовок1", "Заголовок2", "Заголовок3", "Заголовок4"],
    ["Заголовок1", "Заголовок2", "Заголовок3", "Заголовок4"],
    ["Заголовок1", "Заголовок2", "Заголовок3", "Заголовок4"],
  ]);

  // const handleCellsMergeChange = (cellsRange, parent) => {
  //   const hotInstance = hotRef.current?.hotInstance;
  //   const currentMerges =
  //     hotInstance?.getPlugin("mergeCells")?.mergedCellsCollection.mergedCells;

  //   hotInstance.suspendRender();

  //   let newMergedCells = [];
  //   if (currentMerges !== undefined) {
  //     newMergedCells = currentMerges.map((merge) => ({
  //       row: merge.row,
  //       col: merge.col,
  //       rowspan: merge.rowspan,
  //       colspan: merge.colspan,
  //     }));
  //   }

  //   setMergedCells(newMergedCells);

  //   hotInstance.render();
  //   hotInstance.resumeRender();
  // };

  const buttonCellStyle = (className) => {};

  const processCells = (className, innerFunction) => {
    const hotInstance = hotRef.current?.hotInstance;
    if (!hotInstance) {
      console.error("HotTable instance не найден.");
      return;
    }

    const selectedCells = hotInstance.getSelected();
    if (!selectedCells || selectedCells.length === 0) {
      alert("Выделите ячейки для изменения стиля!");
      return;
    }

    hotInstance.suspendRender();

    for (let index = 0; index < selectedCells.length; index += 1) {
      const [row1, column1, row2, column2] = selectedCells[index];
      const startRow = Math.max(Math.min(row1, row2), 0);
      const endRow = Math.max(row1, row2);
      const startCol = Math.max(Math.min(column1, column2), 0);
      const endCol = Math.max(column1, column2);

      for (let rowIndex = startRow; rowIndex <= endRow; rowIndex += 1) {
        for (let colIndex = startCol; colIndex <= endCol; colIndex += 1) {
          innerFunction(hotInstance, rowIndex, colIndex, className);
        }
      }
    }

    hotInstance.render();
    hotInstance.resumeRender();
  };

  const handleButtonCellStyle = (className) => {
    processCells(className, (hotInstance, rowIndex, colIndex, className) => {
      const currentMeta = hotInstance.getCellMeta(rowIndex, colIndex);
      const newCellClass = [
        ...(currentMeta?.className?.split(" ") || []),
        className,
      ].join(" ");

      hotInstance.setCellMeta(rowIndex, colIndex, "className", newCellClass);
    });
  };

  const toggleCellStyle = (className) => {
    processCells(className, (hotInstance, rowIndex, colIndex, className) => {
      const currentMeta = hotInstance.getCellMeta(rowIndex, colIndex);
      let newCellClass;

      if (currentMeta?.className?.includes(className)) {
        // Удаляем класс
        newCellClass = currentMeta.className
          .split(" ")
          .filter((existingClass) => existingClass !== className)
          .join(" ");
      } else {
        // Добавляем класс
        newCellClass = [
          ...(currentMeta?.className?.split(" ") || []),
          className,
        ].join(" ");
      }

      hotInstance.setCellMeta(rowIndex, colIndex, "className", newCellClass);
    });
  };

  return (
    <>
      <Button
        onClick={() => {
          toggleCellStyle("font-bold");
        }}
      >
        <span className="font-bold">B</span>
      </Button>
      <HotTable
        ref={hotRef}
        colHeaders={true}
        rowHeaders={true}
        data={data}
        width="auto"
        height="auto"
        licenseKey="non-commercial-and-evaluation"
        contextMenu={true}
        language={ruRU.languageCode}
        mergeCells={true}
        outsideClickDeselects={false}
        selectionMode="multiple" // 'single', 'range' or 'multiple',
        autoWrapRow={true}
        autoWrapCol={true}
        manualRowMove={true}
        manualRowFreeze={true}
        manualRowResize={true}
        manualColumnResize={true}
        manualColumnFreeze={true}
        manualColumnMove={true}
        persistentState={true}
        // mergeCells={mergedCells}
        // cell={cellStyleData}
        // afterMergeCells={handleCellsMergeChange}
        // afterUnmergeCells={handleCellsMergeChange}
      ></HotTable>
    </>
  );
};

export default Test;
