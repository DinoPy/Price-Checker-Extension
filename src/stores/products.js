import { writable } from 'svelte/store';

export const products = writable({});
export const links = writable([
	'https://store.steampowered.com/app/1293830/Forza_Horizon_4/',
	'https://store.steampowered.com/app/1465360/SnowRunner/',
	'https://store.steampowered.com/app/1551360/Forza_Horizon_5/',
	'https://store.steampowered.com/app/858820/Tribes_of_Midgard/',
	'https://store.steampowered.com/app/678960/CODE_VEIN?snr=1_614_615_demonsunleashed_100703',
	'https://store.steampowered.com/app/228280/Baldurs_Gate_Enhanced_Edition?snr=1_614_615_demonsunleashed_100703',
	'https://store.steampowered.com/app/2218750/Halls_of_Torment?snr=1_614_615_demonsunleashed_100703',
]);
