<script>
    import Plotly from "plotly.js-dist-min";
    import { onMount } from "svelte";
    import "bootstrap/dist/css/bootstrap.min.css";
    import { DataAPI } from "./DataAPI";

    var data = new DataAPI();
    var year = data.worldMapDefaultYear;

    var worldMapLayout = {
        title: "Energy Usage in TWh by country",
        geo: {
            projection: {
                type: "robinson",
            },
        },
    };

    var worldMapData = [
        {
            type: "choropleth",
            locationmode: "country names",
            locations: data.worldMapCountryData,
            z: data.worldMapZData,
            zmin: 0,
            zmax: data.energyMaxValue,
            text: data.worldMapCountryData,
            autocolorscale: true,
        },
    ];

    function changeYear(event) {
        data.genWorldData(event.srcElement.value);
        worldMapData[0].locations = data.worldMapCountryData;
        worldMapData[0].z = data.worldMapZData;
        worldMapData[0].text = data.worldMapCountryData;
        recreatePlot();
    }

    function recreatePlot() {
        document.getElementById("worldMap").innerHTML = "";
        Plotly.newPlot("worldMap", worldMapData, worldMapLayout, {
            scrollZoom: true,
        });
    }

    onMount(() => {
        recreatePlot();
    });
</script>

<div class="container-fluid">
    <div class="row">
        <div class="col-2" />
        <div class="col-8">
            <div id="worldMap" />
        </div>
        <div class="col-2" />
    </div>
    <div id="row">
        <div class="col-2" />
        <div class="col-8">
            <label for="yearSlider" class="form-label">Year: {year}</label>
            <input
                type="range"
                name="yearSlider"
                class="form-range"
                min={data.firstYear}
                max={data.lastYear}
                step="1"
                bind:value={year}
                on:input={changeYear}
            />
        </div>
        <div class="col-2" />
    </div>
</div>

<style>
</style>
