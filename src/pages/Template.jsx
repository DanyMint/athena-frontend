import React, { useRef, useState } from "react";

import { Card, theme } from "antd";

import "handsontable/dist/handsontable.full.min.css";
import { registerAllModules } from "handsontable/registry";
import { HotTable } from "@handsontable/react";
import { CardHeader } from "../components/TemplateHeader";
import { RefProvider } from "../components/HotTableRef";

import { registerLanguageDictionary, ruRU } from "handsontable/i18n";

registerLanguageDictionary(ruRU);

registerAllModules();

const TemplatePage = ({ templateId = null }) => {
  const doIfTemplateIDNull = () => {
    const defaultData = Array.from({ length: 15 }, () => Array(30).fill(""));
    const defaultTemplateName = "Имя шаблона";

    return [defaultData, defaultTemplateName];
  };

  const [data, templateName] =
    templateId === null ? doIfTemplateIDNull() : null;

  const hotTableRef = useRef(null);
  const [cellStyles, setCellStyles] = useState({}); // Хранение стилей ячеек
  const [currentColor, setCurrentColor] = useState("#FFFFFF");
  const [fontSize, setFontSize] = useState(14);
  const [tableData, setTableData] = useState(data);
  const [mergedCells, setMergedCells] = useState([]);

  const fonts = [
    "Arial", // Классический шрифт без засечек
    "Courier New", // Моноширинный шрифт с засечками
    "Georgia", // Шрифт с засечками, часто используется для текста
    "Times New Roman", // Классический шрифт с засечками
  ];

  const [selectedFont, setSelectedFont] = useState(fonts[0]);

  const handleAfterChange = (changes) => {
    if (!changes) return;

    const newData = [...tableData];
    changes.forEach(([row, col, oldValue, newValue]) => {
      if (oldValue !== newValue) {
        newData[row][col] = newValue;
      }
    });

    setTableData(newData);
  };

  const handleCellSetStyle = (styleName, styleValue) => {
    const hotInstance = hotTableRef.current.hotInstance;

    // Получаем все выделенные диапазоны
    const selectedRanges = hotInstance.getSelected();
    if (!selectedRanges) return;

    // hotInstance.suspendRender();
    const newCellStyles = { ...cellStyles };

    // Перебираем все выделенные ячейки и применяем цвет
    selectedRanges.forEach(([startRow, startCol, endRow, endCol]) => {
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          if (!newCellStyles[`${row}-${col}`]) {
            newCellStyles[`${row}-${col}`] = {}; // Создаем новый объект для ячейки
          }
          const currentCellStyle = newCellStyles[`${row}-${col}`];

          // Тоггл жирного шрифта
          if (currentCellStyle[styleName] === styleValue) {
            delete currentCellStyle[styleName]; // Убираем жирный стиль
          } else {
            currentCellStyle[styleName] = styleValue; // Устанавливаем жирный стиль
          }
        }
      }
    });

    setCellStyles(newCellStyles); // Обновляем глобальное состояние

    // Перерисовываем Handsontable
    hotInstance.render();
    // hotInstance.resumeRender(); // Возобновляем рендеринг
  };

  const handleSelectCellFontFamily = (fontFamily) => {
    const hotInstance = hotTableRef.current.hotInstance;

    // Получаем все выделенные диапазоны
    const selectedRanges = hotInstance.getSelected();
    if (!selectedRanges) return;

    hotInstance.suspendRender();

    const newCellStyles = { ...cellStyles };

    // Перебираем все выделенные ячейки и применяем цвет
    selectedRanges.forEach(([startRow, startCol, endRow, endCol]) => {
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          if (!newCellStyles[`${row}-${col}`]) {
            newCellStyles[`${row}-${col}`] = { fontSize: "14px" }; // Создаем новый объект для ячейки
          }
          newCellStyles[`${row}-${col}`].fontFamily = fontFamily;
        }
      }
    });

    setCellStyles(newCellStyles); // Обновляем глобальное состояние
    setSelectedFont(fontFamily);

    // Перерисовываем Handsontable
    hotInstance.render();
    hotInstance.resumeRender();
  };

  const handleColorChange = (color) => {
    const hotInstance = hotTableRef.current.hotInstance;

    // Получаем все выделенные диапазоны
    const selectedRanges = hotInstance.getSelected();
    if (!selectedRanges) return;

    hotInstance.suspendRender();

    const newCellStyles = { ...cellStyles };

    // Перебираем все выделенные ячейки и применяем цвет
    selectedRanges.forEach(([startRow, startCol, endRow, endCol]) => {
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          if (!newCellStyles[`${row}-${col}`]) {
            newCellStyles[`${row}-${col}`] = {
              fontFamily: fonts[0],
              fontSize: 14,
            }; // Создаем новый объект для ячейки
          }

          newCellStyles[`${row}-${col}`].color = color.toHexString();
        }
      }
    });

    setCellStyles(newCellStyles); // Обновляем глобальное состояние
    setCurrentColor(color.toHexString()); // Обновляем текущий цвет

    // Перерисовываем Handsontable
    hotInstance.render();
    hotInstance.resumeRender();
  };

  const handleAfterSelection = (startRow, startCol) => {
    const styleKey = `${startRow}-${startCol}`;
    const selectedCellStyle = cellStyles[styleKey] || {};

    // // Если у ячейки есть цвет, устанавливаем его в ColorPicker
    setCurrentColor(selectedCellStyle.color || "#FFFFFF");
    setFontSize(selectedCellStyle.fontSize || "14px");
    setSelectedFont(selectedCellStyle.fontFamily || fonts[0]);
  };

  const handleFontSizeChange = (fontSize) => {
    const hotInstance = hotTableRef.current.hotInstance;

    // Получаем все выделенные диапазоны
    const selectedRanges = hotInstance.getSelected();
    if (!selectedRanges) return;

    const newCellStyles = { ...cellStyles };

    // Перебираем все выделенные ячейки и применяем цвет
    selectedRanges.forEach(([startRow, startCol, endRow, endCol]) => {
      for (let row = startRow; row <= endRow; row++) {
        for (let col = startCol; col <= endCol; col++) {
          if (!newCellStyles[`${row}-${col}`]) {
            newCellStyles[`${row}-${col}`] = { fontFamily: fonts[0] }; // Создаем новый объект для ячейки
          }

          newCellStyles[`${row}-${col}`].fontSize = `${fontSize}px`;
        }
      }
    });

    setCellStyles(newCellStyles); // Обновляем глобальное состояние
    setFontSize(fontSize); // Обновляем текущий цвет

    // Перерисовываем Handsontable
    hotInstance.render();
  };

  const customRenderer = (
    hotInstance,
    td,
    row,
    col,
    prop,
    value,
    cellProperties
  ) => {
    const styleKey = `${row}-${col}`;
    const customStyle = cellStyles[styleKey] || {};

    // Применяем все стили из customStyle
    Object.entries(customStyle).forEach(([styleName, styleValue]) => {
      if (styleValue) {
        td.style[styleName] = styleValue;
      }
    });

    // Устанавливаем текст ячейки
    td.innerText = value;
    return td;
  };

  const {
    token: { colorBgLayout },
  } = theme.useToken();

  return (
    <Card
      title={
        <CardHeader
          nameOfTemplate={templateName}
          handleColorChange={handleColorChange}
          handleCellSetStyle={handleCellSetStyle}
          currentColorState={currentColor}
          handleFontSizeChange={handleFontSizeChange}
          fontSizeState={fontSize}
          fonts={fonts}
          selectedFont={selectedFont}
          handleSelectCellFontFamily={handleSelectCellFontFamily}
        />
      }
      bordered={true}
    >
      <HotTable
        ref={hotTableRef}
        language={ruRU.languageCode}
        data={tableData}
        contextMenu
        width="auto"
        height="auto"
        rowHeaders={true}
        colHeaders={true}
        outsideClickDeselects={false}
        selectionMode="multiple" // 'single', 'range' or 'multiple',
        autoWrapRow={true}
        autoWrapCol={true}
        // afterChange={handleAfterChange}
        licenseKey="non-commercial-and-evaluation" // for non-commercial use only
        afterSelection={(startRow, startCol) =>
          handleAfterSelection(startRow, startCol)
        } // Событие выделения ячейки
        cells={(row, col) => {
          const cellProperties = {};
          cellProperties.renderer = customRenderer; // Применяем кастомный рендерер
          return cellProperties;
        }}
        mergeCells={mergedCells}
      />
    </Card>
  );
};

export default TemplatePage;
