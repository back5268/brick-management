import { Body } from '@components/base';
import { Buttonz, Columnz, Dropdownzz, Tablez } from '@components/core';
import { stackingMethods } from '@constant';
import { TrashIcon } from '@heroicons/react/24/outline';
import { formatNumber } from '@lib/helper';
import { InputText } from 'primereact/inputtext';

const calAmount = (price) => {
  return price.stackingMethod === 'pallet' ? price.quantity * 1000 : price.quantity;
};

export const Items = (props) => {
  const { data = [], setData = () => {}, disabled, categories } = props;

  const onChange = (item, field, value) => {
    if (item && field && value) {
      setData((pre) =>
        pre.map((p) => {
          if (p.idz === item.idz) {
            if (field === 'category') {
              p.category = value;
              const category = categories.find((c) => c._id === value);
              p.categoryName = category.name;
            } else p[field] = value;
            p.amount = calAmount(p);
          }
          return p;
        })
      );
    }
  };

  return (
    <div className="card w-full mx-2 my-4">
      <div className="flex justify-between mb-4 items-center">
        <label className="inline-block font-medium text-left">Thông tin sản phẩm</label>
        {!disabled && (
          <Buttonz
            label="Thêm sản phẩm"
            onClick={() =>
              setData((pre) => [
                ...pre,
                {
                  idz: Date.now(),
                  category: categories?.[0]?._id,
                  categoryName: categories?.[0]?.name,
                  quantity: 1,
                  amount: 1000,
                  stackingMethod: 'pallet'
                }
              ])
            }
          />
        )}
      </div>
      <Tablez
        value={data}
        totalRecords={data?.length}
        rows={100}
        rowsPerPageOptions={[100]}
        params={{ page: 1, limit: 100 }}
        dataKey="idz"
        emptyMessage="."
        paginatorTemplate="CurrentPageReport"
      >
        <Columnz header="#" body={(data, options) => options.rowIndex + 1} />
        <Columnz
          header="Sản phẩm"
          body={(item) =>
            disabled ? (
              Body(categories, item.category)
            ) : (
              <div className="disabledz">
                <Dropdownzz
                  value={item.category}
                  onChange={(e) => onChange(item, 'category', e.target.value)}
                  options={categories}
                  showClear={false}
                  className="!w-full !p-0"
                  disabled={disabled}
                />
              </div>
            )
          }
        />
        <Columnz
          header="Loại xếp"
          body={(item) =>
            disabled ? (
              Body(stackingMethods, item.stackingMethod)
            ) : (
              <div className="disabledz">
                <Dropdownzz
                  value={item.stackingMethod}
                  onChange={(e) => onChange(item, 'stackingMethod', e.target.value)}
                  options={stackingMethods}
                  showClear={false}
                  className="!w-full !p-0"
                  disabled={disabled}
                />
              </div>
            )
          }
        />
        <Columnz
          header="Số lượng"
          body={(item) =>
            disabled ? (
              formatNumber(item.quantity)
            ) : (
              <div className="disabledz">
                <InputText
                  min={1}
                  disabled={disabled}
                  type="number"
                  value={item.quantity}
                  className="w-full"
                  onChange={(e) => onChange(item, 'quantity', e.target.value)}
                />
              </div>
            )
          }
        />
        <Columnz header="Đơn vị" body={(item) => (item.stackingMethod == 'pallet' ? 'Pallet' : 'Viên')} />
        <Columnz header="Tổng cộng (Viên)" body={(item) => formatNumber(item.amount)} />
        {!disabled && (
          <Columnz
            header="Thao tác"
            body={(item) => (
              <div className="w-full flex justify-center">
                <Buttonz
                  severity="danger"
                  outlined
                  onClick={() => setData((pre) => pre.filter((p) => p.idz !== item.idz))}
                  className="!p-0 h-10 w-10 flex justify-center items-center !rounded-full"
                  icon={<TrashIcon className="w-5" />}
                />
              </div>
            )}
          />
        )}
      </Tablez>
    </div>
  );
};
