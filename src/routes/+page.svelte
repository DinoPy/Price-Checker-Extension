<script>
	import AddContainer from './Add_Container/+page.svelte';
	import ProductContainer from './Products_Container/+page.svelte';
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';

	const queryClient = new QueryClient();
</script>

<QueryClientProvider client={queryClient}>
	<div class="main_container">
		<AddContainer />
		<ProductContainer />
	</div>
</QueryClientProvider>

<style>
	.main_container {
		padding: 0 2em 2em;
		position: relative;
	}
</style>
