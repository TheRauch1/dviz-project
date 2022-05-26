<script>
    import "bootstrap/dist/css/bootstrap.min.css";
    import { selectedChart } from "./stores";
    import { charts } from "./Charts";
</script>

<div class="container-fluid">
    <div class="row">
        {#each charts as chart}
            <div class="col-6">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">{chart.name}</h5>
                        <a
                            on:click={() => selectedChart.set(chart)}
                            class="btn btn-primary">Go to Dashboard</a
                        >
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
