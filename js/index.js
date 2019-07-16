import { getWeatherData } from './api.js';

const main = () => {
    getWeatherData()
        .then((response) => {
            console.dir(response);
        });

}

const populateTables = (weatherData) => {


    weatherData.today.forEach((e) => {

    });
}

const createTable = (heading) => {
    const table = document.getElementById("weather-info");
    const firstTableRow = createElement("tr");
    const labelContainer = createElement("th");
    const label = createElement("h2");
    label.text = heading;

    labelContainer.appendChild(label);
    firstTableRow.appendChild(labelContainer);
    table.appendChild(firstTableRow);

}


window.addEventListener("load", main);
