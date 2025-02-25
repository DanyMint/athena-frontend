import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button, Divider, Input, Select, Space } from "antd";
import { getSelectItems, addNewElement } from "../tools/backendAPI";
let index = 0;

const SelectWithAdd = ({
  value,
  onChange,
  endPointName,
  inputPlaceholder,
  selectPlaceholder,
}) => {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    if (name.length == 0) {
      return;
    }

    e.preventDefault();
    setItems([...items, { value: name, label: name }]);
    addNewElement(endPointName, name);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    getSelectItems(endPointName, (itemList) => {
      setItems(itemList);
    });
  }, [endPointName]);
  return (
    <Select
      value={value}
      onChange={onChange}
      placeholder={selectPlaceholder}
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: "8px 0",
            }}
          />
          <Space
            style={{
              padding: "0 8px 4px",
            }}
          >
            <Input
              placeholder={inputPlaceholder}
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              onKeyDown={(e) => e.stopPropagation()}
              count={{
                show: true,
                max: 100,
                exceedFormatter: (txt, { max }) =>
                  runes(txt).slice(0, max).join(""),
              }}
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Добавить
            </Button>
          </Space>
        </>
      )}
      options={items}
    />
  );
};
export default SelectWithAdd;
