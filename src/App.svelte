<script>
  import Plotly from "plotly.js-dist-min";
  import { onMount } from "svelte";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { dataAPI } from "./lib/dataAPI.js";

  var data = new dataAPI();

  var plotData = [];
  var plottedCountries = [];
  var filteredCountryList = data.countryList;

  function filterCountry(e) {
    var searchKey = e.currentTarget.value;
    debugger;
    if (searchKey != "") {
      filteredCountryList = data.countryList.filter((country) => {
        return country.toLowerCase().search(searchKey.toLowerCase()) >= 0;
      });
    } else {
      filteredCountryList = data.countryList;
    }
  }

  var layout = {
    title: "Primary Energy",
    dragmode: "pan",
    showlegend: true,
    yaxis: {
      tickformat: "100,",
      ticksuffix: " TWh",
    },
  };

  function recreatePlot() {
    document.getElementById("energyChart").innerHTML = "";
    Plotly.newPlot("energyChart", plotData, layout, { scrollZoom: true });
  }

  function isCountryOnPlot(country) {
    var result = false;
    for (var trace of plotData) {
      if (trace["name"] == country) {
        result = true;
      }
    }
    return result;
  }

  function addCountryToPlot(country) {
    plotData = [...plotData, data.createTrace(country)];
    plottedCountries = [...plottedCountries, country];
    recreatePlot();
  }

  function removeCountryFromPlot(country) {
    plotData = plotData.filter((item) => {
      return item.name !== country;
    });
    plottedCountries = plottedCountries.filter((item) => {
      return item !== country;
    });
    recreatePlot();
  }

  function toggleCountry(country) {
    if (!isCountryOnPlot(country)) {
      addCountryToPlot(country);
    } else {
      removeCountryFromPlot(country);
    }
    console.log(plotData);
  }

  onMount(() => {
    addCountryToPlot("World");
    recreatePlot();
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
            <input type="text" class="form-control" on:input={filterCountry} />
          </div>
        </div>
        <div class="row vh-100 overflow-auto">
          <div class="list-group">
            {#each filteredCountryList as country}
              <label>
                <div class="list-group-item">
                  {#if plottedCountries.includes(country)}
                    <input
                      class="form-check-input"
                      type="checkbox"
                      checked
                      id="country-{country}"
                      on:click={() => {
                        toggleCountry(country);
                      }}
                      value={country}
                    />
                  {:else}
                    <input
                      class="form-check-input"
                      type="checkbox"
                      id="country-{country}"
                      on:click={() => {
                        toggleCountry(country);
                      }}
                      value={country}
                    />
                  {/if}
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
