const apiKey = 'e7769e4d8c7a4e031f140cfc56e410e4'; 
const lat = 49.75; // Trier latitude
const lon = 6.64;  // Trier longitude
const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function fetchWeatherData() {
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        const temperature = data.main.temp;
        const iconCode = data.weather[0].icon;
        const description = data.weather[0].description;
        const cityName = data.name;

        document.getElementById("current-temp").textContent = `${temperature.toFixed(1)} °C`;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById("weather-icon").alt = description;
        document.getElementById("weather-desc").textContent = description;
        document.getElementById("city-name").textContent = cityName;

    } catch (error) {
        console.error("Error:", error.message);
        document.getElementById("current-temp").textContent = "N/A";
    }
}

fetchWeatherData();
