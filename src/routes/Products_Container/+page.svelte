<script>
	import { products, links } from '../../stores/products';
	import Product from './Product/+page.svelte';
    import PopUp from '../PopUp/+page.svelte';
    import { flip } from 'svelte/animate';
	import { send, receive } from '../../lib/helpers/transitions.js';
</script>

<div class="container">
    {#each $links as link,i (link)}
        <div
        in:receive={{ key: link }}
        out:send={{ key: link }}
        animate:flip={{ duration: 3000 }}
        >
            <Product prod={link} />
        </div>
    {/each}

    <!-- <button on:click={links.set(Array.from($links))}> Reset All </button> -->
</div>

<style>
    .container {
        display:grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 1em;
    }
    @media (max-width: 1800px) {
        .container {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media (max-width: 1200px) {
        .container {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media (max-width: 600px) {
        .container {
            grid-template-columns: 1fr;
        }
    }
</style>
