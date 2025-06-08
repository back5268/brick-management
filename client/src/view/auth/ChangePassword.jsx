import { useForm } from 'react-hook-form';
import { AuthWrapper, InputPassword } from '@components/base';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { ChangePasswordValidation } from '@lib/validation';
import { changePasswordApi } from '@api';
import { Buttonz } from '@components/core';
import { useToastState, useUserState } from '@store';

export const ChangePassword = () => {
  const { showToast } = useToastState();
  const { mutateAsync, isPending } = usePostApi(changePasswordApi);
  const { clearUserInfo, setLoadingz } = useUserState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(ChangePasswordValidation)
  });
  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      clearUserInfo();
      localStorage.removeItem('token');
      showToast({ title: 'Đổi mật khẩu thành công vui lòng đăng nhập lại', severity: 'success' });
      setLoadingz();
    }
  };

  return (
    <AuthWrapper headerLabel="Đổi mật khẩu" footerLabel="Trở lại" footerHref="/">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-6">
        <InputPassword id="password" label="Mật khẩu (*)" value={watch('password')} register={register} errors={errors} />
        <InputPassword id="newPassword" label="Mật khẩu mới (*)" value={watch('newPassword')} register={register} errors={errors} />
        <Buttonz type="submit" loading={isPending} label="Xác nhận" />
      </form>
    </AuthWrapper>
  );
};
