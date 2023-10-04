<script>
    import Graph from "./Graph/+page.svelte";
    import { priceHistoryData } from "../../stores/products.js";
</script>

<div class="overlay">
    <div class="overlay__content">
        <div class="container">
            <button
                on:click={() => {
                    priceHistoryData.update(() => ({
                        toggled: false,
                        priceHistoryData: [],
                    }));
                }}
            >
                <img class="store-icon" src="images/close.svg" alt="Close" />
            </button>
            <Graph priceHistory={$priceHistoryData.priceHistoryData} />
        </div>
    </div>
</div>

<style>
    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(
            0,
            0,
            0,
            0.5
        );
        z-index: 1000;
    }
    .overlay__content {
        position: absolute;
        height: 100%;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 1em;
    }
    .container {
        box-shadow: 0px 0px 4px 1px rgba(0, 0, 0, 0.2);
        background-color: white;
        width: min(600px, 100%);
    }
    button {
        all: unset;
        cursor: pointer;
        position: relative;
        left: 95%;
        top: 5%;
    }
</style>
