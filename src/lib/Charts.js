import EnergyLineChart from "./EnergyLineChart.svelte";
import WorldMapChart from "./WorldMapChart.svelte";
import Compare from "./Compare.svelte";
import DataSources from "./DataSources.svelte";

export const charts = [
    { id: 1, name: "Energy Line Chart ", description: "Displays the energy consumption of every country in different categories.", component: EnergyLineChart },
    { id: 2, name: "World Map Chart", description: "Shows the worlds general energy consumption in a dynamic map per year.", component: WorldMapChart },
    { id: 3, name: "Compare Countries", description: "Compare two countries in their different every energy consumption category.", component: Compare },
    { id: 4, name: "Data Sources", description: "References to the data sources.", component: DataSources },
];