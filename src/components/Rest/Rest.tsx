import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { IResp } from '../../interfase/interfase';
import Response from './Response';
import CodeGenerator from './CodeGenerator';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getUserVariables } from '../../utils/variablesStorage';
import { substituteVariables } from '../../utils/substituteVariables';
import { useTranslation } from 'react-i18next';
import Input from '../Input';
import Button from '../Button';

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
  const [variables, setVariables] = useState<Record<string, string>>({});
  const { t } = useTranslation();

  useEffect(() => {
    const stored = getUserVariables();
    setVariables(stored);
  }, []);

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
      url: substituteVariables(url, variables),
      headers: headers.map((header) => ({
        key: header.key,
        value: substituteVariables(header.value, variables),
      })),
      body: substituteVariables(body, variables),
      executedAt,
    };

    const existing = JSON.parse(localStorage.getItem(users) || '[]');
    const updated = [fullRequest, ...existing];
    localStorage.setItem(users, JSON.stringify(updated));

    const queryParams = new URLSearchParams();
    headers.forEach(({ key, value }) => {
      if (key)
        queryParams.append(
          key,
          encodeURIComponent(substituteVariables(value, variables))
        );
    });

    const encodedUrl = btoa(fullRequest.url);
    const encodedBody = body ? `/${btoa(body)}` : '';
    navigate(
      `/rest/${method}/${encodedUrl}${encodedBody}?${queryParams.toString()}`
    );
  };

  return (
    <>
      <div>
        <h2 className="text-2xl font-semibold text-blue-950 text-center">
          {t('restClient')}
        </h2>
        <div>
          <div className="mb-2">
            <label htmlFor="method" className="text-blue-950">
              {t('rest.method')}
            </label>
            <select
              className="p-1 ml-2 border-2 rounded-xl text-blue-950 border-blue-950 outline-blue-950 transition-all duration-300 ease-in-out focus:shadow-lg  hover:shadow-blue-600/30 bg-transparent"
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
            <Input
              label={t('rest.endpointUrl')}
              data-testId="rest.endpointUrl"
              type="text"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div>
            <label htmlFor="">{t('rest.header')}</label>
            <Button
              className="ml-2"
              size="sm"
              variant="contained"
              color="blue"
              onClick={addHeader}
            >
              {t('rest.addHeader')}
            </Button>
          </div>
          {headers.map((header, index) => (
            <div key={index} className="flex mt-2">
              <Input
                placeholder={t('rest.key')}
                className="mr-2"
                value={header.key}
                direction="horizontal"
                width="half"
                onChange={(e) =>
                  setHeaders(
                    headers.map((h, i) =>
                      i === index ? { ...h, key: e.target.value } : h
                    )
                  )
                }
              />
              <Input
                placeholder={t('rest.value')}
                value={header.value}
                width="half"
                direction="horizontal"
                onChange={(e) =>
                  setHeaders(
                    headers.map((h, i) =>
                      i === index ? { ...h, value: e.target.value } : h
                    )
                  )
                }
              />
              <Button
                size="sm"
                variant="contained"
                color="red"
                className="h-10 w-10 mt-1 ml-2"
                onClick={() =>
                  setHeaders(headers.filter((_, i) => i !== index))
                }
                title={t('rest.remove')}
              >
                ✖
              </Button>
            </div>
          ))}
        </div>

        <div className="mb-2">
          <label className="block text-blue-950 mb-1" htmlFor="textarea">
            {t('rest.requestBody')}
          </label>
          <textarea
            data-testId="rest.requestBody"
            rows={8}
            className="w-full p-3 border-2 border-blue-950 rounded-xl focus:outline-none focus:shadow-blue-600/30 focus:shadow-lg focus:ring-1 focus:ring-blue-950"
            id={'textarea'}
            placeholder="{ JSON }"
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
        </div>

        <Button
          className="w-full"
          size="md"
          variant="contained"
          color="blue"
          onClick={send}
        >
          {t('send')}
        </Button>
      </div>
      {loaderData && <Response loaderData={loaderData} />}
      <CodeGenerator method={method} url={url} headers={headers} body={body} />
    </>
  );
};

export default Rest;
