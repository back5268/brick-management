export const createFormData = (body = {}, formData) => {
  const data = new FormData();
  if (formData && typeof formData === 'object') {
    for (const key in formData) {
      if (key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((f) => {
            data.append(key, f);
          });
        } else data.append(key, formData[key]);
      }
    }
  }
  Object.keys(body).forEach((key) => {
    if (typeof body[key] === 'object') data.append(key, JSON.stringify(body[key]));
    else if (body[key] || body[key] === 0 || (body[key] === '' && key === "avatar")) data.append(key, body[key]);
  });
  return data;
};
export const convertData = (body = {}) => {
  Object.keys(body).forEach((key) => {
    if (!(body[key] || body[key] === 0)) {
      delete body[key];
    } else if (typeof body[key] === 'object') body[key] = JSON.stringify(body[key]);
  });
  return body;
};
