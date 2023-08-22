<script>
    export let savedData;
    export let host;
    let url = new URL("https://store.epicgames.com/en-US/browse?");
    url.search = "q=" + savedData.title;
</script>

<div class="product-container">
    <img class="preview-img" src={savedData.src} alt={savedData.title} />
    <div class="right-container">
        <a href={url.href} target="_blank">
            <h2>{savedData.title}</h2>
        </a>
        <div class="buttons-box">
            <button on:click={() => remove()} class="icon-btn">
                <img class="icon" src="images/delete.svg" alt="Remove" />
            </button>
        </div>
        <div class="icons">
            <img class="store-icon" src={host.icon} alt={host.name} />
        </div>
    </div>
</div>

<style>
    .product-container {
        min-height: fit-content;
        height: 100%;
        width: 100%;
        padding: 1em 1em 0.5em;
        background-color: var(--secondary);
        border-radius: 1em;
        display: flex;
        gap: 1em;
        position: relative;
        font-size: clamp(1em, 0.5rem + 1vw, 2em);
    }
    .right-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    a {
        width: 100%;
        text-decoration: none;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .preview-img {
        width: 50%;
        height: fit-content;
        object-fit: contain;
        border-radius: 5%;
        align-self: center;
    }
    .icon {
        height: 18px;
    }
    .icon-btn {
        height: fit-content;
        border: none;
        background-color: inherit;
        cursor: pointer;
    }
    .buttons-box {
        position: absolute;
        bottom: 0;
        right: 0;
        width: fit-content;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .prices {
        font-family: var(--text-secondary);
        display: flex;
        gap: 0.4em;
        justify-items: center;
        font-size: 0.7em;
    }
    .savedData {
        font-size: 0.6em;
        align-self: end;
    }
    .savedData::before {
        content: "(";
    }
    .savedData::after {
        content: ")";
    }
    .store-icon {
        height: 15px;
    }
    .icons {
        position: absolute;
        top: 3px;
        right: 8px;
    }
</style>
