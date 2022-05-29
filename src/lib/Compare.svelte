<script>
    import { onMount } from "svelte";
    import "bootstrap/dist/css/bootstrap.min.css";
    import { DataAPI } from "./dataAPI.js";

    var data = new DataAPI();
    var firstCountry = "China";
    var secondCountry = "United States";

    var countryData = [];

    countryData[0] = data.genTableData(firstCountry);
    countryData[1] = data.genTableData(secondCountry);

    function reassignCountryData(event) {
        countryData[event.target.name] = data.genTableData(event.target.value);
    }
</script>

<div class="container">
    <div class="col" />
    <div class="col-8">
        <div class="row">
            <table class="table">
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
                <tbody class="table-striped">
                    {#each data.energyDataCategories as category}
                        <tr>
                            <th scope="row">{category}</th>
                            <td>
                                {countryData[0][category]}
                                <br />
                                <span>{firstCountry} uses { ((countryData[0][category] / countryData[1][category]) * 100).toPrecision(3)}% of {secondCountry}
                            </td>
                            <td>{countryData[1][category]}</td>
                        </tr>
                    {/each}
                </tbody>
            </table>
        </div>
    </div>
    <div class="col" />
</div>
