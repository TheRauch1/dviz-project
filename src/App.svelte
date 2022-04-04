<script>
  import FirstChart from "./lib/FirstChart.svelte";
  import SecondChart from "./lib/SecondChart.svelte"
  import "bootstrap/dist/css/bootstrap.min.css";
</script>

<main>
  <div class="container">
    <div class="row">
      <div class="col" />
      <div class="col-6">
        <h1>First chart</h1>
        <FirstChart />
      </div>
      <div class="col" />
    </div>

    <div class="row">
      <div class="col" />
      <div class="col-6">
        <h1>Second chart</h1>
        <SecondChart />
      </div>
      <div class="col" />
    </div>
  </div>
</main>

<style>
</style>
