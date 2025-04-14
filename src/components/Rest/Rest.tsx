import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IResp } from '../../interfase/interfase';
import Response from './Response';
import CodeGenerator from './CodeGenerator';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

interface RequestData {
  method: string;
  url: string;
  headers?: Record<string, string> | string[];
}

const Rest: React.FC<IResp> = ({ loaderData }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const params = useParams();
  const [users, setuser] = useState<string>('');

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setuser(user.email ?? '');
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (params.metod && params.url) {
      try {
        const decodedUrl = atob(params.url);
        setMethod(params.metod);
        setUrl(decodedUrl);

        if (params.body) {
          setBody(JSON.stringify(JSON.parse(atob(params.body)), null, 1));
        }

        const existing = JSON.parse(localStorage.getItem(users) || '[]');
        const match = existing.find((req: RequestData) => {
          return req.method === params.metod && req.url === decodedUrl;
        });

        if (match) {
          setHeaders(match.headers || []);
          setBody(match.body || '');
        }
      } catch (err) {
        console.error('Error when restoring a request:', err);
      }
    }
  }, [params.metod, params.url, params.body, users]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  const send = () => {
    const executedAt = new Date().toISOString();

    const fullRequest = {
      method,
      url,
      headers,
      body,
      executedAt,
    };

    const existing = JSON.parse(localStorage.getItem(users) || '[]');
    const updated = [fullRequest, ...existing];
    localStorage.setItem(users, JSON.stringify(updated));

    const queryParams = new URLSearchParams();
    headers.forEach(({ key, value }) => {
      if (key) queryParams.append(key, encodeURIComponent(value));
    });

    const encodedUrl = btoa(url);
    const encodedBody = body ? `/${btoa(body)}` : '';
    navigate(
      `/rest/${method}/${encodedUrl}${encodedBody}?${queryParams.toString()}`
    );
  };

  return (
    <>
      <div>
        <div>
          <div>
            <label htmlFor="method">Method </label>
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value)}
              id="method"
            >
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
          </div>
          <div>
            <label htmlFor="text">Endpoint URL</label>
            <input
              type="text"
              id="text"
              placeholder="https:example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="">Header</label>
            <button onClick={addHeader}>Add Header</button>
          </div>
          {headers.map((header, index) => (
            <div key={index}>
              <label htmlFor={`header-key-${index}`}>Key</label>
              <input
                type="text"
                id={`header-key-${index}`}
                value={header.key}
                onChange={(e) =>
                  setHeaders(
                    headers.map((j, i) =>
                      i === index ? { ...j, key: e.target.value } : j
                    )
                  )
                }
              />
              <label htmlFor={`header-value-${index}`}>Value</label>
              <input
                type="text"
                id={`header-value-${index}`}
                value={header.value}
                onChange={(e) =>
                  setHeaders(
                    headers.map((j, i) =>
                      i === index ? { ...j, value: e.target.value } : j
                    )
                  )
                }
              />
            </div>
          ))}
        </div>

        <div>
          <label htmlFor="textarea">Request Body</label>
          <textarea
            rows={8}
            id={'textarea'}
            placeholder="{ JSON }"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <button onClick={send}>Send</button>
      </div>
      {loaderData && <Response loaderData={loaderData} />}
      <CodeGenerator method={method} url={url} headers={headers} body={body} />
    </>
  );
};

export default Rest;
