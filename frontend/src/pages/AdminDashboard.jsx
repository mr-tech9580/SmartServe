import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function AdminDashboard() {
  const [tickets, setTickets] = useState([]);
  const [nextTicket, setNextTicket] = useState(null);

  const loadTickets = () => API.get('/admin/tickets').then((res) => setTickets(res.data.tickets));

  useEffect(() => { loadTickets(); }, []);

  const getNext = async () => {
    const res = await API.get('/admin/tickets/next');
    setNextTicket(res.data.ticket);
  };

  const updateStatus = async (id, status) => {
    await API.patch(`/admin/tickets/${id}/status`, { status });
    loadTickets();
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <button onClick={getNext}>Get Next Priority Ticket</button>
      {nextTicket && <p>Next up: <strong>{nextTicket.title}</strong> (score: {nextTicket.priorityScore})</p>}

      <h3>All Tickets</h3>
      {tickets.map((t) => (
        <div key={t._id} style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}>
          <strong>{t.title}</strong> — {t.severity} — {t.status} — score: {t.priorityScore}
          <br />
          <button onClick={() => updateStatus(t._id, 'in-progress')}>Mark In Progress</button>
          <button onClick={() => updateStatus(t._id, 'resolved')}>Mark Resolved</button>
        </div>
      ))}
    </div>
  );
}