export const REGEX = {
  C_NUMBER: /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/,
  C_PHONE: /^0[1-9]{1}[0-9]{8}$/,
  C_BIRTHDAY: /^[12]{1}[0-9]{3}-(0?[1-9]|1[0-2]{1})-(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})$/,
  C_DATE_TIME:
    /^[2]{1}[0]{1}[0-9]{2}-(0?[1-9]|1[0-2]{1})-(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/,
  C_EXCEL_DATE: /^(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-/]{1}(0?[1-9]|1[0-2]{1})[-/]{1}[12]{1}[0-9]{3}$/,
  SO_NGUYEN_DUONG: /^[1-9][\d]*$/,
  F_EXCEL: /^application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet$/,
  F_IMG: /^image\/png|image\/jpeg|image\/jpg|image\/gif$/,
  C_EMAIL: /^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  YOUTUBE_URL:
    /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  PASSWORD: /^(?=.*\d)(?=.*[a-zA-Z])/,
  TIME: /^([01]\d|2[0-3]):([0-5]\d)$/
};

export const IMAGE_TYPE = ['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml', 'image/webp', 'image/bmp'];
