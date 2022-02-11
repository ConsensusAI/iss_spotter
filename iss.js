const request = require("request");

const fetchMyIP = (callback) => {
  request("https://api64.ipify.org?format=json", (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
    }

    const ip = JSON.parse(body)["ip"];
    callback(null, ip);
  });
};

const fetchCoordsByIP = (ip, callback) => {
  request("https://freegeoip.app/json/" + ip, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching Coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const { latitude, longitude } = JSON.parse(body);
    callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = (coords, callback) => {
  request(
    `https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,
    (error, response, body) => {
      if (error) {
        callback(error, null);
        return;
      }

      if (response.statusCode !== 200) {
        const msg = `Status Code ${response.statusCode} when fetching fly over times. Response: ${body}`;
        callback(Error(msg), null);
        return;
      }

      const flyOverTimes = JSON.parse(body);
      callback(null, flyOverTimes.response);
    }
  );
};

const nextISSTimesForMyLocation = (callback) => {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, coordinates) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(coordinates, (error, passTimes) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, passTimes);
      });
    });
  });
};

module.exports = {
  nextISSTimesForMyLocation,
};
