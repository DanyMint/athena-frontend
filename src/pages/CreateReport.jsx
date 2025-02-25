import React, { useState } from "react";
import { Button, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import axios from "axios";

import { baseBackEndURL } from "../tools/backendAPI";

const CreateReport = () => {
  const [loading, setLoading] = useState(false);

  const downloadReport = async () => {
    setLoading(true); // Включаем спиннер
    try {
      const response = await axios.get(`${baseBackEndURL}get_report_csv`, {
        responseType: "blob", // Важно для скачивания файлов!
      });

      // Создаём ссылку на скачивание
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement("a");
      a.href = url;

      let currentDateTime = new Date();
      let dateTimeForFileName = currentDateTime.toISOString();

      const fileName = `${dateTimeForFileName}.csv`;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      message.success("Файл успешно загружен! ✅");
    } catch (error) {
      console.error("Ошибка загрузки файла", error);
      message.error("Ошибка загрузки файла! ❌");
    } finally {
      setLoading(false); // Выключаем спиннер
    }
  };

  return (
    <Button
      type="primary"
      icon={<DownloadOutlined />}
      loading={loading}
      onClick={downloadReport}
    >
      Скачать отчет
    </Button>
  );
};

export default CreateReport;
