const request = require("request");
const geoCode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoicGhvdWJvcmlzIiwiYSI6ImNrYTZubzdpNDA4bzMycnFwN2Z0ZTczcXIifQ.qyUUC25yPPeU1sWw3GVmWA`;
  request({ url, json: true }, (error, {body}) => {
      const {features,query} = body
    if (error) {
     return callback("Connection to server failed");
    } else if (body.features.length === 0) {
     return callback(`didn't find your location`);
    } else{
      return callback(undefined, {
        latitude: features[0].center[1],
        longitude:features[0].center[0],
        location: features[0].place_name
      });
    }
  });
};
module.exports = geoCode;
