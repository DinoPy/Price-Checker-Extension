<script>
    import Chart from "chart.js/auto";
    import { onMount } from "svelte";
    import { parsePrice } from "../../../lib/helpers/utility_functions";
    export let priceHistory;

    let chartValues = priceHistory.map(i => parsePrice(i.price));
    let chartLabels = priceHistory.map(i => i.date);
    let ctx;
    let chartCanvas;

    onMount(() => {
        ctx = chartCanvas.getContext('2d');
        let chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: chartLabels,
                datasets: [{
                    label: "Price",
                    data:chartValues,
                }],
            }
        })
        return () => chart.destroy()
    });
</script>

<canvas bind:this={chartCanvas} id='priceHistory'> </canvas>

<style>
    canvas {
        width:100%;
        aspect-ratio: 16/9;
    }
</style>
