import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Dashboard() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    API.get('/tickets/my').then((res) => setTickets(res.data.tickets));
  }, []);

  return (
    <div>
      <h2>My Tickets</h2>
      {tickets.map((t) => (
        <div key={t._id} style={{ border: '1px solid #ccc', margin: '8px 0', padding: '8px' }}>
          <strong>{t.title}</strong> — {t.severity} — {t.status} — score: {t.priorityScore}
        </div>
      ))}
    </div>
  );
}