export const toHttpOrHttps = url => {
  if(url) return isHttpOrHttps(url) ? url : "https://" + url;
  return url;
};

const isHttpOrHttps = url => {
  return url.substr(0, 7) === "http://" || url.substr(0, 8) === "https://"
};
