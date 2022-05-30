<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import MainPage from "./lib/MainPage.svelte";
  import { selectedChart } from "./lib/stores";
  import { charts } from "./lib/Charts";

  let mainPage = { component: MainPage };

  let selectedChartValue;
  selectedChart.subscribe((chart) => {
    selectedChartValue = chart;
  });

  selectedChart.set(mainPage);
</script>

<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <span on:click={() => selectedChart.set(mainPage)} class="navbar-brand text-warning"
      >Energy Explorer</span
    >
    <div class="navbar-collapse">
      <ul class="navbar-nav">
        {#each charts as chart}
          {#if selectedChartValue == chart}
            <li class="navbar-item">
              <a
                on:click={() => selectedChart.set(chart)}
                class="nav-link active text-warning">{chart.name}</a
              >
            </li>
          {:else}
            <li class="navbar-item">
              <a on:click={() => selectedChart.set(chart)} class="nav-link"
                >{chart.name}</a
              >
            </li>
          {/if}
        {/each}
      </ul>
    </div>
  </div>
</nav>
<main>
  <svelte:component this={selectedChartValue.component} />
</main>
<footer>
  
</footer>
<style>
</style>
