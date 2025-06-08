export const signInValid = {
  username: 'string',
  password: { type: 'string' }
};

export const sendOtpAuthValid = {
  username: 'string'
};

export const confirmPasswordValid = {
  username: 'string',
  otp: 'string',
  password: { type: 'string' }
};
