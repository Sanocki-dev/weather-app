const weatherForm = document.querySelector("form");
const input = document.querySelector("input");

const message1 = document.querySelector("#message-1");
const message2 = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  message1.textContent = "Loading...";
  message2.textContent = "";


  fetch("/weather?location=" + input.value).then((res) => {
    res.json().then((data) => {
      console.log(data);
      if (data.error) {
        message2.textContent = data.error;
        message1.textContent = "";
      } else {
        message1.textContent = data.forecast;
      }
    });
  });
});
