<script>
	import axios from 'axios';
	import PopUp from '../PopUp/+page.svelte';
	import { products, links } from '../../stores/products';
    import {PERMITED_HOSTS} from '../../lib/helpers/contants.js';

	let URL = '';
	let addInput;

	const parseUrl = (URL) => {
		try {
			return new window.URL(URL);
		} catch {
			addInput.setCustomValidity('Invalid URL');
			addInput.reportValidity();
			return null;
		}
	};

	const checkURLEligibility = (urlObj) => {
		let isURLEligible = false;
		for (let i = 0; i < PERMITED_HOSTS.length; i++) {
			if (urlObj.host = PERMITED_HOSTS[i].host) {
				isURLEligible = true;
			}
		}
		if (!isURLEligible) {
			addInput.setCustomValidity(
				'Accepted links: EpicGames, Steam, PcGarage, Evomag, Emag. Only the product page link works!'
			);
			addInput.reportValidity();
		}
		return isURLEligible;
	};

	const isDuplicate = (URL) => {
        // loop over the list and check if each string includes the new url
		if ($links.includes(URL.trim())) {
			addInput.setCustomValidity('Duplicate URL');
			addInput.reportValidity();
            return true;
        }
        else return false;
	};

	const handleSubmit = () => {
		const urlObj = parseUrl(URL);
		if (!urlObj) return;
		const isURLEligible = checkURLEligibility(urlObj);
		if (!isURLEligible) return;
        if (isDuplicate(URL)) return;
		links.update((links) => [...links, URL]);
        localStorage.setItem('urls', JSON.stringify($links));
	};
	const handleChange = () => {
		addInput.setCustomValidity('');
		addInput.reportValidity();
	};
</script>

<form on:submit|preventDefault={handleSubmit} class="add_container">
	<div class="input_container">
		<input
			on:change={handleChange}
			bind:value={URL}
			bind:this={addInput}
			placeholder="URL here"
			class="url_add_input"
		/>
	</div>
	<button class="url_add_button"> Add </button>
</form>

<style>
	.add_container {
		display: flex;
		align-items: center;
		justify-self: center;
        margin-bottom: 1em;
	}
	.input_container {
		align-self: stretch;
		flex-grow: 1;
		flex-shrink: 1;
		margin-right: 0.3em;
	}
	.url_add_input {
		width: 100%;
		height: 100%;
		padding: 0.5em 1em;
		color: #252525;
		border: 2px solid var(--accent);
		border-radius: 0.5em;
	}
	.url_add_button {
		padding: 0.2em 1.5em;
		background-color: var(--accent);
		border: none;
		border-radius: 0.2rem;
		font-weight: 700;
		font-size: 1.6rem;
		cursor: pointer;
	}
	.url_add_button:active {
		transform: scale(0.95);
	}
</style>
