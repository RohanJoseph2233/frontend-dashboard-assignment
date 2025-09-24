import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  
  const authHeaders = () => ({ headers: { Authorization: `Bearer ${token}` } });

  
  const fetchProfile = useCallback(async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:5000/api/profile", authHeaders());
      setProfile(res.data);
    } catch (err) {
      console.error("Profile fetch error:", err?.response || err);
      // If unauthorized, redirect to login
      if (err?.response?.status === 401 || err?.response?.status === 403) {
        localStorage.removeItem("token");
        navigate("/"); // login route
      }
    }
  }, [token, navigate]);

  
  const fetchTasks = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/tasks", authHeaders());
      setTasks(res.data || []);
    } catch (err) {
      console.error("Tasks fetch error:", err?.response || err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (!token) {
      navigate("/"); 
      return;
    }
    fetchProfile();
    fetchTasks();
  }, [token, navigate, fetchProfile, fetchTasks]);

  
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    try {
      await axios.post(
        "http://localhost:5000/api/tasks",
        { title: newTask.trim() },
        authHeaders()
      );
      setNewTask("");
      await fetchTasks();
    } catch (err) {
      console.error("Add task error:", err?.response || err);
      alert("Failed to add task. Check console/network.");
    }
  };

 
  const deleteTask = async (id) => {
    if (!confirm("Delete this task?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, authHeaders());
      await fetchTasks();
    } catch (err) {
      console.error("Delete task error:", err?.response || err);
      alert("Failed to delete task. Check console/network.");
    }
  };

 
  const startEdit = (task) => {
    setEditTaskId(task._id);
    setEditTaskTitle(task.title);
  };

 
  const cancelEdit = () => {
    setEditTaskId(null);
    setEditTaskTitle("");
  };

  
  const saveEdit = async () => {
    if (!editTaskTitle.trim()) return;
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${editTaskId}`,
        { title: editTaskTitle.trim() },
        authHeaders()
      );
      setEditTaskId(null);
      setEditTaskTitle("");
      await fetchTasks();
    } catch (err) {
      console.error("Update task error:", err?.response || err);
      alert("Failed to update task. Check console/network.");
    }
  };

 
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex items-center justify-center p-6">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Welcome, {profile?.email ?? "User"}
            </h1>
            <p className="text-sm text-gray-500">Your tasks</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </div>
        </div>

       
        <form onSubmit={handleAddTask} className="flex mb-6 gap-2">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Add a new task..."
            className="flex-1 px-4 py-3 border rounded-lg focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Add
          </button>
        </form>

        
        {loading && <p className="text-sm text-gray-500 mb-4">Loading tasks...</p>}

       
        <ul className="space-y-3">
          {tasks.length === 0 && !loading ? (
            <li className="text-center text-gray-500">No tasks yet.</li>
          ) : null}

          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex items-center justify-between bg-gray-50 px-4 py-3 rounded-lg shadow-sm hover:shadow-md transition"
            >
            
              {editTaskId === task._id ? (
                <div className="flex gap-2 items-center w-full">
                  <input
                    value={editTaskTitle}
                    onChange={(e) => setEditTaskTitle(e.target.value)}
                    className="flex-1 px-3 py-2 border rounded"
                  />
                  <button
                    type="button"
                    onClick={saveEdit}
                    className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <span className="text-gray-700">{task.title}</span>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => startEdit(task)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteTask(task._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
