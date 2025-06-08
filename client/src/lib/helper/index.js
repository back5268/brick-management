import moment from 'moment';

export const roundNumber = (value) => {
  if (!Number(value)) return 0
  return Math.round(value * 100) / 100;
};

export const removeUndefinedProps = (obj) => {
  for (let prop in obj) {
    if (!(obj[prop] || obj[prop] === '' || obj[prop] === 0)) {
      delete obj[prop];
    }
  }
  return obj;
};

export const refreshObject = (object) => {
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      if (Array.isArray(object[key])) object[key] = [];
      else if (typeof object[key] === 'object') object[key] = {};
      else object[key] = '';
    }
  }
  return object;
};

export const checkEqualProp = (object1, object2) => {
  const newObject = {};
  for (const key in object1) {
    if (JSON.stringify(object1[key]) !== JSON.stringify(object2[key])) {
      if (object1[key] || object1[key] === '' || object1[key] === 0) newObject[key] = object1[key];
    }
  }
  return newObject;
};

export const handleFiles = (item, params, files, field) => {
  if (files?.length > 0) {
    if (JSON.stringify(files) !== JSON.stringify(item?.[field])) {
      const newfiles = [];
      const formData = [];
      files.forEach((f) => {
        if (item?.[field]?.some((i) => JSON.stringify(i) === JSON.stringify(f))) newfiles.push(f);
        else formData.push(f);
      });
      if (newfiles.length > 0) params[field] = newfiles;
      if (formData.length > 0) {
        if (params.formData) params.formData[field] = formData;
        else {
          params.formData = {};
          params.formData[field] = formData;
        }
      }
    } else params[field] = undefined;
  } else if (item?.[field]?.length > 0) params.files = [];
  return params;
};

export const convertFileToUrl = (file) => URL.createObjectURL(file);

export const formatNumber = (amount, round) => {
  if (amount) return new Intl.NumberFormat('en-US').format(round ? Math.round(amount) : amount);
  else return 0;
};

export const removeSpecialCharacter = (string) => {
  if (string) {
    string = string.toLowerCase();
    string = string.replace(/["',]/g, '');
    string = string.replace(/[\/]/g, '-');
    const normalizedString = string.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    const replacedString = normalizedString.replace(/đ/g, 'd').replace(/Đ/g, 'D');
    const resultString = replacedString.replace(/\s+/g, '-');
    return resultString;
  }
};

export const formatDateString = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };

  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('en-US', options);

  const time = date.toLocaleTimeString([], {
    hour: 'numeric',
    minute: '2-digit'
  });

  return `${formattedDate} at ${time}`;
};

export const formatMinuteStringV1 = (minute) => {
  minute = minute % 60;
  return `${minute < 10 ? `0${minute}` : minute}:00`;
};

export const formatMinuteStringV2 = (minute) => {
  const hour = Math.floor(minute / 60);
  minute = minute % 60;
  return `${hour ? `${hour} giờ` : ''} ${minute} phút`;
};

export const multiFormatDateString = (timestamp = '') => {
  const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
  const date = new Date(timestampNum * 1000);
  const now = new Date();

  const diff = now.getTime() - date.getTime();
  const diffInSeconds = diff / 1000;
  const diffInMinutes = diffInSeconds / 60;
  const diffInHours = diffInMinutes / 60;
  const diffInDays = diffInHours / 24;

  switch (true) {
    case Math.floor(diffInDays) >= 30:
      return formatDateString(timestamp);
    case Math.floor(diffInDays) === 1:
      return `${Math.floor(diffInDays)} ngày trước`;
    case Math.floor(diffInDays) > 1 && diffInDays < 30:
      return `${Math.floor(diffInDays)} ngày trước`;
    case Math.floor(diffInHours) >= 1:
      return `${Math.floor(diffInHours)} giờ trước`;
    case Math.floor(diffInMinutes) >= 1:
      return `${Math.floor(diffInMinutes)} phút trước`;
    default:
      return 'vừa xong';
  }
};

export const databaseDate = (date, type = 'datetime', isFinal) => {
  if (!date) return ''
  let format = type === 'time' ? 'HH:mm:ss' : type === 'timez' ? 'HH:mm' : type === 'date' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss';
  if (isFinal) return moment(date.setHours(23, 59, 59)).format('YYYY-MM-DD HH:mm:ss');
  return moment(date).format(format);
};

export const formatDate = (date, type = 'datetime', isFinal) => {
  if (!date) return ''
  if (!Date.parse(date)) return date;
  let format = type === 'time' ? 'HH:mm:ss' : type === 'timez' ? 'HH:mm' : type === 'date' ? 'DD/MM/YYYY' : 'DD/MM/YYYY HH:mm:ss';
  if (isFinal) return moment(date.setHours(23, 59, 59)).format('DD/MM/YYYY HH:mm:ss');
  return moment(date).format(format);
};

export const convertNumberToTime = (number) => {
  if (number === 0) return '00:00';
  if (!number) return '-';
  let hours = Math.floor(number);
  let minutes = Math.round((number - hours) * 60);
  if (hours < 10) hours = `0${hours}`;
  if (minutes < 10) minutes = `0${minutes}`;
  return `${hours}:${minutes}`;
};

export const getDates = (fromDate, toDate) => {
  toDate = toDate ? toDate : fromDate;
  let start = moment(fromDate);
  const end = moment(toDate);
  const dateTimeArray = [];
  while (start <= end) {
    dateTimeArray.push(start.format('YYYY-MM-DD'));
    start = start.clone().add(1, 'days');
  }
  return dateTimeArray;
};

export const convertNumberToString = (amount) => {
  const ones = ['', 'một', 'hai', 'ba', 'bốn', 'năm', 'sáu', 'bảy', 'tám', 'chín'];
  const tens = ['', 'mười', 'hai mươi', 'ba mươi', 'bốn mươi', 'năm mươi', 'sáu mươi', 'bảy mươi', 'tám mươi', 'chín mươi'];
  const thousands = ['', 'nghìn', 'triệu', 'tỷ', 'nghìn tỷ', 'triệu tỷ'];
  let words = '';
  let i = 0;
  let numStr = String(amount);
  let numThousands = Math.ceil(numStr.length / 3);
  if (amount > 0) {
    while (i < numThousands) {
      let part = numStr.slice(-3);
      numStr = numStr.slice(0, -3);
      let partWords = '';
      let partNum = parseInt(part);
      if (partNum !== 0) {
        let hundredsDigit = Math.floor(partNum / 100);
        let tensDigit = Math.floor((partNum % 100) / 10);
        let onesDigit = partNum % 10;
        if (hundredsDigit !== 0) {
          partWords += ones[hundredsDigit] + ' trăm ';
        }
        if (tensDigit === 0 && onesDigit !== 0) {
          partWords += ones[onesDigit];
        } else if (tensDigit === 1 && onesDigit !== 0) {
          partWords += 'mười ' + ones[onesDigit];
        } else if (tensDigit === 1 && onesDigit === 0) {
          partWords += 'mười ';
        } else if (tensDigit > 1 && onesDigit === 0) {
          partWords += tens[tensDigit];
        } else if (tensDigit > 1 && onesDigit !== 0) {
          partWords += tens[tensDigit] + ' ' + ones[onesDigit];
        } else if (hundredsDigit === 0 && tensDigit === 0 && onesDigit === 0 && i === 0) {
          partWords += 'không';
        }
      }
      if (partWords !== '') {
        partWords += ' ' + thousands[i];
      }
      words = partWords + ' ' + words;
      i++;
    }
    words = words.charAt(0).toUpperCase() + words.slice(1);
    words = words.trim();
  }
  if (amount === 0) {
    words = 'Không';
  }
  if (amount < 0) {
    words = convertNumberToString(Math.abs(amount));
    words = 'Âm ' + words;
  }
  return words + ' đồng.';
};
