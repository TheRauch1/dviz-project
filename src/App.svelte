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

  function addTrace(name) {
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

  data.push(addTrace("World"));

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

  function addElement() {
    data = [...data, addTrace(newSelectedCountry)];
    createPlot();
    newSelectedCountry = "";
    //debugger;
  }

  function removeElement(e) {}

  onMount(() => {
    createPlot();
  });
</script>

<main>
  <div class="container">
    <div class="row">
      <div class="col-4">
        <div class="row">
          <select
            bind:value={newSelectedCountry}
            class="form-select"
            aria-label="Default select example"
          >
            {#each Array.from(countryList) as country}
              <option value={country}>{country}</option>
            {/each}
          </select>
        </div>
        <div class="row">
          <select bind:value={selectedCountry} size={8} class="form-select">
            {#each data as country}
              <option value={country}>{country.name}</option>
            {/each}
          </select>
        </div>
        <div class="row">
          <button disabled={!newSelectedCountry} on:click={addElement}
            >Add</button
          >
          <button disabled={!selectedCountry} on:click={removeElement}
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
