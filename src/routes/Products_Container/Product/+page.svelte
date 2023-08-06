<script>
    import { useMutation } from "@sveltestack/svelte-query";
    import axios from "axios";
    import { links } from "../../../stores/products.js";

    export let prod;
    const mutation = useMutation((url) =>
        axios.post("http://localhost:3001/api/scraper/test", { url: url })
    );

    $mutation.mutate(prod);

    const remove = () => {
        links.update((links) => links.filter((l) => l !== prod));
    };
</script>

<div
    class="product-container">
    {#if $mutation.isLoading}
        <div class="img-replacement loading" />
        <div>
            <div class="title-replacement loading" />
            <div class="price-replacement loading" />
            <div class="buttons-box">
                <div class="button-replacement loading" />
                <div class="button-replacement loading" />
            </div>
        </div>
    {:else if $mutation.isError}
        <p>Error</p>
    {:else if $mutation.isSuccess}
        <img
            class="preview-img"
            src={$mutation.data.data.data.src}
            alt='Preview image'
        />
        <div>
            <a href={$mutation.data.data.data.url}>
               <h2>{$mutation.data.data.data.title}</h2>
            </a>
            <p>{$mutation.data.data.data.price}</p>
            <div class="buttons-box">
                <button on:click={$mutation.mutate(prod)} class="icon-btn">
                    <img class="icon" src="images/refresh.svg" alt="Refresh" />
                </button>
                <button on:click={remove} class="icon-btn">
                    <img class="icon" src="images/delete.svg" alt="Remove" />
                </button>
            </div>
        </div>
    {/if}
</div>

<style>
    .product-container {
        height: fit-content;
        width: 100%;
        padding: 0.6em;
        background-color: var(--secondary);
        border-radius: 1em;
        display: flex;
        gap: 1em;
        position: relative;
    }

    h2,
    a {
        width: fit-content;
        text-decoration: none;
        word-break:normal;
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
    }

    .img-replacement {
        width: 100%;
        height: 7em;
        aspect-ratio: 21/10;
        border-radius: 5%;
    }

    .title-replacement {
        height: 1.5em;
        width: 10em;
        margin-bottom: 5px;
    }
    .price-replacement {
        height: 1.4em;
        width: 5em;
        margin-bottom: 5px;
    }
    .button-replacement {
        height: 1.4em;
        width: 1.6em;
        display: inline-block;
    }
    .loading {
        background: #eee;
        background: linear-gradient(
            110deg,
            #ececec 8%,
            #f5f5f5 18%,
            #ececec 33%
        );
        border-radius: 5px;
        background-size: 200% 100%;
        animation: 1.5s shine linear infinite;
    }
    @keyframes shine {
        to {
            background-position-x: -200%;
        }
    }
</style>
