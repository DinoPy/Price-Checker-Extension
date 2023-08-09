<script>
    import { useMutation } from "@sveltestack/svelte-query";
    import axios from "axios";
    import { links, error } from "../../../stores/products.js";
    import {PERMITED_HOSTS} from '../../../lib/helpers/contants.js';
    import {comparePrice} from '../../../lib/helpers/utility_functions.js';
    import SkeletonLoading from './LoadingSkeleton/+page.svelte';

    export let prod;
    $: savedPrice = JSON.parse(localStorage.getItem(prod)) || {price: 'No saved price', date: (new Date).toLocaleDateString()};

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
                if (savedPrice.price === 'No saved price' || savedPrice.date !== today) {
                    localStorage.setItem(prod, JSON.stringify({price: data.data.data.price, date: today}));
                    savedPrice = {price: data.data.data.price, date: today};
                }
            },
            onError: (err) => {
                $mutation.isError = true;
                $mutation.isLoading = false;
                if (err.response.status === 404) {
                    remove()
                    error.update(e => ({...e, isError: !e.isError, message: err.response.data.error}));
                }
            }
        }
    );
    $mutation.mutate(prod);
</script>

<div class="product-container">
    {#if $mutation.isLoading}
        <SkeletonLoading />
    {:else if $mutation.isError}
         <div> Error... Try again later </div>
    {:else if $mutation.isSuccess}
        <img
            class="preview-img"
            src={$mutation.data.data.data.src}
            alt={$mutation.data.data.data.title}
        />
        <div>
            <a href={$mutation.data.data.data.url} target='_blank'>
               <h2>{$mutation.data.data.data.title}</h2>
            </a>
            <div class="prices">
                <p class="currentPrice"
                style={`color:${comparePrice($mutation.data.data.data.price, savedPrice.price, 'green', 'red')}`}
                >{$mutation.data.data.data.price}</p>
                <p class="savedPrice" title="Yesterday's price">{savedPrice.price} </p>
            </div>
            <div class="buttons-box">
                <button on:click={$mutation.mutate(prod)} class="icon-btn">
                    <img class="icon" src="images/refresh.svg" alt="Refresh" />
                </button>
                <button on:click={remove} class="icon-btn">
                    <img class="icon" src="images/delete.svg" alt="Remove" />
                </button>
            </div>
            <div class="icons">
                {#if $mutation.data.data.data.isGenius}
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

    .savedPrice {
        font-size: .6em;
        align-self: end;
    }
    .savedPrice::before {
        content: '('
    }
    .savedPrice::after {
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
