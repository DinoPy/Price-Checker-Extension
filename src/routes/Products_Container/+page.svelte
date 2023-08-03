<script>
	import { products, links } from '../../stores/products';
	import Product from './Product/+page.svelte';
</script>

<div>
	<!-- {#each Object.keys($products) as itemName}
		<Product prod={{ ...$products[itemName] }} />
	{/each} -->

	{#each $links as link (link)}
		<Product prod={link} />
	{/each}
    <button on:click={links.set(Array.from($links))}> Reset All </button>
</div>
