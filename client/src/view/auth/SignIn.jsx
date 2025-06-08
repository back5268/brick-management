import { useForm } from 'react-hook-form';
import { AuthWrapper, InputPassword } from '@components/base';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { SigninValidation } from '@lib/validation';
import { signInApi } from '@api';
import { Buttonz, Inputz } from '@components/core';
import { useToastState, useUserState } from '@store';

export const SignIn = () => {
  const { mutateAsync, isPending } = usePostApi(signInApi);
  const { setLoadingz } = useUserState();
  const { showToast } = useToastState();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(SigninValidation)
  });
  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      localStorage.setItem('token', response);
      setTimeout(() => {
        showToast({ title: 'Đăng nhập thành công', severity: 'success' });
      }, 500)
      setLoadingz()
    }
  };

  return (
    <AuthWrapper headerLabel="Vui lòng đăng nhập để tiếp tục" footerLabel="Quên mật khẩu" footerHref="/auth/forgot-password">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-6">
        <Inputz id="username" label="Tài khoản (*)" value={watch('username')} register={register} errors={errors} />
        <InputPassword id="password" label="Mật khẩu (*)" value={watch('password')} register={register} errors={errors} />
        <Buttonz type="submit" loading={isPending} label="Đăng nhập" />
      </form>
    </AuthWrapper>
  );
};
