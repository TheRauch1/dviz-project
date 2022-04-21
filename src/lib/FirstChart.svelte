<script>
    import Plotly from "plotly.js-dist-min";
    import { onMount } from "svelte";

    const endpoint = "https://www.reddit.com/r/sysadmin/rising.json"
    let posts;

    onMount(async function () {
        const response = await fetch(endpoint);
        const data = await response.json();
        posts = data.data.children;
        console.log(posts);

        var subredditMap = {};
        var x_data = [];
        var y_data = [];

        
        posts.forEach(post => {
            if (!(post.data.subreddit in subredditMap)) {
                subredditMap[post.data.subreddit] = 1;
                debugger;
            } else {
                subredditMap[post.data.subbreddit] += 1;
            }
        });

        Object.entries(subredditMap).forEach(([key, value ]) => {
            x_data.push(key);
            y_data.push(value);
        });

        Plotly.newPlot(
            "firstChart",
            /* JSON object */ {
                data: [{
                    x: x_data,
                    y: y_data,
                    type: 'bar'
                }],
            }
        );
    });
</script>

<div id="firstChart" />

<style>
</style>
