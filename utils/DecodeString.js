export const decodeHTML = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
};

export const getUnsanitizedValue = (obj) => {
  if (obj == null) return obj;
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "string") newObj[key] = decodeHTML(obj[key]);
    else if (Array.isArray(obj[key])) {
      let arr = [];
      obj[key].forEach((item) => {
        if (typeof item === "object") arr.push(getUnsanitizedValue(item));
        else if (typeof item === "string") arr.push(decodeHTML(item));
      });
      newObj[key] = arr;
    } else if (typeof obj[key] === "object")
      newObj[key] = getUnsanitizedValue(obj[key]);
    else newObj[key] = obj[key];
  });
  return newObj;
};