<script>
    import { links, error } from "../../stores/products";
    import Product from "./Product/+page.svelte";
    import PopUp from "../PopUp/+page.svelte";
    import FreeEpicGames from "../FreeEpic/+page.svelte";
    import { flip } from "svelte/animate";
    import { send, receive } from "../../lib/helpers/transitions.js";
</script>

<div class="mainContainer">
    <div class="productsContainer">
        {#each $links as link, i (link)}
            <div
                in:receive={{ key: link }}
                out:send={{ key: link }}
                animate:flip={{ duration: 1000 }}
            >
                <Product prod={link} />
            </div>
        {/each}

        {#if $error.isError}
            <PopUp message={$error.message} timeout={$error.duration} />
        {/if}
        <!-- <button on:click={links.set(Array.from($links))}> Reset All </button> -->
    </div>
    <FreeEpicGames />
</div>

<style>
    .mainContainer {
        display: flex;
        gap: 1em;
        flex-wrap: wrap;
    }
    @media (max-width:1000px) {
        .mainContainer {
            flex-direction: column;
        }
        .productsContainer {
            order: 2;
        }
    }
    .productsContainer {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 1em;
        flex: 8;
        flex-wrap: wrap;
    }
    @media (max-width: 2100px) {
        .productsContainer {
            grid-template-columns: 1fr 1fr 1fr;
        }
    }
    @media (max-width: 1400px) {
        .productsContainer {
            grid-template-columns: 1fr 1fr;
        }
    }
    @media (max-width: 700px) {
        .productsContainer {
            grid-template-columns: 1fr;
        }
    }
</style>
