import React from 'react';
import { Card, Button, List, Dropdown, Menu, Popconfirm, message, Empty } from 'antd';
import { useNavigate } from 'react-router-dom';

const ReportTemplateCard = () => {
  const navigate = useNavigate();

  // Пример данных шаблонов (можно заменить на данные из API)
  const [templates, setTemplates] = React.useState(["Шаблон 1", "Шаблон 2", "Шаблон 3"]);

  // Обработчик кнопки "Добавить"
  const handleAddTemplate = () => {
    navigate('/settings/template'); // Редирект на страницу добавления шаблона
  };

  // Обработчик для редактирования шаблона
  const handleEditTemplate = (templateName) => {
    navigate(`/edit-template/${templateName}`);
  };

  // Обработчик для удаления шаблона
  const handleDeleteTemplate = (templateName) => {
    setTemplates((prevTemplates) => prevTemplates.filter((item) => item !== templateName));
    message.success(`Шаблон "${templateName}" удален`);
  };

  // Обработчик для открытия шаблона
  const handleOpenTemplate = (templateName) => {
    navigate(`/view-template/${templateName}`);
  };

  // Создание меню для Dropdown
  const getDropdownMenu = (templateName) => (
    <Menu>
      <Menu.Item key="edit" onClick={() => handleEditTemplate(templateName)}>
        Редактировать
      </Menu.Item>
      <Menu.Item key="open" onClick={() => handleOpenTemplate(templateName)}>
        Открыть
      </Menu.Item>
      <Menu.Item key="delete">
        <Popconfirm
          title={`Вы уверены, что хотите удалить "${templateName}"?`}
          onConfirm={() => handleDeleteTemplate(templateName)}
          okText="Да"
          cancelText="Нет"
        >
          Удалить
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <Card
      title="Шаблоны отчетов"
      extra={
        <Button type="primary" onClick={handleAddTemplate}>
          Добавить
        </Button>
      }
    >
      {templates.length > 0 ? (
        <List
          dataSource={templates}
          renderItem={(item) => (
            <List.Item
              actions={[
                <Dropdown overlay={getDropdownMenu(item)} trigger={['click']} key="dropdown">
                  <Button type="link">Действия</Button>
                </Dropdown>,
              ]}
              style={{ cursor: 'pointer' }}
            >
              {item}
            </List.Item>
          )}
        />
      ) : (
        <Empty description="Список шаблонов пуст" />
      )}
    </Card>
  );
};

export default ReportTemplateCard;
