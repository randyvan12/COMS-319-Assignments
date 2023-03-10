fetch('./data.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        createGraph(data);
    })
    .catch(function (err) {
        console.log('error:' + err);
    })
function createGraph(data) {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Temperature(F)', 'Temperature(C)', 'Humidity(%)'],
            datasets: [{
                label: 'Degrees',
                data: [data["temperature_f"], data["temperature_c"], data["humidity"]],
                backgroundColor: ["#3A98B9"],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}