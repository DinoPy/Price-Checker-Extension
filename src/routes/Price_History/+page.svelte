<script>
    import Graph from "./Graph/+page.svelte";
    import { priceHistoryData } from "../../stores/products.js";
</script>

<div class="overlay">
    <div class="container">
        <button
            on:click={() =>
                priceHistoryData.update(() => ({
                    toggled: false,
                    priceHistoryData: [],
                }))}
        >
            <img class="store-icon" src="images/close.svg" alt="Close" />
        </button>
        <Graph priceHistory={$priceHistoryData.priceHistoryData} />
    </div>
</div>

<style>
    .overlay {
        position: absolute;
        height: 100%;
        width: 100%;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.25);
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .container {
        box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
        background-color: white;
    }

    button {
        all: unset;
        cursor: pointer;
        position: relative;
        left: 96%;
        top: 5%;
    }
</style>
