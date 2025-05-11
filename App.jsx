import axios from 'axios';
import { useEffect, useState } from 'react';
import { MdOutlineDone } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { MdModeEditOutline } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editTodo, setEditTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = async (e) => {
    e.preventDefault();
    if (!newTodo.trim()) return;

    try {
      const response = await axios.post("/api/todos", { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTodos = async () => {
    try {
      const response = await axios.get("/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const startEditing = (todo) => {
    setEditTodo(todo);
    setEditText(todo.text);
  };

  const updateTodo = async () => {
    if (!editText.trim()) return;

    try {
      const response = await axios.patch(`/api/todos/${editTodo._id}`, {
        text: editText,
      });

      const updatedTodos = todos.map((todo) =>
        todo._id === editTodo._id ? response.data : todo
      );

      setTodos(updatedTodos);
      setEditTodo(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`/api/todos/${id}`);
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl min-h-[600px] p-8">

        <h1 className="text-4xl font-bold text-gray-800 mb-4">Task Manager</h1>

        <form onSubmit={addTodo} className="flex items-center mb-4 gap-2">
          <input
            type="text"
            placeholder="Enter Todo"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-1 outline-none px-3 border-b-2 border-gray-400 p-2 me-2"
          />
          <button
            type="submit"
            className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
          >
            Add Todo
          </button>
        </form>

        <div>
          {todos.length === 0 ? (
            <div>No todos yet.</div>
          ) : (
            <div>
              {todos.map((todo) => (
                <div key={todo._id} className="flex items-center mb-4 gap-2">
                  {editTodo && editTodo._id === todo._id ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        className="flex-1 outline-none px-3 border-b-2 border-gray-400 p-2 me-2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={updateTodo}
                          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                        >
                          <MdOutlineDone />
                        </button>
                        <button
                          className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded"
                          onClick={() => setEditTodo(null)}
                        >
                          <IoClose />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full">
                      <p className="flex-1">{todo.text}</p>
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-blue-500 hover:text-blue-600"
                          onClick={() => startEditing(todo)}
                        >
                          <MdModeEditOutline />
                        </button>
                        <button
                          className="p-2 text-red-500 hover:text-red-600"
                          onClick={() => deleteTodo(todo._id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
