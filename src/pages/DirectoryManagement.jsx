import React from "react";
import { Col, Row } from "antd";
import SettingCard from "../components/SettingCard";
import ReportTemplateCard from "../components/ReportTemplateCard";
import {baseBackEndURL} from "../tools/backendAPI";

const DirectoryManagement = () => {
  const quotaAPIURL = `${baseBackEndURL}quotas`;
  const specialtyAPIURL = `${baseBackEndURL}specialties`;
  const previusPlaceOfStudyAPIURL = `${baseBackEndURL}previous_place_of_study_types`;
  const langsOfStudyAPIURL = `${baseBackEndURL}langs_of_study`;
  const nationalitiesAPIURL = `${baseBackEndURL}nationalities`;
  const citizenshipsAPIURL = `${baseBackEndURL}citizenships`;

  const quotaModalFields = [
    {
      name: "name",
      label: "Название Квоты",
      placeholder: "Введите название",
      rules: [
        { required: true, message: `Требуется ввести название квоты` },
        {
          max: 50,
          message: "Название должно быть не больше 50 символов",
        },
      ],
    },
    {
      name: "description",
      label: "Описание Квоты",
      placeholder: "Введите описание",
      rules: [
        { required: true, message: `Требуется ввести описание квоты` },
        {
          max: 350,
          message: "Описание должно быть не больше 350 символов",
        },
      ],
    },
  ];
  const specialtyModalFields = [
    {
      name: "name",
      label: "Название специальности",
      placeholder: "Введите название",
      rules: [
        { required: true, message: `Требуется ввести название специальности` },
        {
          max: 100,
          message: "Название должно быть не больше 100 символов",
        },
      ],
    },
    {
      name: "code",
      label: "Код специальности",
      placeholder: "Введите код",
      rules: [
        { required: true, message: `Требуется ввести код специальности` },
        {
          max: 50,
          message: "Код должен быть не больше 50 символов",
        },
      ],
    },
  ];
  const previusPlaceOfStudyModalFields = [
    {
      name: "name",
      label: "Предыдущее место обучения",
      placeholder: "Введите название предыдущего места обучения",
      rules: [
        { required: true, message: `Требуется ввести название местa обучения` },
        {
          max: 30,
          message: "Названия местa обучения должно быть не больше 30 символов",
        },
      ],
    },
  ];
  const langsOfStudyModalFields = [
    {
      name: "name",
      label: "Язык обучения",
      placeholder: "Введите язык",
      rules: [
        { required: true, message: `Требуется ввести название языка обучения` },
        {
          max: 20,
          message: "Название языка обучения должно быть не больше 20 символов",
        },
      ],
    },
  ];

  const nationalitiesModalFields = [
    {
      name: "name",
      label: "Национальность",
      placeholder: "Введите национальность",
      rules: [
        { required: true, message: `Требуется ввести название национальности` },
        {
          max: 100,
          message: "Название национальности должно быть не больше 100 символов",
        },
      ],
    },
  ];

  const citizenshipsModalFields = [
    {
      name: "name",
      label: "Гражданство",
      placeholder: "Введите гражданство",
      rules: [
        { required: true, message: `Требуется ввести название гражданствa` },
        {
          max: 100,
          message: "Название гражданствa должно быть не больше 100 символов",
        },
      ],
    },
  ];

  return (
    <div className="p-6">
      <Row gutter={[24, 24]}>
        {/* <Col span={24}>
          <ReportTemplateCard title="Шаблоны для отчетов" />
        </Col> */}
        <Col span={12}>
          <SettingCard
            title="Квоты"
            baseUrl={quotaAPIURL}
            modalFields={quotaModalFields}
          />
        </Col>
        <Col span={12}>
          <SettingCard
            title="Специальности"
            baseUrl={specialtyAPIURL}
            modalFields={specialtyModalFields}
          />
        </Col>
        <Col span={12}>
          <SettingCard
            title="Предыдущие место обучения"
            baseUrl={previusPlaceOfStudyAPIURL}
            modalFields={previusPlaceOfStudyModalFields}
          />
        </Col>
        <Col span={12}>
          <SettingCard
            title="Языки обучения"
            baseUrl={langsOfStudyAPIURL}
            modalFields={langsOfStudyModalFields}
          />
        </Col>

        <Col span={12}>
          <SettingCard
            title="Список национальностей"
            baseUrl={nationalitiesAPIURL}
            modalFields={nationalitiesModalFields}
          />
        </Col>

        <Col span={12}>
          <SettingCard
            title="Список гражданств"
            baseUrl={citizenshipsAPIURL}
            modalFields={citizenshipsModalFields}
          />
        </Col>
      </Row>
    </div>
  );
};
export default DirectoryManagement;
