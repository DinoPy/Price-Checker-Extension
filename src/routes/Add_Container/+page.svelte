<script>
	import { links } from '../../stores/products';
    import {parseUrl, checkURLEligibility, isDuplicate} from '../../lib/helpers/utility_functions.js';

	let URL = '';
	let addInput;

	const handleSubmit = () => {
		const urlObj = parseUrl(URL, addInput);
		if (!urlObj) return;
		const isURLEligible = checkURLEligibility(urlObj, addInput);
		if (!isURLEligible) return;
        if (isDuplicate(URL, addInput, $links)) return;
		links.update((links) => [...links, URL]);
        localStorage.setItem('urls', JSON.stringify($links));
        URL = '';
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
		justify-items: center;
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
