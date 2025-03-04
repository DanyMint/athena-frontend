import React, { useState } from "react";
import { DownOutlined, SaveOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  ColorPicker,
  Space,
  Row,
  Col,
  Input,
  Dropdown,
  Button,
  InputNumber,
  Select,
} from "antd";

const TitleWithEdit = ({ templateName, setTemplateName }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => setIsEditing(true);

  const handleBlur = (e) => {
    setIsEditing(false);
    setTemplateName(e.target.value);
  };

  return (
    <div onDoubleClick={handleDoubleClick}>
      {isEditing ? (
        <Input
          defaultValue={templateName}
          onBlur={handleBlur}
          onPressEnter={(e) => {
            setIsEditing(false);
            setTemplateName(e.target.value);
          }}
          autoFocus
          style={{
            margin: "0.9rem 0rem ",
          }}
        />
      ) : (
        <h2>{templateName}</h2>
      )}
    </div>
  );
};

const FileMenu = () => {
  const items = [
    {
      label: "Сохранить",
      key: "1",
      icon: <SaveOutlined />,
    },
    {
      label: "Удалить",
      key: "2",
      icon: <DeleteOutlined />,
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button>
        <Space>
          Файл
          <DownOutlined />
        </Space>
      </Button>
    </Dropdown>
  );
};

const FormatMenu = ({
  handleColorChange,
  handleCellSetStyle,
  currentColor,
  handleFontSizeChange,
  fontSizeState,
  fonts,
  selectedFont,
  handleSelectCellFontFamily,
}) => {
  const formattedFonts = fonts.map((font) => ({
    value: font,
    label: font,
  }));

  return (
    <Row align="middle" gutter={[8, 8]}>
      <Col>
        <Select
          value={selectedFont}
          showSearch
          style={{ width: 200 }}
          placeholder="Выбрать шрифт"
          optionFilterProp="label"
          filterSort={(optionA, optionB) =>
            (optionA?.label ?? "")
              .toLowerCase()
              .localeCompare((optionB?.label ?? "").toLowerCase())
          }
          onSelect={handleSelectCellFontFamily}
          options={formattedFonts}
        />
      </Col>
      <Col>
        <InputNumber
          min={1}
          max={200}
          keyboard={true}
          defaultValue={fontSizeState}
          onChange={handleFontSizeChange}
        ></InputNumber>
      </Col>
      <Col>
        <Button
          type="text"
          style={{ fontWeight: "bold" }}
          onClick={() => handleCellSetStyle("fontWeight", "bold")}
        >
          B
        </Button>
      </Col>
      <Col>
        <Button
          type="text"
          style={{ fontStyle: "italic" }}
          onClick={() => handleCellSetStyle("fontStyle", "italic")}
        >
          I
        </Button>
      </Col>
      <Col>
        <Button
          type="text"
          style={{ textDecoration: "underline" }}
          onClick={() => handleCellSetStyle("textDecoration", "underline")}
        >
          U
        </Button>
      </Col>
      <Col>
        <ColorPicker
          value={currentColor} // Текущий цвет
          onChangeComplete={handleColorChange} // Вызывается при выборе нового цвета
          showText
        />
      </Col>
    </Row>
  );
};

export const CardHeader = ({
  nameOfTemplate,
  handleColorChange,
  handleCellSetStyle,
  currentColorState,
  handleFontSizeChange,
  fontSizeState,
  fonts,
  handleSelectCellFontFamily,
  selectedFont,
}) => {
  const [templateName, setTemplateName] = useState(nameOfTemplate);

  return (
    <div style={{ padding: "2%" }}>
      <Row justify="space-between" align="middle" gutter={[16, 16]}>
        <Col>
          <TitleWithEdit
            templateName={templateName}
            setTemplateName={setTemplateName}
          />
        </Col>
      </Row>
      <Row align="middle" gutter={[16, 16]}>
        <Col>
          <FileMenu />
        </Col>
        <Col>
          <FormatMenu
            handleColorChange={handleColorChange}
            handleCellSetStyle={handleCellSetStyle}
            currentColor={currentColorState}
            handleFontSizeChange={handleFontSizeChange}
            fontSizeState={fontSizeState}
            fonts={fonts}
            selectedFont={selectedFont}
            handleSelectCellFontFamily={handleSelectCellFontFamily}
          />
        </Col>
      </Row>
    </div>
  );
};
