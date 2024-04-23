export const toHttpOrHttps = url => url ? (isHttpOrHttps(url) ? url : "https://" + url) : url;

export const validUrlRegExp = /(https?):\/\/(.+)\.(.+)/i;

const isHttpOrHttps = url => url && (url.startsWith("http://") || url.startsWith("https://"));
