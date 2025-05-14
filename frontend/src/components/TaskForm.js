import React, { useState } from 'react';

export default function TaskForm({ onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ title: '', description: '', category: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} value={formData.title} required />
      <input name="description" placeholder="Description" onChange={handleChange} value={formData.description} required />
      <input name="category" placeholder="Category" onChange={handleChange} value={formData.category} required />
      <button type="submit">Add Task</button>
    </form>
  );
}
