import React, { useEffect } from "react";
import { Modal, Input, Form, message } from "antd";
import axios from "axios";

const ModalForm = ({
  visible,
  onCancel,
  onConfirm,
  title,
  fields,
  baseUrl,
  editingItem,
}) => {
  const [form] = Form.useForm();

  // Очистка или заполнение формы при изменении editingItem
  useEffect(() => {
    if (visible) {
      if (editingItem) {
        // Если редактируем, заполняем поля
        form.setFieldsValue(editingItem);
      } else {
        // Если добавляем, сбрасываем форму
        form.resetFields();
      }
    }
  }, [visible, editingItem, form]);

  // Сохранение данных
  const handleConfirm = () => {
    form
      .validateFields()
      .then((values) => {
        if (editingItem) {
          // Редактирование
          axios
            .put(`${baseUrl}/${editingItem.id}`, values)
            .then(() => {
              message.success("Элемент обновлен");
              onConfirm(values);
            })
            .catch(() => message.error("Ошибка обновления элемента"));
        } else {
          // Добавление
          axios
            .post(baseUrl, values)
            .then((response) => {
              message.success("Элемент добавлен");
              onConfirm(response.data);
            })
            .catch(() => message.error("Ошибка добавления элемента"));
        }
      })
      .catch(() => message.warning("Пожалуйста, заполните все поля"));
  };

  return (
    <Modal
      title={title}
      visible={visible}
      onCancel={onCancel}
      onOk={handleConfirm}
      okText={editingItem ? "Сохранить" : "Добавить"}
      cancelText="Отмена"
    >
      <Form form={form} layout="vertical" preserve={false}>
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            name={field.name}
            label={field.label}
            validateFirst
            rules={field.rules}
          >
            <Input placeholder={field.placeholder || ""} />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

export default ModalForm;
