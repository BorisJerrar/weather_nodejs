const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require('./utils/GeoCode')
const forecast = require('./utils/Forecast')

//init ExpressJS
const app = express();

//define path for expressJS
const publicDir = path.join(__dirname, "../public");
const viewDir = path.join(__dirname, "../template/views");
const partialDir = path.join(__dirname, "../template/partials");

//set up handelbars engin and view location
app.set("views", viewDir);
hbs.registerPartials(partialDir);
app.set("view engine", "hbs");

//set up directory
app.use(express.static(publicDir));

app.get("", (req, res) => {
  res.render("index", { title: "App Weather", name: "Boris Jerrar" });
});
app.get("/weather", (req, res) => {
  if(!req.query.address){
    return  res.send({error:"You have to provide a location"});
  }
  const cityName = req.query.address
  geocode(req.query.address, (error, {longitude, latitude, location} = {})=>{
    if(error){
      return res.send({error: `We did not find ${cityName}, try another research.`})
    }
  forecast(latitude, longitude , (error, forecastreponse) =>{
    if(error){
      return res.send({error: "We have a connection problem, please retry" })
    }
      res.send(
        {forcast: forecastreponse, location, address: req.query.address}
        )
  })
  })
});
app.get("/about", (req, res) => {
  res.render("about", { title: "About", name: "Boris Jerrar" });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Boris Jerrar",
    message: "If you have difficulties you van contact me on twitter",
  });
});
app.get("/help/*", (req, res) => {
  res.render("404", {name: 'Boris Jerrar', title: '404', message: "No Machtched Article" });
});
app.get("*", (req, res) => {
  res.render("404", { name: 'Boris Jerrar', title: '404', message: "Ooooh ooohhh, you went to far..." });
});
app.listen(3100, () => {
  console.log("SERVER RUNNING ￨ :𝟛𝟘𝟘𝟘");
});
