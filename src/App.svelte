<script>
  import FirstChart from "./lib/FirstChart.svelte";
  import SecondChart from "./lib/SecondChart.svelte";
  import "bootstrap/dist/css/bootstrap.min.css";

  let charts = [
    { id: 1, name: "Hackathon Data", component: FirstChart },
    { id: 2, name: "Second chart", component: SecondChart },
  ];
  let showingChart = charts[0];
</script>

<main>
  <div class="container">
    <div class="row">
      <div class="col" />
      <div class="col-10">
        <select
          bind:value={showingChart}
          class="form-select"
          aria-label="Default select example"
        >
          {#each charts as chart}
            <option value={chart}>{chart.name}</option>
          {/each}
        </select>
        <h1>{showingChart.name}</h1>
        <svelte:component this={showingChart.component} />
      </div>
      <div class="col" />
    </div>
  </div>
</main>

<style>
</style>
