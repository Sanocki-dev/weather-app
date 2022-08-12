const weatherForm = document.querySelector("form");
const input = document.querySelector("input");

const forecastOutput = document.querySelector("#message-1");
const errorOutput = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  forecastOutput.textContent = "Loading...";
  errorOutput.textContent = "";

  fetch("http://localhost:3000/weather?location=" + input.value).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.error) {
        errorOutput.textContent = data.error;
        forecastOutput.textContent = "";
      } else {
        forecastOutput.textContent = data.forecast;
      }
    });
  });
});
