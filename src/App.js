import React, { useState, useEffect } from 'react';
import AddItem from './component/AddItem';
import UpdateItem from './component/UpdateItem';
import DeleteItem from './component/deleteItem';

function App() {

  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const addItems = (item) => {
    setItems([...items, item]);
  };

  const updateItem = (updatedItem) => {
    setItems(items.map((item) => (item.id === updatedItem.id ? updatedItem : item)));
    setSelectedItem(null);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <AddItem onAdd={addItems} />
      {selectedItem && <UpdateItem item={selectedItem} onUpdate={updateItem} />}
      <DeleteItem items={items} onDelete={deleteItem} />
    </div>
  );
}

export default App;


