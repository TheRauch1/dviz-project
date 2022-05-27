import energyData from "../assets/energy.json";

class DataAPI {
    constructor() {
        this.countries = energyData["Country"];
        this.years = energyData["Year"];
        this.firstYear = Math.min.apply(Math, Object.values(this.years));
        this.lastYear = Math.max.apply(Math, Object.values(this.years));
        this.energyMaxValue = 41000;
        this.countryList = [];
        this.countryToIndexMap = {};
        this.searchString = "";
        this.worldMapZData = [];
        this.worldMapCountryData = [];
        this.worldMapDefaultYear = 2020;
        this.countriesWithNoData = ["World", "Europe", "Africa", "Europian Union (27)", "OECD", "Non-OECD", "Asia Pacific"];
        this.energyDataCategories = [
            "Primary energy (TWh)",
            "Biofuels (TWh)",
            "Hydro (TWh sub method)",
            "Nuclear (TWh sub method)",
            "Renewables (TWh sub method)",
            "Solar (TWh sub method)",
            "Wind (TWh sub method)"
        ]
        this.energy = energyData[this.energyDataCategories[0]];

        console.log(this.energyDataCategories)

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

    createTrace(countryName, category) {
        var xValues = [];
        var yValues = [];

        this.countryToIndexMap[countryName].forEach((index) => {
            xValues.push(this.years[index]);
            yValues.push(energyData[category][index]);
        });
        var trace = {
            name: countryName,
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