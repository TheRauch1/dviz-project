<script>
    import Plotly from "plotly.js-dist-min";
    import { onMount } from "svelte";
    import "bootstrap/dist/css/bootstrap.min.css";
    import { dataAPI } from "./dataAPI.js";

    var data = new dataAPI();
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
            text: data.worldMapCountryData,
            autocolorscale: true,
        },
    ];

    function changeYear(event) {
        data.genWorldData(event.srcElement.value);
        worldMapData = [
            {
                type: "choropleth",
                locationmode: "country names",
                locations: data.worldMapCountryData,
                z: data.worldMapZData,
                text: data.worldMapCountryData,
                autocolorscale: true,
            },
        ];
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

<main>
    <div class="container">
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
</main>

<style>
</style>
