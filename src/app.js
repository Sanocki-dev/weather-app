const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define Paths for Express config
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// This is using a npm module Handlebars hbs
// this makes it possible for dynamic pages
// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Because the file is index it acts like ''
// you access the pages by doing .html
// Setup static directory to serve
app.use(express.static(publicPath));

app.get("", (req, res) => {
  // This renders the hbs dynamic page which is in the views
  res.render("index", { title: "Weather App" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    message: "This is me helping",
  });
});

app.get("/weather", (req, res, next) => {
  const title = "Weather";
  let location = req.query.location;
  if (!location) {
    return res.send({
      status: 200,
      error: "Location is required!",
    });
  }

  geocode(location, (error, { latitude, longitude, label } = {}) => {
    if (error) {
      return res.send({
        title,
        error,
      });
    }

    forecast(
      latitude,
      longitude,
      (error, { description, temperature, feelslike } = {}) => {
        if (error) {
          return res.send({
            title,
            error,
          });
        }
        res.send({
          title,
          forecast: `In ${label} it is ${description} and ${temperature} degrees outside, but it feels like ${feelslike}.`,
        });
      }
    );
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found!",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
