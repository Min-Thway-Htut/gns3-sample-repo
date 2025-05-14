import React from 'react';

export default function TaskList({ tasks, onDelete, onToggle }) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h3>
          <p>{task.description} [{task.category}]</p>
          <button onClick={() => onToggle(task)}>Mark {task.completed ? 'Incomplete' : 'Completed'}</button>
          <button onClick={() => onDelete(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}
