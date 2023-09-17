<script>
    export let data;
    export let host;
    let url = new URL("https://store.epicgames.com/en-US/browse?");
    url.search = "q=" + data.title;
</script>

<div class="product-container">
    {#if host.name !== "Steam"}
        <img class="gameImg" src={data.src} alt={host.name} />
    {/if}
    <a href={host.name === "Steam" ? data.href : url.href} target="_blank">
        <h2>{data.title}</h2>
    </a>
        <img class="store-icon" src={host.icon} alt={host.name} />
</div>

<style>
.product-container {
    display:flex;
    align-items: center;
    height: 100%;
    width: fit-content;
    padding: 2px 1em;
}
a {
    font-family: var(--text-secondary);
    font-size: .6em;
    font-weight: 500;
    white-space: nowrap;
}
.gameImg {
    height: 30px;
    border-radius: 10%;
    margin-right: .3em;
}
.store-icon {
    height: 15px;
    margin-left: .3em;
}
</style>
