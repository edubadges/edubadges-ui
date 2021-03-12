export const toHttpOrHttps = url => url ? (isHttpOrHttps(url) ? url : "https://" + url) : url;

const isHttpOrHttps = url => url && (url.startsWith("http://") || url.startsWith("https://"));
