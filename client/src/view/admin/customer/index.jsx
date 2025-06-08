import { deleteCustomerApi, getListCustomerApi } from '@api';
import { DataTable, FormList, DataFilter } from '@components/base';
import { Columnz, Inputzz } from '@components/core';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export * from './Detail';

export const Customer = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListCustomerApi, params, 'Customer');

  return (
    <FormList title="Danh sách khách hàng">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-6/12">
        <Inputzz
          value={filter.keySearch}
          onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })}
          label="Tìm kiếm theo tên, địa chỉ"
        />
        <Inputzz
          value={filter.email}
          onChange={(e) => setFilter({ ...filter, email: e.target.value })}
          label="Tìm kiếm theo số điện thoại, email"
        />
      </DataFilter>
      <DataTable
        title="khách hàng"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        actionsInfo={{
          onViewDetail: (item) => navigate(`/customer/detail/${item._id}`),
          deleteApi: deleteCustomerApi
        }}
        headerInfo={{
          onCreate: () => {
            navigate('/customer/create');
          }
        }}
      >
        <Columnz header="Tên nhân viên" field="fullName" />
        <Columnz header="Email" field="email" />
        <Columnz header="Số điện thoại" field="phone" />
        <Columnz header="Địa chỉ" field="address" />
      </DataTable>
    </FormList>
  );
};
