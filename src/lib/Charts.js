import EnergyLineChart from "./EnergyLineChart.svelte";
import WorldMapChart from "./WorldMapChart.svelte";
import Compare from "./Compare.svelte";

export const charts = [
    { id: 1, name: "Energy Line chart", component: EnergyLineChart },
    { id: 2, name: "World Map chart", component: WorldMapChart },
    { id: 3, name: "Compare Countries", component: Compare },
];