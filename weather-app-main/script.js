const apiKey = "7d5e74e7b112e34001dc87b79a2fc7c3";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});

async function getWeather(city) {
  try {
    weatherResult.innerHTML = "Fetching weather...";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    const temperature = data.main.temp;
    const condition = data.weather[0].main;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    if (condition === "Clear") {
      document.body.style.background="linear-gradient(to right, #fbc2eb, #a6c1ee)";
    } else if (condition === "Clouds") {
      document.body.style.background="linear-gradient(to right, #d7d2cc, #304352)";
    } else if (condition === "Rain") {
      document.body.style.background="linear-gradient(to right, #4e54c8, #8f94fb)";
    }

    weatherResult.innerHTML = `
      <h2>${city}</h2>
      <p>🌡 Temperature: ${temperature}°C</p>
      <p>☁ Condition: ${condition}</p>
      <p>💧 Humidity: ${humidity}%</p>
      <p>🌬 Wind Speed: ${windSpeed} m/s</p>
    `;
  } catch (error) {
    weatherResult.innerHTML = "❌ Something went wrong!";
    console.error(error);
  }
}