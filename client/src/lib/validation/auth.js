import * as yup from 'yup';

export const SigninValidation = yup.object({
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required()
});

export const ForgotPasswordValidation = yup.object({
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  otp: yup.string().min(6, 'Mã otp cần dài ít nhất 6 ký tự!').required(),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required()
});

export const ChangePasswordValidation = yup.object({
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required(),
  newPassword: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required()
});

export const ConfirmPasswordValidation = yup.object({
  username: yup.string().required('Tài khoản không được bỏ trống!'),
  token: yup.string().min(6, 'Mã xác nhận cần dài ít nhất 6 ký tự!').required(),
  password: yup
    .string()
    .min(6, 'Mật khẩu cần dài ít nhất 6 ký tự!')
    .required()
});
