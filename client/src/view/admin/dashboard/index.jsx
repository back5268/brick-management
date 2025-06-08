import { useGetApi } from '@lib/react-query';
import { Attendance } from './Attendance';
import { DoughnutChart } from './DoughnutChart';
import { ComboChart } from './ComboChart';
import { PieChart } from './PieChart';
import { getDataDashboardApi } from '@api';
import { useState } from 'react';
import { DepartmentReport } from './DepartmentReport';
import { Calendarzz, Cardz, Dropdownzz } from '@components/core';
import { databaseDate } from '@lib/helper';
import { useDataState } from '@store';
import { DataFilter } from '@components/base';

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
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 30),
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1)
  ]
};
export const DashBoard = () => {
  const [params, setParams] = useState(INITPARAMS);
  const [filter, setFilter] = useState(INITPARAMS);
  // const { data, isLoading } = useGetApi(getDataDashboardApi, handleParams(params), 'dashboard');
  const data = [];
  const isLoading = false;
  const { departments } = useDataState();
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() - 1);

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
      {/* <div className="w-full lg:pr-3 py-4 lg:w-8/12">
        <DepartmentReport data={data?.departments} isLoading={isLoading} />
      </div> */}
      <div className="w-full py-4 lg:w-5/12">
        <DoughnutChart data={data?.accounts} isLoading={isLoading} />
      </div>
      <div className="w-full py-4 lg:w-2/12"></div>
      <div className="w-full py-4 lg:w-5/12">
        <PieChart data={data?.applications} isLoading={isLoading} />
      </div>
      <div className="w-full py-4">
        <ComboChart data={data?.timekeepings} isLoading={isLoading} />
      </div>
    </div>
  );
};
