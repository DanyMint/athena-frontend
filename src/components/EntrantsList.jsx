import React, { useEffect, useState } from "react";
import { Input, Button, Tag, Table, Select, Row, Col, Card } from "antd";
import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import {
  getRowDataByURLandEndpointname,
  fetchItems,
} from "../tools/backendAPI";

const EntrantsList = ({ onSelectEntrant, handleAddEntrant }) => {
  const [searchText, setSearchText] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedQuotas, setSelectedQuotas] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [quotas, setQuotas] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [entrantsCount, setEntrantsCount] = useState(0);
  const [entrants, setEntrants] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getRowDataByURLandEndpointname("quotas", (quotaList) => {
      setQuotas(quotaList.results);
    });

    getRowDataByURLandEndpointname("specialties", (specialtyList) => {
      setSpecialties(specialtyList.results);
    });

    getRowDataByURLandEndpointname("entrants", (entrantList) => {
      // setEntrants(entrantList.results);
      setEntrantsCount(entrantList.count);
    });

    fetchNewItems(1, 10);
  }, []);

  const columns = [
    {
      title: "ФИО",
      dataIndex: "fullName",
      key: "fullName",
      render: (_, entrant) =>
        `${entrant.last_name || ""} ${entrant.first_name || ""} ${
          entrant.patronymic || ""
        }`,
    },
    {
      title: "ИИН",
      dataIndex: "individual_identical_number",
      key: "individual_identical_number",
    },
    { title: "Специальность", dataIndex: "specialty", key: "specialty" },
    {
      title: "Квоты",
      dataIndex: "quota",
      key: "quotas",
      render: (quota) =>
        quota.map((quota) => (
          <Tag color="blue" key={quota}>
            {quota}
          </Tag>
        )),
    },
  ];

  const handleRowClick = (record) => {
    onSelectEntrant(record);
  };

  const handleClearFilters = () => {
    setSearchText("");
    setSelectedSpecialty(null);
    setSelectedQuotas([]);
    fetchNewItems({ page: 1, specialty: "", quotas: [], sQuery: "" });
  };

  const fetchNewItems = ({
    page = currentPage,
    pSize = pageSize,
    quotas = selectedQuotas,
    specialty = selectedSpecialty,
    sQuery = searchText,
  }) => {
    let filterList = [];

    if (quotas !== null && quotas.length !== 0) {
      quotas.forEach((quota) => {
        filterList.push(`quota=${quota}`);
      });
    }

    if (
      specialty !== undefined &&
      specialty !== null &&
      specialty.length !== 0
    ) {
      filterList.push(`specialty=${specialty}`);
    }

    fetchItems(
      "entrants",
      {
        page: page,
        pageSize: pSize,
        searchQuery: sQuery,
        filters: filterList,
      },
      (entrantList) => {
        setEntrants(entrantList.results);
        setEntrantsCount(entrantList.count);
      }
    );
  };

  return (
    <div className="p-6 space-y-4">
      <Card
        title={
          <Row gutter={[16, 16]} align="middle">
            <Col xs={24} sm={12} md={8}>
              <Input.Search
                placeholder="Введите ФИО или ИИН"
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                  fetchNewItems({
                    page: 1,
                    sQuery: e.target.value,
                  });
                }}
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                placeholder="Выберите специальность"
                value={selectedSpecialty}
                onChange={(value) => {
                  setSelectedSpecialty(value);
                  fetchNewItems({
                    specialty: value,
                  });
                }}
                allowClear
                style={{ width: "100%", height: 40 }}
                options={specialties.map((spec) => ({
                  value: spec.id,
                  label: spec.name,
                }))}
                onClear={() => {
                  setSelectedSpecialty(null);
                  fetchNewItems({
                    specialty: null,
                  });
                }}
              />
            </Col>
            <Col xs={24} sm={12} md={8}>
              <Select
                mode="multiple"
                placeholder="Выберите квоты"
                value={selectedQuotas}
                onChange={(value) => {
                  setSelectedQuotas(value);
                  fetchNewItems({ page: 1, quotas: value });
                }}
                allowClear
                style={{ width: "100%", height: 40 }}
                options={quotas.map((quota) => ({
                  value: quota.id,
                  label: quota.name,
                }))}
                onClear={() => {
                  setSelectedQuotas("");
                  fetchNewItems({ quotas: "" });
                }}
              />
            </Col>
          </Row>
        }
      >
        <Row justify="end" gutter={[16, 16]} align="middle">
          <Col>
            <Button type="default" onClick={handleClearFilters} size="middle">
              Сбросить фильтры
            </Button>
          </Col>
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddEntrant}
              size="middle"
            >
              Добавить абитуриента
            </Button>
          </Col>
        </Row>
      </Card>

      <Table
        columns={columns}
        dataSource={entrants}
        rowKey="id"
        bordered
        size="small"
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: entrantsCount,
          showQuickJumper: false,
          showSizeChanger: true,
          pageSizeOptions: ["5", "10", "15", "20", "25", "30", "40", "50"],
          onChange: (page, pageSize) => {
            setCurrentPage(page);
            setPageSize(pageSize);
            fetchNewItems({ page: page, pSize: pageSize });
          },
          showTotal: (total, range) =>
            `Показано ${range[0]}-${range[1]} из ${total}`,
          // onShowSizeChange: (page, pageSize) => { setCurrentPage(page);
          //   setPageSize(pageSize);
          //   fetchNewItems({ page: page, pageSize: pageSize });
          // },
        }}
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
        rowClassName="cursor-pointer hover:bg-gray-100"
        style={{ marginTop: 16 }}
      />
    </div>
  );
};

export default EntrantsList;
