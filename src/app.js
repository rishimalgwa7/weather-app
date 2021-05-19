const path = require("path");
const express = require("express");
const geocode = require('./utils/geocode');
const forecast = require("./utils/forecast");
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const app = express();

const staticDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templets/views");
const partialsPath = path.join(__dirname, "../templets/partials");

app.set("view engine", "hbs");

app.set("views", viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(staticDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "hello",
    name: "rishi",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "help",
    name: "rishi",
    help: "this is help page",
  });
});
app.get("/help/*", (req, res) => {
  res.render("help404", {
    title: "Help articl not found",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide City name",
    });
} else {
    geocode(req.query.address, (error, {latitude,longitude,place}={}) => {
        if (error) {
          return res.send({
            error
          });
        }
      forecast(latitude,longitude,(error,forecastData)=>{
        if (error) {
          return res.send({
            error
          });
         }
         return res.send({
           'forecast':forecastData,
           address: req.query.address,
           location:place

        });
        })
    });
    
}

});
app.get("*", (req, res) => {
  res.render("404page", {
    title: "404 Error",
  });
});

app.listen(port, () => {
  console.log("Server started at port 3000");
});
