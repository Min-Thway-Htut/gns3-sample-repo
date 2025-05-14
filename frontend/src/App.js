import React, { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { getTasks, createTask, deleteTask, updateTask } from './api';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const data = await getTasks();
    setTasks(data);
  };

  const handleAdd = async (taskData) => {
    const newTask = await createTask({ ...taskData, completed: false });
    setTasks(prev => [...prev, newTask]);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  const handleToggle = async (task) => {
    const updated = await updateTask(task.id, { ...task, completed: !task.completed });
    setTasks(prev => prev.map(t => (t.id === updated.id ? updated : t)));
  };

  return (
    <div className="App">
      <h1>📝 Task Tracker</h1>
      <TaskForm onAdd={handleAdd} />
      <TaskList tasks={tasks} onDelete={handleDelete} onToggle={handleToggle} />
    </div>
  );
}

export default App;
