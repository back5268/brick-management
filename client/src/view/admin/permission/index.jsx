import { deletePermissionApi, getListPermissionApi, updatePermissionApi } from '@api';
import { DataTable, FormList, DataFilter, UserBody, Body } from '@components/base';
import { Columnz, Dropdownzz, Inputzz } from '@components/core';
import { status, userPermission } from '@constant';
import { useGetParams } from '@hooks';
import { useGetApi } from '@lib/react-query';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export * from './Detail';

export const Permission = () => {
  const navigate = useNavigate();
  const initParams = useGetParams();
  const [params, setParams] = useState(initParams);
  const [filter, setFilter] = useState({});
  const { isLoading, data } = useGetApi(getListPermissionApi, params, 'Permission');

  return (
    <FormList title="Danh sách nhóm quyền">
      <DataFilter setParams={setParams} filter={filter} setFilter={setFilter} className="lg:w-1/4">
        <Inputzz value={filter.keySearch} onChange={(e) => setFilter({ ...filter, keySearch: e.target.value })} label="Tìm kiếm theo tên" />
        <Dropdownzz
          value={filter.status}
          onChange={(e) => setFilter({ ...filter, status: e.target.value })}
          options={status}
          label="Trạng thái"
          showClear
        />
        <Dropdownzz
          value={filter.role}
          onChange={(e) => setFilter({ ...filter, role: e.target.value })}
          options={userPermission}
          label="Vai trò"
          showClear
        />
      </DataFilter>
      <DataTable
        title="Nhóm quyền"
        loading={isLoading}
        data={data?.documents}
        total={data?.total}
        params={params}
        setParams={setParams}
        baseActions={['create', 'detail', 'delete']}
        actionsInfo={{
          onViewDetail: (item) => navigate(`/permission/detail/${item._id}`),
          deleteApi: deletePermissionApi
        }}
        statusInfo={{ changeStatusApi: updatePermissionApi }}
        headerInfo={{
          onCreate: () => {
            navigate('/permission/create');
          }
        }}
      >
        <Columnz header="Tên nhóm quyền" field="name" />
        <Columnz header="Vai trò" body={(e) => Body(userPermission, e.role)} />
        <Columnz header="Mô tả" field="description" />
        <Columnz header="Thời gian cập nhật" body={(e) => UserBody(e.updatedAt, e.updatedBy)} />
      </DataTable>
    </FormList>
  );
};
