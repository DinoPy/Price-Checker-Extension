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
    <div class="icons">
        <img class="store-icon" src={host.icon} alt={host.name} />
    </div>
</div>

<style>
    .product-container {
        height: 180px;
        width: 100%;
        padding: 1.2em 1em 0.5em;
        background-color: var(--secondary);
        border-radius: 1em;
        display: flex;
        gap: 1em;
        position: relative;
        font-size: clamp(14px, 1vw, 18px);
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
        align-items: center;
        justify-content: center;
    }
    .preview-img {
        max-width: 100%;
        height: min(100%, 250px);
        object-fit: contain;
        border-radius: 5%;
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
