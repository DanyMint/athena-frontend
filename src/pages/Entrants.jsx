import React, { useEffect, useState } from "react";
import EntrantsList from "../components/EntrantsList";
import EntrantCard from "../components/EntrantCard";
import { Button, Splitter } from "antd";
import EntrantModal from "../components/EntrantModal";
import { getRowDataByURLandEndpointname } from "../tools/backendAPI";

const Entrants = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [entrants, setEntrants] = useState({ results: [] });

  useEffect(() => {
    getRowDataByURLandEndpointname("entrants", (entrantList) => {
      setEntrants(entrantList);
    });
  }, []);

  const firstEntrant =
    entrants?.results === undefined ? entrants?.results[0] : {};
  const [selectedEntrant, setSelectedEntrant] = useState(firstEntrant);

  const [sizes, setSizes] = React.useState(["60%", "40%"]);

  const handleSelectEntrant = (entrant) => {
    setSelectedEntrant(entrant); // Обновляем выбранного абитуриента
  };

  const handleAddEntrant = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const onEditEntrant = () => {
    setEditingItem(selectedEntrant);
    setIsModalOpen(true);
  };

  const handleOnModalFormClose = (entrant) => {
    getRowDataByURLandEndpointname("entrants", (entrantList) => {
      setEntrants(entrantList);
    });

    setSelectedEntrant(null);
    setEditingItem(null);
  };

  return (
    <div>
      <Splitter
        onResize={setSizes}
        style={{
          height: "100%",
        }}
      >
        <Splitter.Panel min="40%" size={sizes[0]} resizable="enable">
          <EntrantsList
            onSelectEntrant={handleSelectEntrant}
            handleAddEntrant={handleAddEntrant}
          />
        </Splitter.Panel>
        <Splitter.Panel min="30%" size={sizes[1]}>
          <EntrantCard entrant={selectedEntrant} onEdit={onEditEntrant} />
        </Splitter.Panel>
      </Splitter>

      <EntrantModal
        editingItem={editingItem}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        handleOnModalFormClose={handleOnModalFormClose}
      />
    </div>
  );
};

export default Entrants;
