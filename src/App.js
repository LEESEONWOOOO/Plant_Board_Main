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

  const [textareaHeight, setTextareaHeight] = useState({
    row: 1,
    lineBreak: {},
  });

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
      <form>
      <div>
        <h1>식구</h1>
          <select>
            <option>게시판 종류</option>
          </select>
      </div>
      <div>
        <h3>제목</h3> <input type='text'/>
      </div>

      <div>
        <h3>내용</h3><textarea></textarea>
      </div>
      </form>
    </div>
  )}

export default App;
