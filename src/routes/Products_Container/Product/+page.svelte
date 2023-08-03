<script>
	import { useMutation } from '@sveltestack/svelte-query';
	import axios from 'axios';
    import {fade} from 'svelte/transition';
    import {flip} from 'svelte/animate';
    import {links} from '../../../stores/products.js';

	export let prod;
	const mutation = useMutation((url) =>
		axios.post('http://localhost:3001/api/scraper/test', { url: url })
	);

	$mutation.mutate(prod);
    $: console.log($mutation);

    const remove = () => {
        links.update(links => links.filter(l => l !== prod));
    };

    $: console.log($links);
</script>

<div class="product-container" in:fade={{duration:300}} out:fade={{duration:1500}} animation:flip>
    {#if $mutation.isLoading}
            <div class="img-replacement loading" />
            <div>
                <div class="title-replacement loading" />
                <div class="price-replacement loading" />
                <div class="button-replacement loading" />
                <div class="button-replacement loading" />
            </div>
    {:else if $mutation.isError}
        <p>Error</p>
    {:else if $mutation.isSuccess}
            <img src={$mutation.data.data.data.src} alt={$mutation.data.data.data} />
            <div>
                <a href={$mutation.data.data.data.url}>
                    <h3>{$mutation.data.data.data.title}</h3>
                </a>
                <p>{$mutation.data.data.data.price}</p>
                <button on:click={remove}> Remove </button>
                <button on:click={$mutation.mutate(prod)}> Reset  </button>
            </div>
    {/if}
</div>

<style>
	.product-container {
		height: 100px;
		width: 90%;
		margin: 10px auto;
		padding: 0.6em;
		background-color: rgba(255, 68, 0, 0.216);
		border-radius: 1em;
		display: flex;
		gap: 1em;
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

    .img-replacement {
        height: 100%;
        aspect-ratio: 21/10;
        border-radius: 5%;
    }

    .title-replacement {
        height: 1.5em;
        width: 15em;
        margin-bottom: 5px;
    }
    .price-replacement {
        height: 1.4em;
        width: 5em;
        margin-bottom: 5px;
    }
    .button-replacement {
        height: 1.4em;
        width: 5em;
        display: inline-block;
    }
    .loading {
        background: #eee;
        background: linear-gradient(110deg, #ececec 8%, #f5f5f5 18%, #ececec 33%);
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
    }
    @keyframes shine {
      to {
        background-position-x: -200%;
      }
    }


</style>
