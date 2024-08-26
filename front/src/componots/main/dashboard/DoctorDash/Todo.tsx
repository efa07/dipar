import  { useState } from "react";
import "./todo.css";

const TodoList = () => {
  const [todos, setTodos] = useState([
    { id: 1, date: "12/12/2021", task: "Complete patient follow-up", notes: "Schedule a follow-up in 3 months" },
    { id: 2, date: "13/12/2021", task: "Update patient records", notes: "Verify all entries are accurate" },
    { id: 3, date: "14/12/2021", task: "Prepare for weekly meeting", notes: "Create a summary report" },
  ]);

  const [newTodo, setNewTodo] = useState({
    date: "",
    task: "",
    notes: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTodo({
      ...newTodo,
      [name]: value,
    });
  };

  const addTodo = () => {
    if (newTodo.date && newTodo.task && newTodo.notes) {
      setTodos([
        ...todos,
        { id: Date.now(), ...newTodo },
      ]);
      setNewTodo({ date: "", task: "", notes: "" });
    }
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div>
      <div className="todo-list">
        <h3>Todo List</h3>
        {todos.map(todo => (
          <div key={todo.id} className="todo-item">
            <p><strong>Date:</strong> {todo.date}</p>
            <p><strong>Task:</strong> {todo.task}</p>
            <p><strong>Notes:</strong> {todo.notes}</p>
            <button onClick={() => deleteTodo(todo.id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
      <div className="add-todo">
        <h4>Add New Todo</h4>
        <input
          type="text"
          name="date"
          placeholder="Date"
          value={newTodo.date}
          onChange={handleChange}
        />
        <input
          type="text"
          name="task"
          placeholder="Task"
          value={newTodo.task}
          onChange={handleChange}
        />
        <input
          type="text"
          name="notes"
          placeholder="Notes"
          value={newTodo.notes}
          onChange={handleChange}
        />
        <button onClick={addTodo} className="add-button">Add Todo</button>
      </div>
    </div>
  );
}

export default TodoList;
