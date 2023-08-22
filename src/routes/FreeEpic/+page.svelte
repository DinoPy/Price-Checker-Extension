<script>
    import { onMount } from "svelte";
    import SimpleProductContainer from "./SimpleProdContainer/+page.svelte";
    import { PERMITED_HOSTS } from "../../lib/helpers/constants";

    $: data = [];
    const getGames = async () => {
        const response = await fetch(
            "http://localhost:3000/api/epicFreeGames",
            { method: "POST" }
        );
        const { data } = await response.json();
        const currentlyFree = data.Catalog.searchStore.elements.filter(
            (game) =>
                game.price.totalPrice.discountPrice === 0 &&
                game.price.totalPrice.originalPrice !== 0
        );
        return currentlyFree;
    };

    onMount(async () => (data = await getGames()));
</script>

<div>
{#if data}
    {#each data as game}
        <SimpleProductContainer savedData = {{title: game.title, src: game.keyImages[0].url,   }} host = {PERMITED_HOSTS[0]}   />
    {/each}
{/if}
</div>

<style>
    div {
        flex: 2;
        height: 300px;
        display: flex;
        flex-direction: column;
    }
</style>
