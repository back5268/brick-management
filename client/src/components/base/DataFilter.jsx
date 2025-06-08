import React, { useEffect } from 'react';
import { removeUndefinedProps } from '@lib/helper';
import { useLocation } from 'react-router-dom';
import { Buttonz } from '@components/core';

export const DataFilter = (props) => {
  const { search } = useLocation();
  const { setParams = () => {}, filter, setFilter = () => {}, handleFilter, handleClear, className = '' } = props;

  useEffect(() => {
    const query = {};
    const queryParams = new URLSearchParams(search);
    for (let [key, value] of queryParams.entries()) {
      query[key] = Number(value) || Number(value) === 0 ? Number(value) : value;
    }
    setFilter((pre) => ({ ...pre, ...query, page: undefined, limit: undefined }));
  }, [search]);

  const onClear = () => {
    if (handleClear) handleClear();
    else {
      setParams((pre) => {
        return {
          page: pre.page || 1,
          limit: pre.limit || 10,
          render: pre.render
        };
      });
      setFilter({});
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    let filters = { ...filter };
    if (handleFilter) handleFilter();
    else {
      setParams((pre) => {
        return {
          page: pre.page || 1,
          limit: pre.limit || 10,
          render: pre.render,
          ...removeUndefinedProps(filters)
        };
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="my-4">
      <div className="flex items-center flex-wrap w-full">
        {props.children}
        <div className={`p-2 w-full md:w-6/12 lg:w-3/12 ${className}`}>
          <div className="flex gap-4 items-center justify-end">
            <Buttonz onClick={onClear} outlined>
              Làm mới bộ lọc
            </Buttonz>
            <Buttonz type="submit">Tìm kiếm</Buttonz>
          </div>
        </div>
      </div>
    </form>
  );
};
