<script>
	import AddContainer from './Add_Container/+page.svelte';
	import ProductContainer from './Products_Container/+page.svelte';
    import Header from './Header/+page.svelte';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
   <Header />
	<div class="mainContainer">
		<AddContainer />
		<ProductContainer />
	</div>
</QueryClientProvider>

<style>
	.mainContainer {
        margin-top: 2em;
		padding: 0 2em 2em;
		position: relative;
	}
</style>
