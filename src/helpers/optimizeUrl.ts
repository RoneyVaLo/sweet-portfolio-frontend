export function optimizeUrl(url: string) {
  return url.replace("/upload/", "/upload/f_auto,q_auto/");
}
