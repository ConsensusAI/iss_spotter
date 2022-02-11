const { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes } = require("./iss");

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }

  console.log("It worked! Returned IP:", ip);
});

fetchCoordsByIP("70.81.85.176", (err, coordinates) => {
  if (err) {
    console.log("It didn't work!", err);
    return;
  }
  console.log("It worked! Returned coordinates:", coordinates);
});

fetchISSFlyOverTimes(
  { latitude: 45.5457, longitude: -73.5805 },
  (err, times) => {
    if (err) {
      console.log("It didn't work!", err);
      return;
    }
    console.log("It worked! Fly over times:", times);
  }
);
