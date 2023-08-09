<script lang="ts">
    import {error} from '../../stores/products.js'
	export let message;
    export let timeout = 5000;
    let isActive = true;

    error.update(e => ({...e, isError:false}));
    setTimeout(() => {
        isActive = false;
       },timeout);
</script>

{#if isActive}
    <pre class="popup-container">{JSON.stringify(message, null, 2)}</pre>
{/if}

<style>
	.popup-container {
		width: fit-content;
        min-height: 80px;
		background-color: var(--accent);
		border-radius: 1em;
		padding: 0.5em 1em;
		position: absolute;
		top: 3em;
		right: 10px;
		animation: pop-up ease-in 200ms;
        font-size: .8em;
        font-family: Arial;
	}

	@keyframes pop-up {
		0% {
			right: -250px;
		}
		100% {
			right: 10px;
		}
	}
</style>
