<script>
  import Plotly from "plotly.js-dist-min";
  import { onMount } from "svelte";
  import energyData  from "../assets/energy.json";

    var x_values = [];
    var y_values = [];

    console.log(energyData);

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
