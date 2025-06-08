import { InputTextarea } from "primereact/inputtextarea";

export const TextAreaz = (props) => {
  const { id, label = '', value = '', rows = 6, errors = {}, register = () => {}, className = "", ...prop } = props;

  return (
    <div className={`p-2 w-full ${className}`}>
      <div className="flex flex-column gap-2">
      <span className="p-float-label w-full">
        <InputTextarea id={id} value={value} invalid={Boolean(errors[id])} rows={rows} {...register(id)} className="w-full" {...prop} />
        <label htmlFor={id}>{label}</label>
      </span>
      {errors[id] && <small className="w-full ml-2 text-red-600">{errors[id].message}</small>}
    </div>
    </div>
  );
};
