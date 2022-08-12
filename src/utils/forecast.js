const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=8f55f30de8d2aa27213282c020b02649&query=" +
    encodeURIComponent(`${latitude},${longitude}`);

  request(url, { json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to make request. Please try again!", undefined);
    } else if (body.error) {
      callback("Invalid location. Please try again!", undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
