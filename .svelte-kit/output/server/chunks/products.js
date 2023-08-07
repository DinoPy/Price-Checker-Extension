import { w as writable } from "./index.js";
const error = writable({ duration: 3e3, message: "Url not compatible at this time", isError: false });
const dataFetcher = () => {
  let data2 = [];
  const isBrowser = typeof window !== "undefined";
  if (isBrowser) {
    data2 = JSON.parse(localStorage.getItem("urls"));
  }
  if (data2 && data2.length !== 0)
    return data2;
  else
    return [];
};
const data = dataFetcher();
const links = writable(data);
export {
  error as e,
  links as l
};
