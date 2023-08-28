<script>
    import axios from "axios";
    import { useMutation, useQueryClient } from "@sveltestack/svelte-query";
    import { PERMITED_HOSTS } from "../../lib/helpers/constants";
    import SkeletonLoader from "../Products_Container/Product/LoadingSkeleton/+page.svelte";
    import SimpleProductContainer from "./SimpleProdContainer/+page.svelte";

    const mutation = useMutation(
        () => axios.post("http://194.233.163.205:3000/api/epicFreeGames")
    );
    $mutation.mutate();
    $: console.log($mutation.data);
</script>

<div class="freeGamesContainer">
    {#if $mutation.isLoading}
        <SkeletonLoader />
    {:else if $mutation.isSuccess}
        {#each $mutation.data.data as game}
            <SimpleProductContainer
                savedData={{ title: game.title, src: game.keyImages[0].url }}
                host={PERMITED_HOSTS[0]}
            />
        {/each}
    {/if}
</div>

<style>
    .freeGamesContainer {
        flex: 2;
        display: flex;
        flex-direction: column;
        gap: 1em;
    }

    @media (max-width: 1000px) {
        .freeGamesContainer {
            flex-direction: row;
        }
    }
</style>
