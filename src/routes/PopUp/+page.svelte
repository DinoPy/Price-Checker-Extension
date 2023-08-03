<script lang="ts">
	export let message;
</script>

<div class="popup-container">{message}</div>

<style>
	.popup-container {
		width: 200px;
		height: 80px;
		background-color: lightsalmon;
		border-radius: 1em;
		padding: 0.5em 1em;
		position: absolute;
		top: 3em;
		right: 10px;
		animation: pop-up ease-in 200ms;
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
