<script>
    import { useMutation } from "@sveltestack/svelte-query";
    import axios from "axios";
    import { links, error } from "../../../stores/products.js";
    import {PERMITED_HOSTS, REFETCH_TIME} from '../../../lib/helpers/constants.js';
    import {comparePrice} from '../../../lib/helpers/utility_functions.js';
    import SkeletonLoading from './LoadingSkeleton/+page.svelte';

    export let prod;
    let attempts = 0;
    let savedData = JSON.parse(localStorage.getItem(prod)) || {prevPrice: 'No saved price', date: (new Date).toLocaleDateString(), title: null, currentPrice: null, src: null, url: null, lastFetchTime: null, isGenius: false, stock: null};

    const remove = () => {
        links.update((links) => links.filter((l) => l !== prod));
        localStorage.setItem('urls', JSON.stringify($links));
        localStorage.removeItem(prod);
    };

    const getHost = () => {
        if(typeof window === 'undefined') return;
        let URL = new window.URL(prod)
        const host = URL.host;
        URL = null;
        const currentHost = PERMITED_HOSTS.filter(h => host === h.host)
        return currentHost[0];
    }
    const host = getHost();
    const mutation = useMutation((url) =>
        axios.post("https://random-apis-server.vercel.app/api/scraper/", { url: url, details: host}),
        {
            onSuccess: (data) => {
                const today = (new Date).toLocaleDateString();
                let dataToSave = {
                    ...savedData,
                    title: data.data.data.title,
                    currentPrice: data.data.data.price,
                    src: data.data.data.src,
                    url: prod,
                    lastFetchTime: +new Date,
                    isGenius: false,
                    stock: null
                    };
                if (savedData.prevPrice === 'No saved price' || savedData.date !== today) {
                    dataToSave = {...dataToSave, prevPrice: data.data.data.price, date: today};
                }
                localStorage.setItem(prod, JSON.stringify(dataToSave));
                savedData = dataToSave;
            },
            onError: async (err) => {
                attempts ++;
                console.log(prod, attempts, savedData.prevPrice);
                if (attempts < 1) {
                    await (new Promise((resolve,reject) => setTimeout(() => {resolve($mutation.mutate(prod))}, 5000)));
                }
                else {
                    attempts = 0;
                    if (err && err.response && err.response.status === 404) {
                        remove()
                        error.update(e => ({...e, isError: true, message: err.response.data.error || "Url not compatible at this time"}));
                    }
                    if (err && err.message === 'Network Error' && savedData.prevPrice === 'No saved price') {
                        remove();
                        error.update(e => ({...e, isError: true, message: 'Incompatible URL'}));
                    };
                }
            }
        }
    );
    console.log(savedData);
    if (savedData.lastFetchTime + REFETCH_TIME < +new Date || savedData.lastFetchTime === null) $mutation.mutate(prod);
</script>

<div class="product-container">
    {#if $mutation.isLoading}
        <SkeletonLoading />
    {:else if $mutation.isError}
         <div> Error... Try again later </div>
    {:else if $mutation.isSuccess || savedData.title !== null}
        <img
            class="preview-img"
            src={savedData.src}
            alt={savedData.title}
        />
        <div>
            <a href={savedData.url} target='_blank'>
               <h2>{savedData.title}</h2>
            </a>
            <div class="prices">
                <p class="currentPrice"
                style={`color:${comparePrice(savedData.currentPrice, savedData.prevPrice, 'green', 'red')}`}
                >{savedData.currentPrice}</p>
                <p class="savedData" title="Yesterday's price">{savedData.prevPrice} </p>
            </div>
            <div class="buttons-box">
                <button on:click={() => $mutation.mutate(prod)} class="icon-btn">
                    <img class="icon" src="images/refresh.svg" alt="Refresh" />
                </button>
                <button on:click={() => remove()} class="icon-btn">
                    <img class="icon" src="images/delete.svg" alt="Remove" />
                </button>
            </div>
            <div class="icons">
                {#if savedData.isGenius}
                    <img class="store-icon" src='images/genius.svg' alt="Genius"/>
                {/if}
                <img class="store-icon" src={host.icon} alt={host.name}/>
            </div>
        </div>
    {/if}
</div>

<style>
    .product-container {
        min-height: fit-content;
        height: 100%;
        width: 100%;
        padding: 1em 1em .5em;
        background-color: var(--secondary);
        border-radius: 1em;
        display: flex;
        gap: 1em;
        position: relative;
    }

    h2,
    a {
        width: 100%;
        font-size: clamp(1em, 0.5rem + 1.2vw, 2em);
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
        align-items:center;
        justify-content:center;
    }

    .prices {
        display: flex;
        gap: .4em;
        justify-items: center;
        font-family: Arial;
    }

    .savedData {
        font-size: .6em;
        align-self: end;
    }
    .savedData::before {
        content: '('
    }
    .savedData::after {
        content: ')'
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
