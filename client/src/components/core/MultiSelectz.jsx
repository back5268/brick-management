import { MultiSelect } from 'primereact/multiselect';

export const MultiSelectz = (props) => {
  const {
    id,
    label = '',
    value = [],
    options = [],
    optionLabel = 'name',
    optionValue = '_id',
    errors = {},
    register = () => {},
    ...prop
  } = props;

  return (
    <div className="flex flex-column gap-2">
      <span className="p-float-label w-full disabledz">
        <MultiSelect
          id={id}
          value={value}
          options={options}
          optionLabel={optionLabel}
          optionValue={optionValue}
          invalid={Boolean(errors[id])}
          filter
          display="chip"
          className="w-full"
          emptyMessage={label ? `Không tìm thấy ${label.toLowerCase()}` : 'Không có dữ liệu'}
          {...register(id)}
          {...prop}
        />
        <label>{label}</label>
      </span>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};

export const MultiSelectzz = ({ ...prop }) => {
  return (
    <div className="p-2 w-full md:w-6/12 lg:w-3/12">
      <MultiSelectz {...prop} />
    </div>
  );
};

export const MultiSelectFormz = ({ className = '', ...prop }) => {
  return (
    <div className={`p-2 w-full lg:w-6/12 ${className}`}>
      <MultiSelectz {...prop} />
    </div>
  );
};
