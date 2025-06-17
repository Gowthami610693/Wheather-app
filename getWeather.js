function getWeather() {
    const city = document.getElementById("cityInput").value.trim();
    const apiKey = config.apiKey;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById("error").innerText = "";

    if (!city) {
        document.getElementById("error").innerText = "Please enter a city name.";
        return;
    }

    fetch(url)
        .then(res => {
            if (!res.ok) throw new Error("City not found.");
            return res.json();
        })
        .then(data => {
            const toTime = (unix) => new Date(unix * 1000).toLocaleTimeString();
            const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            document.getElementById("location-card").innerHTML = `
        <h3>📍 Location</h3>
        <p><strong>City:</strong> ${data.name}</p>
        <p><strong>Country:</strong> ${data.sys.country}</p>
        <p><strong>Lat/Lon:</strong> ${data.coord.lat}, ${data.coord.lon}</p>
      `;

            document.getElementById("weather-card").innerHTML = `
        <h3>🌤️ Weather</h3>
        <img class="icon" src="${iconUrl}" alt="weather icon">
        <p>${data.weather[0].main} - ${data.weather[0].description}</p>
        <p>Cloudiness: ${data.clouds.all}%</p>
      `;

            document.getElementById("temp-card").innerHTML = `
        <h3>🌡️ Temperature</h3>
        <p>Temp: ${data.main.temp} °C</p>
        <p>Feels Like: ${data.main.feels_like} °C</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Pressure: ${data.main.pressure} hPa</p>
      `;

            document.getElementById("wind-card").innerHTML = `
        <h3>🌬️ Wind</h3>
        <p>Speed: ${data.wind.speed} m/s</p>
        <p>Direction: ${data.wind.deg}°</p>
        <p>Gust: ${data.wind.gust || 'N/A'} m/s</p>
      `;

            document.getElementById("sun-card").innerHTML = `
        <h3>🌅 Sun Timings</h3>
        <p>Sunrise: ${toTime(data.sys.sunrise)}</p>
        <p>Sunset: ${toTime(data.sys.sunset)}</p>
        <p>Last Update: ${toTime(data.dt)}</p>
      `;
        })
        .catch(error => {
            document.getElementById("error").innerText = error.message;
        });
}
