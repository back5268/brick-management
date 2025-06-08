import { CheckBoxz } from '@components/core';
import React, { useEffect, useState } from 'react';

export const MultiCheckbox = (props) => {
  const { label, id, options = [], value, setValue = () => {}, optionValue = '_id', optionLabel = 'name', className = '', ...prop } = props;
  const [selectAll, setSelectAll] = useState(false);

  useEffect(() => {
    if (Array.isArray(value)) {
      const checkValue = value.filter((v) => v?.startsWith(id + '---'));
      if (checkValue.length === options.length) setSelectAll(true);
      else setSelectAll(false);
    }
  }, [value]);

  return (
    <div className={`flex w-full justify-between ${className}`}>
      <div className="flex items-center gap-4">
        <CheckBoxz
          name={id}
          inputId={id}
          checked={selectAll}
          onChange={() => {
            if (selectAll) {
              setValue((pre) =>
                pre.filter((p) => {
                  const route = p.split('---')?.[0];
                  if (route === id) return false;
                  else return true;
                })
              );
            } else {
              const newValue = options.map((o) => o[optionValue]);
              value.forEach((v) => {
                if (!newValue.includes(v)) newValue.push(v);
              });
              setValue(newValue);
            }
          }}
          {...prop}
        />
        <label htmlFor={id} className="w-full cursor-pointer text-nowrap py-5 font-medium">{label}</label>
      </div>
      <div className='flex gap-2'>
        {options.map((item, index) => {
          let key, text;
          if (typeof item === 'object') {
            key = item[optionValue];
            text = item[optionLabel];
          } else key = text = item;
          const inputId = `${id}${key}`;

          return (
            <div key={index} className="flex items-center">
              <CheckBoxz
                name={id}
                inputId={inputId}
                checked={value.includes(key)}
                onChange={() => {
                  let newValue = [];
                  if (value.includes(key)) newValue = value.filter((v) => v !== key);
                  else newValue = [...value, key];
                  const arrCheck = newValue.filter((v) => {
                    const route = v.split('---')?.[0];
                    if (route === id) return true;
                    else return false;
                  });
                  if (arrCheck?.length === options.length) setSelectAll(true);
                  else setSelectAll(false);
                  setValue(newValue);
                }}
                {...prop}
              />
              <label htmlFor={inputId} className="flex w-full cursor-pointer items-center px-3 py-2 text-nowrap">
                {text}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};
