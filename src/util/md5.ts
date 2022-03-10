import _md5 from "md5";

export const md5 = _md5;

export const getMd5FromArray = (arr: Array<string | number>) =>
  _md5(arr.join(","));
