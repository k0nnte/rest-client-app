import { useState } from 'react';

const Rest = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');

  const addHeader = () => {
    setHeaders([...headers, { key: '', value: '' }]);
  };

  return (
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
      <div>
        <div>
          <label htmlFor="">Body</label>
          <textarea
            placeholder="Введите тело запроса (JSON)"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Rest;
