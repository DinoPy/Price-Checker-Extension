<script>
	import Header from './Header/+page.svelte';
</script>

<Header />
<slot />

<style>
	:global(*) {
		margin: 0;
		box-sizing: border-box;
		transition: all ease-in 200ms;
	}
</style>
