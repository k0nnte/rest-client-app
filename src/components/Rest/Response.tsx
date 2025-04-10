import React from 'react';
import { IResp } from '../../interfase/interfase';

const Response: React.FC<IResp> = ({ loaderData }) => {
  if (!loaderData) {
    return;
  }

  return <div>hi</div>;
};

export default Response;
