<script>
    export let savedData;
    export let host;
    let url = new URL("https://store.epicgames.com/en-US/browse?");
    url.search = "q=" + savedData.title;
</script>

<div class="product-container">
    <div class="previewImgContainer">
        <img class="preview-img" src={savedData.src} alt={savedData.title} />
    </div>
    <div class="right-container">
        <a href={url.href} target="_blank">
            <h2>{savedData.title}</h2>
        </a>
    </div>
    <div class="absoluteContainer">
        <div class="buttons-box">
            <button on:click={() => remove()} class="icon-btn">
                <img class="icon" src="images/delete.svg" alt="Remove" />
            </button>
        </div>
    </div>
    <div class="icons">
        <img class="store-icon" src={host.icon} alt={host.name} />
    </div>
</div>

<style>
    .product-container {
        min-height: 200px;
        width: 100%;
        padding: 1.2em 1em 0.5em;
        background-color: var(--secondary);
        border-radius: 1em;
        display: flex;
        gap: 1em;
        position: relative;
        font-size: clamp(14px, 1vw, 24px);
    }
    .right-container {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 5;
    }
    a {
        width: 100%;
        text-decoration: none;
        max-height: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .previewImgContainer {
        flex: 5;
        align-self: center;
        justify-self: center;
    }
    .preview-img {
        max-width: 100%;
        height: min(100%, 250px);
        object-fit: contain;
        border-radius: 5%;
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
    .absoluteContainer {
        position: absolute;
        bottom: 0;
        right: 0;
        width: fit-content;
        padding-right: 0.5em;
    }
    .buttons-box {
        display: flex;
        align-items: center;
        justify-content: flex-end;
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
