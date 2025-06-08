import { useForm } from 'react-hook-form';
import { AuthWrapper, InputOtp, InputPassword } from '@components/base';
import { yupResolver } from '@hookform/resolvers/yup';
import { usePostApi } from '@lib/react-query';
import { ForgotPasswordValidation } from '@lib/validation';
import { confirmPasswordApi, sendOtpForgotPasswordApi } from '@api';
import { Buttonz, Inputz } from '@components/core';
import { useState } from 'react';
import { useToastState } from '@store';
import { useNavigate } from 'react-router-dom';

export const ForgotPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToastState();
  const { mutateAsync, isPending } = usePostApi(confirmPasswordApi);
  const [isSend, setIsSend] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    resolver: yupResolver(ForgotPasswordValidation)
  });
  const onSubmit = async (data) => {
    const response = await mutateAsync(data);
    if (response) {
      showToast({ title: 'Đổi mật khẩu thành công', severity: 'success' });
      navigate('/auth/sign-in');
    }
  };

  return (
    <AuthWrapper headerLabel="Quên mật khẩu" footerLabel="Quay trở lại đăng nhập" footerHref="/auth/sign-in">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-6">
        <Inputz id="username" label="Tài khoản (*)" value={watch('username')} register={register} errors={errors} />
        <InputOtp
          id="otp"
          value={watch('otp')}
          username={watch('username')}
          register={register}
          errors={errors}
          isSend={isSend}
          setIsSend={setIsSend}
          SendOtpApi={sendOtpForgotPasswordApi}
        />
        {isSend && <InputPassword id="password" label="Mật khẩu (*)" value={watch('password')} register={register} errors={errors} />}
        <Buttonz type="submit" loading={isPending} disabled={!isSend} label="Xác nhận" />
      </form>
    </AuthWrapper>
  );
};
