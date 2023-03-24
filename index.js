fetch('./data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error:' + err);
    })
function appendData(data) {
    //add temp
    let temperatureContainer = document.getElementById("temperature");
    let tempDiv = document.createElement("div");
    tempDiv.innerHTML = `<br> <br> <h1> ${data["temperature_f"]} F / ${data["temperature_c"]} C </h1>`;
    temperatureContainer.appendChild(tempDiv);

    //add humidity
    let humidityContainer = document.getElementById("humidity");
    let humidityDiv = document.createElement("div");
    humidityDiv.innerHTML = `<br> <br> <h1> ${data["humidity"]}% </h1>`;
    humidityContainer.appendChild(humidityDiv);

    //add date
    let dateContainer = document.getElementById("date");
    let dateDiv = document.createElement("div");
    dateDiv.innerHTML = `<br> <br> <h1> Current Day: ${data["date"]} </h1>`;
    dateContainer.appendChild(dateDiv);
}