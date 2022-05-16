import energyData from "../assets/energy.json";

class dataAPI {
    constructor() {
        this.countries = energyData["Country"];
        this.years = energyData["Year"];
        this.energy = energyData["Primary energy (TWh)"];
        this.countryList = [];
        this.countryToIndexMap = {};
        this.searchString = "";

        for (const key in this.countries) {
            const country = this.countries[key];
            if (!this.countryList.includes(country)) { this.countryList.push(country); }
            if (country in this.countryToIndexMap) {
                this.countryToIndexMap[country].push(key);
            } else {
                this.countryToIndexMap[country] = [];
                this.countryToIndexMap[country].push(key);
            }
        }
    }

    createTrace(name) {
        var xValues = [];
        var yValues = [];

        this.countryToIndexMap[name].forEach((index) => {
            xValues.push(this.years[index]);
            yValues.push(this.energy[index]);
        });
        var trace = {
            name: name,
            x: xValues,
            y: yValues,
            type: "scatter",
        };
        console.log(trace);
        return trace;
    }

}

export { dataAPI };