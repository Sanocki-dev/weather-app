const weatherForm = document.querySelector("form");
const input = document.querySelector("input");

const icon = document.querySelector("#weather-icon");

const location_text = document.querySelector("#location");
const description = document.querySelector("#message-1");
const temperature = document.querySelector("#message-2");

const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const pressure = document.querySelector("#pressure");
const visibility = document.querySelector("#visibility");
const feelslike = document.querySelector("#feelslike");


weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  location.textContent = "Loading...";
  temperature.textContent = "";

  fetch("/weather?location=" + input.value).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.error) {
        temperature.textContent = data.error;
        location.textContent = "";
      } else {
        switch (data.weather_descriptions[0]) {
          case "Sunny":
            icon.src = "/assets/clear-day-line.svg";
            break;
          case "Clear":
            icon.src = "/assets/clear-night-line.svg";
            break;
          case "Overcast":
            icon.src = "/assets/clouds-line.svg";
            break;
          case "Rain":
            icon.src = "/assets/rain-line.svg";
            break;
          case "Light Rain":
            icon.src = "/assets/rain-line.svg";
            break;
          case "Haze, Rain Shower":
            icon.src = "/assets/rain-line.svg";
            break;
          case "Rain With Thunderstorm":
            icon.src = "/assets/thunder-rain-line.svg";
            break;
          case "Thunderstorm":
            icon.src = "/assets/thunder-line.svg";
            break;
          case "Partly cloudy":
            if (data.is_day) {
              icon.src = "/assets/partlycloudy-day-line.svg";
            } else {
              icon.src = "/assets/partlycloudy-night-line.svg";
            }
            break;
          default:
            break;
        }
        location_text.textContent = `${data.label}`;
        description.textContent = data.weather_descriptions[0]
        temperature.textContent = `${data.temperature}°`

        feelslike.textContent = `Feels Like ${data.feelslike}°`

        wind.textContent = `${data.wind_speed} km/h ${data.wind_dir}`
        pressure.textContent = `${data.pressure} mb`
        visibility.textContent = `${data.visibility} %`
        humidity.textContent = `${data.humidity} %`
      }
    });
  });
});
