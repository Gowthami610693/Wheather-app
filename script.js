// script.js
function getWeather() {
    const city = document.getElementById("cityInput").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("City not found");
            return response.json();
        })
        .then(data => {
            document.getElementById('weather').innerHTML =
                `Temperature in ${city}: ${data.main.temp} °C`;
        })
        .catch(error => {
            document.getElementById('weather').innerHTML = 
                `Error: ${error.message}`;
        });
}
