import { useState } from 'react';
import API from '../api/axios';

export default function CreateTicket() {
  const [form, setForm] = useState({ title: '', description: '', category: 'Hardware', severity: 'medium' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/tickets', form);
      setMessage(`Ticket created! Priority score: ${res.data.ticket.priorityScore}`);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error creating ticket');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Service Request</h2>
      {message && <p>{message}</p>}
      <input name="title" placeholder="Title" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <select name="category" onChange={handleChange}>
        <option>Hardware</option><option>Network</option><option>Software</option>
        <option>Electrical</option><option>Other</option>
      </select>
      <select name="severity" onChange={handleChange}>
        <option value="low">Low</option><option value="medium">Medium</option>
        <option value="high">High</option><option value="critical">Critical</option>
      </select>
      <button type="submit">Submit Request</button>
    </form>
  );
}