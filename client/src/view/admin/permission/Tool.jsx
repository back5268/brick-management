import { MultiCheckbox } from '@components/base';
import { toolActions } from '@constant';
import React from 'react';

export const Tool = (props) => {
  const { value = [], setValue = () => {}, tool = {} } = props;
  const items = tool?.items;

  return (
    <div>
      {items?.map((child, index) => {
        return (
          <MultiCheckbox
            key={index}
            id={child.route}
            label={child?.name}
            value={value}
            setValue={setValue}
            options={child.actions?.map((a) => {
              const name = toolActions.find((t) => t._id === a)?.name;
              return { name, _id: `${child.route}---${a}` };
            })}
          />
        );
      })}
    </div>
  );
};
