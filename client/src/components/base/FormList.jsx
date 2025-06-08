import { Cardz } from '@components/core';
import React from 'react';

export const FormList = (props) => {
  const { title, children } = props;

  return title ? (
    <Cardz>
      {title && (
        <>
          <h2 className="font-bold uppercase leading-normal mb-2 p-2 text-primary">{title}</h2>
          <hr className="mx-2" />
        </>
      )}
      {children}
    </Cardz>
  ) : (
    children
  );
};
