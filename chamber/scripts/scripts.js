// Toggle nav menu
document.getElementById("menu").addEventListener("click", () => {
    document.querySelector(".navigation").classList.toggle("open");
});

// Year and Last Modified
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;

// Load members from JSON and store
let members = [];

async function loadMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    members = data.members;
    displayGridView();
}
loadMembers();

// Grid view function
function displayGridView() {
    const directory = document.getElementById("directory");
    if (!directory) return;
    directory.classList.add("grid-view");
    directory.classList.remove("list-view");
    directory.innerHTML = "";

    members.forEach(member => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" />
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        directory.appendChild(card);
    });
}

function displayListView() {
    const directory = document.getElementById("directory");
    if (!directory) return;
    directory.classList.add("list-view");
    directory.classList.remove("grid-view");
    directory.innerHTML = "";

    members.forEach(member => {
        const item = document.createElement("div");
        item.classList.add("list-item");

        item.innerHTML = `
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>${member.phone}</p>
            <a href="${member.website}" target="_blank">Visit Website</a>
        `;
        directory.appendChild(item);
    });
}

// Button listeners (only if they exist on the page)
const gridBtn = document.getElementById("gridBtn");
const listBtn = document.getElementById("listBtn");
if (gridBtn && listBtn) {
    gridBtn.addEventListener("click", displayGridView);
    listBtn.addEventListener("click", displayListView);
}

// Weather Configuration
const apiKey = 'e7769e4d8c7a4e031f140cfc56e410e4';
const lat = 11.6080;
const lon = 125.4329;

const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function fetchWeatherData() {
    try {
        // Current weather
        const response = await fetch(currentWeatherURL);
        if (!response.ok) throw new Error("Failed to fetch weather data");

        const data = await response.json();
        const temperature = data.main?.temp;
        const iconCode = data.weather?.[0]?.icon;
        const description = data.weather?.[0]?.description;
        const cityName = data.name;

        document.getElementById("current-temp").textContent = `${temperature.toFixed(1)}`;
        document.getElementById("weather-icon").src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
        document.getElementById("weather-icon").alt = description;
        document.getElementById("weather-desc").textContent = description;
        document.getElementById("city-name").textContent = cityName;

    } catch (error) {
        console.error("Weather error:", error.message);
        document.getElementById("current-temp").textContent = "N/A";
    }
}

async function fetchForecast() {
    try {
        const response = await fetch(forecastURL);
        if (!response.ok) throw new Error("Failed to fetch forecast");

        const data = await response.json();
        const forecastContainer = document.getElementById("forecast-days");
        forecastContainer.innerHTML = "";

        const days = {};
        data.list.forEach(item => {
            const date = new Date(item.dt_txt);
            const day = date.toLocaleDateString("en-US", { weekday: 'short' });
            const hour = date.getHours();

            if (hour === 12 && !days[day]) {
                days[day] = item;
            }
        });

        Object.entries(days).slice(0, 3).forEach(([day, item]) => {
            const temp = item.main.temp.toFixed(1);
            const icon = item.weather[0].icon;
            const desc = item.weather[0].description;

            const dayCard = document.createElement("div");
            dayCard.innerHTML = `
                <p><strong>${day}</strong></p>
                <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" />
                <p>${temp} °C</p>
            `;
            forecastContainer.appendChild(dayCard);
        });

    } catch (error) {
        console.error("Forecast error:", error.message);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    fetchWeatherData();
    fetchForecast();
});

// Spotlight filter
function displaySpotlights() {
    const spotlightContainer = document.getElementById("spotlight-container");

    const eligibleMembers = members.filter(m => m.membership === 3 || m.membership === 2);
    const randomMembers = eligibleMembers.sort(() => 0.5 - Math.random()).slice(0, 3);

    randomMembers.forEach(member => {
        const spotlight = document.createElement("div");
        spotlight.classList.add("spotlight-banner");

        spotlight.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}" />
            <div class="spotlight-info">
                <h3>${member.name}</h3>
                <p class="highlight">${member.highlight || "An outstanding member of our business community."}</p>
                <p><strong>Phone:</strong> ${member.phone}</p>
                <p><strong>Address:</strong> ${member.address}</p>
                <p><strong>Membership:</strong> ${member.membership === 3 ? "Gold" : "Silver"}</p>
                <a href="${member.website}" target="_blank" class="cta-button">Visit Website</a>
            </div>
        `;

        spotlightContainer.appendChild(spotlight);
    });
}


async function loadMembers() {
    const response = await fetch("data/members.json");
    const data = await response.json();
    members = data.members;

    displayGridView(); 
    displaySpotlights();
}
