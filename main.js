const apiKey = '8d6454a89dff871786a0307b0dbebbee';

const elements = {
    city: document.querySelector(".city"),
    temp: document.querySelector(".temp"),
    windSpeed: document.querySelector(".wind-speed"),
    humidity: document.querySelector(".humidity"),
    visibility: document.querySelector(".visibility-distance"),
    descriptionText: document.querySelector(".description-text"),
    date: document.querySelector(".date"),
    descriptionIcon: document.querySelector(".description i")
};

const formElement = document.querySelector(".search-form");
const inputElement = document.querySelector(".city-input");

formElement.addEventListener("submit", (e) => {
    e.preventDefault();
    const city = inputElement.value.trim();
    if (city !== "") {
        fetchWeatherData(city);
        inputElement.value = "";
    } else {
        alert("Please enter a correct name!");
    }
});

async function fetchWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error("Unable to fetch weather data");
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error(error);
    }
}

function updateWeatherUI(data) {
    elements.city.textContent = data.name;
    elements.temp.textContent = `${Math.round(data.main.temp)}`;
    elements.windSpeed.textContent = `${data.wind.speed} km/h`;
    elements.humidity.textContent = `${data.main.humidity}%`;
    elements.visibility.textContent = `${data.visibility / 1000} km`;
    elements.descriptionText.textContent = data.weather[0].description;
    const currentDate = new Date();
    elements.date.textContent = currentDate.toDateString();
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    elements.descriptionIcon.innerHTML = `<i class="material-icons">${weatherIconName}</i>`;
}

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help";
}
