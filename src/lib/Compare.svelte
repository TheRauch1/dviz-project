<script>
    import Plotly from "plotly.js-dist-min";
    import { onMount } from "svelte";
    import "bootstrap/dist/css/bootstrap.min.css";
    import { DataAPI } from "./dataAPI.js";

    var data = new DataAPI();
    var firstCountry = "China";
    var secondCountry = "United States";
    const reg = /\w+\s?(\w+)?/

    var countryData = [];

    countryData[0] = data.genTableData(firstCountry);
    countryData[1] = data.genTableData(secondCountry);

    var comparisonBarchartLayout = {
        title: "Comparison between " + firstCountry + " and " + secondCountry,
        dragmode: "pan",
        showlegend: true,
        yaxis: {
            tickformat: "100,",
            ticksuffix: " TWh",
            type: 'log'
        },
        barmode: "group",
    };

    var firstCountryTrace = {
        name: firstCountry,
        x: data.energyDataCategories.map((category) => {
            return category.match(reg)[0]
        }),
        y: [],
        type: "bar",
        marker: {
            color: 'rgb(216,179,101)'
        }
    };

    var secondCountryTrace = {
        name: secondCountry,
        x: data.energyDataCategories.map((category) => {
            return category.match(reg)[0]
        }),
        y: [],
        type: "bar",
        marker: {
            color: 'rgb(90,180,172)'
        }
    };

    function recreatePlot() {
        firstCountryTrace.name = firstCountry;
        secondCountryTrace.name = secondCountry;
        comparisonBarchartLayout.title = "Comparison between " + firstCountry + " and " + secondCountry;
        document.getElementById("comparisonBarchart").innerHTML = "";
        Plotly.newPlot(
            "comparisonBarchart",
            [firstCountryTrace, secondCountryTrace],
            comparisonBarchartLayout,
            {}
        );
    }

    function createTraces() {
        firstCountryTrace.y = [];
        for (const [key, value] of Object.entries(countryData[0])) {
            firstCountryTrace.y.push(value);
        }
        secondCountryTrace.y = [];
        for (const [key, value] of Object.entries(countryData[1])) {
            secondCountryTrace.y.push(value);
        }
        console.log(firstCountryTrace)

        recreatePlot();
    }

    function reassignCountryData(event) {
        countryData[event.target.name] = data.genTableData(event.target.value);
        createTraces();
    }

    onMount(() => {
        createTraces();
    });
</script>

<div class="container">
    <div class="row">
        <div class="col" />
        <div class="col-8">
            <table class="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Stat</th>
                        <th scope="col">
                            <select
                                name="0"
                                class="form-select"
                                bind:value={firstCountry}
                                on:change={reassignCountryData}
                            >
                                {#each data.countryList as country}
                                    <option value={country}>{country}</option>
                                {/each}
                            </select>
                        </th>
                        <th scope="col">
                            <select
                                name="1"
                                class="form-select"
                                bind:value={secondCountry}
                                on:change={reassignCountryData}
                            >
                                {#each data.countryList as country}
                                    <option value={country}>{country}</option>
                                {/each}
                            </select>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {#each data.energyDataCategories as category}
                        <tr>
                            <th scope="row">{category}</th>
                            <td>
                                {countryData[0][category]}
                                <br />
                                <span
                                    >{firstCountry} uses {(
                                        (countryData[0][category] /
                                            countryData[1][category]) *
                                        100
                                    ).toPrecision(3)}% of {secondCountry}
                                </span></td
                            >
                            <td>{countryData[1][category]}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
        <div class="col" />
    </div>
    <div class="row">
        <div class="col" />
        <div class="col-8">
            <div id="comparisonBarchart" />
        </div>
        <div class="col" />
    </div>
</div>
