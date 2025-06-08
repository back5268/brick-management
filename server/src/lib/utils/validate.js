import Joi from 'joi';
import { VALIDATE_TYPE } from '@constant';

export const validNumberInt = (value) => {
  if (value && Number.isInteger(Number(value))) {
    return true;
  }
  return false;
};

export const validMinLength = (value, condition) => {
  if (value.length >= condition) {
    return true;
  }
  return false;
};

export const validMaxLength = (value, condition) => {
  if (value.length <= condition) {
    return true;
  }
  return false;
};

export const validRegex = (regex, value) => {
  return regex.test(value);
};

export const validCMT = (value) => {
  return validRegex(/^[\d]{9,12}$/, value);
};

export const validBirthday = (value) => {
  return validRegex(/^[12]{1}[0-9]{3}-(0?[1-9]|1[0-2]{1})-(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})$/, value);
};

export const validExcel = (value) => {
  return validRegex(/^(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-/]{1}(0?[1-9]|1[0-2]{1})[-/]{1}[12]{1}[0-9]{3}$/, value);
};

export const validTime = (value) => {
  return validRegex(
    /^[2]{1}[0]{1}[0-9]{2}-(0?[1-9]|1[0-2]{1})-(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/,
    value
  );
};

export const validEmail = (value) => {
  return validRegex(/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g, value);
};

export const validNumber = (value) => {
  return validRegex(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/, value);
};

export const validPercent = (value) => {
  return Number(value) <= 100 && Number(value) >= 0 && validNumber(value);
};

export const validPhoneNumber = (value) => {
  return validRegex(/^0[1-9]{1}[0-9]{8}$/, value);
};

export const validPhone = (phone) => {
  if (phone.search(/([0]{1})([0-9]{9}){1}$/g) === -1) {
    return false;
  }
  return true;
};

export const validateExcel = (value) => {
  return validRegex(/^(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-/]{1}(0?[1-9]|1[0-2]{1})[-/]{1}[12]{1}[0-9]{3}$/, value);
};

/**
 *
 * @param file {{mimetype : String}}
 * @param mimetype
 * @param start {string}
 */
export const validTypeFile = (file, mimetype, start) => {
  if (mimetype) {
    if (file.mimetype === mimetype) return true;
  } else if (start)
    if (file.mimetype.startsWith(start)) {
      return true;
    }
  return false;
};

export const validVideo = (files, mimetype) => {
  for (let i = 0; i < files.length; i++) {
    if (validTypeFile(files[i], mimetype, TYPE_FILE.VIDEO)) return true;
  }
  return false;
};

export const validImg = (files) => {
  for (let i = 0; i < files.length; i++) {
    if (validTypeFile(files[i], false, TYPE_FILE.IMG)) return true;
  }
  return false;
};

export const checkLastDate = (date = new Date()) => {
  const day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return day === date.getDate();
};

export const validateData = (options = {}, data = {}) => {
  const object = {};
  const getTypeValidate = (type) => {
    switch (type) {
      case VALIDATE_TYPE.EMAIL:
        return Joi.string().email();
      case VALIDATE_TYPE.PHONE:
        return Joi.string()
          .pattern(/^[0-9]+$/)
          .length(10);
      case VALIDATE_TYPE.NUMBER:
        return Joi.number();
      case VALIDATE_TYPE.JSON:
        return Joi.string()
          .custom((value, helpers) => {
            try {
              return JSON.parse(value);
            } catch (err) {
              return helpers.error('any.custom', 'Invalid JSON format');
            }
          })
          .message('Invalid JSON format for preferences');
      case VALIDATE_TYPE.BOOLEAN:
        return Joi.boolean();
      case VALIDATE_TYPE.DATE:
        return Joi.date();
      case VALIDATE_TYPE.STRING:
        return Joi.string();
      default:
        return Joi.string();
    }
  };

  for (const key in options) {
    if (Object.hasOwnProperty.call(options, key)) {
      let valid;
      if (typeof options[key] === 'object') {
        valid = getTypeValidate(options[key].type);
        if (options[key].min) valid = valid.min(options[key].min);
        if (options[key].max) valid = valid.max(options[key].max);
        if (options[key].pattern) valid = valid.pattern(options[key].pattern);
        if (!options[key].allowNull) valid = valid.required();
        else if (options[key].type === 'string') valid = valid.allow('');
      } else if (typeof options[key] === 'string') {
        valid = getTypeValidate(options[key]).required();
      }
      object[key] = valid;
    }
  }

  const schema = Joi.object(object);
  const { error, value } = schema.validate(data);
  return { error: error?.details[0]?.message, value };
};
