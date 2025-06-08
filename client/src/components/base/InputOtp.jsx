import { Buttonz, Inputz } from '@components/core';
import { usePostApi } from '@lib/react-query';
import { useToastState } from '@store';
import React from 'react';

export const InputOtp = (props) => {
  const { isSend, setIsSend, SendOtpApi, username, ...prop } = props;
  const { mutateAsync, isPending } = usePostApi(SendOtpApi);
  const { showToast } = useToastState();

  const onSendOtp = async () => {
    if (!username) return showToast({ title: `Vui lòng nhập tài khoản!`, severity: 'error' });
    const response = await mutateAsync({ username });
    if (response) {
      showToast({ title: `Đã gửi mã OTP đến email ${response}`, severity: 'success' });
      setIsSend(true);
    }
  };

  return (
    <div className="flex gap-4 items-start justify-between w-full">
      <Inputz label="Mã OTP (*)" {...prop} />
      <Buttonz onClick={onSendOtp} loading={isPending} className="mt-1 text-center min-w-[100px]" label="Gửi OTP" />
    </div>
  );
};
