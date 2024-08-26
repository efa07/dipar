import  { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/todos';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [editTodo, setEditTodo] = useState({ id: null, text: '' });

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  const addTodo = async () => {
    await axios.post(API_URL, { todo: newTodo });
    setNewTodo('');
    fetchTodos();
  };

  const updateTodo = async () => {
    await axios.put(`${API_URL}/${editTodo.id}`, { todo: editTodo.text });
    setEditTodo({ id: null, text: '' });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    fetchTodos();
  };

  return (
    <div>
      <h1>Todo App</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Add a new todo"
      />
      <button onClick={addTodo}>Add</button>
      
      {editTodo.id ? (
        <>
          <input
            type="text"
            value={editTodo.text}
            onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })}
            placeholder="Update todo"
          />
          <button onClick={updateTodo}>Update</button>
        </>
      ) : null}

      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.todo}
            <button onClick={() => setEditTodo({ id: todo.id, text: todo.todo })}>Edit</button>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;
