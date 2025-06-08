import { createOrderApi, detailOrderApi, getListCustomerInfoApi, getListPriceByCustomerInfoApi, getListWarehouseInfoApi } from '@api';
import { FormDetail } from '@components/base';
import { DropdownFormz, InputFormz, TextAreaz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { checkEqualProp, convertNumberToString, formatNumber } from '@lib/helper';
import { useGetApi } from '@lib/react-query';
import { OrderValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { Prices } from './Prices';

const defaultValues = {
  customer: '',
  palletDeposit: '',
  totalAmount: 0,
  note: ''
};

export const DetailOrder = () => {
  const { _id } = useParams();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailOrderApi, { _id }, 'item', isUpdate);
  const { data: customers } = useGetApi(getListCustomerInfoApi, {}, 'Customers');
  const { data: warehouses } = useGetApi(getListWarehouseInfoApi, {}, 'Warehouses');
  const [prices, setPrices] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(OrderValidation),
    defaultValues
  });

  const { data: categories } = useGetApi(
    getListPriceByCustomerInfoApi,
    { _id: watch('customer'), status: 1 },
    'categories',
    Boolean(watch('customer'))
  );

  useEffect(() => {
    if (isUpdate && item) {
      if (item.items) setPrices(item.items.map((p) => ({ ...p, idz: Date.now() })));
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  useEffect(() => {
    const total = prices.reduce((a, b) => a + b.totalPrice, 0);
    setValue('totalAmount', total);
  }, [prices]);

  const handleData = (data) => {
    const newData = { ...data, items: prices };
    if (prices.length === 0) return 'Vui lòng thêm sản phẩm!';
    if (isUpdate) return { ...checkEqualProp(newData, item), _id };
    else return newData;
  };

  return (
    <FormDetail
      type="nomal"
      title="đơn hàng"
      isUpdate={isUpdate}
      createApi={createOrderApi}
      updateApi={() => {}}
      handleData={handleData}
      handleSubmit={handleSubmit}
    >
      <div className="flex flex-wrap w-full">
        <DropdownFormz
          id="customer"
          label="Khách hàng (*)"
          options={customers}
          errors={errors}
          optionLabel="fullName"
          onChange={(e) => {
            setValue('customer', e.target.value);
            setPrices([]);
          }}
          value={watch('customer')}
          disabled={isUpdate}
        />
        <DropdownFormz
          id="warehouse"
          label="Kho hàng (*)"
          options={warehouses}
          errors={errors}
          onChange={(e) => setValue('warehouse', e.target.value)}
          value={watch('warehouse')}
          disabled={isUpdate}
        />
        <Prices
          data={prices}
          setData={setPrices}
          disabled={isUpdate || !watch('customer')}
          categories={categories?.filter((c) => c.price)?.map((c) => ({ ...c, name: c.category?.name, _id: c.category?._id }))}
        />
        <InputFormz
          id="totalAmount"
          label="Thành tiền (*)"
          value={formatNumber(watch('totalAmount'))}
          className="!w-full"
          disabled
          helper={watch('totalAmount') ? convertNumberToString(watch('totalAmount')) : ''}
        />
        <TextAreaz id="note" label="Ghi chú" value={watch('note')} errors={errors} register={register} />
      </div>
    </FormDetail>
  );
};
