<script>
    import { useMutation } from "@sveltestack/svelte-query";
    import axios from "axios";
    import {
        links,
        error,
        priceHistoryData,
    } from "../../../stores/products.js";
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
        pastPrices: [],
    };

    const togglePriceHistoryPopUp = () => {
        priceHistoryData.update((prev) => ({
            toggled: !prev.toggled,
            priceHistoryData: savedData.pastPrices,
        }));
    };

    const remove = () => {
        links.update((links) => links.filter((l) => l !== prod));
        localStorage.setItem("urls", JSON.stringify($links));
        localStorage.removeItem(prod);
    };

    const processSavedPricesArr = (newPrice, currentList) => {
        if (currentList.length > 30) currentList.shift();
        currentList.push({
            date: new Date().toLocaleString(),
            price: newPrice,
        });
        return currentList;
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

    /*

                return (host === "Emag"
                    ? "https://random-apis-server.vercel.app/api/scraper"
                    : `https://dinodev.dev/api/scraper/${host}`);
                */

    const getServerUrl = ( stage) => {
        switch (stage) {
            case "Production":
                return `https://dinodev.dev/api/scraper/`;
            case "Developement": {
                return `https://localhost/api/scraper/`;
            }
        }
    };

    const mutation = useMutation(
        (url) =>
            axios.post(getServerUrl("Production") + host.name, {
                url: url,
                details: host,
            }),
        {
            onSuccess: (data) => {
                const today = new Date().toLocaleDateString();
                let dataToSave = { ...savedData };
                if (
                    comparePrice(
                        data.data.data.price,
                        savedData.currentPrice || data.data.data.price,
                        "d",
                        "d"
                    ) === "d"
                ) {
                    dataToSave.pastPrices = processSavedPricesArr(
                        data.data.data.price,
                        dataToSave.pastPrices
                    );
                    savedData.prevPrice = savedData.currentPrice;
                    savedData.date = today;
                    savedData.lastPriceUpdate = new Date().toLocaleString();
                }
                dataToSave = {
                    ...dataToSave,
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
                    (savedData.date !== today &&
                        comparePrice(
                            dataToSave.currentPrice,
                            dataToSave.prevPrice,
                            "d",
                            "d"
                        ) !== "d")
                ) {
                    dataToSave.prevPrice = data.data.data.price;
                    dataToSave.date = today;
                }
                if (
                    dataToSave.pastPrices < 1 ||
                    !dataToSave.hasOwnProperty("pastPrices")
                )
                    dataToSave.pastPrices = processSavedPricesArr(
                        data.data.data.price,
                        []
                    );
                localStorage.setItem(prod, JSON.stringify(dataToSave));
                savedData = dataToSave;
            },
            onError: async (err) => {
                attempts++;
                console.log(prod, attempts, savedData.prevPrice);
                if (attempts < 1) {
                    await new Promise((resolve, reject) =>
                        setTimeout(() => {
                            resolve($mutation.mutate(prod));
                        }, 5000)
                    );
                } else {
                    attempts = 0;
                    if (err && err.response && err.response.status === 404 && !savedData.title) {
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

    const deleteUrl = useMutation(
        (url) =>
            axios.delete(getServerUrl( "Production") + `delete?url=${prod}`, {
                url: url,
                details: host,
            }),
        {
            onSuccess: () => {
                links.update((links) => links.filter((l) => l !== prod));
                localStorage.setItem("urls", JSON.stringify($links));
                localStorage.removeItem(prod);
            },
            onError: async (err) => {
                // do something
                error.update((e) => ({
                    ...e,
                    isError: true,
                    message: "Deletion failed"
                }));
            },
        }
    );
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
                    <button
                        on:click={() => togglePriceHistoryPopUp()}
                        class="icon-btn"
                    >
                        <img class="icon" src="images/info.svg" alt="info" />
                    </button>
                    <button on:click={() => $deleteUrl.mutate(prod)} class="icon-btn">
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
        box-shadow: 0px 2px 5px 0px #0003;
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
        justify-content: flex-end;
        gap: 0.4em;
        justify-items: center;
        font-size: 0.85em;
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
