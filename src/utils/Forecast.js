const request = require("request");

const forcast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=c8fa25b4f3f1e1d1bb41311a2d21b5c2`;
  request({ url, json: true }, (error, {body}) => {
      const {main, message, cod, weather, visibility } = body
    if (error) {
      callback("Connection to server failed");
    } else if (cod === "400" || cod === "401"|| cod === "404") {
      callback(message);
    } else {
      callback(
        undefined,
        `Weather is ${
          weather[0].main
        }. It's currently ${Math.round(main.temp - 273.15)}°C.  ${visibility > 500 ? "There is a good visibility" : "There is a bad visibility"} with ${main.humidity}% of humidity.`
      );
    }
  });
};
module.exports = forcast;
