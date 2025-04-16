import React from 'react';
import { IResp } from '../../interfase/interfase';
import { useTranslation } from 'react-i18next';

const Response: React.FC<IResp> = ({ loaderData }) => {
  const { t } = useTranslation();

  if (!loaderData) {
    return;
  }

  return (
    <div>
      <p>
        {t('response.status')}: {loaderData.response}
      </p>
      <div>
        {loaderData.error ? (
          <p className="text-red-500">
            {t('response.error')}: {loaderData.error}
          </p>
        ) : (
          <pre>{JSON.stringify(loaderData.data, null, 1)}</pre>
        )}
      </div>
    </div>
  );
};

export default Response;
