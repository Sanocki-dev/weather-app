const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=c82e034851b0dc02539377a268ac241c&query=" +
    encodeURIComponent(`${latitude},${longitude}`);

    request(url, { json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to make request. Please try again!", undefined);
    } else if (body.error) {
      callback("Invalid location. Please try again!", undefined);
    } else {
      callback(undefined, { body: body.current });
    }
  });
};

module.exports = forecast;
