import React from 'react';
import { IResp } from '../../interfase/interfase';

const Response: React.FC<IResp> = ({ loaderData }) => {
  if (!loaderData) {
    return;
  }

  return (
    <div>
      <p>Статус: {loaderData.response}</p>
      <div>
        {loaderData.error ? (
          <p className="text-red-500">Ошибка: {loaderData.error}</p>
        ) : (
          <pre>{JSON.stringify(loaderData.data, null, 1)}</pre>
        )}
      </div>
    </div>
  );
};

export default Response;
