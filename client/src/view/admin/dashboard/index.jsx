import { useGetApi } from '@lib/react-query';
import { DoughnutChart } from './DoughnutChart';
import { ComboChart } from './ComboChart';
import { PieChart } from './PieChart';
import { getDataDashboardApi, getListCategoryInfoApi, getListWarehouseInfoApi } from '@api';
import { useState } from 'react';
import { Calendarzz, Cardz } from '@components/core';
import { databaseDate } from '@lib/helper';
import { DataFilter } from '@components/base';
import { StockReport } from './StockReport';

const handleParams = (params) => {
  if (Array.isArray(params.dates) && params.dates.length > 0) {
    params.fromDate = databaseDate(params.dates[0]);
    params.toDate = params.dates[1] ? databaseDate(params.dates[1], false, true) : databaseDate(params.dates[0], false, true);
  }
  return { ...params, page: undefined, limit: undefined, dates: undefined };
};

const today = new Date();
const INITPARAMS = {
  dates: [
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7),
    new Date(today.getFullYear(), today.getMonth(), today.getDate())
  ]
};
export const DashBoard = () => {
  const [params, setParams] = useState(INITPARAMS);
  const [filter, setFilter] = useState(INITPARAMS);
  const { data, isLoading } = useGetApi(getDataDashboardApi, handleParams(params), 'dashboard');
  const { data: categories } = useGetApi(getListCategoryInfoApi, {}, 'categories');
  const { data: warehouses } = useGetApi(getListWarehouseInfoApi, {}, 'warehouses');

  return (
    <div className="flex flex-wrap">
      <div className="w-full py-4">
        <Cardz>
          <DataFilter
            setParams={setParams}
            filter={filter}
            setFilter={setFilter}
            handleClear={() => {
              setParams(INITPARAMS);
              setFilter(INITPARAMS);
            }}
            className="lg:w-6/12"
          >
            <Calendarzz
              selectionMode="range"
              readOnlyInput
              hideOnRangeSelection
              label="Khoảng thời gian (*)"
              value={filter.dates}
              onChange={(e) => setFilter({ ...filter, dates: e.value })}
              className="lg:w-6/12"
            />
          </DataFilter>
        </Cardz>
      </div>
      <div className='flex flex-wrap w-full justify-between'>
        <div className="w-full py-4 lg:w-5/12">
          <StockReport data={data?.stocks} categories={categories} warehouses={warehouses} />
        </div>
        <div className="w-full py-4 lg:w-3/12">
          <DoughnutChart data={data?.accounts} isLoading={isLoading} />
        </div>
        <div className="w-full py-4 lg:w-3/12">
          <PieChart data={data?.orders} isLoading={isLoading} />
        </div>
      </div>
      <div className="w-full py-4">
        <ComboChart data={data?.warehouses} categories={categories} />
      </div>
    </div>
  );
};
