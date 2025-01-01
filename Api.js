const apiKey = "a6d407eb8e8712e902c51aa5b746950a"; // Replace with your OpenWeatherMap API Key
const getWeatherBtn = document.getElementById("getWeatherBtn");
const cityInput = document.getElementById("cityInput");
const weatherInfo = document.getElementById("weatherInfo");

getWeatherBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    alert("Please enter a city name!");
    return;
  }
  fetchWeatherData(city);
});

function fetchWeatherData(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found!");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      weatherInfo.innerHTML = `<p class="weather-result">${error.message}</p>`;
    });
}

function displayWeather(data) {
  const { name, main, weather } = data;
  weatherInfo.innerHTML = `
    <p class="weather-result"><strong>City:</strong> ${name}</p>
    <p class="weather-result"><strong>Temperature:</strong> ${main.temp}°C</p>
    <p class="weather-result"><strong>Condition:</strong> ${weather[0].description}</p>
  `;
}
