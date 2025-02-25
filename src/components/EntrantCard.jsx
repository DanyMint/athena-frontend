import React from "react";
import {
  Card,
  Descriptions,
  Tag,
  Empty,
  Button,
  Dropdown,
  Popconfirm,
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";

// Компонент карточки абитуриента
const EntrantCard = ({ entrant, onEdit, onDelete }) => {
  if (!entrant || entrant.id === undefined) {
    return (
      <div className="p-6 space-y-4">
        <Card title="Карточка абитуриента" bordered={false}>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
        </Card>
      </div>
    ); // Если абитуриент не выбран
  }

  // Меню для кнопки Dropdown
  const items = [
    {
      key: "1",
      label: "Редактировать",
      icon: <EditOutlined />,
      onClick: onEdit,
    },
    {
      key: "2",
      label: "Удалить",
      icon: <DeleteOutlined />,
      danger: true,
      onClick: (e) => e.preventDefault(),
    },
  ];

  const description_items = [
    {
      key: 1,
      label: "ФИО",
      children: `${entrant.first_name} ${entrant.patronymic} ${entrant.last_name}`,
    },
    {
      key: 2,
      label: "ИИН",
      children: entrant.individual_identical_number,
    },
    {
      key: 3,
      label: "Дата рождения",
      children: new Date(entrant.birth_date).toLocaleDateString("ru-RU", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    },
    {
      key: 4,
      label: "Национальность",
      children: entrant.nationality,
    },
    {
      key: 5,
      label: "Пол",
      children: entrant.gender,
    },
    {
      key: 6,
      label: "Язык обучения",
      children: entrant.language_of_study,
    },
    {
      key: 7,
      label: "Специальность",
      children: entrant.specialty,
    },
    {
      key: 8,
      label: "База обучения",
      children: entrant.previous_place_of_study_type,
    },
    {
      key: 9,
      label: "Формат обучения",
      children: entrant.study_format,
    },
    {
      key: 10,
      label: "На бюджетной основе",
      children: entrant.on_the_budget === true ? "Да" : "Нет",
    },
    {
      key: 11,
      label: "Квоты",
      children: entrant.quota.map((q) => <Tag color="blue">{q}</Tag>),
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <Card
        title="Карточка абитуриента"
        bordered={false}
        extra={
          <Dropdown
            menu={{
              items,
            }}
            placement="bottomRight"
            arrow
          >
            <Button icon={<EllipsisOutlined />} />
          </Dropdown>
        }
      >
        <Descriptions
          column={1}
          items={description_items}
          contentStyle={{
            fontSize: "16px",
          }}
          labelStyle={{
            fontSize: "16px",
          }}
        ></Descriptions>
      </Card>
    </div>
  );
};

export default EntrantCard;
