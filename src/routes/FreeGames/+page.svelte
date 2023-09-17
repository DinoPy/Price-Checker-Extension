<script>
    import axios from "axios";
    import { useMutation } from "@sveltestack/svelte-query";
    import { PERMITED_HOSTS } from "../../lib/helpers/constants";
    import SimpleProductContainer from "./SimpleProdContainer/+page.svelte";

    const epicGames = useMutation(
        () => axios.post("http://194.233.163.205:3000/api/epicFreeGames")
    );
    $epicGames.mutate();
    const steamGames = useMutation(
        () => axios.post("http://localhost:3000/api/steamSpecialOffer")
    );
    $steamGames.mutate();
    $: console.log($steamGames.data?.data);
</script>

<div class="freeGamesContainer">
    {#if $epicGames.isSuccess}
        {#each $epicGames.data.data as game}
            <SimpleProductContainer
                data={{ title: game.title, src: game.keyImages[0].url }}
                host={PERMITED_HOSTS[0]}
            />
        {/each}
    {/if}
    {#if $steamGames.isSuccess}
        {#each $steamGames.data.data as game}
            <SimpleProductContainer
                data={{ title: game.title, href:game.href }}
                host={PERMITED_HOSTS[1]}
            />
        {/each}
    {/if}
</div>

<style>
    .freeGamesContainer {
        background-color: var(--secondary);
        width:100%;
        box-shadow: 5px 0 10px 1px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        flex-wrap: wrap;
}
</style>
