import energyData from "../assets/energy.json";

class DataAPI {
    constructor() {
        this.countries = energyData["Country"];
        this.years = energyData["Year"];
        this.firstYear = Math.min.apply(Math, Object.values(this.years));
        this.lastYear = Math.max.apply(Math, Object.values(this.years));
        this.energy = energyData["Primary energy (TWh)"];
        this.energyMaxValue = 41000;
        this.countryList = [];
        this.countryToIndexMap = {};
        this.searchString = "";
        this.worldMapZData = [];
        this.worldMapCountryData = [];
        this.worldMapDefaultYear = 2020;
        this.countriesWithNoData = ["World", "Europe", "Africa", "Europian Union (27)", "OECD", "Non-OECD", "Asia Pacific"];
        
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
        
        this.genWorldData(this.worldMapDefaultYear)
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

    genWorldData(year) {
        this.worldMapCountryData = [];
        this.worldMapZData = [];
        for (const country in this.countryToIndexMap) {
            for (const [key, value] of Object.entries(this.countryToIndexMap[country])) {
                if (this.years[value] == year && !this.countriesWithNoData.includes(this.countries[value])) {
                    this.worldMapZData.push(this.energy[value]);
                    this.worldMapCountryData.push(country);
                }
            }
        }

    }

}

export { DataAPI };