const axios = require("axios");
const path = require("path");
const fs = require("fs");

const WEEK_IN_SECONDS = 3600 * 24 * 7;

const headers = fs.readFile(
  path.resolve(__dirname) + "/headers.json",
  "utf-8",
  (err, data) => {
    if (err) throw err;
    return JSON.parse(data);
  }
);

var options = {
  method: "post",
  url: "https://testws.atdconnect.com/rs/3_6/fitment/year",
  data: {},
  ...headers
};

var years;

exports.handler = async (event, context, callback) => {
  let cacheHit = true;

  if (!years) {
    var req = await axios(options).then(res => (years = res.data));
    cacheHit = false;
  }

  callback(null, {
    statusCode: 200,
    body: JSON.stringify({
      timestamp: Math.floor(Date.now() / 1000),
      cached: cacheHit,
      data: years
    })
  });
};
