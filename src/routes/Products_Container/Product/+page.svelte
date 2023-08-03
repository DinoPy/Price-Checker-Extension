<script>
	export let prod;
	import { useMutation } from '@sveltestack/svelte-query';
	import axios from 'axios';

	const mutation = useMutation((url) =>
		axios.post('http://localhost:3001/api/scraper/test', { url: url })
	);

	$mutation.mutate(prod);
	$: console.log($mutation.isSuccess);
</script>

{#if $mutation.isLoading}
	<p>Loading ...</p>
{:else if $mutation.isError}
	<p>Error</p>
{:else if $mutation.isSuccess}
	<div class="product-container">
		<img src={$mutation.data.data.data.src} alt={$mutation.data.data.data} />
		<div>
			<a href={$mutation.data.data.data.url}>
				<h3>{$mutation.data.data.data.title}</h3>
			</a>
			<p>{$mutation.data.data.data.price}</p>
		</div>
	</div>
{/if}

<style>
	.product-container {
		height: 100px;
		width: 90%;
		margin: 10px auto;
		padding: 0.6em;
		background-color: rgba(255, 68, 0, 0.216);
		border-radius: 1em;
		animation: show-up ease-in 200ms;
		display: flex;
		gap: 1em;
	}

	@keyframes show-up {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 100;
		}
	}
	h3,
	a {
		width: fit-content;
		display: inline-block;
	}

	img {
		height: 100%;
		border-radius: 5%;
	}
</style>
