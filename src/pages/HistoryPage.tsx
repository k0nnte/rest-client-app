import React from 'react';
import { Link } from 'react-router-dom';

type RequestItem = {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  executedAt: string;
};

const HistoryPage: React.FC = () => {
  let requests: RequestItem[] = [];

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem('requests');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          requests = parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load history requests', err);
    }
  }

  if (!requests.length) {
    return (
      <div className="empty-history">
        <h2>You haven't executed any requests</h2>
        <p>It's empty here. Try:</p>
        <Link to="/rest">REST Client</Link>
      </div>
    );
  }

  return (
    <div className="history">
      <h2>History Requests</h2>
      <ul>
        {requests
          .sort(
            (a, b) =>
              new Date(b.executedAt).getTime() -
              new Date(a.executedAt).getTime()
          )
          .map((req, i) => (
            <li key={i}>
              <Link to={`/rest/${req.method}/${btoa(req.url)}`}>
                {req.method.toUpperCase()} {req.url}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default HistoryPage;
