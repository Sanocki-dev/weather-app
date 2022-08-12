const request = require("request");

const geocode = (address, callback) => {
  const url =
    "http://api.positionstack.com/v1/forward?access_key=2e03eca79f2138abc5ba0740ab22797e&query=" +
    encodeURIComponent(address);
  request(url, { json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to make request. Please try again!", undefined);
    } else if (body.error || body.data.length === 0) {
      callback("Invalid location. Please try again!", undefined);
    } else {
      const { latitude, longitude, label } = body.data[0];
      callback(undefined, { latitude, longitude, label });
    }
  });
};

module.exports = geocode;
