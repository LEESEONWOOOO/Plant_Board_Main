import React, { useState, useEffect } from "react";
import axios from "axios";
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3001/items")
      .then(response => setItems(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!inputValue) {
      return;
    }

    const newItem = {
      text: inputValue
    };
    axios.post("http://localhost:3001/items", newItem)
      .then(response => setItems([...items, response.data]))
      .catch(error => console.log(error));
    setInputValue("");
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/items/${id}`)
      .then(response => setItems(items.filter(item => item.id !== id)))
      .catch(error => console.log(error));
  };

  return (
    <div>
      <h1>게시판</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button type="submit">Send</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>
            {item.text}
            <button onClick={() => handleDelete(item.id)}>X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
