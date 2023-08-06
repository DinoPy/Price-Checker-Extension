import { writable } from 'svelte/store';

export const products = writable({});
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
