<script>
    import Plotly from "plotly.js-dist-min";
    import { onMount } from "svelte";
    import energyData from "../assets/energy.json";

    var countries = energyData["Country"];
    var years = energyData["Year"];
    var energy = energyData["Primary energy (TWh)"];

    var countryToIndexMap = {};
    var x_values = [];
    var y_values = [];

    for (const key in countries) {
        //console.log(key.concat(" ", countries[key]))
        const country = countries[key];
        if (country in countryToIndexMap) {
            countryToIndexMap[country].push(key);
        } else {
            countryToIndexMap[country] = [];
            countryToIndexMap[country].push(key);
        }
    }
    console.log(countryToIndexMap)

    countryToIndexMap["World"].forEach(index => {
        x_values.push(years[index])
        y_values.push(energy[index])
    });

    var layout = {
        title: "Primary Energy",
        dragmode: "pan",
        showlegend: true,
        yaxis: {
            tickformat: "10,",
            ticksuffix: " Twh"
        },        
    }

    var worldTrace = {
        name: "World",
        x: x_values, 
        y: y_values,
        type: 'scatter'
    }

    var data = [worldTrace]

    onMount(() => {
        Plotly.newPlot(
            "energyChart", data, layout, {scrollZoom: true}
        );
    });
</script>

<div id="energyChart" />

<style>
</style>
