import React, { useState, useEffect } from "react";
import "./TodoApp.css";

export default function TodoApp() {
  const [myArray, setMyArray] = useState([]);
  const [newItem, setItem] = useState();
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const date = new Date();
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("en-US", options);
    setCurrentDate(formattedDate);
    // Load todo data from local storage when the component mounts
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setMyArray(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    // Save todo data to local storage whenever it changes
    localStorage.setItem("todos", JSON.stringify(myArray));
  }, [myArray]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newItem && newItem!="") {
      setMyArray([...myArray, { text: newItem, completed: false }]);
      setItem("");
    }
    return null;
  };

  const handleEditClick = (index, value) => {
    setEditIndex(index);
    setEditValue(value);
  };

  const handleEditSave = () => {
    const newArray = [...myArray];
    newArray[editIndex].text = editValue;
    setMyArray(newArray);
    setEditIndex(-1);
    setEditValue("");
  };

  const handleCheckboxToggle = (index) => {
    const newArray = [...myArray];
    newArray[index].completed = !newArray[index].completed;
    setMyArray(newArray);
  };

  const deleteItem = (index) => {
    const newArray = myArray.filter((item, i) => i !== index);
    setMyArray(newArray);
  };

  return (
    <div className="todo-container">
      <h1>{currentDate}</h1>
      <form className="input-section" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter Task..."
          value={newItem}
          onChange={(e) => setItem(e.target.value)}
        />
        <div className="todo-list">
          {myArray.map((item, index) => {
            return (
              <div key={index} className="todo-item">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => handleCheckboxToggle(index)}
                />
                {editIndex === index ? (
                  <input
                    type="text"
                    value={editValue}
                    onChange={(e) => setEditValue(e.target.value)}
                  />
                ) : (
                  <span className={item.completed ? "completed" : ""}>
                    {item.text}
                  </span>
                )}
                <div className="icons">
                  {editIndex === index ? (
                    <button onClick={handleEditSave}>Update</button>
                  ) : (
                    <i
                      className="fa-solid fa-pen-to-square"
                      onClick={() => handleEditClick(index, item.text)}
                    ></i>
                  )}
                  <i
                    className="fa-solid fa-trash"
                    onClick={() => deleteItem(index)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
      </form>
    </div>
  );
}
