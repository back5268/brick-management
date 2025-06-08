import { InputSwitch } from 'primereact/inputswitch';

export const Switchz = (props) => {
  const { label, ...prop } = props;

  return (
    <div>
      <h5>{label}</h5>
      <InputSwitch {...prop} />
    </div>
  );
};
