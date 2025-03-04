import axios from "axios";
import { message } from "antd";

export const baseBackEndURL = import.meta.env.VITE_BACKEND_API_URL;

/**
 * Represents a book.
 * @constructor
 * @param {string} itemName - Endpoint name
 * @param {function} callBackFunc - getSelectItems put into this function list from backend
 */
export const getRowDataByURLandEndpointname = (itemName, callBackFunc) => {
  const itemAPIURL = `${baseBackEndURL}${itemName}`;

  axios
    .get(itemAPIURL)
    .then((response) => {
      const responseList = response.data;
      callBackFunc(responseList);
    })
    .catch(() => message.error(`Ошибка! Неудалось загрузить: ${itemName}`));
};

/**
 * Return options for select antd
 * @constructor
 * @param {string} itemName - Endpoint name
 * @param {function} callBackFunc - getSelectItems put into this function list from backend
 */
export const getSelectItems = (itemName, callBackFunc) => {
  const itemAPIURL = `${baseBackEndURL}${itemName}`;

  axios
    .get(itemAPIURL)
    .then((response) => {
      const responseList = response.data.results.map((item) => ({
        value: item.name,
        label: item.name,
      }));
      callBackFunc(responseList);
    })
    .catch(() => message.error(`Ошибка! Неудалось загрузить список опций для ${itemName}`));
};

/**
 * Return options for select antd
 * @constructor
 * @param {string}  fieldname - endpoint name
 * @param {string} name - field name
 */
export const addNewElement = (fieldname, name) => {
  const url = `${baseBackEndURL}${fieldname}`;
  const data = {
    name: name,
  };

  axios.post(url, data).catch(() => message.error("Ошибка! Неудалось добавиь данныe на сервер"));
};

export const getEndpointOption = async (endpointName) => {
  const url = `${baseBackEndURL}${endpointName}`;

  try {
    const response = await axios.options(url);
    const options = response?.data?.actions?.POST;
    return options; // Возвращает объект
  } catch (error) {
    message.error("Ошибка загрузки options");
    return null; // Возвращает null в случае ошибки
  }
};

export const getFieldChoices = async (endpointName, fieldName) => {
  try {
    const options = await getEndpointOption(endpointName);

    if (!options || !(fieldName in options)) {
      message.error(`Ошибка! Нет options для поля ${fieldName}`);
      return [];
    }

    return options[fieldName].choices.map((item) => ({
      value: item.value,
      label: item.display_name,
    }));
  } catch (error) {
    message.error(`Ошибка загрузки данных для поля ${fieldName}`);
    return [];
  }
};

/**
 * Return options for select antd
 * @constructor
 * @param {string} endpointName - endpoint name
 * @param {Number} page - page for load (default = 1)
 * @param {string} searchQuery - search data (default = null)
 * @param {[string]} filters - list of string filters. Example: ["quota=1"]
 * @param {Number} pageSize - page_size
 */
export const fetchItems = (
  endpointName,
  { page = 1, searchQuery = null, filters = [], pageSize = 10 },
  callBackFunc
) => {
  let url = baseBackEndURL + endpointName;
  url += "?page=" + page;
  url += "&page_size=" + pageSize;

  if (searchQuery !== null || searchQuery === "") {
    url += "&search=" + searchQuery;
  }

  if (filters.length > 0) {
    filters.forEach((item) => {
      url += "&" + item;
    });
  }

  axios
    .get(url)
    .then((response) => {
      callBackFunc(response.data);
    })
    .catch(() => message.error(`Ошибка загрузки данных для поля ${endpointName}`));
};
