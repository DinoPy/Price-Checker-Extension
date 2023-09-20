<script>
    import Graph from "./Graph/+page.svelte";
    import { priceHistoryData } from "../../stores/products.js";
</script>

<div class="container">
    <Graph priceHistory={$priceHistoryData.priceHistoryData}/>
</div>

<style>

.container {
    position: absolute;
    z-index: 1;
    background-color: white;
    box-shadow: 0px 0px 4px 1px rgba(0,0,0,0.2);
}
</style>

