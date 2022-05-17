<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import EnergyLineChart from "./lib/EnergyLineChart.svelte";
  import WorldMapChart from "./lib/WorldMapChart.svelte";

  let charts = [
    { id: 1, name: "Energy Line chart", component: EnergyLineChart },
    { id: 2, name: "World Map chart", component: WorldMapChart },
  ];

  var selectedChart = charts[0];

</script>

<main>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <span class="navbar-brand">Energy Dashboard</span>
      <div class="collapse navbar-collapse">
        <ul class="navbar-nav">
          {#each charts as chart}
            {#if selectedChart == chart}
              <li class="navbar-item">
                <a on:click={() => selectedChart = chart} class="nav-link active">{chart.name}</a>
              </li>
              {:else}
              <li class="navbar-item">
                <a on:click={() => selectedChart = chart} class="nav-link">{chart.name}</a>
              </li>
            {/if}
          {/each}
        </ul>
      </div>
    </div>
  </nav>

  <svelte:component this={selectedChart.component} />

</main>

<style>
</style>
