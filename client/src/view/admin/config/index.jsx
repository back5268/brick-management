import { deleteCategoryApi, getListCategoryApi, updateCategoryApi } from '@api';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Columnz, Dropdownzz, Inputzz } from '@components/core';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { DetailCategory } from './Detail';
import { status } from '@constant';

export const Config = () => {
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const [open, setOpen] = useState(false);
  const { isLoading, data } = useGetApi(getListCategoryApi, params, 'Category');

  return (
    <FormList title="Danh sách loại gạch">
      <DetailCategory open={open} setOpen={setOpen} setParams={setParams} data={data?.documents} />
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Inputzz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, mã"
        />
        <Dropdownzz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          options={status}
          label="Trạng thái"
          showClear
        />
      </DataFilter>
      <DataTable
        title="danh mục"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        setShow={setOpen}
        actionsInfo={{
          onViewDetail: (item) => setOpen(item._id),
          deleteApi: deleteCategoryApi
        }}
        statusInfo={{ changeStatusApi: updateCategoryApi }}
        headerInfo={{ onCreate: () => setOpen(true) }}
      >
        <Columnz header="Tên loại gạch" field="name" />
        <Columnz header="Mã loại gạch" field="code" />
        <Columnz header="Mô tả" field="description" />
      </DataTable>
    </FormList>
  );
};
