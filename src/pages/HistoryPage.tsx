import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

type RequestItem = {
  method: string;
  url: string;
  headers: { key: string; value: string }[];
  body?: string;
  executedAt: string;
};

const HistoryPage: React.FC = () => {
  let requests: RequestItem[] = [];
  const [users, setuser] = useState<string>('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user.email ?? '');
      } else {
        setuser('');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(users);
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
    <div>
      <h2 className="header-page">History Requests</h2>
      <ul>
        {requests
          .sort(
            (a, b) =>
              new Date(b.executedAt).getTime() -
              new Date(a.executedAt).getTime()
          )
          .map((req, i) => {
            const encodedUrl = btoa(req.url);
            const encodedBody = req.body ? `/${btoa(req.body)}` : '';
            const queryParams = new URLSearchParams();

            req.headers.forEach(({ key, value }) => {
              if (key) queryParams.append(key, encodeURIComponent(value));
            });

            const path = `/rest/${req.method}/${encodedUrl}${encodedBody}?${queryParams.toString()}`;

            return (
              <li key={i}>
                <Link to={path}>
                  {req.method.toUpperCase()} {req.url}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default HistoryPage;
