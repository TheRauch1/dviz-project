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
  var data = [];
  var searchKey = "";
  var filteredCountryList = Array.from(countryList);

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

  function searchCountry() {
    var countries = Array.from(countryList);
    if (searchKey != "") {
      filteredCountryList = countries.filter(country =>  {
        return country.toLowerCase().search(searchKey.toLowerCase()) >= 0;
      })
    } else {
      filteredCountryList = countries;
    }
  }

  data.push(createTrace("World"));

  var layout = {
    title: "Primary Energy",
    dragmode: "pan",
    showlegend: true,
    yaxis: {
      tickformat: "100,",
      ticksuffix: " MWh",
    },
  };

  function createPlot() {
    document.getElementById("energyChart").innerHTML = "";
    Plotly.newPlot("energyChart", data, layout, { scrollZoom: true });
  }

  function isCountryOnPlot(country) {
    var result = false;
    for (var trace of data) {
      if (trace["name"] == country) {
        result = true;
      }
    }
    return result;
  }

  function addCountryToPlot(country) {
    data = [...data, createTrace(country)];
    createPlot();
  }

  function removeCountryFromPlot(country) {
    data = data.filter((item) => {
      return item.name !== country;
    });
    createPlot();
  }

  function toggleCountry(country) {
    var test = !isCountryOnPlot(country);
    if (test) {
      addCountryToPlot(country);
    } else {
      removeCountryFromPlot(country);
    }
  }

  function setWorldMarker() {
    console.log(document.querySelector("[value=World]"))
    //document.querySelector('option[value=World]').selected = true;
  }

  onMount(() => {
    createPlot();
    searchCountry();
    setWorldMarker();
  });
</script>

<main>
  <nav class="navbar navbar-dark bg-dark">
    <div class="container-fluid">
      <span class="navbar-brand mb-0 h1">Energy Dashboard</span>
    </div>
  </nav>
  <div class="container-fluid">
    <div class="row ">
      <aside class="col-3">
        <div class="row">
          <div class="input-group">
            <span class="input-group-text">Search</span>
            <input type="text" class="form-control" bind:value={searchKey} on:input={searchCountry}> 
          </div>
        </div>
        <div class="row vh-100 overflow-auto">
          <div class="list-group">
            {#each filteredCountryList as country}
              <label>
                <div class="list-group-item">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    on:click={() => {
                      toggleCountry(country);
                    }}
                    value={country}
                  />
                  {country}
                </div>
              </label>
            {/each}
          </div>
        </div>
      </aside>
      <div class="col-9">
        <div id="energyChart" />
      </div>
    </div>
  </div>
</main>

<style>
</style>
