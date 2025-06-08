import { Radioz } from '@components/core';
import React from 'react';

export const MultiRadio = (props) => {
  const {
    label,
    id,
    options = [],
    value,
    setValue = () => {},
    optionValue = '_id',
    optionLabel = 'name',
    className = '',
    ...prop
  } = props;

  return (
    <div className={`flex w-full ${className}`}>
      <label className="w-full py-5 font-medium">{label}</label>
      <div className="flex items-center gap-4">
        {options.map((item, index) => {
          let key, text;
          if (typeof item === 'object') {
            key = item[optionValue];
            text = item[optionLabel];
          } else key = text = item;
          const inputId = `${id}${key}`

          return (
            <div key={index} className="flex items-center">
              <Radioz name={id} inputId={inputId} checked={value === key} onChange={() => setValue(key)} {...prop} />
              <label htmlFor={inputId} className="flex w-full cursor-pointer items-center px-3 py-2">
                {text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
