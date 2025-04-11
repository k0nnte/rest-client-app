import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IResp } from '../../interfase/interfase';
import Response from './Response';

const Rest: React.FC<IResp> = ({ loaderData }) => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState<{ key: string; value: string }[]>([]);
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    if (params.metod && params.url) {
      try {
        const decodedUrl = atob(params.url);
        console.log('decoded', decodedUrl);
        setMethod(params.metod);
        setUrl(decodedUrl);

        const existing = JSON.parse(localStorage.getItem('requests') || '[]');
        const match = existing.find(
          (req: any) => req.metod === params.metod && req.url === decodedUrl
        );

        if (match) {
          setHeaders(match.headers || []);
        }
      } catch (err) {
        console.error('Error when restoring a request:', err);
      }
    }
  }, [params.metod, params.url]);

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };
  console.log(loaderData);

  const send = () => {
    const executedAt = new Date().toISOString();

    const fullRequest = {
      method,
      url,
      headers,
      executedAt,
    };

    const existing = JSON.parse(localStorage.getItem('requests') || '[]');
    const updated = [fullRequest, ...existing];
    localStorage.setItem('requests', JSON.stringify(updated));

    const endurl = btoa(url);
    navigate(`/rest/${method}/${endurl}`);
  };

  console.log(url, method, headers);

  return (
    <>
      <div>
        <div>
          <div>
            <label htmlFor="">Method </label>
            <select value={method} onChange={(e) => setMethod(e.target.value)}>
              <option>GET</option>
              <option>POST</option>
              <option>PUT</option>
              <option>DELETE</option>
              <option>PATCH</option>
            </select>
          </div>
          <div>
            <label htmlFor="">Endpoint URL</label>
            <input
              type="text"
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
              <label htmlFor="">Key</label>
              <input
                type="text"
                value={header.key}
                onChange={(e) =>
                  setHeaders(
                    headers.map((j, i) =>
                      i === index ? { ...j, key: e.target.value } : j
                    )
                  )
                }
              />
              <label htmlFor="">Value</label>
              <input
                type="text"
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
        <button onClick={send}>Send</button>
      </div>
      {loaderData && <Response loaderData={loaderData} />}
    </>
  );
};

export default Rest;
