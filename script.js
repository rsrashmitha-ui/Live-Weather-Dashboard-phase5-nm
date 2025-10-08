const apiKey = "YOUR_API_KEY_HERE"; // 🔑 Replace with your OpenWeatherMap API key
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherCard = document.getElementById("weatherCard");
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  } else {
    alert("Please enter a city name!");
  }
});
async function fetchWeather(city) {
  try {
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(apiURL);
    const data = await response.json();

    if (data.cod === "404") {
      alert("City not found. Please try again!");
      weatherCard.classList.add("hidden");
      return;
    }
  displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
function displayWeather(data) {
  const cityName = document.getElementById("cityName");
  const date = document.getElementById("date");
  const weatherIcon = document.getElementById("weatherIcon");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const humidity = document.getElementById("humidity");
  const wind = document.getElementById("wind");
  cityName.textContent = `${data.name}, ${data.sys.country}`;
  const today = new Date();
  date.textContent = today.toDateString();
  temperature.textContent = `${Math.round(data.main.temp)}°C`;
  description.textContent = data.weather[0].description;
  humidity.textContent = data.main.humidity;
  wind.textContent = data.wind.speed;
 const iconCode = data.weather[0].icon;
  weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
 weatherCard.classList.remove("hidden");
}
