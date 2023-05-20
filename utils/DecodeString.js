export const decodeHTML = (html) => {
  var txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

export const getUnsanitizedValue = (obj) => {
  let newObj = {};
  Object.keys(obj).forEach((key) => {
    if(typeof obj[key] === 'string')
    newObj[key] = decodeHTML(obj[key]);
    else
    newObj[key] = obj[key];
  });
  return newObj;
};