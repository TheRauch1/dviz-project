<script>
  import Plotly from "plotly.js-dist-min";
  import { onMount } from "svelte";

    onMount(() => {
        Plotly.newPlot(
            "firstChart",
            /* JSON object */ {
                data: [{ y: [1, 2, 3] }],
            }
        );
    });
</script>

<div id="firstChart" />

<style>
</style>
