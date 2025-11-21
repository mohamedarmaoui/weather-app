const searchBtn = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherDisplay = document.getElementById('weather-display');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const windSpeed = document.getElementById('wind-speed');

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(52.52, 13.41, city);
    } else {
        alert('Please enter a city name.');
    }
});

async function fetchWeather(lat, lon, city) {
    try {
        const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        updateWeather(data, city);
    } catch (error) {
        alert(error.message);
    }
}

function updateWeather(data, city) {
    cityName.textContent = city;
    temperature.textContent = `${data.current_weather.temperature}°C`;
    windSpeed.textContent = `${data.current_weather.windspeed} m/s`;
    weatherDisplay.style.display = 'block';
}
