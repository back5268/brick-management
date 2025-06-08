import { Cardz, Columnz, Tablez } from '@components/core';
import { formatNumber } from '@lib/helper';
import { useEffect, useState } from 'react';

export const StockReport = ({ data = [], categories = [], warehouses = [] }) => {
  const [dataz, setDataz] = useState([]);

  useEffect(() => {
    const newData = [];
    categories.forEach((cate) => {
      const object = { _id: cate._id, name: cate.name };
      const datum = data.find((d) => d.category === cate._id) || {};
      warehouses.forEach((ware) => {
        object[ware._id] = datum[ware._id] || 0;
      });
      newData.push(object);
    });
    setDataz(newData);
  }, [data, categories, warehouses]);

  return (
    <Cardz className="w-full h-full py-8">
      <h2 className="font-bold uppercase leading-normal mb-4 text-primary">Báo cáo số sản phẩm trong kho</h2>
      <hr className="mb-4" />
      <Tablez value={dataz} rows={100} dataKey="category" paginatorTemplate="" rowsPerPageOptions={[100]} params={{ page: 1, limit: 100 }}>
        <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
        <Columnz header="Loại gạch" field="name" />
        {warehouses.map((ware) => (
          <Columnz header={ware.name} body={(e) => formatNumber(e[ware._id])} />
        ))}
      </Tablez>
    </Cardz>
  );
};
