import { Calendar } from 'primereact/calendar';

export const Calendarz = (props) => {
  const { id, label = '', value = null, errors = {}, register = () => {}, ...prop } = props;

  return (
    <div className="flex flex-col gap-2">
      <span className="p-float-label w-full disabledz">
        <Calendar dateFormat="dd/mm/yy" id={id} value={value} invalid={Boolean(errors[id])} {...register(id)} className="w-full" showIcon {...prop}></Calendar>
        <label>{label}</label>
      </span>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
  );
};


export const Calendarzz = ({ className = "", ...prop }) => {
  return (
    <div className={`p-2 w-full md:w-6/12 lg:w-3/12 ${className}`}>
      <Calendarz {...prop} />
    </div>
  );
};

export const CalendarFormz = ({ ...prop }) => {
  return (
    <div className="p-2 w-full lg:w-6/12">
      <Calendarz {...prop} />
    </div>
  );
};