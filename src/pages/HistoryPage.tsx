import { getAuth, onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();

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
        <h2 className="text-2xl font-semibold text-blue-950 mb-6 text-center">
          {t('history.noRequests')}
        </h2>
        <p>{t('history.empty')}</p>
        <Link to="/rest">{t('restClient')}</Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-blue-950 mb-6  text-center">
        {t('history.historyRequests')}
      </h2>
      <ul className="space-y-4">
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
              <li
                key={i}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md hover:shadow-blue-950/20 transition-all"
              >
                <Link
                  to={path}
                  className="text-blue-950 border-b-2 border-transparent  hover:border-blue-950 transition-all duration-300"
                >
                  <span className="font-semibold">
                    {req.method.toUpperCase()}
                  </span>{' '}
                  <span className="break-all">{req.url}</span>
                </Link>
                <div className="text-sm text-gray-500 mt-1">
                  {new Date(req.executedAt).toLocaleString()}
                </div>
              </li>
            );
          })}
      </ul>
    </div>
  );
};

export default HistoryPage;
