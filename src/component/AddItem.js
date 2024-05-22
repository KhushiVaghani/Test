import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [description, setDescription] = useState('');
  const [selectedItems, setSelectedItems] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3000/items')
      .then((response) => response.json())
      .then((data) => setItems(data));
  }, []);

  const addItems = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/items', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, quantity, description }),
    })
      .then((response) => response.json())
      .then((newItems) => {
        setItems([...items, newItems]);
        setName('');
        setQuantity('');
        setDescription('');
      });
  };

  const updateItems = (e) => {
    e.preventDefault();
    fetch(`http://localhost:3000/items/${selectedItems._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, quantity, description }),
    })
      .then((response) => response.json())
      .then((updatedItems) => {
        setItems(items.map((items) => (items._id === updatedItems._id ? updatedItems : items)));
        setName('');
        setQuantity('');
        setDescription('');
        setSelectedItems(null);
      });
  };

  const deleteItems = (id) => {
    fetch(`http://localhost:3000/items/${id}`, {
      method: 'DELETE',
    }).then(() => {
      setItems(items.filter((items) => items._id !== id));
    });
  };

  return (
    <div className="container">
      <h1 className="my-4">Items</h1>
      <form onSubmit={selectedItems ? updateItems : addItems}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Item Name"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Item Quantity"
          />
        </div>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Item Description"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {selectedItems ? 'Update Item' : 'Add Item'}
        </button>
      </form>
      <table className="table table-striped mt-4">
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {items.map((items) => (
            <tr key={items._id}>
              <td>{items.name}</td>
              <td>{items.quantity}</td>
              <td>{items.description}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => {
                    setName(items.name);
                    setQuantity(items.quantity);
                    setDescription(items.description);
                    setSelectedItems(items);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteItems(items._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
