export const toHttpOrHttps = url => {
  return isHttpOrHttps(url) ? url : "https://" + url;
};

const isHttpOrHttps = url => {
  return url.substr(0, 7) === "http://" || url.substr(0, 8) === "https://"
};
