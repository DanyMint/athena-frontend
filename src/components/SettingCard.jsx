import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  List,
  Input,
  message,
  Pagination,
  Dropdown,
  Modal,
  Space,
} from "antd";
import { EllipsisOutlined } from "@ant-design/icons";
import axios from "axios";
import ModalForm from "./ModalForm";
import { getRowDataByURLandEndpointname } from "../tools/backendAPI";

const SettingCard = ({ title, baseUrl, modalFields }) => {
  const [items, setItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsCount, setElementsCount] = useState(0);

  useEffect(() => {
    let url = baseUrl + "?page=" + currentPage;
    if (currentPage == 1) {
      url = baseUrl;
    }
    axios
      .get(url)
      .then((response) => {
        const responseList = response.data;
        setElementsCount(responseList.count);
        setItems(responseList.results);
      })
      .catch(() => message.error("Ошибка загрузки данных"));
  }, [baseUrl]);

  const handleAddItem = () => {
    setModalTitle("Добавить элемент");
    setEditingItem(null); // Устанавливаем null для добавления нового элемента
    setIsModalVisible(true);
  };

  const handleEditItem = (index) => {
    const item = items[index];
    setModalTitle(`Редактировать элемент: ${item.name}`);
    setEditingItem(item); // Передаем текущий элемент для редактирования
    setIsModalVisible(true);
  };

  const handleDeleteItem = () => {
    const item = items[deleteIndex];
    axios
      .delete(`${baseUrl}/${item.id}`)
      .then(() => {
        const newItems = items.filter((_, i) => i !== deleteIndex);
        setItems(newItems);
        message.success("Элемент удален");
      })
      .catch(() => message.error("Ошибка удаления элемента"))
      .finally(() => setDeleteIndex(null));
  };

  const handleModalConfirm = (updatedItem) => {
    if (editingItem) {
      // Обновление элемента
      const updatedItems = items.map((item) =>
        item.id === editingItem.id ? updatedItem : item
      );
      setItems(updatedItems);
    } else {
      // Добавление элемента
      setItems([...items, updatedItem]);
    }
    setIsModalVisible(false);
  };

  const fetchItems = (page, sQuery = searchQuery) => {
    let url = baseUrl + "?page=" + page;

    if (page == 1) {
      url = baseUrl;
    }

    if (sQuery.length > 0) {
      url += url.includes("?") ? "&search=" + sQuery : "?search=" + sQuery;
    }

    axios
      .get(url)
      .then((response) => {
        const responseList = response.data;
        setElementsCount(responseList.count);
        setItems(responseList.results);
      })
      .catch(() => message.error("Ошибка загрузки данных"));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
    fetchItems(1, e.target.value);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page);
    fetchItems(page);
  };

  const menuItems = (index) => [
    {
      key: "edit",
      label: "Изменить",
      onClick: () => handleEditItem(index),
    },
    {
      key: "delete",
      label: "Удалить",
      danger: true,
      onClick: () => setDeleteIndex(index),
    },
  ];

  return (
    <Card
      title={
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span>{title}</span>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Input
              placeholder="Поиск..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ marginRight: 16, width: 200 }}
            />
            <Button type="primary" onClick={handleAddItem}>
              Добавить
            </Button>
          </div>
        </div>
      }
    >
      <List
        dataSource={items}
        renderItem={(item, index) => (
          <List.Item
            actions={[
              <Dropdown
                menu={{
                  items: menuItems(index),
                }}
                trigger={["click"]}
              >
                <Button type="text" icon={<EllipsisOutlined />} />
              </Dropdown>,
            ]}
          >
            {item.name || "Без названия"}
          </List.Item>
        )}
      />

      <Pagination
        current={currentPage}
        total={elementsCount}
        showTotal={(total) => `Всего элементов: ${total}`}
        pageSize={pageSize}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: 16, textAlign: "center" }}
      />

      {/* Модальное окно редактирования/добавления */}
      <ModalForm
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={handleModalConfirm}
        title={modalTitle}
        fields={modalFields}
        baseUrl={baseUrl}
        editingItem={editingItem}
      />

      {/* Модальное окно удаления */}
      <Modal
        title="Удалить элемент"
        visible={deleteIndex !== null}
        onOk={handleDeleteItem}
        onCancel={() => setDeleteIndex(null)}
        okText="Удалить"
        cancelText="Отмена"
      >
        Удалить <b>{deleteIndex !== null && items[deleteIndex].name}</b>?
      </Modal>
    </Card>
  );
};

export default SettingCard;
