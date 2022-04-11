<script>
    import Plotly from "plotly.js-dist-min";
    import { onMount } from "svelte";

    import hackathonData from "../assets/data.json";

    var x_values = [];
    var y_values = [];
    var passwords = [];

    for (const key in hackathonData.strength) {
        x_values.push(hackathonData.strength[key]);
    }

    for (const key in hackathonData.category) {
        y_values.push(hackathonData.category[key]);
    }

    for (const key in hackathonData.password) {
        passwords.push(hackathonData.password[key]);
    }

    onMount(() => {
        var trace1 = {
            x: x_values,
            y: y_values,
            mode: "markers",
            type: "scatter",
            name: "Team A",
            text: passwords,
            marker: { size: 12 },
        };

        var data = [trace1];

        var layout = {
            title: "Visualization of Password in their category and their strength",
            xaxis: {
                title: "Strength",
            },
            yaxis: {
                title: "Category",
            },
        };

        console.log(x_values);

        Plotly.newPlot("firstChart", data, layout, { scrollZoom: true });

        var data = [
            {
                values: [19, 26, 55],
                labels: ["Residential", "Non-Residential", "Utility"],
                type: "pie",
            },
        ];

        var layout = {
            height: 400,
            width: 500,
        };

        Plotly.newPlot("pieChart", data, layout);
    });
</script>

<p>
    In the following Scatterplot you can see the distribution of strong
    passwords in their different categories. As you can see the nerdy-pop
    category has some of the strongest passwords; followed by alphanumeric.
</p>
<div id="firstChart" />
<div id="pieChart" />

<style>
</style>
