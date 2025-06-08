import { createCustomerApi, detailCustomerApi, getListCategoryInfoApi, updateCustomerApi } from '@api';
import { Buttonz, InputFormz, Inputzz, ProgressSpinnerz } from '@components/core';
import { yupResolver } from '@hookform/resolvers/yup';
import { useGetApi, usePostApi } from '@lib/react-query';
import { CustomerValidation } from '@lib/validation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { checkEqualProp, convertNumberToString } from '@lib/helper';
import { useToastState } from '@store';

const Price = ({ price, handleOnChange }) => {
  return (
    <div className="w-full flex justify-between items-center">
      <label className="inline-block text-left w-full ml-2 font-bold">{price.name}</label>
      <Inputzz
        type="number"
        label="Đơn giá / viên (*)"
        value={price.price}
        onChange={(e) => handleOnChange(price.category, e.target.value)}
        helper={price.price ? convertNumberToString(price.price) : ''}
        className="!w-full"
      />
    </div>
  );
};

const defaultValues = {
  fullName: '',
  email: '',
  phone: '',
  address: ''
};

export const Info = ({ _id }) => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const isUpdate = Boolean(_id);
  const { data: item } = useGetApi(detailCustomerApi, { _id }, 'item', isUpdate);
  const { mutateAsync, isPending } = usePostApi(isUpdate ? updateCustomerApi : createCustomerApi);
  const [prices, setPrices] = useState([]);
  const { data: categories } = useGetApi(getListCategoryInfoApi, {}, 'categories');

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm({
    resolver: yupResolver(CustomerValidation),
    defaultValues
  });

  useEffect(() => {
    if (isUpdate && item) {
      if (item.prices) setPrices(item.prices.map((p) => ({ _id: p._id, category: p.category, name: p.name, price: p.price })));
      for (const key in defaultValues) {
        setValue(key, item[key]);
      }
    }
  }, [item]);

  useEffect(() => {
    if (categories && Array.isArray(categories) && !isUpdate) {
      setPrices(categories.map((c) => ({ category: c._id, name: c.name })));
    }
  }, [categories]);

  const onSubmit = async (e) => {
    let params = { ...e };
    if (isUpdate) params = { ...checkEqualProp(params, item), _id };
    params.prices = [];
    if (isUpdate) {
      const pricez = item?.prices?.filter((p) => p.price) || [];
      prices
        .filter((p) => p.price)
        .forEach((p) => {
          const item = pricez.find((pz) => pz.category === p.category);
          if (!item || item.price !== p.price)
            params.prices.push({ category: p.category, price: p.price, action: 'create', priceBefore: item.price });
        });
      pricez.forEach((pz) => {
        const item = prices.filter((p) => p.price).find((p) => pz.category === p.category);
        if (!item || item.price !== pz.price) params.prices.push({ _id: pz._id, action: 'delete' });
      });
    } else params.prices = prices.filter((p) => p.price).map((p) => ({ category: p.category, price: p.price }));
    const response = await mutateAsync(params);
    if (response) {
      showToast({ title: `${isUpdate ? 'Cập nhật' : 'Thêm'} khách hàng thành công!`, severity: 'success' });
      navigate(-1);
    }
  };

  const handleOnChange = (category, price) => {
    if (category) {
      setPrices((pre) =>
        pre.map((p) => {
          if (category === p.category) p.price = price;
          return p;
        })
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="relative w-full mt-4">
        {isPending && (
          <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
            <ProgressSpinnerz style={{ width: '50px', height: '50px' }} strokeWidth="4" animationDuration="1s" />
          </div>
        )}
        <div className="flex flex-wrap w-full">
          <InputFormz id="fullName" label="Họ tên (*)" value={watch('fullName')} errors={errors} register={register} />
          <InputFormz id="email" label="Email (*)" value={watch('email')} errors={errors} register={register} type="email" />
          <InputFormz id="phone" label="Số điện thoại (*)" value={watch('phone')} errors={errors} register={register} type="phone" />
          <InputFormz id="address" label="Địa chỉ (*)" value={watch('address')} errors={errors} register={register} />
          <div className="mb-4 w-full mt-6 px-2">
            <label className="inline-block font-medium text-left">Thông tin bảng giá</label>
            <hr />
          </div>
          <div className="w-full flex flex-col gap-2">
            {prices
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((price, index) => (
                <Price key={index} price={price} handleOnChange={handleOnChange} />
              ))}
          </div>
        </div>
      </div>
      <hr className="my-6" />
      <div className="flex gap-4 justify-end">
        <Buttonz outlined label="Trở lại" onClick={() => navigate(-1)} />
        <Buttonz loading={isPending} type="submit" label="Xác nhận" />
      </div>
    </form>
  );
};
