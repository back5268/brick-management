import { Buttonz, Cardz, Dialogz, ProgressSpinnerz } from '@components/core';
import { usePostApi } from '@lib/react-query';
import { useToastState } from '@store';
import { useNavigate } from 'react-router-dom';

const Wrapper = ({ isModal, children, title, open, setOpen }) => {
  if (isModal)
    return (
      <Dialogz className="w-[1200px]" header={title} open={open} setOpen={setOpen}>
        <div className="border-t border-border">{children}</div>
      </Dialogz>
    );
  else
    return (
      <Cardz>
        <h2 className="font-bold uppercase leading-normal mb-2 p-2 text-primary">{title}</h2>
        <hr />
        {children}
      </Cardz>
    );
};

export const FormDetail = (props) => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const {
    type = 'modal',
    title,
    children,
    open,
    setOpen = () => {},
    isUpdate,
    createApi,
    updateApi,
    handleData = () => {},
    handleSubmit = () => {},
    setParams = () => {},
    onSuccess = () => {}
  } = props;
  const isModal = type === 'modal';
  const { mutateAsync, isPending } = usePostApi(isUpdate ? updateApi : createApi);
  const newTitle = `${isUpdate ? (updateApi ? 'Cập nhật' : 'Chi tiết') : 'Thêm mới'} ${title && String(title).toLocaleLowerCase()}`;

  const onSubmit = async (e) => {
    const data = handleData(e);
    if (typeof data === 'string') {
      showToast({ title: data, severity: 'error' });
      return;
    }
    const response = await mutateAsync(data);
    if (response) {
      onSuccess();
      showToast({ title: `${newTitle} thành công!`, severity: 'success' });
      if (isModal) {
        setOpen(false);
        setParams((pre) => ({ ...pre, render: !pre.render }));
      } else navigate(-1);
    }
  };

  return (
    <Wrapper title={newTitle} isModal={isModal} open={open} setOpen={setOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={`w-full ${isModal ? 'overflow-scroll' : ''}`}>
          <div className="relative w-full mt-4">
            {isPending && (
              <div className="absolute w-full h-full bg-black opacity-30 z-10 flex justify-center items-center">
                <ProgressSpinnerz style={{ width: '50px', height: '50px' }} strokeWidth="4" animationDuration="1s" />
              </div>
            )}
            {children}
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex gap-4 justify-end">
          <Buttonz
            outlined
            color="red"
            label={isModal ? 'Hủy' : 'Trở lại'}
            onClick={() => {
              if (isModal) setOpen(false);
              else navigate(-1);
            }}
          />
          {((isUpdate && updateApi) || (!isUpdate && createApi)) && <Buttonz loading={isPending} type="submit" label="Xác nhận" />}
        </div>
      </form>
    </Wrapper>
  );
};
