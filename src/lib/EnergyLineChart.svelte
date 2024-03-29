<script>
  import Plotly from "plotly.js-dist-min";
  import { onMount } from "svelte";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { DataAPI } from "./dataAPI.js";

  var data = new DataAPI();

  var plotData = [];
  var plottedCountries = [];
  var filteredCountryList = data.countryList;
  var selectedEnergyCategory;

  function filterCountry(e) {
    var searchKey = e.currentTarget.value;
    if (searchKey != "") {
      filteredCountryList = data.countryList.filter((country) => {
        return country.toLowerCase().search(searchKey.toLowerCase()) >= 0;
      });
    } else {
      filteredCountryList = data.countryList;
    }
  }

  var energyChartLayout = {
    title: data.energyDataCategories[0],
    dragmode: "pan",
    showlegend: true,
    yaxis: {
      tickformat: ",",
      ticksuffix: " TWh",
    },
    xaxis: {
      spikesnap: "cursor",
    },
    colorway: [
      "#a6cee3",
      "#1f78b4",
      "#b2df8a",
      "#33a02c",
      "#fb9a99",
      "#e31a1c",
      "#fdbf6f",
      "#ff7f00",
      "#cab2d6",
      "#6a3d9a",
      "#ffff99",
      "#b15928",
    ],
    updatemenus: [
      {
        buttons: [
          { label: "Linear scale", method: "relayout", args: [{ "yaxis.type": "linear" }] },
          { label: "Logarithmic scale", method: "relayout", args: [{ "yaxis.type": "log" }] },
        ],
        //direction: "left",
        //showactive: true,
        //type: "buttons",
        x: 0.0,
        xanchor: "right",
        y: 1.2,
        yanchor: "top",
      },
    ],
  };

  function recreatePlot() {
    document.getElementById("energyChart").innerHTML = "";
    Plotly.newPlot("energyChart", plotData, energyChartLayout, {
      scrollZoom: true,
      displaylogo: false
    });
  }

  function switchCategory(e) {
    plotData = [];
    energyChartLayout.title = e.target.value;
    plottedCountries.forEach((country) => {
      plotData = [...plotData, data.createTrace(country, e.target.value)];
    });
    recreatePlot();
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

  function addCountryToPlot(country, category = selectedEnergyCategory) {
    plotData = [...plotData, data.createTrace(country, category)];
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
  }

  onMount(() => {
    addCountryToPlot("United States");
    addCountryToPlot("China");
    addCountryToPlot("Switzerland");
    recreatePlot();
  });
</script>

<div class="container-fluid">
  <div class="row ">
    <aside class="col-3">
      <div class="input-group">
        <span class="input-group-text">Search</span>
        <input type="text" class="form-control" on:input={filterCountry} />
      </div>
      <div class="overflow-auto" style="height:90vh!important">
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
      <div class="form-floating">
        <select
          name="categorySelect"
          class="form-select"
          on:change={switchCategory}
          bind:value={selectedEnergyCategory}
        >
          {#each data.energyDataCategories as category}
            <option value={category}>{category}</option>
          {/each}
        </select>
        <label for="categorySelect">Select Energy Category</label>
      </div>
      <div id="energyChart" />
    </div>
  </div>
</div>

<style lang="css">
  .form-check-input:checked {
    background-color: #f7ca0e;
    border-color: #f7ca0e;
  }
</style>
