<script>
  import Plotly from "plotly.js-dist-min";
  import { createEventDispatcher, onMount } from "svelte";
  import energyData from "./assets/energy.json";
  import "bootstrap/dist/css/bootstrap.min.css";

  var countries = energyData["Country"];
  var years = energyData["Year"];
  var energy = energyData["Primary energy (TWh)"];

  var countryToIndexMap = {};
  var countryList = new Set();
  var newSelectedCountry = "";
  var data = [];
  var selectedCountry;

  for (const key in countries) {
    const country = countries[key];
    countryList.add(country);
    if (country in countryToIndexMap) {
      countryToIndexMap[country].push(key);
    } else {
      countryToIndexMap[country] = [];
      countryToIndexMap[country].push(key);
    }
  }
  console.log(countryToIndexMap);
  console.log(countryList);

  function createTrace(name) {
    var xValues = [];
    var yValues = [];

    countryToIndexMap[name].forEach((index) => {
      xValues.push(years[index]);
      yValues.push(energy[index]);
    });
    var trace = {
      name: name,
      x: xValues,
      y: yValues,
      type: "scatter",
    };
    console.log(trace);
    return trace;
  }

  data.push(createTrace("World"));

  var layout = {
    title: "Primary Energy",
    dragmode: "pan",
    showlegend: true,
    yaxis: {
      tickformat: "10,",
      ticksuffix: " Twh",
    },
  };

  function createPlot() {
    document.getElementById("energyChart").innerHTML = "";
    Plotly.newPlot("energyChart", data, layout, { scrollZoom: true });
  }

  function isCountryOnPlot(country) {
    data.forEach(trace => {
      debugger;
      if (trace.name == country) {return true}
    });
    return false;
  }

  function addCountryToPlot(country) {
    data = [...data, createTrace(country)];
    createPlot();
  }

  function removeCountryFromPlot(country) {
    debugger;
    data = data.filter((item) => {return item !== country});
    createPlot();
  }

  function toggleCountry(country) {
    if (!isCountryOnPlot(country)) {
      addCountryToPlot(country)
    } else {
      removeCountryFromPlot(country)
    }
  }

  onMount(() => {
    createPlot();
  });
</script>

<main>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="row">
          <div class="list-group">
            {#each Array.from(countryList) as country}
            <label>
              <input type=checkbox on:click={() => {toggleCountry(country)}} value={country}>
              {country}
            </label>
            {/each}
          </div>
        </div>
        <div class="row">
          <button disabled={!newSelectedCountry} on:click={addCountryToPlot}
            >Add</button
          >
          <button disabled={!selectedCountry} on:click={removeCountryFromPlot}
            >Delete</button
          >
        </div>
      </div>
      <div class="col-8">
        <div id="energyChart" />
      </div>
    </div>
  </div>
</main>

<style>
</style>
