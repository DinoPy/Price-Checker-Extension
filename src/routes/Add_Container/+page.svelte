<script>
	import { useMutation } from '@sveltestack/svelte-query';
	import axios from 'axios';
	import PopUp from '../PopUp/+page.svelte';
	import { products, links } from '../../stores/products';

	let URL = '';
	const PERMITED_HOSTS = [
		'store.epicgames',
		'steam',
		'pcgarage',
		'evomag',
		'emag',
	];
	let addInput;

	const mutation = useMutation(
		(URL) => axios.post('http://localhost:3000/api/scraper', { url: URL }),
		{
			onSuccess: (data) => {
				const response = data.data.data;
				products.set({ ...$products, [response.title]: { ...response } });
			},
		}
	);
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
			if (urlObj.host.includes(PERMITED_HOSTS[i])) {
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
		if ($links.includes(URL)) {
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

<div>
	{#if $mutation.isLoading}
		<PopUp message={'Loading...'} />
	{:else if $mutation.isError}
		<PopUp message={$mutation.error.message} />
	{/if}
</div>

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
