import React from 'react';
import { IResp } from '../../interfase/interfase';
import { useTranslation } from 'react-i18next';

const Response: React.FC<IResp> = ({ loaderData }) => {
  const { t } = useTranslation();

  if (!loaderData) {
    return;
  }

  return (
    <div className="my-5 w-1/2">
      <p className="text-lg text-center text-blue-950 mb-2">
        {t('response.status')}: {loaderData.response}
      </p>
      <div>
        {loaderData.error ? (
          <p className="text-red-500">
            {t('response.error')}: {loaderData.error}
          </p>
        ) : (
          <pre className="bg-gray-100  p-4 overflow-auto text-xs whitespace-pre-wrap text-blue-950 rounded-lg">
            {JSON.stringify(loaderData.data, null, 1)}
          </pre>
        )}
      </div>
    </div>
  );
};

export default Response;
