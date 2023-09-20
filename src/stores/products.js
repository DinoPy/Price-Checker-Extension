import { writable } from 'svelte/store';

const dataFetcher = () => {
    let data = [];
    const isBrowser = typeof window !== 'undefined';
    if(isBrowser) {
        data =  JSON.parse(localStorage.getItem('urls'));
    }
    if (data && data.length !== 0) return data;
    else return [];
}
const data =  dataFetcher();

export const links = writable(data);
export const products = writable({});
export const error = writable({duration: 3000, message: "Url not compatible at this time", isError:false});
export const priceHistoryData = writable({toggled: false, priceHistoryData: []});
