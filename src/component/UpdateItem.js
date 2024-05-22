import React, { useState } from 'react';

function UpdateItem({ item, onUpdate }) {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [description, setDescription] = useState(item.description);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/items/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, quantity, description }),
    })
      .then((response) => response.json())
      .then((data) => {
        onUpdate(data);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="item name"
      />
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        placeholder="item quantity"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="item description"
      />
      <button type="submit">Update Item</button>
    </form>
  );
}

export default UpdateItem;
