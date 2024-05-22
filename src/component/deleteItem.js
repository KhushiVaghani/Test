
function deleteItem({ items, onDelete }) {
    const handleDelete = (id) => {
      fetch(`http://localhost:3000/items/${id}`, {
        method: 'DELETE',
      }).then(() => {
        onDelete(id);
      });
    };
  
    return (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name}
            <button onClick={() => handleDelete(item.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }
  
  export default deleteItem;

  