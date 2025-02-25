import Reactm from "react";
import { Tabs } from "antd";
import DirectoryManagement from "./DirectoryManagement";

const settingsTabs = [
  {
    label: `Управление справочниками`,
    key: 1,
    children: <DirectoryManagement/>,
  },
];

const Settings = () => {
  return (
    <>
      <Tabs tabPosition="left" items={settingsTabs} />
    </>
  );
};
export default Settings;
