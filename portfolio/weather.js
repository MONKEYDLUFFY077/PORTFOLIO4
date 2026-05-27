const weatherForm =
  document.getElementById("weather-form");

const cityInput =
  document.getElementById("city-input");

const weatherResult =
  document.getElementById("weather-result");

async function fetchWeather(city) {

  weatherResult.innerHTML = `
    <article class="card">
      <p>Loading weather data...</p>
    </article>
  `;

  try {

    const apiKey =
      "45da01dac60c2f71ed8c09c13dc3c993";

    const response =
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

    if (!response.ok) {

      if (response.status === 404) {
        throw new Error("City not found");
      }

      if (response.status === 401) {
        throw new Error("Invalid API key");
      }

      throw new Error(
        "Unable to fetch weather data"
      );

    }

    const data =
      await response.json();

    renderWeather(data);

  }

  catch (error) {

    weatherResult.innerHTML = `
      <article class="card">

        <h3>
          Error
        </h3>

        <p>
          ${error.message}
        </p>

      </article>
    `;

  }

}

function renderWeather(data) {

  weatherResult.innerHTML = `

    <article class="card">

      <h3>
        ${data.name}, ${data.sys.country}
      </h3>

      <p>
        🌡 Temperature:
        ${data.main.temp}°C
      </p>

      <p>
        💧 Humidity:
        ${data.main.humidity}%
      </p>

      <p>
        🌬 Wind Speed:
        ${data.wind.speed} m/s
      </p>

      <p>
        ☁ Condition:
        ${data.weather[0].description}
      </p>

    </article>

  `;

}

weatherForm.addEventListener(
  "submit",
  event => {

    event.preventDefault();

    const city =
      cityInput.value.trim();

    if (!city) return;

    fetchWeather(city);

  }
);