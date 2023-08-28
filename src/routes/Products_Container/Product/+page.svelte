<script>
    import { useMutation } from "@sveltestack/svelte-query";
    import axios from "axios";
    import { links, error } from "../../../stores/products.js";
    import {
        PERMITED_HOSTS,
        REFETCH_TIME,
    } from "../../../lib/helpers/constants.js";
    import {
        comparePrice,
        parseTitle,
    } from "../../../lib/helpers/utility_functions.js";
    import SkeletonLoading from "./LoadingSkeleton/+page.svelte";

    export let prod;
    let attempts = 0;
    let savedData = JSON.parse(localStorage.getItem(prod)) || {
        prevPrice: "No saved price",
        date: new Date().toLocaleDateString(),
        title: null,
        currentPrice: null,
        src: null,
        url: null,
        lastFetchTime: null,
        isGenius: false,
        stock: null,
        lastPriceUpdate: new Date().toLocaleString(),
    };

    const remove = () => {
        links.update((links) => links.filter((l) => l !== prod));
        localStorage.setItem("urls", JSON.stringify($links));
        localStorage.removeItem(prod);
    };

    const getHost = () => {
        if (typeof window === "undefined") return;
        let URL = new window.URL(prod);
        const host = URL.host;
        URL = null;
        const currentHost = PERMITED_HOSTS.filter((h) => host === h.host);
        return currentHost[0];
    };
    const host = getHost();
    const mutation = useMutation(
        (url) =>
            axios.post(host.name === "Emag" ? "https://random-apis-server.vercel.app/api/scraper" : "http://194.233.163.205:3000/api/scraper", {
                url: url,
                details: host,
            }),
        {
            onSuccess: (data) => {
                const today = new Date().toLocaleDateString();
                let dataToSave = {
                    ...savedData,
                    title: data.data.data.title,
                    currentPrice: data.data.data.price,
                    src: data.data.data.src,
                    url: prod,
                    lastFetchTime: +new Date(),
                    isGenius: data.data.data.isGenius,
                    stock: data.data.data.stock,
                };
                if (
                    savedData.prevPrice === "No saved price" ||
                    savedData.date !== today
                ) {
                    dataToSave = {
                        ...dataToSave,
                        prevPrice: data.data.data.price,
                        date: today,
                    };
                }
                if (
                    comparePrice(
                        dataToSave.currentPrice,
                        dataToSave.prevPrice,
                        "different",
                        "different"
                    ) === "different"
                ) {
                    dataToSave.lastPriceUpdate = new Date().toLocaleString();
                }
                console.log(
                    comparePrice(
                        dataToSave.currentPrice,
                        dataToSave.prevPrice,
                        "different",
                        "different"
                    )
                );
                localStorage.setItem(prod, JSON.stringify(dataToSave));
                savedData = dataToSave;
            },
            onError: async (err) => {
                attempts++;
                console.log(prod, attempts, savedData.prevPrice);
                if (attempts < 3) {
                    await new Promise((resolve, reject) =>
                        setTimeout(() => {
                            resolve($mutation.mutate(prod));
                        }, 5000)
                    );
                } else {
                    attempts = 0;
                    if (err && err.response && err.response.status === 404) {
                        remove();
                        error.update((e) => ({
                            ...e,
                            isError: true,
                            message:
                                err.response.data.error ||
                                "Url not compatible at this time",
                        }));
                    }
                    if (
                        err &&
                        err.message === "Network Error" &&
                        savedData.prevPrice === "No saved price"
                    ) {
                        remove();
                        error.update((e) => ({
                            ...e,
                            isError: true,
                            message: "Incompatible URL",
                        }));
                    }
                }
            },
        }
    );
    if (
        savedData.lastFetchTime + REFETCH_TIME < +new Date() ||
        savedData.lastFetchTime === null
    )
        $mutation.mutate(prod);
</script>

<div class="product-container">
    {#if $mutation.isLoading}
        <SkeletonLoading />
    {:else if $mutation.isError}
        <div>Error... Try again later</div>
    {:else if $mutation.isSuccess || savedData.title !== null}
        <div class="previewImgContainer">
            <img
                class="preview-img"
                src={savedData.src}
                alt={savedData.title}
            />
        </div>
        <div class="right-container">
            <a href={savedData.url} target="_blank">
                <h2 title={savedData.title}>{parseTitle(savedData.title)}</h2>
            </a>
            <div class="absoluteContainer">
                <div class="prices">
                    <p
                        class="currentPrice"
                        style={`color:${comparePrice(
                            savedData.currentPrice,
                            savedData.prevPrice,
                            "green",
                            "red"
                        )}`}
                    >
                        {savedData.currentPrice}
                    </p>
                    <p class="savedData" title={savedData.lastPriceUpdate}>
                        {savedData.prevPrice}
                    </p>
                </div>
                <div class="buttons-box">
                    <button
                        on:click={() => $mutation.mutate(prod)}
                        class="icon-btn"
                    >
                        <img
                            class="icon"
                            src="images/refresh.svg"
                            alt="Refresh"
                        />
                    </button>
                    <button on:click={() => remove()} class="icon-btn">
                        <img
                            class="icon"
                            src="images/delete.svg"
                            alt="Remove"
                        />
                    </button>
                </div>
            </div>
            <div class="icons">
                {#if savedData.isGenius}
                    <img
                        class="store-icon"
                        src="images/genius.svg"
                        alt="Genius"
                    />
                {/if}
                <img class="store-icon" src={host.icon} alt={host.name} />
            </div>
        </div>
    {/if}
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
        flex-wrap: wrap;
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
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .preview-img {
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        border-radius: 5%;
    }
    .icon {
        height: 18px;
    }
    .icon-btn {
        object-fit: fill;
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
